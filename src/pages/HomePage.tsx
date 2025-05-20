import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  
  // Mock featured products (in a real app, these would come from an API)
  const featuredProducts: Product[] = [
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
    }
  ];
  
  // Mock testimonials
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
  
  return (
    <div className="section bg-cream">
      <div className="container-custom py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
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
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 