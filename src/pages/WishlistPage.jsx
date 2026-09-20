import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#EAE2D9]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#70482D] uppercase">
                SAVED FOR LATER
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#241A14]">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#70482D] mt-2 font-light">
              Keep track of your favorite handcrafted teak pieces and suites.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-[#DFD5C6] text-[#241A14] shadow-2xs">
              {wishlist.length} {wishlist.length === 1 ? 'Item Saved' : 'Items Saved'}
            </span>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-20 text-center border border-[#DFD5C6] max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#A66A3A] mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#241A14]">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4B40] mt-2 font-light leading-relaxed">
                Explore our curated teak collections, dining suites, and living room furniture to save your dream pieces here.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] transition-all text-xs font-semibold tracking-wider uppercase shadow-md group"
              >
                <span>Discover Furniture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const product = typeof item === 'object' ? item : null;
              if (!product) return null;

              const imageSrc = Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : product.image || '/images/showroom/teak_oval_dining.jpg';

              return (
                <div
                  key={product._id || product.slug}
                  className="bg-white rounded-2xl border border-[#DFD5C6] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative aspect-[4/3] bg-[#F5EFEB] overflow-hidden">
                      <Link to={`/product/${product.slug || product._id}`}>
                        <img
                          src={imageSrc}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Remove Button */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#70482D] hover:text-red-600 flex items-center justify-center transition-colors shadow-xs"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#241A14]/85 text-[#F8F4EC] text-[10px] font-medium backdrop-blur-xs">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A66A3A] block">
                        {product.room || product.category || 'Solid Teak'}
                      </span>

                      <Link
                        to={`/product/${product.slug || product._id}`}
                        className="font-serif text-sm font-bold text-[#241A14] group-hover:text-[#70482D] transition-colors line-clamp-1 block"
                      >
                        {product.name}
                      </Link>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-serif text-base font-bold text-[#241A14]">
                          ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-[#8C8379] line-through">
                            ₹{Number(product.compareAtPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2.5 px-4 rounded-full bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={`https://wa.me/919447123456?text=Hello%20Anzari%20Furniture%2C%20I%20am%20enquiring%20about%20the%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-full border border-[#DFD5C6] text-[#241A14] hover:border-[#25D366] hover:text-[#25D366] text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;
