import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, ArrowRight, Check, Sparkles, RefreshCw, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/common/ProductCard';
import WhatsAppEnquiryModal from '../components/common/WhatsAppEnquiryModal';
import api from '../services/api';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data);
        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0].name);
        }
        setSelectedImage(0);

        // Fetch related & reviews
        if (res.data._id) {
          const [relRes, revRes] = await Promise.all([
            api.get(`/products/${res.data._id}/related`),
            api.get(`/reviews/product/${res.data._id}`),
          ]);
          setRelatedProducts(relRes.data || []);
          setReviews(revRes.data || []);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedColor);
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      addToast('Please enter your review comments.', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await api.post('/reviews', {
        productId: product._id,
        rating: reviewRating,
        comment: reviewComment,
        userName: reviewName || 'Customer',
      });
      setReviews((prev) => [res.data, ...prev]);
      setReviewComment('');
      addToast('Thank you for sharing your experience!');
    } catch (err) {
      addToast('Failed to submit review.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#1F2520] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#736B63] font-serif">Loading craftsmanship details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1F2520]">Product Not Found</h2>
          <p className="text-xs text-[#736B63]">The piece you are looking for may have been archived.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2.5 rounded-full bg-[#1F2520] text-white text-xs font-medium"
          >
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);
  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-[#8C8379] mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#1F2520] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#1F2520] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?room=${encodeURIComponent(product.room)}`} className="hover:text-[#1F2520] transition-colors">{product.room}</Link>
          <span>/</span>
          <span className="text-[#1F2520] font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#EAE2D9]">
          
          {/* Left Column: Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EAE2D9] shadow-sm">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#1F2520] shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      selectedImage === idx ? 'border-[#1F2520] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#7B5E43]">
                  {product.collectionName || 'Ansari Essentials'}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#1F2520]">{product.rating}</span>
                  <span className="text-[#8C8379]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2520] leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-sm text-[#8C8379] line-through">
                      ₹{product.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                      Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-[#8C8379] mt-1 font-light">
                Price inclusive of all taxes. Complimentary White Glove Assembly across India.
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C564F] mt-5 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#EAE2D9]">
                  <span className="text-xs font-medium text-[#2D2A26] block mb-2.5">
                    Finish / Fabric: <strong className="text-[#1F2520]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          selectedColor === c.name ? 'border-[#1F2520] scale-110 shadow-xs' : 'border-[#DED6CC]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-4 h-4 ${c.hex === '#FAF7F2' || c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#DED6CC] rounded-full bg-white px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-sm text-[#736B63] hover:text-[#1F2520]"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#1F2520]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 text-sm text-[#736B63] hover:text-[#1F2520]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity, selectedColor)}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-full border border-[#DED6CC] hover:bg-white transition-colors ${
                      isFavorited ? 'text-red-500 bg-white' : 'text-[#736B63]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </button>
                <p className="text-[11px] text-[#70482D] text-center pt-1 font-light">
                  ✨ Instant showroom quote, custom dimensions &amp; wood finish options
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-[#EAE2D9] grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-xs text-[#5C564F]">
                  <Truck className="w-4 h-4 text-[#2A352C]" />
                  <span>Free White Glove Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#5C564F]">
                  <ShieldCheck className="w-4 h-4 text-[#2A352C]" />
                  <span>10-Year Timber Warranty</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Specifications & Craft Details */}
        <div className="py-12 border-b border-[#EAE2D9] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE2D9]">
            <h4 className="font-serif text-base font-semibold text-[#1F2520] mb-3">Materials &amp; Finish</h4>
            <p className="text-xs text-[#5C564F] leading-relaxed">
              {product.material || 'Solid kiln-dried hardwood, organic matte oil finish, high-tensile fabric weave.'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#EAE2D9]">
            <h4 className="font-serif text-base font-semibold text-[#1F2520] mb-3">Dimensions</h4>
            <p className="text-xs text-[#5C564F] leading-relaxed">
              {product.dimensions
                ? `${product.dimensions.width} W × ${product.dimensions.depth} D × ${product.dimensions.height} H ${product.dimensions.unit}`
                : 'Standard architectural sizing. Custom dimensions available on commission.'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#EAE2D9]">
            <h4 className="font-serif text-base font-semibold text-[#1F2520] mb-3">Care Instructions</h4>
            <p className="text-xs text-[#5C564F] leading-relaxed">
              {product.careInstructions || 'Wipe with soft lint-free cloth. Nourish wood with natural beeswax twice yearly.'}
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="py-12 border-b border-[#EAE2D9]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#1F2520]">
                Customer Experiences ({reviews.length})
              </h3>
              <p className="text-xs text-[#736B63] mt-0.5">
                Verified owners sharing thoughts on comfort, finish, and living with this piece.
              </p>
            </div>
          </div>

          {/* Reviews List & Write Review Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Reviews List (col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-xs text-[#736B63] italic">Be the first to review this piece.</p>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-[#EAE2D9] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1F2520]">{r.userName}</span>
                        {r.verifiedBuyer && (
                          <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    {r.title && <h5 className="text-xs font-semibold text-[#1F2520]">{r.title}</h5>}
                    <p className="text-xs text-[#5C564F] leading-relaxed">{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write Review Form (col-span-5) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EAE2D9]">
              <h4 className="font-serif text-lg font-semibold text-[#1F2520] mb-3">Leave a Review</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Meera S."
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DED6CC] focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>

                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the texture, comfort, and how it looks in your home..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DED6CC] focus:outline-none focus:border-[#1F2520]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 rounded-full bg-[#1F2520] text-white hover:bg-[#2A352C] transition-colors text-xs font-medium"
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12">
            <h3 className="font-serif text-2xl font-semibold text-[#1F2520] mb-6">
              Complementary Pieces
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Sticky Mobile WhatsApp Action Bar for Mobile Resolution */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 px-4 py-3 bg-[#F5F0E8]/95 backdrop-blur-md border-t border-[#DFD5C6] z-30 flex items-center gap-3 shadow-2xl">
          <div className="flex flex-col min-w-0 pr-1">
            <span className="text-[9px] uppercase tracking-wider text-[#70482D] font-bold">Showroom</span>
            <span className="font-serif text-base font-bold text-[#241A14]">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={() => addToCart(product, quantity, selectedColor)}
            className="p-3 rounded-full border border-[#3A261B] text-[#3A261B] bg-white active:bg-[#EAE0D2] shadow-xs shrink-0"
            title="Add to Enquiry List"
            aria-label="Add to Enquiry List"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="flex-1 py-3 px-3 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>

      </div>

      {/* WhatsApp Enquiry Modal */}
      <WhatsAppEnquiryModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetailPage;
