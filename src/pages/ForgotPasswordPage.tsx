import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error: supaError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (supaError) {
      setError(supaError.message);
    } else {
      setMessage('Si tu correo electrónico existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.');
    }
    setLoading(false);
  };

  return (
    <div className={`section ${theme === 'dark' ? 'bg-gray-900' : 'bg-cream'} min-h-screen flex flex-col items-center justify-center`}>
      <div className="container-custom max-w-xl w-full pt-5 md:pt-15">
        <div className={`p-10 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-olive-800'}`}>
            Restablecer Contraseña
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gold-500 focus:border-gold-500' : 'border-gray-300 focus:ring-olive-500 focus:border-olive-500'}`}
              />
            </div>

            {message && (
              <p className="text-sm text-green-600 dark:text-green-400 text-center">{message}</p>
            )}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full flex justify-center py-3 px-4 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${loading && (theme === 'dark' ? 'dark:bg-gray-500' : 'bg-olive-400')} ${theme === 'dark' ? 'focus:ring-gold-500' : 'focus:ring-olive-500'}`}
              >
                {loading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
              </button>
            </div>
          </form>
          
          <p className={`mt-8 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            ¿Recordaste tu contraseña?{' '}
            <Link to="/login" className={`font-medium ${theme === 'dark' ? 'text-gold-500 hover:text-gold-400' : 'text-olive-600 hover:text-olive-500'}`}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;