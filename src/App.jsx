import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import SearchModal from './components/common/SearchModal';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';

// Lazy-loaded routes for optimal initial bundle size and rapid Time-To-Interactive
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const RoomsPage = lazy(() => import('./pages/RoomsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AdminSubscribersPage = lazy(() => import('./pages/AdminSubscribersPage'));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // Instant scroll on navigation avoids layout jank
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <CartDrawer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <WhatsAppFloatingButton />

      <main className="min-h-screen">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
                <Route path="/product/:slug" element={<PageTransition><ProductDetailPage /></PageTransition>} />
                <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
                <Route path="/collections" element={<PageTransition><CollectionsPage /></PageTransition>} />
                <Route path="/rooms" element={<PageTransition><RoomsPage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/inspiration" element={<PageTransition><CollectionsPage /></PageTransition>} />
                <Route path="/admin/subscribers" element={<PageTransition><AdminSubscribersPage /></PageTransition>} />
                {/* Fallback route */}
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-center p-6">
                        <div className="space-y-4 max-w-md">
                          <h1 className="font-serif text-5xl font-bold text-[#1F2520]">404</h1>
                          <p className="text-xs text-[#736B63]">
                            The page you're looking for doesn't exist or has been moved.
                          </p>
                          <a
                            href="/"
                            className="inline-block px-6 py-2.5 rounded-full bg-[#1F2520] text-white text-xs font-medium"
                          >
                            Return Home
                          </a>
                        </div>
                      </div>
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <Analytics />
    </Router>
  );
};

export default App;
