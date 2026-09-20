import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const EditorialStorySection = () => {
  const craftPoints = [
    { title: 'Seasoned Burma & Nilambur Teak', desc: '100% solid timber seasoned to withstand Kerala’s tropical humidity.' },
    { title: 'Master Joinery & Mortise Tenons', desc: 'Time-honored Indian joinery and hand carving with zero visible screws.' },
    { title: 'Natural Hand-Rubbed Finishes', desc: 'Non-toxic, food-grade oils & beeswax that enrich deep golden timber grain.' },
    { title: 'Heirloom Furniture for Generations', desc: 'Constructed to develop a rich, soulful patina as decades pass.' },
  ];

  return (
    <section className="py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Dual Image Collage featuring Anzari's authentic showroom furniture */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D9] aspect-[4/3] bg-white group">
              <img
                src="/images/showroom/teak_oval_dining.jpg"
                alt="Anzari Royal Teak Oval Dining Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#EAE2D9] aspect-square bg-white group">
                <img
                  src="/images/showroom/craftsmanship_macro.jpg"
                  alt="Anzari Hand-carved solid teak craftsmanship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-[#F3EDE4] rounded-2xl border border-[#EAE2D9] text-center">
                <span className="font-serif text-2xl font-bold text-[#1F2520] block">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#736B63] font-semibold">
                  Solid Teakwood
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Craftsmanship points */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase mb-3 block">
              MADE WITH PURPOSE
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520] tracking-tight leading-tight mb-4">
              Spaces That Bring People Together
            </h2>

            <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed mb-6 font-light">
              Because life’s most cherished conversations happen around the table. At Anzari Furniture, every angle, beveled crystal glass edge, and hand-rubbed teak surface is engineered for timeless intimacy, warmth, and enduring family memories.
            </p>

            <div className="space-y-4 mb-8">
              {craftPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAE2D9] flex items-center justify-center text-[#2A352C] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1F2520]">{pt.title}</h4>
                    <p className="text-[11px] text-[#736B63]">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/shop?room=Dining%20Room"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide shadow-md group"
            >
              <span>Explore Dining Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EditorialStorySection;
