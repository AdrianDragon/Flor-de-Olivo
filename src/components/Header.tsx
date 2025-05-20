import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon, 
  MagnifyingGlassIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicks from bubbling to document
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Force re-render when location changes
  useEffect(() => {
    // Just to ensure component re-renders when route changes
    console.log('Header: location changed', location.pathname);
  }, [location.pathname]);
  
  // Force re-render when auth state changes
  useEffect(() => {
    console.log('Header: auth state changed', { 
      isAuthenticated, 
      user: user?.email,
      role: user?.profile?.role
    });
  }, [isAuthenticated, user]);

  // Close user menu when clicking outside
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isUserMenuOpen]);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      // Cerrar menú desplegable si está abierto
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }

      console.log('Cerrando sesión desde Header...');
      
      // Limpiar sesión localmente primero para mejorar UX
      await logout();
      
      console.log('Sesión cerrada correctamente desde Header');
      
      // Redirigir al usuario a la página principal
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión desde Header:', error);
      // Redirigir de todos modos para mejorar la UX
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Helper function to get user role display
  const getRoleBadge = () => {
    if (!user?.profile?.role) return null;
    
    let badgeClass = '';
    let roleText = '';
    
    switch (user.profile.role) {
      case 'admin':
        badgeClass = 'bg-red-100 text-red-800 border-red-200';
        roleText = 'Admin';
        break;
      case 'manager':
        badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
        roleText = 'Gerente';
        break;
      case 'customer':
      default:
        badgeClass = 'bg-green-100 text-green-800 border-green-200';
        roleText = 'Cliente';
        break;
    }
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${badgeClass}`}>
        {roleText}
      </span>
    );
  };

  return (
    <header className={`shadow-sm ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-cream'}`}>
      <div className="container-custom mx-auto px-4 py-4">
        <div className="flex justify-between items-center md:gap-x-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/olive-icon.svg" alt="Flor de Olivo Logo" className="h-12" />
              <div className="ml-3 flex flex-col justify-center">
                <span className="text-xl font-bold text-olive-800">Flor de Olivo</span>
                <span className="text-xs text-olive-600">Productos mediterráneos</span>
              </div>
            </Link>
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center items-center space-x-8">
            <Link to="/" className="text-olive-800 hover:text-olive-600 font-medium">
              Inicio
            </Link>
            <Link to="/productos" className="text-olive-800 hover:text-olive-600 font-medium">
              Productos
            </Link>
            <Link to="/sobre-nosotros" className="text-olive-800 hover:text-olive-600 font-medium">
              Sobre Nosotros
            </Link>
            <Link to="/contacto" className="text-olive-800 hover:text-olive-600 font-medium">
              Contacto
            </Link>
            {user?.profile?.role === 'admin' && (
              <Link to="/admin" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium">
                Admin
              </Link>
            )}
            {user?.profile?.role === 'manager' && (
              <Link to="/manager" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Gestión
              </Link>
            )}
          </nav>

          {/* Search, Theme Toggle, Login and Cart */}
          <div className="flex items-center gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex mr-4 relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1 px-3 pr-10 border border-olive-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-olive-500"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-olive-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="text-olive-800 hover:text-olive-600 p-1 rounded-full focus:outline-none"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
            
            {/* User Menu for all screens - OPTIMIZED VERSION */}
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse bg-olive-100 h-8 w-32 rounded-full flex items-center justify-center">
                  <span className="text-sm text-olive-600">Cargando...</span>
                </div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3 relative">
                {/* Direct Name Display */}
                <span className="text-sm text-olive-800 font-medium">
                  Hola, {user?.profile?.name || user?.email?.split('@')[0] || 'Usuario'}
                </span>

                {/* User Role Badge (Desktop) - Placed after name, before menu button */}
                <div className="hidden md:block">{getRoleBadge()}</div> 

                {/* User Menu Button (Icon only for toggling dropdown) */}
                <button
                  onClick={toggleUserMenu}
                  className="p-1 rounded-full hover:bg-olive-100 focus:outline-none"
                  aria-label="User menu"
                >
                  <ChevronDownIcon className="h-5 w-5 text-olive-700" /> 
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-800">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 truncate dark:text-gray-200" title={user?.email || 'Email'}>{user?.email}</p>
                      <div className="mt-1.5">{getRoleBadge()}</div>
                    </div>
                    <Link 
                      to="/perfil" 
                      className="block px-4 py-2 text-sm text-olive-700 hover:bg-olive-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </div>
                    </Link>
                    {(user?.profile?.role === 'admin' || user?.profile?.role === 'manager') && (
                      <Link 
                        to={user?.profile?.role === 'admin' ? "/admin" : "/manager"}
                        className="block px-4 py-2 text-sm text-olive-700 hover:bg-olive-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <Cog6ToothIcon className="h-4 w-4 mr-2" />
                          Administración
                        </div>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                    >
                      <div className="flex items-center">
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-olive-800 hover:text-olive-600">
                <UserIcon className="h-6 w-6" />
                <span className="ml-1 hidden md:inline">Login</span>
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/carrito" className="flex items-center text-olive-800 hover:text-olive-600 ml-1 relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-400 text-olive-800 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden ml-2 text-olive-800"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`${isOpen ? 'block' : 'hidden'} md:hidden py-4 border-t border-olive-200 mt-4`}
        >
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-olive-800 hover:text-olive-600" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
            <Link to="/productos" className="text-olive-800 hover:text-olive-600" onClick={() => setIsOpen(false)}>
              Productos
            </Link>
            <Link to="/sobre-nosotros" className="text-olive-800 hover:text-olive-600" onClick={() => setIsOpen(false)}>
              Sobre Nosotros
            </Link>
            <Link to="/contacto" className="text-olive-800 hover:text-olive-600" onClick={() => setIsOpen(false)}>
              Contacto
            </Link>
            
            {/* Admin/Manager Links */}
            {user?.profile?.role === 'admin' && (
              <Link to="/admin" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium" onClick={() => setIsOpen(false)}>
                Administración
              </Link>
            )}
            {user?.profile?.role === 'manager' && (
              <Link to="/manager" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium" onClick={() => setIsOpen(false)}>
                Gestión
              </Link>
            )}
            
            {/* User Menu Mobile - Show user info even if menu is closed */}
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between py-2 px-3 bg-olive-50 rounded-md">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-5 w-5 text-olive-700 mr-2" />
                    <span className="text-sm text-olive-800">{user?.profile?.name || user?.email?.split('@')[0]}</span>
                  </div>
                  {getRoleBadge()}
                </div>
                <Link to="/perfil" className="text-olive-800 hover:text-olive-600 flex items-center" onClick={() => setIsOpen(false)}>
                  <UserIcon className="h-5 w-5 mr-1" />
                  Mi Perfil
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout(e as React.MouseEvent<HTMLButtonElement>);
                    setIsOpen(false);
                  }} 
                  className="text-red-600 hover:text-red-800 flex items-center w-full text-left"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
            <Link to="/login" className="text-olive-800 hover:text-olive-600 flex items-center" onClick={() => setIsOpen(false)}>
              <UserIcon className="h-5 w-5 mr-1" />
              Login / Registrarse
            </Link>
            )}
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-2">
              <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 border border-olive-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
              />
              <button 
                type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 