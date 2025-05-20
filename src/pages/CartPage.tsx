import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="section">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl text-olive-800 dark:text-gray-100 font-bold mb-6 text-center">Su Carrito</h1>
          <div className="bg-white p-8 rounded-lg shadow-md text-center dark:bg-gray-800">
            <p className="text-xl text-olive-700 mb-6 dark:text-gray-300">Su carrito está vacío.</p>
            <Link to="/productos" className="btn-primary">
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="section">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl text-olive-800 dark:text-gray-100 font-bold mb-6 text-center">Su Carrito</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
          {/* Cart Header */}
          <div className="bg-olive-100 p-4 hidden md:grid md:grid-cols-12 text-olive-800 font-semibold dark:bg-gray-700 dark:text-gray-200">
            <div className="md:col-span-6">Producto</div>
            <div className="md:col-span-2 text-center">Precio</div>
            <div className="md:col-span-2 text-center">Cantidad</div>
            <div className="md:col-span-2 text-center">Total</div>
          </div>
          
          {/* Cart Items */}
          <div className="divide-y divide-olive-100 dark:divide-gray-700">
            {cart.map(item => (
              <div key={item.id} className="p-4 md:grid md:grid-cols-12 items-center">
                {/* Product Details */}
                <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                  <img 
                    src={item.imageUrl}
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-olive-800 font-medium dark:text-gray-100">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-olive-500 hover:text-olive-700 text-sm flex items-center mt-1 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="md:col-span-2 text-center mb-2 md:mb-0 text-olive-700 dark:text-gray-300">
                  <span className="md:hidden font-medium mr-2">Precio:</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                
                {/* Quantity */}
                <div className="md:col-span-2 text-center mb-2 md:mb-0">
                  <div className="flex items-center justify-center">
                    <button 
                      className="bg-olive-200 text-olive-800 w-8 h-8 rounded-l dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="bg-white border-y border-olive-200 w-10 h-8 flex items-center justify-center text-olive-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                      {item.quantity}
                    </span>
                    <button 
                      className="bg-olive-200 text-olive-800 w-8 h-8 rounded-r dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="md:col-span-2 text-center font-medium text-olive-800 dark:text-gray-100">
                  <span className="md:hidden font-medium mr-2">Total:</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div className="bg-olive-50 p-6 dark:bg-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-olive-800 dark:text-gray-100">Subtotal:</span>
              <span className="font-bold text-xl text-olive-800 dark:text-gray-100">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-olive-600 mb-6 dark:text-gray-300">Los impuestos y gastos de envío se calcularán en el siguiente paso.</p>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button 
                onClick={clearCart}
                className="btn-primary bg-transparent text-olive-700 border border-olive-300 hover:bg-olive-100 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
              >
                Vaciar carrito
              </button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/productos" className="btn-primary bg-transparent text-olive-700 border border-olive-300 hover:bg-olive-100 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600">
                  Seguir comprando
                </Link>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="btn-primary"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 