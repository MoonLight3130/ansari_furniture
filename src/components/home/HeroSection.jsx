import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    title: 'Where Comfort Meets Timeless Design',
    subtitle: 'Thoughtfully crafted furniture for modern homes. Blending natural materials, elegant design and lasting quality — because every space tells a story.',
    eyebrow: 'FURNITURE FOR A BETTER TOMORROW',
    scriptText: 'Good Spaces\nBetter Lives',
    productTag: {
      name: 'The Habitat Sofa',
      price: '₹ 49,999',
      slug: 'the-habitat-sofa',
    },
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85',
    verticalQuote: 'A HOME THAT FEELS LIKE YOU',
  },
  {
    id: 2,
    title: 'Warm Natural Living for Modern Sanctuaries',
    subtitle: 'Sculpted organic ash, sustainable Indian teak, and textured weaves crafted to elevate your daily living rituals.',
    eyebrow: 'SUSTAINABLY SOURCED HARDWOODS',
    scriptText: 'Crafted with\nIntention',
    productTag: {
      name: 'Luma Lounge Chair',
      price: '₹ 24,999',
      slug: 'luma-lounge-chair',
    },
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85',
    verticalQuote: 'DESIGNED TO ENDURE GENERATIONS',
  },
  {
    id: 3,
    title: 'Intimate Dining Crafted for Living Memories',
    subtitle: 'Solid walnut dining tables and paper-cord chairs engineered for warmth, community, and unforgettable dinners.',
    eyebrow: 'ARTISANAL DINING ENSEMBLES',
    scriptText: 'Every Meal\nA Celebration',
    productTag: {
      name: 'Terra Dining Table',
      price: '₹ 39,999',
      slug: 'terra-dining-table',
    },
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85',
    verticalQuote: 'SPACES THAT BRING PEOPLE TOGETHER',
  },
];

const HeroSection = ({ onQuickViewProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

        {/* Main 2-Column Hero Grid matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Editorial Headline & Copy (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">

            {/* Eyebrow */}
            <motion.span
              key={`eyebrow-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-medium tracking-[0.22em] text-[#736B63] uppercase mb-3 block"
            >
              {slide.eyebrow}
            </motion.span>

            {/* Main Heading with Calligraphy Accent */}
            <div className="relative mb-5">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#1F2520] tracking-tight leading-[1.12]"
              >
                {slide.title}
              </motion.h1>

              {/* Handwritten Script Calligraphy Accent matching "Good Spaces Better Lives" */}
              <motion.div
                key={`script-${currentSlide}`}
                initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -7, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="hidden xl:block absolute -right-6 -top-4 font-script text-3xl font-bold text-[#8C6D58] leading-tight select-none pointer-events-none drop-shadow-xs"
              >
                <div className="border-l-2 border-[#8C6D58]/40 pl-2">
                  {slide.scriptText}
                </div>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base text-[#5C564F] leading-relaxed max-w-lg mb-8 font-light"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide shadow-md hover:shadow-lg group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#DED6CC] hover:bg-white text-[#2D2A26] transition-all text-xs font-medium"
              >
                <span>Our Craft Story</span>
              </Link>
            </div>

            {/* Hero Trust Metrics Row matching reference */}
            <div className="pt-6 border-t border-[#EAE2D9] grid grid-cols-4 gap-2 sm:gap-4">
              <div className="pr-2 border-r border-[#EAE2D9]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#1F2520]">10K+</span>
                <span className="block text-[10px] text-[#736B63] leading-tight">Happy Customers</span>
              </div>
              <div className="pr-2 border-r border-[#EAE2D9]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#1F2520]">500+</span>
                <span className="block text-[10px] text-[#736B63] leading-tight">Unique Designs</span>
              </div>
              <div className="pr-2 border-r border-[#EAE2D9]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#1F2520]">15+</span>
                <span className="block text-[10px] text-[#736B63] leading-tight">Years of Craft</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#1F2520]">4.9 ★</span>
                <span className="block text-[10px] text-[#736B63] leading-tight">Customer Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual, Floating Tag, Carousel controls, Vertical quote (col-span-7) */}
          <div className="lg:col-span-7 relative flex items-center">

            {/* Image Frame with rounded corners */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border border-[#EAE2D9] bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Floating Product Tag Pill Card (The Habitat Sofa / ₹49,999 ->) matching reference image! */}
              <Link
                to={`/product/${slide.productTag.slug}`}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
              >
                <div className="text-left">
                  <span className="block font-serif text-xs sm:text-sm font-semibold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors">
                    {slide.productTag.name}
                  </span>
                  <span className="block text-[11px] font-medium text-[#736B63]">
                    {slide.productTag.price}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#1F2520] text-white flex items-center justify-center group-hover:bg-[#2A352C] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Carousel Pagination & Arrows (01 / 03 < >) in bottom right corner */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-md">
                <span className="text-xs font-serif font-bold text-[#1F2520]">
                  0{slide.id} <span className="text-[#8C8379] font-normal">/ 03</span>
                </span>
                <div className="flex items-center gap-1 border-l border-[#DED6CC] pl-2">
                  <button
                    onClick={prevSlide}
                    className="p-1 rounded-full hover:bg-black/5 text-[#1F2520] transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-1 rounded-full hover:bg-black/5 text-[#1F2520] transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Vertical Editorial Quote on far right edge (matching reference image) */}
            <div className="hidden 2xl:flex items-center justify-center absolute -right-12 inset-y-0 select-none pointer-events-none">
              <span className="rotate-90 text-[10px] tracking-[0.35em] font-medium text-[#A89D91] uppercase whitespace-nowrap">
                {slide.verticalQuote}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
