import React from 'react';
import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext'; // addToCart is not used
import { useAuth } from '../context/AuthContext';
// import { Product } from '../types'; // Product is not used if featuredProducts is removed
import WelcomeMessage from '../components/WelcomeMessage';

const HomePage: React.FC = () => {
  // const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Mock featured products (in a real app, these would come from an API)
  /*
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Aceite de Oliva Virgen Extra',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Nuestro aceite premium, elaborado con aceitunas seleccionadas a mano de la región mediterránea.',
      category: 'aceites'
    },
    {
      id: 2,
      name: 'Aceitunas Negras en Conserva',
      price: 8.50,
      image: 'https://cdn0.uncomo.com/es/posts/1/1/0/como_alinar_aceitunas_negras_51011_paso_10_600.jpg',
      description: 'Deliciosas aceitunas negras conservadas tradicionalmente con hierbas mediterráneas como tomillo, romero e hinojo. Aliñadas con ajo y especias según la receta tradicional castellana.',
      category: 'conservas'
    },
    {
      id: 3,
      name: 'Mix de Especias Mediterráneas',
      price: 6.75,
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Una mezcla única de hierbas y especias mediterráneas para realzar cualquier plato.',
      category: 'especias'
    }
  ];
  */
  
  // Mock testimonials
  /*
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      quote: 'El aceite de oliva de Flor de Olivo es simplemente el mejor que he probado. Su sabor auténtico ha cambiado la forma en que cocino.'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'Las conservas son exquisitas, con un sabor que te transporta directamente al Mediterráneo. Ahora son parte de nuestra mesa familiar.'
    },
    {
      id: 3,
      name: 'Laura Fernández',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'La calidad de todos sus productos es excepcional. Se nota el cuidado y la tradición en cada detalle. Totalmente recomendado.'
    }
  ];
  */
  
  return (
    <div className="section bg-cream">
      <div className="container-custom py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {isAuthenticated ? (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 inline-block">
              <WelcomeMessage />
              <div className="mt-4 flex justify-center space-x-4">
                <Link 
                  to="/profile" 
                  className="text-olive-600 hover:text-olive-800 font-medium"
                >
                  Mi Perfil
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-olive-600 hover:text-olive-800 font-medium"
                >
                  Mi Dashboard
                </Link>
              </div>
            </div>
          ) : null}
          
          <h1 className="text-4xl md:text-5xl font-bold text-olive-800 mb-4">
            Flor de Olivo
          </h1>
          <p className="text-xl text-olive-700 mb-8">
            Productos mediterráneos de la más alta calidad
          </p>
          <Link 
            to="/productos" 
            className="btn-primary"
          >
            Ver productos
          </Link>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-olive-800 mb-3">Aceites</h2>
            <p className="text-olive-700 mb-4">
              Nuestro aceite de oliva virgen extra, elaborado con las mejores aceitunas de la región.
            </p>
            <Link to="/productos" className="text-olive-600 hover:text-olive-800">
              Explorar aceites →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-olive-800 mb-3">Conservas</h2>
            <p className="text-olive-700 mb-4">
              Deliciosas conservas artesanales, elaboradas con ingredientes seleccionados.
            </p>
            <Link to="/productos" className="text-olive-600 hover:text-olive-800">
              Ver conservas →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-olive-800 mb-3">Especias</h2>
            <p className="text-olive-700 mb-4">
              Mezclas únicas de hierbas y especias mediterráneas para realzar tus platos.
            </p>
            <Link to="/productos" className="text-olive-600 hover:text-olive-800">
              Descubrir especias →
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-olive-800 mb-4">
                Sobre Flor de Olivo
              </h2>
              <p className="text-olive-700 mb-4">
                Desde 1995, Flor de Olivo se ha dedicado a seleccionar y ofrecer los mejores productos mediterráneos, 
                manteniendo las tradiciones artesanales y la calidad que nos caracteriza.
              </p>
              <p className="text-olive-700 mb-6">
                Nuestros productos son cuidadosamente seleccionados de pequeños productores locales, 
                asegurando la máxima calidad y frescura en cada compra.
              </p>
              <Link 
                to="/sobre-nosotros" 
                className="text-olive-600 hover:text-olive-800 font-medium"
              >
                Conocer más sobre nosotros →
              </Link>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Olivos en el campo" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 