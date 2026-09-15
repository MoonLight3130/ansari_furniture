import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product._id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-[#EAE2D9] grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#736B63] hover:text-[#1F2520] transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Image */}
          <div className="aspect-[4/3] md:aspect-auto h-full bg-white relative">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full bg-white/90 text-[#1F2520] shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Product details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7B5E43]">
                  {product.room} · {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#1F2520]">{product.rating}</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#1F2520] leading-snug">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-serif text-xl font-bold text-[#1F2520]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-[#8C8379] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#5C564F] mt-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-medium text-[#2D2A26] block mb-2">
                    Color: <strong className="text-[#1F2520]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                          selectedColor === c.name ? 'border-[#1F2520] scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#FAF7F2' || c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material indicator */}
              {product.material && (
                <p className="text-[11px] text-[#736B63] mt-3">
                  Material: <span className="font-medium text-[#2D2A26]">{product.material}</span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#EAE2D9]">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full border border-[#DED6CC] hover:bg-white transition-colors ${
                    isFavorited ? 'text-red-500 bg-white' : 'text-[#736B63]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <Link
                to={`/product/${product.slug || product._id}`}
                onClick={onClose}
                className="w-full text-center text-xs font-medium text-[#736B63] hover:text-[#1F2520] flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Product Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
