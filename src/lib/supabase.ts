import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xswoamfmhwjwkouwjmtq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd29hbWZtaHdqd2tvdXdqbXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjIxNDEsImV4cCI6MjA2MzEzODE0MX0.0wu2Ejf4T-3-jtAGSS7sPgm6pnJzc2_61LY75gIACvk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to fetch user profile data
export const getUserProfile = async (userId: string) => {
  console.log('getUserProfile: Starting to fetch profile for userId:', userId);
  try {
    if (!userId) {
      console.error('getUserProfile: No userId provided, returning null.');
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Profile not found
        console.warn('getUserProfile: Profile not found for user ID (PGRST116):', userId, '. Returning null.');
        return null;
      }
      console.error('getUserProfile: Supabase returned an error object:', error);
      // Re-throw the original error to be caught by the caller
      throw error; 
    }

    console.log('getUserProfile: Successfully fetched profile data:', data);
    return data;
  } catch (error) {
    console.error('getUserProfile: CATCH_ALL_ERROR in getUserProfile function:', error);
    throw error;
  }
}; 