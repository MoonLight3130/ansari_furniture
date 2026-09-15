import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Aanya Sharma',
    city: 'Bengaluru',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    comment: 'The Habitat Sofa is genuinely a masterpiece. The texture of the bouclé is sublime, and the gentle curve anchors our open-plan penthouse perfectly. Ansari Furniture completely transformed my living space.',
    productName: 'The Habitat Sofa in Warm Ivory',
    rating: 5,
  },
  {
    id: 2,
    name: 'Vikramaditya Roy',
    city: 'Mumbai',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    comment: 'Impeccable carpentry and organic warmth. In an era of mass flat-pack furniture, finding true mortise-and-tenon teak with this level of restraint is a revelation. Our Terra table has hosted unforgettable evenings.',
    productName: 'Terra Dining Table in Solid Walnut',
    rating: 5,
  },
  {
    id: 3,
    name: 'Devika Singhania',
    city: 'New Delhi',
    role: 'Art Consultant',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    comment: 'The Astra Bed Frame feels like sleeping in a boutique Kyoto ryokan. Solid joinery with zero squeaks, accompanied by the kindest white-glove assembly team. Truly worth every rupee.',
    productName: 'Astra Bed Frame in Washed Linen',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[currentIdx];

  return (
    <section className="py-14 lg:py-20 bg-[#F5EFEB] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header with Navigation Arrows */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase mb-1 block">
              VOICES OF OUR CLIENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              Homes. Happier People.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#DED6CC] hover:bg-white flex items-center justify-center text-[#1F2520] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#DED6CC] hover:bg-white flex items-center justify-center text-[#1F2520] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE2D9] shadow-sm relative overflow-hidden">
          <Quote className="w-20 h-20 text-[#FAF7F2] absolute right-8 top-8 -z-0 pointer-events-none stroke-1" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-w-3xl"
            >
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#1F2520] leading-relaxed mb-8 italic">
                "{t.comment}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-13 h-13 rounded-full object-cover border border-[#EAE2D9]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-base text-[#1F2520]">{t.name}</h4>
                    <CheckCircle2 className="w-4 h-4 text-[#4A584C]" />
                    <span className="text-[10px] text-[#4A584C] font-semibold uppercase">Verified Buyer</span>
                  </div>
                  <p className="text-xs text-[#736B63]">
                    {t.role} · {t.city} · Purchased {t.productName}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
