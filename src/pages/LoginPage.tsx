import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Por favor, introduce tu correo electrónico.');
      return;
    }
    
    if (!password) {
      setError('Por favor, introduce tu contraseña.');
      return;
    }
    
    try {
    setError(null);
      setIsSubmitting(true);
      
      const { success, error } = await login(email, password);
      
      if (success) {
        // Save to localStorage if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem('fdo_remember_email', email);
        } else {
          localStorage.removeItem('fdo_remember_email');
        }
        
        // Small delay to ensure context updates
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      } else {
        setError(error || 'Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (err) {
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('fdo_remember_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-olive-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-olive-800 dark:text-gold-400 mb-6">Iniciar sesión</h1>
          <p className="mb-6 text-olive-600 dark:text-gray-300">
            Bienvenido a Flor de Olivo
          </p>
        </div>
          
          {error && (
          <div className="bg-red-100 dark:bg-red-800 border-l-4 border-red-500 dark:border-red-600 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
            </div>
          )}
          
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-olive-700 dark:text-gray-200">
              Correo electrónico
              </label>
              <input
              id="email"
              name="email"
                type="email"
              autoComplete="email"
              required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-olive-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-olive-500 focus:border-olive-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-olive-700 dark:text-gray-200">
                Contraseña
              </label>
              <input
              id="password"
              name="password"
                type="password"
              autoComplete="current-password"
              required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-olive-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-olive-500 focus:border-olive-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-olive-600 focus:ring-olive-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-olive-700 dark:text-gray-300">
                Recordarme
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-olive-600 hover:text-olive-500 dark:text-gold-400 dark:hover:text-gold-300">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-olive-600 hover:bg-olive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-gray-900`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : 'Iniciar sesión'}
            </button>
          </div>
          </form>
          
          <div className="mt-6 text-center">
          <p className="text-sm text-olive-600 dark:text-gray-300">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-medium text-olive-600 hover:text-olive-500 dark:text-gold-400 dark:hover:text-gold-300">
              Regístrate aquí
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 