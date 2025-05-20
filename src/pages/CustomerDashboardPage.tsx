import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WelcomeMessage from '../components/WelcomeMessage';

// Pedidos de ejemplo
const mockOrders = [
  {
    id: '10001',
    date: '10/05/2023',
    total: 78.50,
    status: 'Entregado',
    items: [
      { name: 'Aceite de Oliva Virgen Extra', quantity: 2, price: 12.99 },
      { name: 'Aceitunas Negras en Conserva', quantity: 3, price: 8.50 },
      { name: 'Mix de Especias Mediterráneas', quantity: 2, price: 6.75 }
    ]
  },
  {
    id: '10002',
    date: '28/06/2023',
    total: 45.75,
    status: 'Enviado',
    items: [
      { name: 'Miel de Romero', quantity: 1, price: 9.25 },
      { name: 'Conserva de Tomates Secos', quantity: 2, price: 7.80 },
      { name: 'Tapenade de Aceitunas', quantity: 1, price: 5.95 },
      { name: 'Aceite de Oliva Virgen Extra', quantity: 1, price: 12.99 }
    ]
  },
  {
    id: '10003',
    date: '15/07/2023',
    total: 32.95,
    status: 'Procesando',
    items: [
      { name: 'Conserva de Tomates Secos', quantity: 2, price: 7.80 },
      { name: 'Aceitunas Negras en Conserva', quantity: 1, price: 8.50 },
      { name: 'Tapenade de Aceitunas', quantity: 1, price: 5.95 }
    ]
  }
];

const CustomerDashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [profileForm, setProfileForm] = useState({
    name: user?.profile?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileFormSuccess, setProfileFormSuccess] = useState(false);
  const [profileFormError, setProfileFormError] = useState('');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    
    // Resetear mensajes de éxito/error cuando el usuario cambia algo
    setProfileFormSuccess(false);
    setProfileFormError('');
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (profileForm.newPassword && profileForm.newPassword.length < 8) {
      setProfileFormError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      setProfileFormError('Las contraseñas no coinciden');
      return;
    }
    
    // En una app real, aquí enviaríamos los datos al servidor
    // En nuestro prototipo, simulamos una actualización exitosa
    setTimeout(() => {
      setProfileFormSuccess(true);
      setProfileFormError('');
      setProfileForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 500);
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will be redirected by useEffect
  }
  
  return (
    <div className="section bg-cream">
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cabecera del dashboard */}
          <div className="bg-olive-700 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Mi cuenta</h1>
                <WelcomeMessage className="text-white" />
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="mt-4 md:mt-0 py-2 px-4 bg-white text-olive-800 rounded-md hover:bg-olive-100 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          
          {/* Navegación de pestañas */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-olive-700 text-olive-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                Mis pedidos
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-olive-700 text-olive-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Mi perfil
              </button>
            </nav>
          </div>
          
          {/* Contenido de la pestaña */}
          <div className="p-6">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-olive-800 mb-4">Historial de pedidos</h2>
                
                {mockOrders.length > 0 ? (
                  <div className="space-y-6">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between md:items-center">
                          <div>
                            <p className="font-medium text-olive-800">Pedido #{order.id}</p>
                            <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center">
                            <span 
                              className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                order.status === 'Entregado' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'Enviado'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="ml-4 font-bold text-olive-800">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium text-gray-700 mb-2">Productos:</h3>
                          <ul className="space-y-2">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aún no has realizado ningún pedido.</p>
                    <button
                      onClick={() => navigate('/productos')}
                      className="mt-4 btn-primary"
                    >
                      Explorar productos
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-olive-800 mb-4">Editar perfil</h2>
                
                {profileFormSuccess && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
                    Perfil actualizado correctamente.
                  </div>
                )}
                
                {profileFormError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                    {profileFormError}
                  </div>
                )}
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-1">Nombre completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar.</p>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-700 mb-2 mt-6">Cambiar contraseña</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-gray-700 mb-1">Contraseña actual</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={profileForm.currentPassword}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-gray-700 mb-1">Nueva contraseña</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={profileForm.newPassword}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirmar nueva contraseña</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={profileForm.confirmPassword}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-olive-600 text-white rounded-md hover:bg-olive-700 transition-colors"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage; 