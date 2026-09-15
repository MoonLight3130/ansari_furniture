import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const EditorialStorySection = () => {
  const craftPoints = [
    { title: 'Premium Sustainable Teak', desc: 'FSC-certified hardwoods seasoned to withstand tropical humidity.' },
    { title: 'Master Joinery', desc: 'Time-honored mortise & tenon carpentry with zero visible screws.' },
    { title: 'Organic Matte Finishes', desc: 'Non-toxic, food-safe hand-rubbed oils that enrich natural timber grain.' },
    { title: 'Made for Generations', desc: 'Constructed to develop a rich, soulful patina as years pass.' },
  ];

  return (
    <section className="py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Dual Image Collage */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D9] aspect-[4/3] bg-white">
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80"
                alt="Dining spaces that bring people together"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#EAE2D9] aspect-square bg-white">
                <img
                  src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80"
                  alt="Fine craftsmanship joint"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-[#F3EDE4] rounded-2xl border border-[#EAE2D9] text-center">
                <span className="font-serif text-2xl font-bold text-[#1F2520] block">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-[#736B63] font-semibold">
                  Solid Hardwood
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
              Because the best moments happen around the table. At Ansari Furniture, every angle, bevel, and tactile surface is engineered for intimacy, serenity, and shared memories.
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
