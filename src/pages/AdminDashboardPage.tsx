import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Product, Order, OrderItem, ShippingAddress } from '../types';
import { supabase } from '../lib/supabase';

// Define initial state for the product form
const initialProductFormState: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  category: 'aceites', // Default category
  stock: 0,
};

// Datos de ejemplo
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Aceite de Oliva Virgen Extra',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1572099605249-9c69169281e8?q=80&w=800&auto=format&fit=crop',
    description: 'Nuestro aceite premium, elaborado con aceitunas seleccionadas a mano de la región mediterránea.',
    category: 'aceites'
  },
  {
    id: 2,
    name: 'Aceitunas Negras en Conserva',
    price: 8.50,
    imageUrl: 'https://images.unsplash.com/photo-1572073712661-14a115930584?q=80&w=800&auto=format&fit=crop',
    description: 'Deliciosas aceitunas negras conservadas tradicionalmente con hierbas mediterráneas como tomillo, romero e hinojo. Aliñadas con ajo y especias según la receta tradicional castellana.',
    category: 'conservas'
  },
  {
    id: 3,
    name: 'Mix de Especias Mediterráneas',
    price: 6.75,
    imageUrl: 'https://images.unsplash.com/photo-1508160979410-7aa2610ae3c6?q=80&w=800&auto=format&fit=crop',
    description: 'Una mezcla única de hierbas y especias mediterráneas para realzar cualquier plato.',
    category: 'especias'
  },
  {
    id: 4,
    name: 'Miel de Romero',
    price: 9.25,
    imageUrl: 'https://images.unsplash.com/photo-1558642178-70f490c499b8?q=80&w=800&auto=format&fit=crop',
    description: 'Miel artesanal de romero con un delicado sabor floral y propiedades medicinales.',
    category: 'conservas'
  },
  {
    id: 5,
    name: 'Conserva de Tomates Secos',
    price: 7.80,
    imageUrl: 'https://images.unsplash.com/photo-1588870777305-8aa5006d0088?q=80&w=800&auto=format&fit=crop',
    description: 'Tomates secados al sol y conservados en nuestro aceite de oliva con hierbas aromáticas.',
    category: 'conservas'
  },
  {
    id: 6,
    name: 'Tapenade de Aceitunas',
    price: 5.95,
    imageUrl: 'https://images.unsplash.com/photo-1603613996027-94c9b11f8c0c?q=80&w=800&auto=format&fit=crop',
    description: 'Pasta de aceitunas negras con anchoas, alcaparras y especias. Perfecto para untar.',
    category: 'conservas'
  }
];

const mockOrdersData: Order[] = [
  {
    id: 'order_12345_abc',
    user_id: 'user_abcdef_123456',
    customer_name: 'Elena García',
    email: 'elena.garcia@example.com',
    shipping_address: {
      street: 'Calle Falsa 123, Apto 4B',
      city: 'Ciudad Ejemplo',
      postal_code: '12345',
      country: 'España',
      phone: '555-1234'
    },
    order_items: [
      {
        id: 'item_abc_001',
        product_id: 1, 
        quantity: 2,
        price_at_purchase: 12.99,
        product_name: 'Aceite de Oliva Virgen Extra',
        product_image_url: 'https://images.unsplash.com/photo-1572099605249-9c69169281e8?q=80&w=200&auto=format&fit=crop'
      },
      {
        id: 'item_abc_002',
        product_id: 2,
        quantity: 1,
        price_at_purchase: 8.50,
        product_name: 'Aceitunas Negras en Conserva',
        product_image_url: 'https://images.unsplash.com/photo-1572073712661-14a115930584?q=80&w=200&auto=format&fit=crop'
      }
    ],
    total_amount: 34.48,
    status: 'Procesando',
    notes: 'Por favor, entregar por la tarde.',
    created_at: '2023-10-26T10:30:00Z',
    updated_at: '2023-10-26T11:00:00Z'
  },
  {
    id: 'order_67890_def',
    user_id: 'user_ghijkl_789012',
    customer_name: 'Carlos Sánchez',
    email: 'carlos.sanchez@example.com',
    shipping_address: {
      street: 'Avenida Siempre Viva 742',
      city: 'Otra Ciudad',
      postal_code: '54321',
      country: 'España',
      phone: '555-5678'
    },
    order_items: [
      {
        id: 'item_def_001',
        product_id: 3,
        quantity: 3,
        price_at_purchase: 6.75,
        product_name: 'Mix de Especias Mediterráneas',
        product_image_url: 'https://images.unsplash.com/photo-1508160979410-7aa2610ae3c6?q=80&w=200&auto=format&fit=crop'
      },
      {
        id: 'item_def_002',
        product_id: 4, // Assuming product ID 4 exists (Miel de Romero from previous mock data)
        quantity: 1,
        price_at_purchase: 9.25,
        product_name: 'Miel de Romero',
        product_image_url: 'https://images.unsplash.com/photo-1558642178-70f490c499b8?q=80&w=200&auto=format&fit=crop'
      }
    ],
    total_amount: 29.50,
    status: 'Enviado',
    created_at: '2023-10-25T15:00:00Z',
    updated_at: '2023-10-26T09:00:00Z'
  }
];

