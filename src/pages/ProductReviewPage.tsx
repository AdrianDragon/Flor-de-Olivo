import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Product, Review } from '../types';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

// Sample reviews data (In a real app, this would come from a database)
const mockReviews: Review[] = [
  {
    id: 1,
    userId: '1',
    userName: 'María López',
    rating: 5,
    comment: 'Excelente producto, el aceite de oliva tiene un sabor delicioso y se nota que es de alta calidad.',
    createdAt: '2023-06-15T10:30:00'
  },
  {
    id: 2,
    userId: '3',
    userName: 'Carlos Rodríguez',
    rating: 4,
    comment: 'Muy buena relación calidad-precio. Lo recomiendo totalmente.',
    createdAt: '2023-06-10T14:22:00'
  },
  {
    id: 3,
    userId: '4',
    userName: 'Ana Martínez',
    rating: 5,
    comment: 'Impresionante sabor, lo uso para todas mis ensaladas y le da un toque especial.',
    createdAt: '2023-05-28T09:15:00'
  }
];

// Sample products data (In a real app, this would come from a database)
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Aceite de Oliva Virgen Extra',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1572099605249-9c69169281e8?q=80&w=800&auto=format&fit=crop',
    description: 'Nuestro aceite premium, elaborado con aceitunas seleccionadas a mano de la región mediterránea.',
    category: 'aceites',
    reviews: mockReviews,
    averageRating: 4.7
  },
  // Add more mock products as needed
];

const ProductReviewPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<{ rating: number; comment: string }>({
    rating: 5,
    comment: ''
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load product and reviews data
  useEffect(() => {
    // In a real app, fetch from API
    const foundProduct = mockProducts.find(p => p.id === Number(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(foundProduct.reviews || []);
    }
  }, [productId]);
  
  // Check if user already submitted a review
  const userAlreadyReviewed = user && reviews.some(review => review.userId === user.id);
  
  // Handle star rating click
  const handleRatingClick = (rating: number) => {
    setUserReview({ ...userReview, rating });
  };
  
  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview({ ...userReview, comment: e.target.value });
  };
  
  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setErrorMessage('Debe iniciar sesión para dejar una reseña');
      return;
    }
    
    if (!userReview.comment.trim()) {
      setErrorMessage('Por favor, escriba un comentario para su reseña');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // In a real app, this would be an API call
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview: Review = {
        id: Math.max(...reviews.map(r => r.id), 0) + 1,
        userId: user.id || '',
        userName: user?.profile?.name || user?.email || 'Usuario',
        rating: userReview.rating,
        comment: userReview.comment,
        createdAt: new Date().toISOString()
      };
      
      setReviews([newReview, ...reviews]);
      setUserReview({ rating: 5, comment: '' });
      setSuccessMessage('¡Gracias! Su reseña ha sido publicada con éxito.');
      
      // Update average rating
      if (product) {
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0) + newReview.rating;
        const newAverage = totalRating / (reviews.length + 1);
        setProduct({ ...product, averageRating: Number(newAverage.toFixed(1)) });
      }
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage('Ha ocurrido un error al publicar su reseña. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Render stars
  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      
      if (interactive) {
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleRatingClick(starValue)}
            className="focus:outline-none"
          >
            {starValue <= userReview.rating ? (
              <StarIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <StarOutlineIcon className="h-6 w-6 text-yellow-500" />
            )}
          </button>
        );
      }
      
      return starValue <= rating ? (
        <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
      ) : (
        <StarOutlineIcon key={index} className="h-5 w-5 text-yellow-500" />
      );
    });
  };
  
  if (!product) {
    return (
      <div className="section bg-olive-50">
        <div className="container-custom py-12">
          <div className="text-center">
            <p className="text-xl text-olive-700">Producto no encontrado</p>
            <Link to="/productos" className="inline-block mt-4 text-olive-600 hover:text-olive-800">
              Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="section bg-olive-50">
      <div className="container-custom py-12">
        {/* Product summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row items-center">
          <img 
            src={product.imageUrl}
            alt={product.name} 
            className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold text-olive-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              {renderStars(product.averageRating || 0)}
              <span className="ml-2 text-olive-700">
                {product.averageRating ? product.averageRating.toFixed(1) : 'Sin valoraciones'}
                {reviews.length > 0 && ` (${reviews.length} reseñas)`}
              </span>
            </div>
            <Link to={`/productos`} className="mt-4 inline-block text-olive-600 hover:text-olive-800">
              Volver a Productos
            </Link>
          </div>
        </div>
        
        {/* Success/Error messages */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {errorMessage}
          </div>
        )}
        
        {/* Review form */}
        {user && !userAlreadyReviewed && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-olive-800 mb-4">Escribir una reseña</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-olive-700 mb-2">Valoración</label>
                <div className="flex">
                  {renderStars(userReview.rating, true)}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-olive-700 mb-2">Comentario</label>
                <textarea
                  id="comment"
                  value={userReview.comment}
                  onChange={handleCommentChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                  rows={4}
                  placeholder="Comparta su experiencia con este producto..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-olive-600 text-white py-2 px-6 rounded-md hover:bg-olive-700 transition-colors disabled:bg-olive-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Publicar reseña'}
              </button>
            </form>
          </div>
        )}
        
        {user && userAlreadyReviewed && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-8">
            Ya has publicado una reseña para este producto.
          </div>
        )}
        
        {!user && (
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 mb-8">
            <p>
              Debe <Link to="/login" className="underline">iniciar sesión</Link> para dejar una reseña.
            </p>
          </div>
        )}
        
        {/* Reviews list */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-olive-800 mb-6">
            {reviews.length === 0 ? 'Aún no hay reseñas para este producto' : 'Reseñas de clientes'}
          </h2>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              Sé el primero en compartir tu experiencia con este producto.
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-olive-800">{review.userName}</p>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-gray-500 text-sm">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewPage; 