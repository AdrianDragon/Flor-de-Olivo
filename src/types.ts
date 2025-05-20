export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'aceites' | 'conservas' | 'especias' | 'vinagres';
  stock?: number;
  reviews?: Review[];
  averageRating?: number;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export interface ShippingAddress {
  street: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  id: string;
  product_id: number | null;
  quantity: number;
  price_at_purchase: number;
  product_name: string;
  product_image_url?: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  email?: string;
  shipping_address: ShippingAddress;
  shipping_cost?: number;
  order_items: OrderItem[];
  total_amount: number;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// export interface Address {  // This interface seems unused and can be removed
//   firstName: string;
//   lastName: string;
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   phoneNumber: string;
// }

export interface UserRole {
  id: string;
  name: 'customer' | 'admin' | 'manager';
  permissions: string[];
} 