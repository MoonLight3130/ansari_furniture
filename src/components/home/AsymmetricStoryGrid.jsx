import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const AsymmetricStoryGrid = ({ bestsellers = [], onWatchStory, onQuickView }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Fallback products if not yet loaded from backend
  const displayProducts = bestsellers.length > 0 ? bestsellers : [
    {
      _id: '1',
      name: 'Royal Teak Oval Dining Set',
      slug: 'royal-teak-oval-dining-set',
      price: 68999,
      images: ['/images/showroom/teak_oval_dining.jpg'],
      room: 'Dining Room',
    },
    {
      _id: '2',
      name: 'Contemporary X-Trestle Dining Suite',
      slug: 'contemporary-x-trestle-glass-dining-suite',
      price: 58999,
      images: ['/images/showroom/cross_leg_dining.jpg'],
      room: 'Dining Room',
    },
    {
      _id: '3',
      name: 'Heritage Ring-Arm Teak Bench',
      slug: 'heritage-ring-arm-solid-teak-bench',
      price: 34999,
      images: ['/images/showroom/circular_motif_bench.jpg'],
      room: 'Living Room',
    },
    {
      _id: '4',
      name: 'Nawab Curved Slatted Sofa Ensemble',
      slug: 'nawab-curved-slatted-sofa-ensemble',
      price: 89999,
      images: ['/images/showroom/slatted_sofa_set.jpg'],
      room: 'Living Room',
    },
  ];

  const handleNext = () => {
    setScrollIndex((prev) => (prev + 1) % Math.max(1, displayProducts.length - 2));
  };

  const handlePrev = () => {
    setScrollIndex((prev) => (prev - 1 + Math.max(1, displayProducts.length - 2)) % Math.max(1, displayProducts.length - 2));
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Asymmetric 3-Column Section Matching Reference Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. Left Card: "More Than Furniture" (Dark Forest / Deep Charcoal) - col-span-3 */}
          <div className="lg:col-span-3 bg-[#1C251E] rounded-3xl p-6 sm:p-7 text-[#FAF7F2] flex flex-col justify-between relative overflow-hidden shadow-md">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight leading-snug mb-3">
                More Than<br />Furniture
              </h3>
              <p className="text-xs text-[#A8B8AC] leading-relaxed font-light mb-6">
                It's about the little moments, the big milestones, and everything in between.
              </p>

              {/* Watch Our Story Play Button */}
              <button
                onClick={onWatchStory}
                className="inline-flex items-center gap-3 text-xs font-medium text-[#FAF7F2] hover:text-[#D5C9BD] group transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Macro Craftsmanship Visual with "Design for real life" Script watermark */}
            <div className="relative mt-8 rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
              <img
                src="/images/showroom/craftsmanship_macro.jpg"
                alt="Woodcraft joint"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Handwritten "Design for real life" Calligraphy accent from reference */}
              <span className="absolute bottom-2.5 right-3 font-script text-2xl text-white/90 font-bold select-none drop-shadow-md">
                Design for real life
              </span>
            </div>
          </div>

          {/* 2. Middle Block: Bestsellers Product Slider - col-span-5 */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Header with Slider Arrows */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl font-semibold text-[#1F2520]">
                Bestsellers
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-[#DED6CC] hover:bg-white flex items-center justify-center text-[#1F2520] transition-colors"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-[#DED6CC] hover:bg-white flex items-center justify-center text-[#1F2520] transition-colors"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Cards Row matching the reference image's 3 cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 h-full">
              {displayProducts.slice(0, 3).map((prod) => {
                const isFavorited = isInWishlist(prod._id);
                return (
                  <div
                    key={prod._id}
                    className="bg-white rounded-2xl border border-[#EAE2D9] p-3 flex flex-col justify-between group hover:border-[#C5B8AA] hover:shadow-sm transition-all"
                  >
                    {/* Image & Wishlist */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] mb-3">
                      <Link to={`/product/${prod.slug || prod._id}`}>
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(prod);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#736B63] hover:text-red-500 shadow-xs transition-colors"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div>
                      <Link
                        to={`/product/${prod.slug || prod._id}`}
                        className="font-serif text-xs font-semibold text-[#1F2520] hover:text-[#7B5E43] transition-colors line-clamp-1 block"
                      >
                        {prod.name}
                      </Link>
                      <span className="text-xs font-bold text-[#1F2520] mt-1 block">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="mt-3 w-full py-1.5 rounded-full border border-[#DED6CC] hover:bg-[#1F2520] hover:text-[#FAF7F2] text-[11px] font-medium transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Right Block: "Turn Houses into Homes" (Warm Editorial Callout) - col-span-4 */}
          <div className="lg:col-span-4 bg-[#EFE6DC] rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border border-[#E0D5C9]">
            <div className="mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2520] tracking-tight leading-snug mb-2">
                Turn Houses into Homes.
              </h3>
              <p className="text-xs text-[#5C564F] mb-4">
                Furniture that grows with your story.
              </p>
              <Link
                to="/shop?room=Bedroom"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1F2520] hover:bg-[#1F2520] hover:text-white transition-all text-xs font-medium shadow-xs"
              >
                <span>Shop Bedroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bedroom Image with "Same Rooms New Stories" Script Callout */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm bg-white">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=800&q=80"
                alt="Bedroom collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Handwritten Script Callout matching "Same Rooms New Stories" in reference */}
              <div className="absolute top-3 right-3 text-right">
                <span className="font-script text-2xl text-white font-bold block leading-none drop-shadow-md">
                  Same Rooms
                </span>
                <span className="font-script text-2xl text-white font-bold block leading-none drop-shadow-md">
                  New Stories
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AsymmetricStoryGrid;
