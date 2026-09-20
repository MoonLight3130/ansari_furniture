import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import SearchModal from './components/common/SearchModal';
import WhatsAppFloatingButton from './components/common/WhatsAppFloatingButton';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CollectionsPage from './pages/CollectionsPage';
import RoomsPage from './pages/RoomsPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
            <Route path="/product/:slug" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
            <Route path="/collections" element={<PageTransition><CollectionsPage /></PageTransition>} />
            <Route path="/rooms" element={<PageTransition><RoomsPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/inspiration" element={<PageTransition><CollectionsPage /></PageTransition>} />
            {/* Fallback route */}
            <Route path="*" element={
              <PageTransition>
                <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-center p-6">
                  <div className="space-y-4 max-w-md">
                    <h1 className="font-serif text-5xl font-bold text-[#1F2520]">404</h1>
                    <p className="text-xs text-[#736B63]">The page you're looking for doesn't exist or has been moved.</p>
                    <a href="/" className="inline-block px-6 py-2.5 rounded-full bg-[#1F2520] text-white text-xs font-medium">Return Home</a>
                  </div>
                </div>
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
