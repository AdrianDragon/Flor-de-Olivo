import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase, getUserProfile } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Define types
export interface UserProfile {
  name?: string;
  role?: 'customer' | 'admin' | 'manager';
}

export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: { name?: string }) => Promise<{ success: boolean; error?: string }>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingActual, setIsLoadingStateSetter] = useState<boolean>(true);
  const [isAuthenticatedActual, setIsAuthenticatedStateSetter] = useState<boolean>(false);

  // Ref to prevent concurrent profile fetches
  const isFetchingProfile = useRef(false);

  const setIsLoading = (value: boolean) => {
    console.log(`AuthContext: Setting isLoading to ${value}`);
    setIsLoadingStateSetter(value);
  };

  const setIsAuthenticated = (value: boolean) => {
    console.log(`AuthContext: Setting isAuthenticated to ${value}`);
    setIsAuthenticatedStateSetter(value);
  };

  // Centralized function to fetch profile and set user state
  const fetchProfileAndSetUser = async (currentSession: Session) => {
    if (isFetchingProfile.current) {
      console.log('AuthContext: Profile fetch already in progress, skipping.');
      return;
    }
    if (!currentSession.user) {
      console.log('AuthContext: fetchProfileAndSetUser - No user in session, skipping profile fetch.');
      // Ensure states are clean if this somehow gets called without a user
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
      localStorage.removeItem('supabase.auth.session');
      setIsLoading(false);
      return;
    }

    console.log('AuthContext: fetchProfileAndSetUser - Attempting for user ID:', currentSession.user.id);
    isFetchingProfile.current = true;
    setIsLoading(true); // Explicitly set loading true for this operation

    // Set core session data immediately
    setSession(currentSession);
    setIsAuthenticated(true);
    localStorage.setItem('supabase.auth.session', JSON.stringify(currentSession));

    try {
      const profileData = await getUserProfile(currentSession.user.id);
      console.log('AuthContext: fetchProfileAndSetUser - Profile data fetched:', profileData);
      setUser({
        id: currentSession.user.id,
        email: currentSession.user.email || '',
        profile: profileData || undefined,
      });
    } catch (profileError) {
      console.error('AuthContext: fetchProfileAndSetUser - Error fetching profile:', profileError);
      // Still authenticated with basic user info if profile fetch fails
      setUser({
        id: currentSession.user.id,
        email: currentSession.user.email || '',
      });
    } finally {
      console.log('AuthContext: fetchProfileAndSetUser - Processing complete.');
      isFetchingProfile.current = false;
      setIsLoading(false); // Ensure loading is false after this operation
    }
  };

  useEffect(() => {
    console.log('AuthContext: useEffect - Main effect START.');
    setIsLoading(true); // Initial loading state for the whole auth process

    // Function to handle initial session check
    const initializeAuth = async () => {
      console.log('AuthContext: initializeAuth - Checking initial session...');
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log('AuthContext: initializeAuth - Initial session object:', initialSession);

        if (initialSession?.user) {
          console.log('AuthContext: initializeAuth - Initial session found.');
          // No need to set isLoading(true) here again, fetchProfileAndSetUser will manage it.
          await fetchProfileAndSetUser(initialSession);
        } else {
          console.log('AuthContext: initializeAuth - No initial session found.');
          setUser(null);
          setSession(null);
          setIsAuthenticated(false);
          localStorage.removeItem('supabase.auth.session');
          setIsLoading(false); // No session, so loading is definitely false
        }
      } catch (error) {
        console.error('AuthContext: initializeAuth - Error during initial auth processing:', error);
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        localStorage.removeItem('supabase.auth.session');
        setIsLoading(false); // Error, so loading is false
      }
      // The finally for isLoading(false) is now within fetchProfileAndSetUser or if no session
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log(`AuthContext: onAuthStateChange - Event: ${event}`, currentSession);

      if (event === 'SIGNED_OUT') {
        console.log('AuthContext: onAuthStateChange - SIGNED_OUT');
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        localStorage.removeItem('supabase.auth.session');
        isFetchingProfile.current = false; // Reset flag on logout
        setIsLoading(false);
        return;
      }

      // For any other event (SIGNED_IN, INITIAL_SESSION, USER_UPDATED, TOKEN_REFRESHED etc.)
      if (currentSession?.user) {
        console.log('AuthContext: onAuthStateChange - Session and user detected for event:', event);
        
        if (event === 'SIGNED_IN') {
          console.log('AuthContext: onAuthStateChange - SIGNED_IN event. Scheduling profile fetch with a short delay.');
          const signedInUserId = currentSession.user.id; // Capture the user ID at the time of the event
          setTimeout(async () => {
            console.log('AuthContext: onAuthStateChange - Delayed execution for SIGNED_IN, now fetching profile.');
            const { data: { user: userAfterDelay } } = await supabase.auth.getUser();
            if (userAfterDelay?.id === signedInUserId) { // Ensure session is still valid and for the same user
              console.log('AuthContext: onAuthStateChange - User ID matches after delay, proceeding with profile fetch for SIGNED_IN.');
              await fetchProfileAndSetUser(currentSession); // Use the original currentSession from the event
            } else {
              console.log('AuthContext: onAuthStateChange - User ID changed or no user after delay for SIGNED_IN. Aborting profile fetch. User after delay:', userAfterDelay);
            }
          }, 100); // 100ms delay
        } else {
          // For other events like INITIAL_SESSION, USER_UPDATED, TOKEN_REFRESHED, fetch immediately
          console.log(`AuthContext: onAuthStateChange - Event ${event}. Fetching profile immediately.`);
          await fetchProfileAndSetUser(currentSession);
        }
      } else {
        // This covers cases where there is an event, it's not SIGNED_OUT, but there is no currentSession.user
        // (e.g. USER_DELETED, or if INITIAL_SESSION fires without a valid user for some reason)
        console.log('AuthContext: onAuthStateChange - No session/user for event:', event, ', cleaning up.');
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        localStorage.removeItem('supabase.auth.session');
        isFetchingProfile.current = false; 
        setIsLoading(false);
      }
    });

    console.log('AuthContext: useEffect - Auth listener set up.');

    return () => {
      console.log('AuthContext: useEffect - CLEANUP, unsubscribing auth listener.');
      authListener?.subscription.unsubscribe();
      isFetchingProfile.current = false; // Reset flag on unmount
    };
  }, []); // Empty dependency array, runs once on mount

  const login = async (email: string, password: string) => {
    console.log('AuthContext: login function called');
    // setIsLoading(true); // Now handled by onAuthStateChange -> fetchProfileAndSetUser
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log('AuthContext: login successful via Supabase, onAuthStateChange will follow.');
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error.message);
      // Ensure states are reset on login failure before onAuthStateChange might trigger with no session
      setUser(null);
      setSession(null);
      setIsAuthenticated(false); 
      setIsLoading(false); // Explicitly set loading false on login error
      return { success: false, error: error.message || 'Failed to login' };
    }
  };

  const logout = async () => {
    console.log('AuthContext: logout function called');
    // setIsLoading(true); // Handled by onAuthStateChange SIGNED_OUT
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during Supabase signOut:', error);
        // Even if signOut fails, attempt to clear client-side state
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        localStorage.removeItem('supabase.auth.session');
        setIsLoading(false);
      }
      // onAuthStateChange will handle setting user, session to null and isAuthenticated to false
      console.log('AuthContext: signOut call complete, onAuthStateChange will follow for SIGNED_OUT.');
    } catch (error) { // Should not happen if Supabase signOut doesn't throw often
      console.error('Error during logout function execution:', error);
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      localStorage.removeItem('supabase.auth.session');
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, fullName: string) => {
    console.log('AuthContext: register function called');
    // setIsLoading(true); // Handled by onAuthStateChange -> fetchProfileAndSetUser
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: fullName
          }
        }
      });
      if (signUpError) throw signUpError;
      console.log('AuthContext: signUp successful. Supabase trigger should handle profile creation. onAuthStateChange will follow.');
      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error.message);
      // Ensure states are reset on registration failure
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      setIsLoading(false); // Explicitly set loading false on registration error
      return { success: false, error: error.message || 'Failed to register' };
    }
  };
  
  const updateProfile = async (data: { name?: string }) => {
    console.log('AuthContext: updateProfile function called');
    if (!user?.id) {
      console.error('Update profile error: User not authenticated');
      return { success: false, error: 'User not authenticated for profile update' };
    }
    setIsLoading(true); // This is a specific loading state for the update action itself
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name: data.name })
        .eq('id', user.id);
      if (error) throw error;
      
      const updatedProfileData = await getUserProfile(user.id);
      if (updatedProfileData) {
        setUser(prev => prev ? { ...prev, profile: updatedProfileData } : null);
        console.log('AuthContext: Profile updated locally.');
      } else {
        // If getUserProfile returns null after an update (should be rare if update succeeded)
        // Re-fetch or handle, for now, just log. The user state still has old profile or no profile.
        console.warn('AuthContext: Updated profile data was null after update operation.');
      }
      return { success: true };
    } catch (error: any) {
      console.error('Update profile error:', error.message);
      return { success: false, error: error.message };
    } finally {
      console.log('AuthContext: updateProfile function finished.');
      setIsLoading(false); 
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: isAuthenticatedActual,
    isLoading: isLoadingActual,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Route protection higher-order component
export const withAuth = (Component: React.ComponentType, requireAuth = true) => {
  return () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoading) {
        // If auth is required and user is not authenticated, redirect to login
        if (requireAuth && !isAuthenticated) {
          navigate('/login', { replace: true });
        }
        
        // If user is authenticated and tries to access login/register pages
        if (isAuthenticated && !requireAuth) {
          navigate('/', { replace: true });
        }
      }
    }, [isAuthenticated, isLoading, navigate]);
    
    // Show loading state
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600"></div>
        </div>
      );
    }
    
    // If auth requirements are met, render the component
    if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
      return <Component />;
    }
    
    // Render nothing while redirecting
    return null;
  };
}; 