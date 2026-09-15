import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    name: 'Milano Collection',
    eyebrow: 'SIGNATURE 2026',
    description: 'A perfect blend of modern curved aesthetics and everyday comfort. Sculpted teak, organic contours, and European textured bouclé.',
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
    pieces: '12 Curated Pieces',
    accent: 'bg-[#F3EDE4]',
  },
  {
    name: 'Terra Collection',
    eyebrow: 'EARTH & STONE',
    description: 'Monumental travertine stone, solid smoked walnut, and honest materials celebrating geological textures and serene geometry.',
    heroImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80',
    pieces: '8 Curated Pieces',
    accent: 'bg-[#EFEAE4]',
  },
  {
    name: 'Nordic Living',
    eyebrow: 'MINIMAL WARMTH',
    description: 'Airy silhouettes in American white oak, clean joinery, and functional storage units designed for luminous sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=80',
    pieces: '10 Curated Pieces',
    accent: 'bg-[#FAF7F2]',
  },
  {
    name: 'Modern Essentials',
    eyebrow: 'TIMELESS REST',
    description: 'Upholstered linen beds, fluted wood bedside tables, and handcrafted reading illumination engineered for stillness.',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
    pieces: '14 Curated Pieces',
    accent: 'bg-[#F4EFEB]',
  },
  {
    name: 'Outdoor Living',
    eyebrow: 'AL FRESCO TRANQUILITY',
    description: 'All-weather teak loungers, powder-coated minimalist daybeds, and Sunbrella weaves designed for sun-drenched verandas.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
    pieces: '6 Curated Pieces',
    accent: 'bg-[#EAE2D9]/60',
  },
];

const CollectionsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium tracking-[0.3em] text-[#736B63] uppercase block mb-2">
            DESIGN SERIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1F2520] tracking-tight">
            Curated Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#5C564F] mt-3 leading-relaxed font-light">
            Each collection represents a harmonious architectural dialogue between sustainable hardwoods, natural textiles, and timeless craftsmanship.
          </p>
        </div>

        {/* Editorial Collections List */}
        <div className="space-y-12">
          {collections.map((col, idx) => (
            <div
              key={col.name}
              className={`rounded-3xl border border-[#EAE2D9] overflow-hidden ${col.accent} p-6 sm:p-10 lg:p-12 transition-all hover:shadow-lg`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block">
                    {col.eyebrow} · {col.pieces}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2520]">
                    {col.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed font-light">
                    {col.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/shop?collection=${encodeURIComponent(col.name)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium group shadow-md"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Imagery */}
                <div className={`lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-white ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CollectionsPage;
