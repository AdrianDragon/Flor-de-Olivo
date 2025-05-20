import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchProductsFromSupabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('id, name, price, imageurl, description, category, stock');

      if (supabaseError) {
        throw supabaseError;
      }

      const mappedData = data.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageurl,
        category: p.category,
        stock: p.stock
      }));
      setProducts(mappedData || []);

    } catch (err: any) {
      console.error("Error fetching products from Supabase:", err);
      setError(err.message || 'Error al cargar los productos desde la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromSupabase();
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
                  className="w-full h-full object-contain transition-transform hover:scale-105"
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