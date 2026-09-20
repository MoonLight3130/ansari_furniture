import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, Compass, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import api from '../../services/api';

// Curated collections catalog with rich editorial photography & signature pieces from Anzari Showrooms
const collectionsData = [
  {
    id: 'all',
    name: 'All Collections',
    eyebrow: 'COMPLETE SHOWROOM ARCHIVE',
    tagline: 'Handcrafted solid teakwood masterpieces engineered for generational homes',
    description: 'Explore Anzari Furniture’s complete repertoire of solid teak dining sets, curved slatted living ensembles, traditional ring-arm benches, and bedroom suites across our Kollam and Thiruvananthapuram showrooms.',
    materialPalette: ['Seasoned Burma Teak', 'Beveled Tempered Glass', 'Natural Neem Oil Treatment', 'Mortise & Tenon', 'Hand-Rubbed Beeswax'],
    bannerImage: '/images/showroom/teak_oval_dining.jpg',
    piecesCount: '50+ Showroom Pieces',
    accentColor: '#1F2520',
    slug: 'All',
  },
  {
    id: 'teak',
    name: 'Teak Collection',
    eyebrow: 'SIGNATURE SHOWROOM',
    tagline: 'Dense seasoned Burma & Nilambur teak with crystal beveled glass',
    description: 'Our crown jewel dining suites and living tables. Handcrafted pedestals, acanthus relief carving, and durable moisture-resistant joinery designed to last lifetimes.',
    materialPalette: ['Grade-A Teak', '12mm Toughened Glass', 'Cognac Leatherette', 'Brass Glides'],
    bannerImage: '/images/showroom/teak_oval_dining.jpg',
    piecesCount: '18 Pieces',
    accentColor: '#A66A3A',
    slug: 'Teak Collection',
  },
  {
    id: 'traditional',
    name: 'Traditional Collection',
    eyebrow: 'HERITAGE KERALA CRAFT',
    tagline: 'Authentic circular ring-motif carvings, turned legs & slatted backs',
    description: 'Time-honored heirloom designs with distinctive turned baluster armrests, contoured lumbar posture curves, and lustrous honey teak gloss.',
    materialPalette: ['100% Solid Indian Teak', 'Circular Ring Detailing', 'Linen-Blend Cushions'],
    bannerImage: '/images/showroom/circular_motif_bench.jpg',
    piecesCount: '12 Pieces',
    accentColor: '#70482D',
    slug: 'Traditional Collection',
  },
  {
    id: 'modern',
    name: 'Modern Collection',
    eyebrow: 'CONTEMPORARY LIVING',
    tagline: 'Architectural X-trestle joinery with polished tempered glass',
    description: 'Bold crisscross timber trestles, seamless tempered glass surfaces, and ergonomic vertical-slatted chairs crafted for bright modern Kerala residences.',
    materialPalette: ['Kiln-Dried Solid Teak', 'Clear Polish Glass', 'Ergonomic Slats'],
    bannerImage: '/images/showroom/cross_leg_dining.jpg',
    piecesCount: '14 Pieces',
    accentColor: '#3A261B',
    slug: 'Modern Collection',
  },
  {
    id: 'living',
    name: 'Living Room Suites',
    eyebrow: 'REGAL HOSPITALITY',
    tagline: 'Steam-bent curved teakwood frames with rich maroon chenille',
    description: 'Full 3+1+1 curved living room suites and matching oval glass-top coffee tables. Designed for dignified family gatherings and comfortable hospitality.',
    materialPalette: ['Steam-Bent Teak', 'Royal Wine Chenille', 'High-Density 40D Foam'],
    bannerImage: '/images/showroom/slatted_sofa_set.jpg',
    piecesCount: '15 Pieces',
    accentColor: '#631B2A',
    slug: 'Living Room Suites',
  },
  {
    id: 'solid-wood',
    name: 'Solid Wood',
    eyebrow: 'HEIRLOOM TIMBER',
    tagline: '100% Solid Hardwood timber with zero MDF or particle board',
    description: 'Massive seasoned teak wardrobes, sturdy zero-creak king bed frames, and artisanal storage built to withstand Kerala humidity for generations.',
    materialPalette: ['Seasoned Teakwood', 'Solid Sheesham', 'Mortise Carpentry'],
    bannerImage: '/images/showroom/hero_showroom.jpg',
    piecesCount: '20 Pieces',
    accentColor: '#241A14',
    slug: 'Solid Wood',
  },
];

