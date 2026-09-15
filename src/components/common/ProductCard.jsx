import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product._id);
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';
  const secondaryImage = product.secondaryImage || product.images?.[1] || mainImage;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EAE2D9]/80 overflow-hidden hover:border-[#C5B8AA] transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge (if any) */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1F2520] border border-[#EAE2D9] shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Wishlist Heart Button - exactly matching the round outline in reference */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#5C564F] hover:text-red-500 hover:bg-white shadow-sm transition-all border border-[#EAE2D9]"
        aria-label="Save to wishlist"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'fill-red-500 text-red-500' : 'text-[#736B63]'
          }`}
        />
      </button>

      {/* Image Container with crossfade and zoom */}
      <Link
        to={`/product/${product.slug || product._id}`}
        className="relative w-full aspect-[4/3] bg-[#FAF7F2] overflow-hidden flex items-center justify-center"
      >
        <img
          src={isHovered ? secondaryImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick action buttons appearing on hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
            }}
            className="flex-1 py-2 px-3 rounded-full bg-white/95 backdrop-blur-sm text-[#1F2520] text-xs font-medium hover:bg-white shadow-md flex items-center justify-center gap-1.5 transition-all border border-[#EAE2D9]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-9 h-9 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] flex items-center justify-center shadow-md transition-all shrink-0"
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
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#8C8379]">
              {product.room || product.category}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-xs text-[#5C564F]">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-[#1F2520]">{product.rating}</span>
                {product.reviewCount > 0 && (
                  <span className="text-[10px] text-[#8C8379]">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          <Link
            to={`/product/${product.slug || product._id}`}
            className="font-serif text-base font-semibold text-[#1F2520] hover:text-[#7B5E43] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((c, idx) => (
                <span
                  key={idx}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-3 pt-2 border-t border-[#F4EFEB]">
          <span className="font-serif text-base font-bold text-[#1F2520]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-[#A89D91] line-through">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
