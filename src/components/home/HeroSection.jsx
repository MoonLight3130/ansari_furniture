import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ onQuickViewProduct }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] border-b border-[#DFD5C6]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-14">

        {/* 2-Column Showroom Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Editorial Headline & Copy (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">

            {/* Eyebrow / Brand Essence */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
              <span className="text-[11px] font-semibold tracking-[0.28em] text-[#70482D] uppercase block">
                HANDCRAFTED WOODEN FURNITURE
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-5">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#241A14] tracking-tight leading-[1.12]">
                Crafted in Wood.<br />
                <span className="italic font-normal font-cormorant text-[#70482D]">Made for Living.</span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#5A4B40] leading-relaxed max-w-lg mb-8 font-light">
              Discover timeless furniture crafted with character, warmth and attention to detail — designed to become part of your home for years to come.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] transition-all text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => scrollToSection('showroom-experience')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#DFD5C6] bg-white/60 hover:bg-white text-[#241A14] transition-all text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#70482D]" />
                <span>VISIT OUR SHOWROOM</span>
              </button>
            </div>

            {/* Heritage Trust Metrics Bar */}
            <div className="pt-6 border-t border-[#DFD5C6] grid grid-cols-4 gap-2 sm:gap-4">
              <div className="pr-2 border-r border-[#DFD5C6]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#241A14]">100%</span>
                <span className="block text-[10px] text-[#70482D] leading-tight mt-0.5">Solid Teak Wood</span>
              </div>
              <div className="pr-2 border-r border-[#DFD5C6]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#241A14]">15+</span>
                <span className="block text-[10px] text-[#70482D] leading-tight mt-0.5">Years of Craft</span>
              </div>
              <div className="pr-2 border-r border-[#DFD5C6]">
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#241A14]">300+</span>
                <span className="block text-[10px] text-[#70482D] leading-tight mt-0.5">Showroom Designs</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#241A14]">4.9 ★</span>
                <span className="block text-[10px] text-[#70482D] leading-tight mt-0.5">Verified Reviews</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showroom Image with Floating Pill & Details (col-span-7) */}
          <div className="lg:col-span-7 relative flex items-center">

            {/* Main Showroom Hero Image Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-[#DFD5C6] bg-[#EAE0D2]">
              <img
                src="/images/showroom/hero_showroom.jpg"
                alt="Ansari Furniture Luxury Wooden Showroom"
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Subtle Warm Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Product Tag Pill Card (The Royal Teak Oval Dining Set) */}
              <Link
                to="/product/royal-teak-oval-dining-set"
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#F8F4EC]/95 backdrop-blur-md border border-[#DFD5C6] shadow-xl hover:shadow-2xl hover:scale-105 transition-all group"
              >
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#DFD5C6]">
                  <img
                    src="/images/showroom/teak_oval_dining.jpg"
                    alt="Royal Teak Oval Dining Set"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] tracking-wider uppercase font-semibold text-[#A66A3A]">
                    SHOWROOM HERO PIECE
                  </span>
                  <span className="block font-serif text-xs sm:text-sm font-bold text-[#241A14] group-hover:text-[#70482D] transition-colors">
                    Royal Teak Oval Dining Set
                  </span>
                  <span className="block text-[11px] font-bold text-[#70482D]">
                    ₹68,999 · 6 Seater Glass Top
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#3A261B] text-[#F8F4EC] flex items-center justify-center group-hover:bg-[#241A14] transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Craftsmanship Badge on Top Right */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#241A14]/80 text-[#F8F4EC] backdrop-blur-xs border border-white/20 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#B18A52]" />
                <span>Handcrafted in Solid Teak</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
