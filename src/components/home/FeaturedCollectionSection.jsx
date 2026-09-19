import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const collectionsList = [
  {
    id: 'dining',
    name: 'Dining Room',
    title: 'Grand Dining Suites',
    eyebrow: 'CENTREPIECE GATHERINGS',
    subtitle: 'From hand-carved oval pedestal tables to contemporary X-trestles with beveled crystal glass tops, engineered for soulful family banquets.',
    heroImage: '/images/showroom/teak_oval_dining.jpg',
    secondaryImage: '/images/showroom/cross_leg_dining.jpg',
    pieces: '18 Showroom Ensembles',
    highlight: '6 & 8-Seater Glass Top Sets',
    link: '/shop?room=Dining%20Room',
  },
  {
    id: 'living',
    name: 'Living Room',
    title: 'Curved Slatted Living',
    eyebrow: 'REGAL COMFORT',
    subtitle: 'Curved steam-bent teakwood sofas, ornate ring-motif armchairs, and matching glass-top coffee tables tailored for distinguished reception rooms.',
    heroImage: '/images/showroom/slatted_sofa_set.jpg',
    secondaryImage: '/images/showroom/circular_motif_bench.jpg',
    pieces: '24 Handcrafted Suites',
    highlight: 'Solid Teak 3+1+1 Sets',
    link: '/shop?room=Living%20Room',
  },
  {
    id: 'traditional',
    name: 'Traditional Collection',
    title: 'Heritage Ring-Arm Crafts',
    eyebrow: 'TIME-HONOURED CLASSICS',
    subtitle: 'Traditional Indian diwans, circular carved ring benches, and brass-fitted timber armoires celebrating the artistic glory of Rajasthan joinery.',
    heroImage: '/images/showroom/circular_motif_bench.jpg',
    secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
    pieces: '14 Heritage Pieces',
    highlight: 'Circular Ring Motifs',
    link: '/shop?collection=Traditional%20Collection',
  },
  {
    id: 'modern',
    name: 'Modern Collection',
    title: 'Contemporary X-Trestles',
    eyebrow: 'GEOMETRIC TIMBER',
    subtitle: 'Crisp interlocking X-trestles, tempered safety glass, and ergonomic vertical-slatted high-back seating for light-filled architectural residences.',
    heroImage: '/images/showroom/cross_leg_dining.jpg',
    secondaryImage: '/images/showroom/hero_showroom.jpg',
    pieces: '16 Contemporary Designs',
    highlight: 'Architectural Joinery',
    link: '/shop?collection=Modern%20Collection',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    title: 'Solid Wood Bedsteads',
    eyebrow: 'PEACEFUL HAVENS',
    subtitle: 'Solid teak and sheesham king-size beds, fluted posts, lockable wardrobes, and bedside tables crafted to last a lifetime.',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
    secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
    pieces: '12 Solid Wood Suites',
    highlight: 'Zero-Creak Joinery',
    link: '/shop?room=Bedroom',
  },
  {
    id: 'teak',
    name: 'Teak Collection',
    title: 'Seasoned Burma Teak',
    eyebrow: 'GRADE-A HARDWOOD',
    subtitle: 'Dense, natural oil-rich teak that naturally resists moisture, termites, and climatic expansion, developing a rich honey patina.',
    heroImage: '/images/showroom/hero_showroom.jpg',
    secondaryImage: '/images/showroom/teak_oval_dining.jpg',
    pieces: '30+ Certified Designs',
    highlight: 'Kiln-Dried CP Teak',
    link: '/shop?material=Teak',
  },
  {
    id: 'solid-wood',
    name: 'Solid Wood',
    title: '100% Solid Timber',
    eyebrow: 'ZERO COMPROMISE',
    subtitle: 'No MDF. No particle board. Pure solid timber construction seasoned for Indian tropical humidity with master mortise-and-tenon carpentry.',
    heroImage: '/images/showroom/craftsmanship_macro.jpg',
    secondaryImage: '/images/showroom/circular_motif_bench.jpg',
    pieces: 'Full Archive',
    highlight: 'Heirloom Timber Guarantee',
    link: '/shop?material=Solid%20Teak',
  },
];

const FeaturedCollectionSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeCol = collectionsList[activeTab];

  return (
    <section className="py-16 lg:py-24 bg-[#F5F0E8] border-b border-[#DFD5C6]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#DFD5C6]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.28em] text-[#70482D] uppercase block mb-1.5">
              CURATED SHOWROOM EDITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#241A14]">
              Explore Our Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5A4B40] max-w-md font-light leading-relaxed">
            Every collection brings together generations of master woodcraft, natural teak grain, and timeless Indian showroom luxury.
          </p>
        </div>

        {/* Collection Selector Tabs (All 7 requested categories) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {collectionsList.map((col, idx) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#3A261B] text-[#F8F4EC] shadow-md border border-[#3A261B]'
                  : 'bg-white/80 text-[#5A4B40] border border-[#DFD5C6] hover:bg-white hover:text-[#241A14]'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Asymmetrical Magazine / Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Block: Primary Large Editorial Imagery (col-span-7) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl border border-[#DFD5C6] min-h-[420px] lg:min-h-[500px] bg-[#EAE0D2]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCol.heroImage}
                src={activeCol.heroImage}
                alt={activeCol.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Corner Badge */}
            <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-[#241A14]/85 text-[#F8F4EC] backdrop-blur-xs text-[11px] font-semibold tracking-wider uppercase border border-white/20">
              {activeCol.highlight}
            </div>

            {/* Subtle Gradient & Tagline overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#241A14]/90 via-[#241A14]/40 to-transparent text-white">
              <span className="text-[10px] tracking-[0.25em] text-[#DFD5C6] uppercase font-semibold block mb-1">
                {activeCol.eyebrow}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {activeCol.title}
              </h3>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Detail Split (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">

            {/* Story Card */}
            <div className="bg-[#EAE0D2] rounded-2xl p-6 sm:p-8 border border-[#DFD5C6] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-widest text-[#70482D] uppercase">
                    SHOWROOM ARCHIVE
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/70 border border-[#DFD5C6] text-[#241A14]">
                    {activeCol.pieces}
                  </span>
                </div>

                <h4 className="font-serif text-2xl font-bold text-[#241A14] mb-3">
                  {activeCol.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed font-light mb-6">
                  {activeCol.subtitle}
                </p>
              </div>

              <div>
                <Link
                  to={activeCol.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] transition-all text-xs font-semibold tracking-wider uppercase shadow-md group"
                >
                  <span>VIEW FULL {activeCol.name.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Asymmetrical Secondary Thumbnail Card */}
            <div className="grid grid-cols-12 gap-4 items-center bg-white rounded-2xl p-4 border border-[#DFD5C6] shadow-xs">
              <div className="col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F0E8] border border-[#DFD5C6]">
                <img
                  src={activeCol.secondaryImage}
                  alt={activeCol.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-7">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A66A3A] block">
                  Material Excellence
                </span>
                <h5 className="font-serif text-sm font-bold text-[#241A14] mt-0.5">
                  100% Solid Hardwood Timber
                </h5>
                <p className="text-[11px] text-[#70482D] mt-1 font-light leading-snug">
                  Hand-rubbed natural oils and traditional mortise joinery without visible screws.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCollectionSection;
