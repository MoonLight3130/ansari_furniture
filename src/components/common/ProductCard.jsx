import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, MessageCircle } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import WhatsAppEnquiryModal from './WhatsAppEnquiryModal';

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isFavorited = isInWishlist(product._id);
  const mainImage = product.images?.[0] || '/images/showroom/teak_oval_dining.jpg';
  const secondaryImage = product.secondaryImage || product.images?.[1] || mainImage;

  // Format short material description as requested in prompt (e.g. "Solid Teak Wood · 6 Seater")
  const materialSubtitle =
    product.shortDescription ||
    (product.material ? `${product.material}` : 'Solid Wood Craftsmanship');

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-xl border border-[#DFD5C6] overflow-hidden transition-all duration-300 hover:border-[#A66A3A] hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges: Handcrafted, Solid Wood, Made to Order */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.badge && (
            <span className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-sm bg-[#3A261B]/90 text-[#F8F4EC] backdrop-blur-xs shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#70482D] hover:text-red-500 hover:bg-white shadow-xs transition-all border border-[#DFD5C6]"
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-red-600 text-red-600' : 'text-[#70482D]'
            }`}
          />
        </button>

        {/* Image Container */}
        <Link
          to={`/product/${product.slug || product._id}`}
          className="relative w-full aspect-[4/3] bg-[#F5F0E8] overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img
            src={isHovered ? secondaryImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick Action Overlay Buttons */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onQuickView) onQuickView(product);
              }}
              className="flex-1 py-2 px-3 rounded-md bg-[#F8F4EC]/95 backdrop-blur-xs text-[#241A14] text-xs font-medium hover:bg-white shadow-md flex items-center justify-center gap-1.5 transition-all border border-[#DFD5C6]"
            >
              <Eye className="w-3.5 h-3.5 text-[#70482D]" />
              <span>View Piece</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWhatsAppOpen(true);
              }}
              className="w-9 h-9 rounded-md bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center shadow-md transition-all shrink-0"
              title="Enquire on WhatsApp"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="w-9 h-9 rounded-md bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] flex items-center justify-center shadow-md transition-all shrink-0"
              title="Add to bag"
              aria-label="Add to bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </Link>

        {/* Product Information */}
        <div className="p-4 flex flex-col justify-between flex-1 bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A66A3A]">
                {product.collectionName || product.room || 'Solid Wood'}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1 text-xs text-[#70482D]">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-[#241A14]">{product.rating}</span>
                  {product.reviewCount > 0 && (
                    <span className="text-[10px] text-[#8C8379]">({product.reviewCount})</span>
                  )}
                </div>
              )}
            </div>

            {/* Product Name */}
            <Link
              to={`/product/${product.slug || product._id}`}
              className="font-serif text-base font-semibold text-[#241A14] hover:text-[#70482D] transition-colors line-clamp-1 block"
            >
              {product.name}
            </Link>

            {/* Short Material Description */}
            <p className="text-xs text-[#70482D] mt-1 line-clamp-1 font-light">
              {materialSubtitle}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#DFD5C6]/60">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
              <span className="font-serif text-sm sm:text-base font-bold text-[#241A14]">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-[#A89D91] line-through">
                  ₹{product.compareAtPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWhatsAppOpen(true);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white transition-all text-[11px] font-semibold cursor-pointer shrink-0 shadow-2xs"
              title="Enquire on WhatsApp"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>

      <WhatsAppEnquiryModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