// Rich fallback products catalog mapped directly to each Anzari collection
const defaultProducts = [
  {
    _id: 'col-p1',
    name: 'Royal Teak Oval Dining Set',
    slug: 'royal-teak-oval-dining-set',
    price: 68999,
    compareAtPrice: 84999,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Teak Collection',
    badge: 'Showroom Hero',
    rating: 5.0,
    reviewCount: 46,
    images: [
      '/images/showroom/teak_oval_dining.jpg',
      '/images/showroom/hero_showroom.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
    ],
    colors: [
      { name: 'Warm Honey Teak', hex: '#A66A3A' },
      { name: 'Deep Walnut Gloss', hex: '#3A261B' },
      { name: 'Natural Matte Teak', hex: '#8B5A2B' },
    ],
  },
  {
    _id: 'col-p2',
    name: 'Contemporary X-Trestle Glass Dining Suite',
    slug: 'contemporary-x-trestle-glass-dining-suite',
    price: 58999,
    compareAtPrice: 72000,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Modern Collection',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 38,
    images: [
      '/images/showroom/cross_leg_dining.jpg',
      '/images/showroom/hero_showroom.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
    ],
    colors: [
      { name: 'Golden Teak Finish', hex: '#C48A49' },
      { name: 'Smoked Walnut', hex: '#3A261B' },
    ],
  },
  {
    _id: 'col-p3',
    name: 'Heritage Ring-Arm Solid Teak Bench',
    slug: 'heritage-ring-arm-solid-teak-bench',
    price: 34999,
    compareAtPrice: 42000,
    category: 'Chairs',
    room: 'Living Room',
    collectionName: 'Traditional Collection',
    badge: 'Handcrafted',
    rating: 4.9,
    reviewCount: 29,
    images: [
      '/images/showroom/circular_motif_bench.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
      '/images/showroom/hero_showroom.jpg',
    ],
    colors: [
      { name: 'Gloss Honey Teak', hex: '#D68936' },
      { name: 'Antique Rosewood', hex: '#5A2A18' },
    ],
  },
  {
    _id: 'col-p4',
    name: 'Nawab Curved Slatted Sofa Ensemble',
    slug: 'nawab-curved-slatted-sofa-ensemble',
    price: 89999,
    compareAtPrice: 105000,
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Living Room Suites',
    badge: 'Showroom Masterpiece',
    rating: 5.0,
    reviewCount: 31,
    images: [
      '/images/showroom/slatted_sofa_set.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
      '/images/showroom/hero_showroom.jpg',
    ],
    colors: [
      { name: 'Royal Wine Maroon', hex: '#631B2A' },
      { name: 'Warm Amber Gold', hex: '#C2843A' },
      { name: 'Classic Cream', hex: '#F0E7D8' },
    ],
  },
  {
    _id: 'col-p5',
    name: 'Shahi Hand-Carved Ring-Armchair',
    slug: 'shahi-hand-carved-ring-armchair',
    price: 16999,
    compareAtPrice: 21000,
    category: 'Chairs',
    room: 'Living Room',
    collectionName: 'Traditional Collection',
    badge: 'Artisan Carved',
    rating: 4.8,
    reviewCount: 19,
    images: [
      '/images/showroom/circular_motif_bench.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
    ],
    colors: [
      { name: 'Gloss Honey Teak', hex: '#D68936' },
      { name: 'Walnut Brown', hex: '#4A3525' },
    ],
  },
  {
    _id: 'col-p6',
    name: 'Grand Teak Oval Glass Coffee Table',
    slug: 'grand-teak-oval-glass-coffee-table',
    price: 24999,
    compareAtPrice: 29999,
    category: 'Tables',
    room: 'Living Room',
    collectionName: 'Teak Collection',
    badge: 'Solid Teak',
    rating: 4.9,
    reviewCount: 22,
    images: [
      '/images/showroom/slatted_sofa_set.jpg',
      '/images/showroom/teak_oval_dining.jpg',
    ],
    colors: [
      { name: 'Warm Honey Teak', hex: '#A66A3A' },
      { name: 'Smoked Walnut', hex: '#3A261B' },
    ],
  },
  {
    _id: 'col-p7',
    name: 'Royal Teak King Bedstead',
    slug: 'royal-teak-king-bedstead',
    price: 64999,
    compareAtPrice: 78000,
    category: 'Beds',
    room: 'Bedroom',
    collectionName: 'Solid Wood',
    badge: 'Zero Creak',
    rating: 5.0,
    reviewCount: 27,
    images: [
      '/images/rooms/bedroom.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
    ],
    colors: [
      { name: 'Natural Teak Grain', hex: '#A66A3A' },
      { name: 'Deep Espresso', hex: '#2C221D' },
    ],
  },
  {
    _id: 'col-p8',
    name: 'Imperial Solid Teak 4-Door Wardrobe',
    slug: 'imperial-solid-teak-4-door-wardrobe',
    price: 78999,
    compareAtPrice: 95000,
    category: 'Storage',
    room: 'Bedroom',
    collectionName: 'Solid Wood',
    badge: 'Lifetime Timber',
    rating: 4.9,
    reviewCount: 18,
    images: [
      '/images/showroom/hero_showroom.jpg',
      '/images/showroom/craftsmanship_macro.jpg',
    ],
    colors: [
      { name: 'Hand-Polished Teak', hex: '#8B5A2B' },
      { name: 'Rich Mahogany', hex: '#4B221B' },
    ],
  },
];

