import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import { // Commenting out direct imports that will be lazy loaded
//   HomePage,
//   ProductsPage,
//   AboutPage,
//   ContactPage,
//   CartPage,
//   CheckoutPage,
//   ConfirmationPage,
//   LoginPage,
//   RegisterPage,
//   CustomerDashboardPage,
//   AdminDashboardPage,
//   TermsPage,
//   PrivacyPage,
//   CookiesPage,
//   ShippingPage,
//   NotFoundPage,
//   ProfilePage,
//   ProductReviewPage,
//   ResetPasswordPage
// } from './pages';
// import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Comentado temporalmente
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ProductReviewPage = lazy(() => import('./pages/ProductReviewPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));

const App: React.FC = () => {
  const location = useLocation();

  // Force scroll to top when changing routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const SuspenseFallback = (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600"></div>
    </div>
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={SuspenseFallback}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/sobre-nosotros" element={<AboutPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="/terminos" element={<TermsPage />} />
                  <Route path="/privacidad" element={<PrivacyPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/envios" element={<ShippingPage />} />
                  <Route path="/productos/:productId/reviews" element={<ProductReviewPage />} />
                  
                  {/* Non-authenticated routes (redirect to home if logged in) */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  
                  {/* Protected routes (customer) */}
                  <Route path="/carrito" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/pedido-confirmado/:orderId" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
                  <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboardPage /></ProtectedRoute>} />
                  
                  {/* Admin only routes */}
                  <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
                  
                  {/* Manager routes */}
                  <Route path="/manager" element={<ManagerRoute><AdminDashboardPage /></ManagerRoute>} />
                  
                  {/* Catch all (404) */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Route protection wrapper for regular authenticated users
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute for path:', location.pathname, 'isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  if (isLoading) {
    console.log('ProtectedRoute rendering spinner for path:', location.pathname);
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated, remembering the intended destination
    console.log('ProtectedRoute redirecting to login for path:', location.pathname);
    return <Navigate to={`/login?redirect=${location.pathname}`} replace state={{ from: location }} />;
  }
  
  console.log('ProtectedRoute rendering children for path:', location.pathname);
  return <>{children}</>;
};

// Admin route with role protection
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Not logged in at all
    return <Navigate to={`/login?redirect=${location.pathname}`} replace state={{ from: location }} />;
  }

  if (!user?.profile?.role || user.profile.role !== 'admin') {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Manager route with role protection
const ManagerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Not logged in at all
    return <Navigate to={`/login?redirect=${location.pathname}`} replace state={{ from: location }} />;
  }

  if (!user?.profile?.role || (user.profile.role !== 'manager' && user.profile.role !== 'admin')) {
    // Logged in but not manager or admin
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default App; 