import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '../context/AuthContext'; // To protect the route

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }

    // If taking too long to load, we might be stuck
    const timer = setTimeout(() => {
      if (isLoading) {
        setLoadingTimeout(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, navigate]);

  // Initialize form with user data when available
  useEffect(() => {
    if (user?.profile?.name) {
      setFullName(user.profile.name);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // Emergency logout if we're stuck
  const handleEmergencyLogout = () => {
    localStorage.removeItem('supabase.auth.session');
    window.location.href = '/login';
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset form to current values if canceling edit
    if (isEditing && user?.profile?.name) {
      setFullName(user.profile.name);
    }
    // Clear any previous update messages
    setUpdateMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      setUpdateMessage({
        type: 'error',
        text: 'Por favor, introduce tu nombre completo.'
      });
      return;
    }
    
    try {
      setIsUpdating(true);
      setUpdateMessage(null);
      
      const { success, error } = await updateProfile({ name: fullName.trim() });
      
      if (success) {
        setUpdateMessage({
          type: 'success',
          text: 'Perfil actualizado correctamente.'
        });
        setIsEditing(false);
      } else {
        setUpdateMessage({
          type: 'error',
          text: error || 'Error al actualizar el perfil.'
        });
      }
    } catch (error: any) {
      setUpdateMessage({
        type: 'error',
        text: 'Error inesperado al actualizar el perfil.'
      });
      console.error('Profile update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-parchment p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600 mb-4"></div>
        <p className="text-olive-700">Cargando perfil...</p>
        
        {loadingTimeout && (
          <div className="mt-8">
            <p className="text-red-600 mb-4">Parece que está tardando demasiado.</p>
            <button 
              onClick={handleEmergencyLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cerrar sesión de emergencia
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-olive-200 dark:border-gray-700">
          <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-olive-800 dark:text-gold-400">Mi Perfil</h1>
          </div>
          
          <div className="p-6">
            {updateMessage && (
              <div className={`mb-6 p-4 rounded-md ${
                updateMessage.type === 'success' ? 'bg-green-100 dark:bg-green-700 border border-green-200 dark:border-green-600' : 'bg-red-100 dark:bg-red-700 border border-red-200 dark:border-red-600'
              }`}>
                <p className={`text-sm ${
                  updateMessage.type === 'success' ? 'text-green-700 dark:text-green-100' : 'text-red-700 dark:text-red-100'
                }`}>
                  {updateMessage.text}
                </p>
              </div>
            )}
            
            <div className="bg-cream dark:bg-gray-750 rounded-lg p-6 mb-6 border border-olive-100 dark:border-gray-650">
              <h2 className="text-xl font-semibold text-olive-700 dark:text-gold-300 mb-4">Información Personal</h2>
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</h3>
                    <p className="mt-1 text-lg text-olive-800 dark:text-gray-200">{user.email}</p>
                  </div>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 block w-full border border-olive-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-olive-500 focus:border-olive-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</h3>
                    <div className="mt-1">
                      {user.profile?.role && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.profile.role === 'admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' 
                            : user.profile.role === 'manager'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                              : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                        }`}>
                          {user.profile.role === 'admin' 
                            ? 'Administrador' 
                            : user.profile.role === 'manager'
                              ? 'Gerente'
                              : 'Cliente'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button 
                      type="submit"
                      disabled={isUpdating}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-olive-600 hover:bg-olive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-gray-900"
                    >
                      {isUpdating ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Guardando...
                        </span>
                      ) : 'Guardar cambios'}
                    </button>
                    <button 
                      type="button"
                      onClick={handleEditToggle}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</h3>
                    <p className="mt-1 text-lg text-olive-800 dark:text-gray-200">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre completo</h3>
                    <p className="mt-1 text-lg text-olive-800 dark:text-gray-200">
                      {user.profile?.name || "No especificado"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</h3>
                    <div className="mt-1">
                      {user.profile?.role && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.profile.role === 'admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' 
                            : user.profile.role === 'manager'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                              : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                        }`}>
                          {user.profile.role === 'admin' 
                            ? 'Administrador' 
                            : user.profile.role === 'manager'
                              ? 'Gerente'
                              : 'Cliente'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      type="button"
                      onClick={handleEditToggle}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-olive-600 hover:bg-olive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-gray-900"
                    >
                      Editar Información
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage); 