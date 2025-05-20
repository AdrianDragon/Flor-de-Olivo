import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="section bg-cream">
      <div className="container-custom py-16 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
          <div className="mb-8 text-olive-700">
            <h1 className="text-8xl font-bold">404</h1>
            <div className="w-24 h-1 bg-olive-500 mx-auto my-6"></div>
            <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
            <p className="text-lg text-olive-600">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1594486381848-61a0ba3b87bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Olivo" 
              className="rounded-lg shadow-md mx-auto mb-8 w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link 
              to="/" 
              className="btn-primary flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Ir al Inicio
            </Link>
            <Link 
              to="/productos" 
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Ver Productos
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-olive-500">
            Si crees que esto es un error, por favor contacta con nuestro 
            <Link to="/contacto" className="text-olive-700 hover:underline ml-1">
              servicio de atención al cliente
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 