// interface ProductFormData = Omit<Product, 'id'> & { id?: number };

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'manager' | 'admin';
  created_at?: string;
}

interface User {
  id: string;
  email: string;
  profile?: {
    full_name?: string;
    role?: 'admin' | 'manager' | 'customer';
  };
}

const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'users'>('products');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [roleChangeInProgress, setRoleChangeInProgress] = useState('');

  // State for Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productFormState, setProductFormState] = useState<Omit<Product, 'id'>>(initialProductFormState);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  
  // State for Order Details Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // States for Order Filtering and Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // Empty string for 'all statuses'
  const [filterDate, setFilterDate] = useState(''); // YYYY-MM-DD format
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');
  
  // States for Product Filtering and Sorting
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [productFilterCategory, setProductFilterCategory] = useState(''); // Empty for 'all categories'
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [productSortOrder, setProductSortOrder] = useState<string>('name_asc'); // e.g., 'name_asc', 'price_desc'

  // States for User Filtering and Sorting
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilterRole, setUserFilterRole] = useState(''); // Empty for 'all roles'
  const [userSortOrder, setUserSortOrder] = useState<string>('created_at_recent'); // e.g., 'name_asc', 'created_at_recent'
  
  // Check authentication and role
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/admin' } } });
    } else if (user && user.profile?.role !== 'admin' && user.profile?.role !== 'manager') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch users list
  useEffect(() => {
    if (user?.profile?.role === 'admin' || user?.profile?.role === 'manager') {
      fetchInitialData();
    }
  }, [user]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchUsers(), fetchProducts(), fetchOrders()]);
    } catch (err: any) {
      console.error("Error fetching initial data:", err);
      setError(err.message || 'Error al cargar datos iniciales');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    console.log(`Fetching users with searchTerm: "${userSearchTerm}", role: "${userFilterRole}", sort: "${userSortOrder}"`);
    try {
      // setLoading(true); // Consider specific loading for users if needed
      let query = supabase
        .from('profiles')
        .select('id, name, email, role, created_at');

      // Search term
      if (userSearchTerm) {
        const searchString = `%${userSearchTerm}%`;
        query = query.or(`name.ilike.${searchString},email.ilike.${searchString}`);
      }

      // Role filter
      if (userFilterRole) {
        query = query.eq('role', userFilterRole);
      }

      // Sorting
      const [sortColumn, sortDirection] = userSortOrder.split('_');
      let actualSortColumn = sortColumn;
      if (sortColumn === 'created') actualSortColumn = 'created_at'; // map 'created' to 'created_at'
      
      if (actualSortColumn && sortDirection) {
        query = query.order(actualSortColumn, { ascending: sortDirection === 'asc' || sortDirection === 'oldest' });
      } else {
        // Default sort if userSortOrder is not matching or first time
        query = query.order('created_at', { ascending: false }); // Default to most recent
      }

      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setUsers(data || []);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      // setLoading(false);
    }
  };

  // useEffect para volver a cargar usuarios cuando cambian los filtros o el orden
  useEffect(() => {
    if (user?.profile?.role === 'admin' || user?.profile?.role === 'manager') {
      const debounceTimer = setTimeout(() => {
        fetchUsers();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [userSearchTerm, userFilterRole, userSortOrder, user]);

  const fetchProducts = async () => {
    console.log(`Fetching products with searchTerm: "${productSearchTerm}", category: "${productFilterCategory}", stock: "${productStockFilter}", sort: "${productSortOrder}"`);
    try {
      // setLoading(true); // Consider specific loading for products if needed
      let query = supabase
        .from('products')
        .select('id, name, price, imageurl, description, category, stock');

      // Search term
      if (productSearchTerm) {
        const searchString = `%${productSearchTerm}%`;
        query = query.or(`name.ilike.${searchString},description.ilike.${searchString}`);
      }

      // Category filter
      if (productFilterCategory) {
        query = query.eq('category', productFilterCategory);
      }

      // Stock filter
      if (productStockFilter === 'inStock') {
        query = query.gt('stock', 0);
      } else if (productStockFilter === 'outOfStock') {
        query = query.eq('stock', 0);
      }

      // Sorting
      const [sortColumn, sortDirection] = productSortOrder.split('_');
      if (sortColumn && sortDirection) {
        query = query.order(sortColumn, { ascending: sortDirection === 'asc' });
      } else {
        query = query.order('name', { ascending: true }); // Default sort
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      // Manually map to ensure imageUrl (camelCase) is present for TypeScript
      const mappedData = data ? data.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageurl, // Map from Supabase's imageurl
        description: p.description,
        category: p.category,
        stock: p.stock
      })) : [];
      setProducts(mappedData);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(prevError => prevError ? `${prevError}\nError al cargar pedidos: ${err.message}` : `Error al cargar pedidos: ${err.message}`);
    } finally {
      // setLoading(false);
    }
  };

  // useEffect para volver a cargar productos cuando cambian los filtros o el orden
  useEffect(() => {
    if (user?.profile?.role === 'admin' || user?.profile?.role === 'manager') {
      const debounceTimer = setTimeout(() => {
        fetchProducts();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [productSearchTerm, productFilterCategory, productStockFilter, productSortOrder, user]);

  const fetchOrders = async () => {
    // Usa los estados actuales para filtrar y ordenar
    console.log(`Fetching orders with searchTerm: "${searchTerm}", status: "${filterStatus}", date: "${filterDate}", sort: "${sortOrder}"`);
    try {
      // setLoading(true); // Considera si el loading general es suficiente o necesitas uno específico para orders
      let query = supabase.from('orders').select('*');

      // Aplicar búsqueda por término
      if (searchTerm) {
        const searchString = `%${searchTerm}%`;
        // Busca en id (aunque es UUID, un casteo a text podría funcionar o buscar exacto si el usuario pone el UUID completo)
        // Por ahora, enfocamos en customer_name y email que son más probables para búsqueda parcial.
        // Supabase podría no permitir ilike en columnas UUID directamente. Considerar buscar por ID exacto o parte del ID.
        query = query.or(`customer_name.ilike.${searchString},email.ilike.${searchString},id.ilike.${searchString}`);
      }

      // Aplicar filtro por estado
      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }

      // Aplicar filtro por fecha
      if (filterDate) {
        // Asume filterDate es YYYY-MM-DD. Busca pedidos creados en ese día.
        const startDate = `${filterDate}T00:00:00.000Z`;
        const endDate = `${filterDate}T23:59:59.999Z`;
        query = query.gte('created_at', startDate).lte('created_at', endDate);
      }

      // Aplicar ordenamiento
      const sortOptions = {
        column: 'created_at',
        ascending: sortOrder === 'oldest',
      };
      query = query.order(sortOptions.column, { ascending: sortOptions.ascending });

      const { data, error } = await query;

      if (error) {
        throw error;
      }
      setOrders(data || []);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(prevError => prevError ? `${prevError}\nError al cargar pedidos: ${err.message}` : `Error al cargar pedidos: ${err.message}`);
    } finally {
      // setLoading(false);
    }
  };

  // useEffect para volver a cargar pedidos cuando cambian los filtros o el orden
  useEffect(() => {
    if (user?.profile?.role === 'admin' || user?.profile?.role === 'manager') {
      const debounceTimer = setTimeout(() => {
        fetchOrders();
      }, 500); // Debounce para evitar llamadas excesivas, especialmente con searchTerm
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, filterStatus, filterDate, sortOrder, user]); // Dependencias

  const changeRole = async (userId: string, newRole: 'customer' | 'manager' | 'admin') => {
    if (!user) {
      setMessage({
        type: 'error',
        text: 'Usuario no autenticado.'
      });
      return;
    }

    // Modificación: Permitir que 'admin' o 'manager' asignen el rol de 'admin'.
    if (newRole === 'admin' && user.profile?.role !== 'admin' && user.profile?.role !== 'manager') {
      setMessage({
        type: 'error',
        text: 'No tiene permisos para asignar el rol de administrador. Solo administradores o gerentes pueden hacerlo.'
      });
      return;
    }
    
    try {
      setRoleChangeInProgress(userId);
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      
      setMessage({
        type: 'success',
        text: `Rol actualizado correctamente a ${getRoleLabel(newRole)}`
      });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error("Error changing role:", err);
      setMessage({
        type: 'error',
        text: err.message || 'Error al cambiar el rol'
      });
    } finally {
      setRoleChangeInProgress('');
    }
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'customer': return 'Cliente';
      default: return role;
    }
  };

  const getRoleBadgeClass = (role: string): string => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Render role options
  const renderRoleOptions = (profileToEdit: UserProfile) => {
    const loggedInUserRole = user?.profile?.role;
    const loggedInUserId = user?.id;

    // 1. No se puede cambiar el propio rol si eres admin.
    if (profileToEdit.id === loggedInUserId && loggedInUserRole === 'admin') {
      return (
        <span className="text-xs italic text-gray-500">No se puede cambiar el propio rol de administrador</span>
      );
    }

    // 2. Si el usuario logueado es MANAGER:
    if (loggedInUserRole === 'manager') {
      // Un manager NO PUEDE modificar a un ADMIN.
      /* Eliminar esta sección para permitir que el manager modifique admins:
      if (profileToEdit.role === 'admin') {
        return (
          <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
            {getRoleLabel(profileToEdit.role)} (No modificable por Gerente)
          </span>
        );
      }
      */

      // Un manager puede cambiarse a sí mismo a 'customer'.
      // Un manager puede cambiar a otros 'managers' a 'customer'.
      // Un manager puede cambiar a 'customers' a 'customer' o 'manager'.
      // Un manager puede ascender un 'customer' a 'admin' (según el nuevo requerimiento y la lógica de changeRole).
      // Un manager puede ascenderse a sí mismo a 'admin' (si se permite, o degradarse a customer).

      // Para simplificar, si el target NO es admin, el manager tiene opciones.
      // Las opciones disponibles para el manager:
      const managerOptions = [
        { value: 'customer', label: 'Cliente' },
        { value: 'manager', label: 'Gerente' },
      ];
      // Un manager puede promover a admin (según el ajuste en changeRole)
      if (profileToEdit.id !== loggedInUserId || profileToEdit.role !== 'manager') { // Un manager no se auto-promueve a admin aquí.
         managerOptions.push({ value: 'admin', label: 'Administrador' });
      }
      
      // Si el manager se edita a sí mismo, solo puede degradarse a customer o (si se implementa) promoverse a admin.
      // Por ahora, para manager editándose a sí mismo, solo permitimos degradar a customer.
      if (profileToEdit.id === loggedInUserId) {
        if (profileToEdit.role === 'manager') {
            return (
                 <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
                        {getRoleLabel(profileToEdit.role)}
                    </span>
                    <button
                        className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        onClick={() => changeRole(profileToEdit.id, 'customer')}
                        disabled={roleChangeInProgress === profileToEdit.id}
                    >
                        {roleChangeInProgress === profileToEdit.id ? 'Cambiando...' : 'Hacer Cliente'}
                    </button>
                 </div>
            );
        }
      }


      return (
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
            {getRoleLabel(profileToEdit.role)}
          </span>
          <select
            value={profileToEdit.role}
            onChange={(e) => changeRole(profileToEdit.id, e.target.value as 'customer' | 'manager' | 'admin')}
            disabled={roleChangeInProgress === profileToEdit.id}
            className="text-xs px-2 py-1 rounded border border-olive-200 bg-white focus:outline-none focus:ring-1 focus:ring-olive-500"
          >
            {managerOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {roleChangeInProgress === profileToEdit.id && (
            <span className="text-xs italic text-gray-500">Cambiando...</span>
          )}
        </div>
      );
    }

    // 3. Si el usuario logueado es ADMIN:
    if (loggedInUserRole === 'admin') {
      // Un admin NO PUEDE modificar a OTRO ADMIN (excepto degradarlo, lo cual es una acción delicada).
      // Por ahora, para simplificar, un admin no cambia el rol de otro admin.
      if (profileToEdit.role === 'admin' && profileToEdit.id !== loggedInUserId) {
        return (
          <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
            {getRoleLabel(profileToEdit.role)} (Otro Admin)
          </span>
        );
      }
      // NUEVA RESTRICCIÓN: Un admin NO PUEDE modificar a un MANAGER.
      if (profileToEdit.role === 'manager') {
        return (
          <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
            {getRoleLabel(profileToEdit.role)} (No modificable por Admin)
          </span>
        );
      }
      // Para todos los demás (customers, o él mismo si no fuera el caso de arriba), el admin tiene el selector completo.
    }
    
    // Selector general (principalmente para Admins sobre no-Admins, o si no se cumplen las condiciones de arriba)
    return (
      <div className="flex items-center space-x-2">
        <span className={`text-xs px-2 py-1 rounded-full border ${getRoleBadgeClass(profileToEdit.role)}`}>
          {getRoleLabel(profileToEdit.role)}
        </span>
        <select 
          value={profileToEdit.role}
          onChange={(e) => changeRole(profileToEdit.id, e.target.value as 'customer' | 'manager' | 'admin')}
          disabled={roleChangeInProgress === profileToEdit.id}
          className="text-xs px-2 py-1 rounded border border-olive-200 bg-white focus:outline-none focus:ring-1 focus:ring-olive-500"
        >
          <option value="customer">Cliente</option>
          <option value="manager">Gerente</option>
          <option value="admin">Administrador</option>
        </select>
        {roleChangeInProgress === profileToEdit.id && (
          <span className="text-xs italic text-gray-500">Cambiando...</span>
        )}
      </div>
    );
  };

  // Product Modal Handlers
  const handleOpenAddProductModal = () => {
    setEditingProductId(null);
    setProductFormState(initialProductFormState);
    setIsProductModalOpen(true);
    setMessage(null);
  };
  
  // New function to open modal for editing
  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id);
    // Ensure all fields from the Product type are mapped to the form state
    setProductFormState({
      name: product.name,
      description: product.description || '',
      price: product.price,
      imageUrl: product.imageUrl || '',
      category: product.category,
      stock: product.stock || 0,
    });
    setIsProductModalOpen(true);
    setMessage(null);
  };
  
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductFormState(prevState => ({
      ...prevState,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleProductFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFormLoading(true);

    const productDataToSave = {
      ...productFormState,
      price: Number(productFormState.price) || 0,
      stock: Number(productFormState.stock) || 0,
    };

    try {
      let responseError;
      if (editingProductId) {
        // Update logic
        const updatePayload = {
          name: productFormState.name,
          description: productFormState.description,
          price: Number(productFormState.price) || 0,
          imageurl: productFormState.imageUrl, // Map to imageurl (lowercase) for Supabase
          category: productFormState.category,
          stock: Number(productFormState.stock) || 0,
          // updated_at will be handled by Supabase trigger if set up
        };
        const { error } = await supabase.from('products').update(updatePayload).eq('id', editingProductId);
        responseError = error;
      } else {
        // Add logic: ensure this also sends imageurl (lowercase)
        const insertPayload = {
          name: productFormState.name,
          description: productFormState.description,
          price: Number(productFormState.price) || 0,
          imageurl: productFormState.imageUrl, // Map to imageurl (lowercase) for Supabase
          category: productFormState.category,
          stock: Number(productFormState.stock) || 0,
        };
        const { error } = await supabase.from('products').insert([insertPayload]);
        responseError = error;
      }

      if (responseError) {
        throw responseError;
      }

      setMessage({ type: 'success', text: editingProductId ? 'Producto actualizado con éxito!' : 'Producto añadido con éxito!' });
      fetchProducts(); // Refresh product list
      handleCloseProductModal();
    } catch (err: any) {
      console.error("Error saving product:", err);
      setMessage({ type: 'error', text: err.message || 'Error al guardar el producto.' });
    } finally {
      setFormLoading(false);
    }
  };
  
  // New function to handle product deletion
  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setMessage(null);
    // Consider a specific loading state for delete if it takes time or to disable buttons
    // setFormLoading(true); // Or a new state like setDeletingProductId(productId)

    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: `Producto "${productName}" eliminado con éxito.` });
      fetchProducts(); // Refresh product list
    } catch (err: any) {
      console.error("Error deleting product:", err);
      setMessage({ type: 'error', text: err.message || 'Error al eliminar el producto.' });
    } finally {
      // setFormLoading(false); // Or setDeletingProductId(null)
    }
  };

  const handleOpenOrderModal = async (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);

    if (!order.order_items || order.order_items.length === 0) {
      try {
        console.log(`Fetching items for order ID: ${order.id}`);
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*, products(name, imageurl)')
          .eq('order_id', order.id);

        if (itemsError) {
          throw itemsError;
        }
        
        console.log('Items fetched:', itemsData);

        const fetchedItems: OrderItem[] = itemsData ? itemsData.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: item.price_at_purchase,
          product_name: item.products?.name || 'Nombre no disponible',
          product_image_url: item.products?.imageurl || 'https://via.placeholder.com/150?text=No+Imagen',
        })) : [];

        setSelectedOrder(prevOrder => prevOrder ? { ...prevOrder, order_items: fetchedItems } : null);

      } catch (err: any) {
        console.error("Error fetching order items for modal:", err);
        setMessage({type: 'error', text: `Error al cargar detalles del pedido: ${err.message}`});
      }
    }
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isAuthenticated || (user?.profile?.role !== 'admin' && user?.profile?.role !== 'manager')) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-olive-700 text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              {user.profile?.role === 'admin' ? 'Panel de Administración' : 'Panel de Gestión'}
            </h1>
            <p className="text-olive-100 mt-2">
              {user.profile?.name || user.email} - {getRoleLabel(user.profile?.role || '')}
            </p>
              </div>

          {/* Message display */}
          {message && (
            <div className={`${message.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} p-4 border-l-4`}>
              {message.text}
            </div>
          )}
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button 
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'users' 
                    ? 'border-olive-500 text-olive-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Usuarios
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-olive-500 text-olive-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Productos
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-olive-500 text-olive-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                Pedidos
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6 dark:bg-gray-800">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-olive-800 mb-6">Gestión de Usuarios</h2>

                {/* Filtros y Ordenamiento de Usuarios */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label htmlFor="userSearchTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Buscar Usuario</label>
                      <input 
                        type="text"
                        id="userSearchTerm"
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        placeholder="Nombre, email..."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="userFilterRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
                      <select 
                        id="userFilterRole"
                        value={userFilterRole}
                        onChange={(e) => setUserFilterRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="">Todos los Roles</option>
                        <option value="customer">Cliente</option>
                        <option value="manager">Gerente</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="userSortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar Por</label>
                      <select 
                        id="userSortOrder"
                        value={userSortOrder}
                        onChange={(e) => setUserSortOrder(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="created_at_recent">Más Recientes</option>
                        <option value="created_at_oldest">Más Antiguos</option>
                        <option value="name_asc">Nombre (A-Z)</option>
                        <option value="name_desc">Nombre (Z-A)</option>
                        <option value="email_asc">Email (A-Z)</option>
                        <option value="email_desc">Email (Z-A)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {error && <p className="text-red-600 mb-4">{error}</p>}
                
                {loading ? (
                  <p className="text-gray-600">Cargando usuarios...</p>
                ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-olive-50 dark:bg-gray-700">
                      <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">
                            Nombre
                        </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">
                            Email
                        </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">
                            Rol
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((userItem) => (
                          <tr key={userItem.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-olive-900 dark:text-gray-200">{userItem.name || 'No especificado'}</div>
                              <div className="text-xs text-olive-500 dark:text-gray-400">{userItem.id === user?.id ? '(tú)' : ''}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-olive-700 dark:text-gray-300">{userItem.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              {renderRoleOptions(userItem)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
            </div>
          )}
          
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-olive-800 dark:text-olive-300">Gestión de Productos</h2>
                  <button onClick={handleOpenAddProductModal} className="btn-primary">
                    Añadir Nuevo Producto
                  </button>
                </div>

                {/* Filtros y Ordenamiento de Productos */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                      <label htmlFor="productSearchTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Buscar Producto</label>
                      <input 
                        type="text"
                        id="productSearchTerm"
                        value={productSearchTerm}
                        onChange={(e) => setProductSearchTerm(e.target.value)}
                        placeholder="Nombre, descripción..."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="productFilterCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                      <select 
                        id="productFilterCategory"
                        value={productFilterCategory}
                        onChange={(e) => setProductFilterCategory(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="">Todas las Categorías</option>
                        <option value="aceites">Aceites</option>
                        <option value="conservas">Conservas</option>
                        <option value="especias">Especias</option>
                        <option value="vinagres">Vinagres</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productStockFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                      <select 
                        id="productStockFilter"
                        value={productStockFilter}
                        onChange={(e) => setProductStockFilter(e.target.value as 'all' | 'inStock' | 'outOfStock')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="all">Todos</option>
                        <option value="inStock">En Stock</option>
                        <option value="outOfStock">Sin Stock</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productSortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar Por</label>
                      <select 
                        id="productSortOrder"
                        value={productSortOrder}
                        onChange={(e) => setProductSortOrder(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="name_asc">Nombre (A-Z)</option>
                        <option value="name_desc">Nombre (Z-A)</option>
                        <option value="price_asc">Precio (Menor a Mayor)</option>
                        <option value="price_desc">Precio (Mayor a Menor)</option>
                        <option value="stock_asc">Stock (Menor a Mayor)</option>
                        <option value="stock_desc">Stock (Mayor a Menor)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {error && activeTab === 'products' && <p className="text-red-600 mb-4">{error}</p>}
                
                {loading && activeTab === 'products' ? (
                  <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
                ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-olive-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Imagen</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Precio</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Categoría</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-olive-800 dark:text-gray-200 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img src={product.imageUrl} alt={product.name} className="h-10 w-10 object-contain rounded"/>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-olive-900 dark:text-gray-200">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-olive-700 dark:text-gray-300">${product.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-olive-700 dark:text-gray-300">{product.stock ?? 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleOpenEditModal(product)}
                              className="text-olive-600 hover:text-olive-900 dark:text-olive-400 dark:hover:text-olive-200 mr-3"
                              aria-label={`Editar ${product.name}`}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                              aria-label={`Eliminar ${product.name}`}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}

                {/* Placeholder text for when no products are found if needed */}
                {!loading && products.length === 0 && activeTab === 'products' && (
                   <p className="text-center text-gray-500 dark:text-gray-400 py-4">No hay productos para mostrar. Intenta añadir uno.</p>
                )}
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-olive-800 mb-6">Gestión de Pedidos</h2>
                
                {/* Filtros y Ordenamiento de Pedidos */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                      <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Buscar Pedido</label>
                      <input 
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ID, Cliente, Email..."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                      <select 
                        id="filterStatus"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                      >
                        <option value="">Todos los Estados</option>
                        <option value="Procesando">Procesando</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option> {/* Considerar si tienes este estado */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha (YYYY-MM-DD)</label>
                      <input 
                        type="date" // Cambiado a type="date" para mejor UX
                        id="filterDate"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar Por</label>
                      <select 
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'recent' | 'oldest')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                      >
                        <option value="recent">Más Recientes</option>
                        <option value="oldest">Más Antiguos</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID Pedido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-4">No hay pedidos para mostrar.</td></tr>
                      ) : orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{order.id.substring(0,15)}...</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatDate(order.created_at)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.customer_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${order.total_amount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'Entregado' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 
                                order.status === 'Enviado' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' : 
                                order.status === 'Procesando' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100' : 
                                'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'}`}>
                            {order.status}
                          </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleOpenOrderModal(order)} className="text-olive-600 hover:text-olive-800 dark:text-gold-400 dark:hover:text-gold-300">
                              Ver Detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-8 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <button 
              onClick={handleCloseProductModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              {editingProductId ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            </h3>
            <form onSubmit={handleProductFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                  <input type="text" name="name" id="name" value={productFormState.name} onChange={handleProductFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio (€)</label>
                  <input type="number" name="price" id="price" value={productFormState.price} onChange={handleProductFormChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                <textarea name="description" id="description" value={productFormState.description} onChange={handleProductFormChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de la Imagen</label>
                <input type="url" name="imageUrl" id="imageUrl" value={productFormState.imageUrl} onChange={handleProductFormChange} placeholder="https://ejemplo.com/imagen.jpg" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" />
                {/* File input will be added later here */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                  <select name="category" id="category" value={productFormState.category} onChange={handleProductFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm">
                    <option value="aceites">Aceites</option>
                    <option value="conservas">Conservas</option>
                    <option value="especias">Especias</option>
                    <option value="vinagres">Vinagres</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                  <input type="number" name="stock" id="stock" value={productFormState.stock} onChange={handleProductFormChange} required min="0" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-olive-500 focus:border-olive-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200" />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={handleCloseProductModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 rounded-md border border-gray-300 dark:border-gray-500">
                  Cancelar
                </button>
                <button type="submit" disabled={formLoading} className="btn-primary disabled:opacity-50">
                  {formLoading ? 'Guardando...' : (editingProductId ? 'Actualizar Producto' : 'Añadir Producto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Detalles del Pedido: {selectedOrder.id}
              </h3>
              <button 
                onClick={handleCloseOrderModal} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-olive-700 dark:text-gray-100 mb-2">Información del Cliente</h4>
                <p><strong>Nombre:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Email:</strong> {selectedOrder.email || 'No proporcionado'}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-olive-700 dark:text-gray-100 mb-2">Dirección de Envío</h4>
                <p>{selectedOrder.shipping_address.street}</p>
                <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.postal_code}</p>
                <p>{selectedOrder.shipping_address.country}</p>
                {selectedOrder.shipping_address.phone && <p><strong>Teléfono:</strong> {selectedOrder.shipping_address.phone}</p>}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-olive-700 dark:text-gray-100 mb-2">
                  Items del Pedido 
                  {selectedOrder.order_items && selectedOrder.order_items.length > 0 && `(${selectedOrder.order_items.length})`}
                  {(!selectedOrder.order_items || selectedOrder.order_items.length === 0) && '(Cargando...)'}
                </h4>
                {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedOrder.order_items.map(item => (
                      <li key={item.id} className="py-4 flex">
                        {item.product_image_url && (
                          <img src={item.product_image_url} alt={item.product_name} className="h-20 w-20 rounded object-contain mr-4"/>
                        )}
                        <div className="flex-1">
                          <p className="text-md font-medium text-gray-900 dark:text-gray-100">{item.product_name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {item.quantity}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Precio Unitario: ${item.price_at_purchase.toFixed(2)}</p>
                        </div>
                        <p className="text-md font-semibold text-gray-900 dark:text-gray-100">
                          Total: ${(item.quantity * item.price_at_purchase).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedOrder.order_items ? 'No hay items para este pedido.' : 'Cargando items del pedido...'}
                  </p>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-1">
                <p className="flex justify-between">
                  <span>Subtotal Productos:</span>
                  <span className="font-medium">
                    ${(selectedOrder.total_amount - (selectedOrder.shipping_cost || 0)).toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Gastos de Envío:</span>
                  <span className="font-medium">
                    ${(selectedOrder.shipping_cost || 0).toFixed(2)}
                  </span>
                </p>
                <p className="text-lg font-semibold text-right flex justify-between">
                  <span>Monto Total del Pedido:</span>
                  <span className="text-olive-600 dark:text-gold-400">
                    ${selectedOrder.total_amount.toFixed(2)}
                  </span>
                </p>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-olive-700 dark:text-gray-100 mb-2">Notas Adicionales</h4>
                  <p className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-sm">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-olive-700 dark:text-gray-100 mb-2">Estado del Pedido</h4>
                <p>Actual: <span className={`px-2 py-1 text-sm font-semibold rounded-full 
                    ${selectedOrder.status === 'Entregado' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 
                      selectedOrder.status === 'Enviado' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' : 
                      selectedOrder.status === 'Procesando' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100' : 
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                {/* Here you could add a dropdown to change order status in the future */}
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>Pedido Creado: {formatDate(selectedOrder.created_at)}</p>
                <p>Última Actualización: {formatDate(selectedOrder.updated_at)}</p>
              </div>

            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={handleCloseOrderModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage; 