const CollectionsGallerySection = ({ onQuickView }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const [liveProducts, setLiveProducts] = useState(defaultProducts);

  // Attempt to fetch fresh products from backend API, gracefully falling back to default catalog
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await api.get('/products?limit=30');
        if (res.data?.products && res.data.products.length > 0) {
          setLiveProducts(res.data.products);
        }
      } catch (err) {
        // Fallback silently to curated catalog
      }
    };
    fetchCatalog();
  }, []);

  const activeCollection = useMemo(() => {
    return collectionsData.find((c) => c.id === selectedCollectionId) || collectionsData[0];
  }, [selectedCollectionId]);

  const displayedProducts = useMemo(() => {
    if (selectedCollectionId === 'all') {
      // Pick 1-2 hero pieces from each collection for a balanced cross-suite gallery
      return liveProducts.slice(0, 8);
    }
    const filtered = liveProducts.filter((p) => p.collectionName === activeCollection.name);
    return filtered.length > 0 ? filtered : defaultProducts.filter((p) => p.collectionName === activeCollection.name);
  }, [selectedCollectionId, liveProducts, activeCollection]);

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#EAE2D9] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-6 h-[1px] bg-[#7B5E43]" />
              <span className="text-[11px] font-medium tracking-[0.28em] text-[#7B5E43] uppercase">
                GALLERY OF COLLECTIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1F2520] tracking-tight leading-tight">
              Design Suites &amp; Living Spaces
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564F] mt-3 leading-relaxed font-light max-w-xl">
              Each collection represents an intentional dialogue between sustainable hardwoods, natural mineral textures, and architectural silhouettes designed to elevate every moment at home.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DED6CC] hover:border-[#1F2520] bg-white text-xs font-semibold text-[#1F2520] hover:bg-[#1F2520] hover:text-[#FAF7F2] transition-all duration-300 shadow-xs group"
            >
              <Layers className="w-3.5 h-3.5 text-[#7B5E43] group-hover:text-[#FAF7F2] transition-colors" />
              <span>All Design Collections</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Interactive Collection Filter Tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-2.5 min-w-max">
            {collectionsData.map((col) => {
              const isActive = col.id === selectedCollectionId;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedCollectionId(col.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#1F2520] text-[#FAF7F2] shadow-md'
                      : 'bg-white text-[#5C564F] border border-[#EAE2D9] hover:border-[#C5B8AA] hover:text-[#1F2520]'
                  }`}
                >
                  <span>{col.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                      isActive
                        ? 'bg-white/20 text-[#FAF7F2]'
                        : 'bg-[#F3EDE4] text-[#736B63]'
                    }`}
                  >
                    {col.id === 'all' ? 'All' : col.piecesCount.replace(' Pieces', '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Collection Spotlight Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="mb-12 rounded-3xl overflow-hidden border border-[#EAE2D9] bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
              
              {/* Left Editorial Narrative Panel */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#F5EFEB] to-[#FAF7F2]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#7B5E43]" />
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-[#736B63] uppercase">
                      {activeCollection.eyebrow} · {activeCollection.piecesCount}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2520] tracking-tight leading-snug mb-3">
                    {activeCollection.name}
                  </h3>

                  <p className="font-serif italic text-sm text-[#7B5E43] mb-3 leading-relaxed">
                    "{activeCollection.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed font-light mb-6">
                    {activeCollection.description}
                  </p>

                  {/* Material Palette Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE2D9]/70">
                    <span className="text-[10px] font-semibold tracking-wider text-[#8C8379] uppercase mr-1">
                      Materiality:
                    </span>
                    {activeCollection.materialPalette.map((material, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/80 border border-[#EAE2D9] text-[11px] text-[#4A453F]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C8379]" />
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE2D9]/70 flex flex-wrap items-center gap-4">
                  <Link
                    to={
                      activeCollection.id === 'all'
                        ? '/shop'
                        : `/shop?collection=${encodeURIComponent(activeCollection.slug)}`
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide shadow-sm group"
                  >
                    <span>
                      {activeCollection.id === 'all'
                        ? 'Shop All Furniture'
                        : `Explore ${activeCollection.name}`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/about#stores"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C564F] hover:text-[#1F2520] transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#70482D]" />
                    <span>Visit Kollam &amp; Thiruvananthapuram Showrooms</span>
                  </Link>
                </div>
              </div>

              {/* Right Visual Atelier Showcase */}
              <div className="lg:col-span-6 relative bg-[#FAF7F2] overflow-hidden group min-h-[260px] lg:min-h-full">
                <img
                  src={activeCollection.bannerImage}
                  alt={activeCollection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                  <span className="text-[10px] uppercase tracking-widest text-white/80 block">Curated Living</span>
                  <span className="font-serif text-lg font-semibold">{activeCollection.name}</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Products Showcase Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7B5E43]" />
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F2520]">
                {selectedCollectionId === 'all'
                  ? 'Signature Products Across Collections'
                  : `Featured Products in ${activeCollection.name}`}
              </h4>
            </div>

            <span className="text-xs text-[#736B63] font-medium hidden sm:inline-block">
              Showing {displayedProducts.length} curated pieces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product._id || product.slug}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>

        {/* Bottom Quick Jump Suite Cards */}
        <div className="mt-16 pt-12 border-t border-[#EAE2D9]">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase">
              EXPLORE OTHER SIGNATURE SUITES
            </span>
            <Link
              to="/collections"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#7B5E43] hover:text-[#1F2520] transition-colors"
            >
              <span>See Full Suite Lookbook</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {collectionsData
              .filter((c) => c.id !== 'all')
              .map((c) => {
                const isCurrent = c.id === selectedCollectionId;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCollectionId(c.id);
                      window.scrollTo({
                        top: document.getElementById('collections-gallery')?.offsetTop || 0,
                        behavior: 'smooth',
                      });
                    }}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                      isCurrent
                        ? 'border-[#1F2520] bg-white shadow-md'
                        : 'border-[#EAE2D9] bg-white/60 hover:bg-white hover:border-[#C5B8AA]'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#FAF7F2]">
                      <img
                        src={c.bannerImage}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold tracking-wider text-[#7B5E43] uppercase block mb-1">
                        {c.piecesCount}
                      </span>
                      <h5 className="font-serif text-xs sm:text-sm font-bold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors line-clamp-1">
                        {c.name}
                      </h5>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

      </div>
    </section>
  );
};

// Also export as default and as TestimonialsSection for backwards compatibility
export { CollectionsGallerySection };
export default CollectionsGallerySection;
