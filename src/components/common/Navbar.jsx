import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Exact navigation specified in prompt: Home, Shop, Collections, Living Room, Dining, Bedroom, About Us
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Living Room', path: '/shop?room=Living%20Room' },
    { name: 'Dining', path: '/shop?room=Dining%20Room' },
    { name: 'Bedroom', path: '/shop?room=Bedroom' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F0E8]/95 backdrop-blur-md shadow-xs border-b border-[#DFD5C6] py-3.5'
            : 'bg-[#F5F0E8] border-b border-[#DFD5C6]/60 py-4.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo — Premium Indian Showroom Brandmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/brand/logo.png"
              alt="Anzari Furniture Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#241A14] group-hover:text-[#70482D] transition-colors leading-none">
                Anzari
              </span>
              <span className="text-[9px] tracking-[0.38em] font-medium text-[#70482D] uppercase mt-0.5">
                F U R N I T U R E
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isCurrent =
                location.pathname + location.search === link.path ||
                (link.path === '/' && location.pathname === '/');

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-medium uppercase tracking-wider transition-colors relative py-1 ${
                    isCurrent
                      ? 'text-[#3A261B] font-bold'
                      : 'text-[#5A4B40] hover:text-[#241A14]'
                  }`}
                >
                  {link.name}
                  {isCurrent && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A66A3A]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart, WhatsApp / Enquire */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Pill / Icon */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DFD5C6] bg-white/70 hover:bg-white text-xs text-[#70482D] transition-all hover:border-[#A66A3A] cursor-pointer"
              aria-label="Search furniture"
            >
              <Search className="w-3.5 h-3.5 text-[#A66A3A]" />
              <span className="text-[11px] text-[#70482D]/80">Search teak, dining, sofa...</span>
            </button>

            <button
              onClick={onOpenSearch}
              className="lg:hidden p-2 text-[#241A14] hover:text-[#70482D] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    setUserMenuOpen(!userMenuOpen);
                  }
                }}
                className="p-2 text-[#241A14] hover:text-[#70482D] transition-colors relative"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A66A3A]" />
                )}
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-52 bg-[#F8F4EC] rounded-2xl shadow-xl border border-[#DFD5C6] py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-[#DFD5C6]/60">
                      <p className="text-xs font-semibold text-[#241A14] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#70482D] truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-xs text-[#241A14] hover:bg-[#EAE0D2] transition-colors"
                    >
                      My Profile &amp; Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-xs text-[#241A14] hover:bg-[#EAE0D2] transition-colors"
                    >
                      Wishlist ({wishlistCount})
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 text-[#241A14] hover:text-[#70482D] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#70482D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#241A14] hover:text-[#70482D] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-[#241A14] text-[#F8F4EC] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 text-[#241A14]"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#241A14]/60 backdrop-blur-xs z-50 xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[84%] max-w-sm bg-[#F8F4EC] z-50 p-6 flex flex-col justify-between shadow-2xl xl:hidden overflow-y-auto border-l border-[#DFD5C6]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#DFD5C6]">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/brand/logo.png"
                      alt="Anzari Furniture Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif text-xl font-bold text-[#241A14]">Anzari</span>
                      <span className="text-[8px] tracking-[0.35em] font-semibold text-[#70482D] uppercase">
                        F U R N I T U R E
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#70482D] hover:text-[#241A14]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-serif font-medium text-[#241A14] hover:text-[#A66A3A] transition-colors py-1 border-b border-[#DFD5C6]/40"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Contact & WhatsApp CTA */}
              <div className="pt-6 border-t border-[#DFD5C6] space-y-3">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Anzari%20Furniture%2C%20I%20would%20like%20to%20enquire%20about%20your%20showroom%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#3A261B] text-[#F8F4EC] text-xs font-medium flex items-center justify-center gap-2 shadow-md border border-[#B18A52]/40"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Chat with Showroom</span>
                </a>
                <div className="text-center">
                  <p className="text-[11px] text-[#70482D]">Showroom: Bandra West, Mumbai</p>
                  <p className="text-[10px] text-[#70482D]/80">Mon - Sun: 10:30 AM - 8:00 PM</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
