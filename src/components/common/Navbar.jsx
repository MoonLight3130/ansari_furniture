import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
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
  const { user, logout, isAdmin } = useAuth();
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Inspiration', path: '/inspiration' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EAE2D9]/80 py-3.5'
            : 'bg-[#FAF7F2] border-b border-[#EAE2D9]/50 py-4.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Brand Logo - Exact layout from reference: Ansari with FURNITURE spaced underneath */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[#1F2520] group-hover:text-[#2A352C] transition-colors leading-none">
              Ansari
            </span>
            <span className="text-[9px] tracking-[0.32em] font-medium text-[#736B63] uppercase mt-0.5">
              F U R N I T U R E
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#1F2520] font-semibold'
                      : 'text-[#5C564F] hover:text-[#1F2520]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1F2520]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Visit Store Button */}
          <div className="flex items-center gap-3 lg:gap-4">
            
            {/* Search Input / Pill Button */}
            <button
              onClick={onOpenSearch}
              className="hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#DED6CC] bg-white/60 hover:bg-white text-xs text-[#736B63] transition-all hover:border-[#B8A695] w-56 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#8C8379]" />
              <span className="truncate">Search furniture, style, or more...</span>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={onOpenSearch}
              className="xl:hidden p-2 text-[#2D2A26] hover:text-[#1F2520] transition-colors"
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
                className="p-2 text-[#2D2A26] hover:text-[#1F2520] transition-colors relative"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#354238]" />
                )}
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#EAE2D9] py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-[#F4EFEB]">
                      <p className="text-xs font-semibold text-[#1F2520] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#736B63] truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-xs text-[#2D2A26] hover:bg-[#FAF7F2] transition-colors"
                    >
                      My Profile & Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-xs text-[#2D2A26] hover:bg-[#FAF7F2] transition-colors"
                    >
                      Wishlist ({wishlistCount})
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-xs font-semibold text-[#2A352C] bg-[#F4EFEB]/50 hover:bg-[#F4EFEB] transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
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
              className="p-2 text-[#2D2A26] hover:text-[#1F2520] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#2A352C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#2D2A26] hover:text-[#1F2520] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-[#1F2520] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>

            {/* "Visit Our Store →" Pill Button (exact match from reference) */}
            <Link
              to="/about#stores"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] text-xs font-medium transition-all shadow-sm hover:shadow"
            >
              <span>Visit Our Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#2D2A26]"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[82%] max-w-sm bg-[#FAF7F2] z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EAE2D9]">
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold text-[#1F2520]">Ansari</span>
                    <span className="text-[8px] tracking-[0.3em] font-medium text-[#736B63] uppercase">
                      F U R N I T U R E
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#5C564F] hover:text-[#1F2520]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Search button */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSearch();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#DED6CC] bg-white text-xs text-[#736B63]"
                  >
                    <Search className="w-4 h-4 text-[#8C8379]" />
                    <span>Search furniture, rooms, styles...</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="mt-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-lg font-serif font-medium text-[#1F2520] hover:text-[#7B5E43] transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#EAE2D9] flex flex-col gap-3">
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between text-sm font-medium text-[#2D2A26]"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Wishlist
                    </span>
                    <span className="bg-[#2A352C] text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  </Link>
                  <Link
                    to={user ? '/account' : '/login'}
                    className="flex items-center gap-2 text-sm font-medium text-[#2D2A26]"
                  >
                    <User className="w-4 h-4" /> {user ? user.name : 'Sign In / Register'}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 text-sm font-semibold text-[#2A352C]"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE2D9]">
                <Link
                  to="/about#stores"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] text-sm font-medium"
                >
                  <span>Visit Our Experience Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
