import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const collectionSlides = [
  {
    index: '01',
    eyebrow: 'FEATURED COLLECTION',
    title: 'The Modern Woodcraft',
    subtitle: 'Natural textures. Refined details. Furniture made to last.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85',
    sideNote: 'Pieces that bring people together.',
    collectionSlug: 'Milano Collection',
  },
  {
    index: '02',
    eyebrow: 'CURATED BEDROOM',
    title: 'Sanctuary & Linen',
    subtitle: 'Calm earth tones and solid American oak designed for deep restorative sleep.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=85',
    sideNote: 'Wake up renewed in natural harmony.',
    collectionSlug: 'Modern Essentials',
  },
  {
    index: '03',
    eyebrow: 'SCULPTURAL LIVING',
    title: 'The Organic Lounge',
    subtitle: 'Curved silhouettes, raw travertine pedestals, and textured bouclé weaves.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85',
    sideNote: 'Spaces designed for stillness and warmth.',
    collectionSlug: 'Nordic Living',
  },
];

const FeaturedCollectionSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const slide = collectionSlides[activeIdx];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Left Panel: Content (lg:col-span-4) */}
          <div className="lg:col-span-4 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-[#F3EDE4] border-r border-[#EAE2D9]">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase mb-3 block">
              {slide.eyebrow}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520] tracking-tight leading-tight mb-4">
              {slide.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed mb-8 max-w-sm font-light">
              {slide.subtitle}
            </p>

            <div>
              <Link
                to={`/shop?collection=${encodeURIComponent(slide.collectionSlug)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide shadow-md group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Center: Large Photography (lg:col-span-6) */}
          <div className="lg:col-span-6 relative bg-white overflow-hidden min-h-[340px] lg:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Right Dark Olive/Forest Panel (lg:col-span-2) - exact match from reference */}
          <div className="lg:col-span-2 bg-[#1C251E] text-[#FAF7F2] p-8 lg:p-8 flex flex-col justify-between">
            {/* Pagination Indices */}
            <div className="space-y-3">
              {collectionSlides.map((s, i) => (
                <button
                  key={s.index}
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 text-xs tracking-wider transition-all block w-full text-left py-1 ${
                    activeIdx === i
                      ? 'text-[#FAF7F2] font-bold pl-1'
                      : 'text-[#8C9B90] hover:text-[#FAF7F2]'
                  }`}
                >
                  <span className={`h-[1px] transition-all ${activeIdx === i ? 'w-5 bg-[#FAF7F2]' : 'w-2 bg-[#8C9B90]'}`} />
                  <span>/ {s.index}</span>
                </button>
              ))}
            </div>

            {/* Editorial quote note */}
            <div className="pt-8 border-t border-[#2A352C]">
              <p className="font-serif italic text-xs text-[#D5C9BD] leading-relaxed">
                "{slide.sideNote}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedCollectionSection;
