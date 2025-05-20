import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="section">
      <div className="container-custom max-w-2xl text-center py-16">
        <svg className="w-24 h-24 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold text-olive-800 dark:text-gray-100 mb-4">¡Pedido realizado con éxito!</h1>
        <p className="text-lg text-olive-700 dark:text-gray-300 mb-8">
          Gracias por tu compra. Tu número de pedido es: <span className="font-semibold text-olive-900 dark:text-white">{orderId || 'Desconocido'}</span>.
        </p>
        <p className="text-olive-600 dark:text-gray-400 mb-8">
          Recibirás una confirmación por correo electrónico en breve con los detalles de tu pedido.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Link to="/productos" className="btn-primary w-full sm:w-auto">
            Seguir comprando
          </Link>
          {/* Podrías añadir un enlace al dashboard del cliente si existe */}
          {/* <Link to="/cliente/pedidos" className="btn-secondary w-full sm:w-auto">
            Ver mis pedidos
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage; 