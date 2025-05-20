import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ShippingAddress, Order, OrderItem, CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const SHIPPING_COST = 5.00; // Definir costo de envío
  
  const countries = [
    { value: 'ES', label: 'España' },
    { value: 'PT', label: 'Portugal' },
    { value: 'FR', label: 'Francia' },
    { value: 'IT', label: 'Italia' },
    { value: 'DE', label: 'Alemania' },
    { value: 'GB', label: 'Reino Unido' },
    { value: 'US', label: 'Estados Unidos' },
    { value: 'CA', label: 'Canadá' },
    { value: 'MX', label: 'México' },
    { value: 'AR', label: 'Argentina' },
    { value: 'BR', label: 'Brasil' },
    { value: 'CO', label: 'Colombia' },
    { value: 'CL', label: 'Chile' },
    { value: 'PE', label: 'Perú' },
    { value: 'VE', label: 'Venezuela' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'UY', label: 'Uruguay' },
    { value: 'PY', label: 'Paraguay' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'PA', label: 'Panamá' },
    { value: 'DO', label: 'República Dominicana' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'HN', label: 'Honduras' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'CU', label: 'Cuba' },
    { value: 'AU', label: 'Australia' },
    { value: 'NZ', label: 'Nueva Zelanda' },
    { value: 'JP', label: 'Japón' },
    { value: 'CN', label: 'China' },
    { value: 'IN', label: 'India' },
    { value: 'ZA', label: 'Sudáfrica' },
    // Lista más completa (ordenada alfabéticamente por etiqueta para mejor UX)
    { value: 'AF', label: 'Afganistán' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Argelia' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AG', label: 'Antigua y Barbuda' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaiyán' },
    { value: 'BS', label: 'Bahamas' },
    { value: 'BH', label: 'Baréin' },
    { value: 'BD', label: 'Bangladés' },
    { value: 'BB', label: 'Barbados' },
    { value: 'BY', label: 'Bielorrusia' },
    { value: 'BE', label: 'Bélgica' },
    { value: 'BZ', label: 'Belice' },
    { value: 'BJ', label: 'Benín' },
    { value: 'BT', label: 'Bután' },
    { value: 'BA', label: 'Bosnia y Herzegovina' },
    { value: 'BW', label: 'Botsuana' },
    { value: 'BN', label: 'Brunéi' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'CV', label: 'Cabo Verde' },
    { value: 'KH', label: 'Camboya' },
    { value: 'CM', label: 'Camerún' },
    { value: 'CF', label: 'República Centroafricana' },
    { value: 'TD', label: 'Chad' },
    { value: 'KM', label: 'Comoras' },
    { value: 'CG', label: 'Congo' },
    { value: 'CD', label: 'Congo (Rep. Dem.)' },
    { value: 'HR', label: 'Croacia' },
    { value: 'CY', label: 'Chipre' },
    { value: 'CZ', label: 'Chequia' },
    { value: 'DK', label: 'Dinamarca' },
    { value: 'DJ', label: 'Yibuti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'EG', label: 'Egipto' },
    { value: 'GQ', label: 'Guinea Ecuatorial' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'SZ', label: 'Esuatini' },
    { value: 'ET', label: 'Etiopía' },
    { value: 'FJ', label: 'Fiyi' },
    { value: 'FI', label: 'Finlandia' },
    { value: 'GA', label: 'Gabón' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgia' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GR', label: 'Grecia' },
    { value: 'GD', label: 'Granada' },
    { value: 'GN', label: 'Guinea' },
    { value: 'GW', label: 'Guinea-Bisáu' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haití' },
    { value: 'HU', label: 'Hungría' },
    { value: 'IS', label: 'Islandia' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Irán' },
    { value: 'IQ', label: 'Irak' },
    { value: 'IE', label: 'Irlanda' },
    { value: 'IL', label: 'Israel' },
    { value: 'CI', label: 'Costa de Marfil' },
    { value: 'JM', label: 'Jamaica' },
    { value: 'JO', label: 'Jordania' },
    { value: 'KZ', label: 'Kazajistán' },
    { value: 'KE', label: 'Kenia' },
    { value: 'KI', label: 'Kiribati' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'KG', label: 'Kirguistán' },
    { value: 'LA', label: 'Laos' },
    { value: 'LV', label: 'Letonia' },
    { value: 'LB', label: 'Líbano' },
    { value: 'LS', label: 'Lesoto' },
    { value: 'LR', label: 'Liberia' },
    { value: 'LY', label: 'Libia' },
    { value: 'LI', label: 'Liechtenstein' },
    { value: 'LT', label: 'Lituania' },
    { value: 'LU', label: 'Luxemburgo' },
    { value: 'MG', label: 'Madagascar' },
    { value: 'MW', label: 'Malaui' },
    { value: 'MY', label: 'Malasia' },
    { value: 'MV', label: 'Maldivas' },
    { value: 'ML', label: 'Malí' },
    { value: 'MT', label: 'Malta' },
    { value: 'MH', label: 'Islas Marshall' },
    { value: 'MR', label: 'Mauritania' },
    { value: 'MU', label: 'Mauricio' },
    { value: 'FM', label: 'Micronesia' },
    { value: 'MD', label: 'Moldavia' },
    { value: 'MC', label: 'Mónaco' },
    { value: 'MN', label: 'Mongolia' },
    { value: 'ME', label: 'Montenegro' },
    { value: 'MA', label: 'Marruecos' },
    { value: 'MZ', label: 'Mozambique' },
    { value: 'MM', label: 'Myanmar (Birmania)' },
    { value: 'NA', label: 'Namibia' },
    { value: 'NR', label: 'Nauru' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NL', label: 'Países Bajos' },
    { value: 'NE', label: 'Níger' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'KP', label: 'Corea del Norte' },
    { value: 'MK', label: 'Macedonia del Norte' },
    { value: 'NO', label: 'Noruega' },
    { value: 'OM', label: 'Omán' },
    { value: 'PK', label: 'Pakistán' },
    { value: 'PW', label: 'Palaos' },
    { value: 'PS', label: 'Palestina' },
    { value: 'PG', label: 'Papúa Nueva Guinea' },
    { value: 'PL', label: 'Polonia' },
    { value: 'QA', label: 'Catar' },
    { value: 'RO', label: 'Rumania' },
    { value: 'RU', label: 'Rusia' },
    { value: 'RW', label: 'Ruanda' },
    { value: 'KN', label: 'San Cristóbal y Nieves' },
    { value: 'LC', label: 'Santa Lucía' },
    { value: 'VC', label: 'San Vicente y las Granadinas' },
    { value: 'WS', label: 'Samoa' },
    { value: 'SM', label: 'San Marino' },
    { value: 'ST', label: 'Santo Tomé y Príncipe' },
    { value: 'SA', label: 'Arabia Saudita' },
    { value: 'SN', label: 'Senegal' },
    { value: 'RS', label: 'Serbia' },
    { value: 'SC', label: 'Seychelles' },
    { value: 'SL', label: 'Sierra Leona' },
    { value: 'SG', label: 'Singapur' },
    { value: 'SK', label: 'Eslovaquia' },
    { value: 'SI', label: 'Eslovenia' },
    { value: 'SB', label: 'Islas Salomón' },
    { value: 'SO', label: 'Somalia' },
    { value: 'KR', label: 'Corea del Sur' },
    { value: 'SS', label: 'Sudán del Sur' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SD', label: 'Sudán' },
    { value: 'SR', label: 'Surinam' },
    { value: 'SE', label: 'Suecia' },
    { value: 'CH', label: 'Suiza' },
    { value: 'SY', label: 'Siria' },
    { value: 'TW', label: 'Taiwán' },
    { value: 'TJ', label: 'Tayikistán' },
    { value: 'TZ', label: 'Tanzania' },
    { value: 'TH', label: 'Tailandia' },
    { value: 'TL', label: 'Timor Oriental' },
    { value: 'TG', label: 'Togo' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad y Tobago' },
    { value: 'TN', label: 'Túnez' },
    { value: 'TR', label: 'Turquía' },
    { value: 'TM', label: 'Turkmenistán' },
    { value: 'TV', label: 'Tuvalu' },
    { value: 'UG', label: 'Uganda' },
    { value: 'UA', label: 'Ucrania' },
    { value: 'AE', label: 'Emiratos Árabes Unidos' },
    { value: 'UZ', label: 'Uzbekistán' },
    { value: 'VU', label: 'Vanuatu' },
    { value: 'VN', label: 'Vietnam' },
    { value: 'YE', label: 'Yemen' },
    { value: 'ZM', label: 'Zambia' },
    { value: 'ZW', label: 'Zimbabue' },
  ].sort((a, b) => a.label.localeCompare(b.label)); // Ordenar alfabéticamente

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'ES', // Default a España (código ISO)
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.profile?.name?.split(' ')[0] || '',
        lastName: user.profile?.name?.split(' ').slice(1).join(' ') || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio.';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria.';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria.';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'El código postal es obligatorio.';
    if (!formData.country.trim()) newErrors.country = 'El país es obligatorio.';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El número de teléfono es obligatorio.';
    } else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'El formato del número de teléfono no es válido.'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setErrors({ form: 'Debes iniciar sesión para realizar un pedido.' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    console.log('[CheckoutPage] handleSubmit: Iniciando proceso de envío.');

    const shippingAddressData: ShippingAddress = {
      street: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      country: formData.country,
      phone: formData.phoneNumber,
    };

    const orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_items'> = {
      user_id: user.id,
      customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      shipping_address: shippingAddressData,
      shipping_cost: SHIPPING_COST,
      total_amount: cartTotal + SHIPPING_COST,
      status: 'Procesando',
    };

    console.log('[CheckoutPage] handleSubmit: Datos de la orden a enviar:', orderData);
    console.log('[CheckoutPage] handleSubmit: Items del carrito a procesar:', cart);

    try {
      console.log('[CheckoutPage] handleSubmit: Intentando insertar orden principal...');
      const { data: newOrder, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;
      if (!newOrder) throw new Error('No se pudo crear la orden.');

      console.log('[CheckoutPage] handleSubmit: Orden principal creada:', newOrder);
      const orderId = newOrder.id;

      const orderItemsData: Omit<OrderItem, 'id' | 'product_image_url'>[] = cart.map((item: CartItem) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
        product_name: item.name,
      }));

      console.log('[CheckoutPage] handleSubmit: Datos de los items del pedido a enviar:', orderItemsData);
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);

      if (itemsError) throw itemsError;
      console.log('[CheckoutPage] handleSubmit: Items del pedido insertados correctamente.');

      console.log('[CheckoutPage] handleSubmit: Pedido procesado con éxito. Limpiando carrito y navegando...');
      clearCart();
      setIsSubmitting(false);
      navigate(`/pedido-confirmado/${orderId}`);

    } catch (error: any) {
      console.error('[CheckoutPage] handleSubmit: CATCH Global - Error al procesar el pedido:', error);
      setErrors({ form: `Error al procesar el pedido: ${error.message || 'Inténtelo de nuevo.'} (${error.code || 'sin código'})` });
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="section">
        <div className="container-custom text-center py-16">
          <h1 className="text-3xl font-bold text-olive-800 mb-6">Su carrito está vacío</h1>
          <p className="mb-8 text-olive-700">No hay productos en su carrito para proceder al pago.</p>
          <button 
            onClick={() => navigate('/productos')}
            className="btn-primary"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-cream">
      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-olive-800 text-center mb-8">Finalizar compra</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-olive-800 mb-6">Información de envío</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-olive-700 mb-1">Nombre *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-olive-700 mb-1">Apellidos *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-olive-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-olive-700 mb-1">Dirección *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-olive-700 mb-1">Ciudad *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-olive-700 mb-1">Código Postal *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.postalCode ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="country" className="block text-olive-700 mb-1">País *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-olive-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                    >
                      {countries.map(country => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-olive-700 mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-olive-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-olive-800 mb-4">Método de pago</h2>
                  <div className="bg-olive-50 p-4 rounded-md text-olive-700 dark:bg-gray-700 dark:text-gray-300">
                    <p className="font-semibold">Actualmente no procesamos pagos reales.</p>
                    <p className="text-sm">Este es un marcador de posición. La integración de pagos (Stripe, PayPal, etc.) se añadirá en un paso futuro.</p>
                    <p className="text-sm mt-2">Al hacer clic en "Finalizar Pedido", su pedido se registrará como "Procesando" sin pago real.</p>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-olive-700 text-white py-3 rounded-md font-semibold hover:bg-olive-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando pedido...' : 'Finalizar Pedido'}
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-olive-800 mb-6">Resumen del pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between pb-4 border-b border-olive-100 last:border-0">
                    <div>
                      <h3 className="font-medium text-olive-800">{item.name}</h3>
                      <p className="text-sm text-olive-600">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-olive-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-olive-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-olive-700">Subtotal:</span>
                  <span className="font-medium text-olive-800">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-olive-700">Gastos de envío:</span>
                  <span className="font-medium text-olive-800">${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-olive-200 pt-2 mt-2">
                  <span className="font-semibold text-olive-900">Total:</span>
                  <span className="font-bold text-olive-900">${(cartTotal + SHIPPING_COST).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-cream p-4 rounded-md">
                <p className="text-sm text-olive-700">
                  Al finalizar su pedido, acepta nuestros <a href="/terminos" className="text-olive-500 hover:underline">Términos y Condiciones</a> y nuestra <a href="/privacidad" className="text-olive-500 hover:underline">Política de Privacidad</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 