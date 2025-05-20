import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Mock products data instead of fetching from API
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
        description: 'Deliciosas aceitunas negras conservadas tradicionalmente con hierbas mediterráneas como tomillo, romero e hinojo.',
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
        name: 'Vinagre Balsámico Añejo',
        price: 9.25,
        imageUrl: 'https://images.unsplash.com/photo-1621037505003-e5623f7573ff?q=80&w=800&auto=format&fit=crop',
        description: 'Vinagre balsámico de Módena envejecido durante 5 años, perfecto para ensaladas y marinados.',
        category: 'vinagres'
      },
      {
        id: 5,
        name: 'Tomates Secos Mediterráneos',
        price: 7.50,
        imageUrl: 'https://images.unsplash.com/photo-1588870777305-8aa5006d0088?q=80&w=800&auto=format&fit=crop',
        description: 'Tomates secados al sol y conservados en nuestro aceite de oliva con hierbas aromáticas.',
        category: 'conservas'
      },
      {
        id: 6,
        name: 'Sal Marina con Hierbas',
        price: 5.95,
        imageUrl: 'https://images.unsplash.com/photo-1600962810133-b59303a69d89?q=80&w=800&auto=format&fit=crop',
        description: 'Sal marina gruesa con una mezcla de hierbas mediterráneas, ideal para carnes y pescados.',
        category: 'especias'
      },
      {
        id: 7,
        name: 'Mermelada de Higos',
        price: 6.25,
        imageUrl: 'https://images.unsplash.com/photo-1560908475-8ab61307825d?q=80&w=800&auto=format&fit=crop',
        description: 'Mermelada artesanal de higos cultivados localmente, perfecta para quesos y tostadas.',
        category: 'conservas'
      },
      {
        id: 8,
        name: 'Aceite de Trufa Blanca',
        price: 18.50,
        imageUrl: 'https://images.unsplash.com/photo-1615079990129-750a8d84e822?q=80&w=800&auto=format&fit=crop',
        description: 'Aceite de oliva infusionado con trufa blanca, un toque de lujo para cualquier plato.',
        category: 'aceites'
      },
      {
        id: 9,
        name: 'Pimentón Ahumado',
        price: 4.95,
        imageUrl: 'https://images.unsplash.com/photo-1598024037271-7f7097370c68?q=80&w=800&auto=format&fit=crop',
        description: 'Pimentón ahumado intenso, ingrediente esencial en la cocina mediterránea tradicional.',
        category: 'especias'
      }
    ];

    // Simulate network delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const categories = ['all', 'aceites', 'conservas', 'especias', 'vinagres'];

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
    });

  if (loading) {
    return (
      <div className="section bg-cream">
        <div className="container-custom py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-800 mx-auto"></div>
          <p className="mt-4 text-olive-700">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section bg-cream">
        <div className="container-custom py-16 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-cream">
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-olive-800 text-center mb-8">
          Nuestros Productos
        </h1>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-olive-800 text-white'
                    : 'bg-white text-olive-800 hover:bg-olive-100'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
              className="px-3 py-2 rounded-md border border-olive-200 bg-white text-olive-800"
            >
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-md bg-white text-olive-800 hover:bg-olive-100"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-olive-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-olive-700 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gold-500 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn-primary"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-olive-700 text-lg">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage; 