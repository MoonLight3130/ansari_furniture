import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, Compass, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import api from '../../services/api';

// Curated collections catalog with rich editorial photography & signature pieces
const collectionsData = [
  {
    id: 'all',
    name: 'All Collections',
    eyebrow: 'COMPLETE ARCHIVE',
    tagline: 'Timeless architectural suites designed for mindful sanctuaries',
    description: 'Explore our complete repertoire of handcrafted suites—where solid sustainable hardwoods, Roman stone, and tactile Belgian textiles come together.',
    materialPalette: ['Kiln-Dried Teak', 'Italian Travertine', 'American Oak', 'Washed Linen', 'Bouclé'],
    bannerImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    piecesCount: '50+ Curated Pieces',
    accentColor: '#1F2520',
    slug: 'All',
  },
  {
    id: 'milano',
    name: 'Milano Collection',
    eyebrow: 'SIGNATURE 2026',
    tagline: 'Organic contours, fluid silhouettes & European textured bouclé',
    description: 'A benchmark of modern curved comfort. Sculpted teak frames and tactile textured weaves engineered to anchor open-concept living spaces.',
    materialPalette: ['Sustainable Teak', 'Textured Bouclé', 'Matte Brass', 'Danish Cord'],
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    piecesCount: '12 Pieces',
    accentColor: '#354336',
    slug: 'Milano Collection',
  },
  {
    id: 'terra',
    name: 'Terra Collection',
    eyebrow: 'EARTH & STONE',
    tagline: 'Monumental Roman travertine stone & solid smoked walnut',
    description: 'Celebrating honest geological textures and monolithic geometry. Heavy travertine pedestals and hand-rubbed timber crafted for grounded serenity.',
    materialPalette: ['Roman Travertine', 'Smoked Walnut', 'Terracotta Ceramic'],
    bannerImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=80',
    piecesCount: '8 Pieces',
    accentColor: '#5C4033',
    slug: 'Terra Collection',
  },
  {
    id: 'nordic',
    name: 'Nordic Living',
    eyebrow: 'MINIMAL WARMTH',
    tagline: 'Airy silhouettes in American white oak with Japanese joinery',
    description: 'Light-filled sanctuaries with clean lines and balanced ergonomics. Hand-finished timbers designed for quiet reflection and effortless warmth.',
    materialPalette: ['American White Oak', 'Textured Olive Linen', 'Paper Cord'],
    bannerImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80',
    piecesCount: '10 Pieces',
    accentColor: '#3E4B3E',
    slug: 'Nordic Living',
  },
  {
    id: 'modern',
    name: 'Modern Essentials',
    eyebrow: 'TIMELESS REST',
    tagline: 'Upholstered linen beds & tambour fluted wood joinery',
    description: 'An oasis of restorative sleep and purposeful focus. Tailored Belgian linen headboards, fluted nightstands, and integrated architectural cable management.',
    materialPalette: ['Belgian Washed Linen', 'Fluted Ash Wood', 'Milled Brass'],
    bannerImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    piecesCount: '14 Pieces',
    accentColor: '#2C221D',
    slug: 'Modern Essentials',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Living',
    eyebrow: 'AL FRESCO TRANQUILITY',
    tagline: 'All-weather teak loungers & architectural open-air comfort',
    description: 'Engineered for seamless indoor-outdoor living. Weather-resistant FSC teak, rust-proof powder-coated aluminum, and fast-drying Sunbrella weaves.',
    materialPalette: ['Grade-A Weatherproof Teak', 'Sunbrella Weave', 'Synthetic Rattan'],
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
    piecesCount: '6 Pieces',
    accentColor: '#4A584C',
    slug: 'Outdoor Living',
  },
];

// Rich fallback products catalog mapped directly to each collection
const defaultProducts = [
  {
    _id: 'col-p1',
    name: 'The Habitat Sofa',
    slug: 'the-habitat-sofa',
    price: 49999,
    compareAtPrice: 59999,
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Milano Collection',
    badge: 'Hero Pick',
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80',
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F2' },
      { name: 'Oatmeal Beige', hex: '#E2D7CB' },
      { name: 'Olive Green', hex: '#4A584C' },
    ],
  },
  {
    _id: 'col-p2',
    name: 'Nova Fabric Sofa',
    slug: 'nova-fabric-sofa',
    price: 64999,
    compareAtPrice: 74999,
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Milano Collection',
    badge: 'Editorial Choice',
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
    ],
    colors: [
      { name: 'Ivory Linen', hex: '#F4EFEB' },
      { name: 'Graphite', hex: '#3B3B39' },
    ],
  },
  {
    _id: 'col-p3',
    name: 'The Modern Woodcraft Dining Set',
    slug: 'the-modern-woodcraft-dining-set',
    price: 89999,
    compareAtPrice: 105000,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Milano Collection',
    badge: 'Signature Suite',
    rating: 5.0,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80',
    ],
    colors: [
      { name: 'Caramel Teak', hex: '#8B5A2B' },
      { name: 'Dark Walnut', hex: '#4B3621' },
    ],
  },
  {
    _id: 'col-p4',
    name: 'Terra Dining Table',
    slug: 'terra-dining-table',
    price: 39999,
    compareAtPrice: 47999,
    category: 'Tables',
    room: 'Dining Room',
    collectionName: 'Terra Collection',
    badge: 'Bestseller',
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80',
    ],
    colors: [
      { name: 'Natural Walnut', hex: '#5C4033' },
      { name: 'Smoked Oak', hex: '#3F352E' },
    ],
  },
  {
    _id: 'col-p5',
    name: 'Aura Travertine Coffee Table',
    slug: 'aura-travertine-coffee-table',
    price: 32999,
    compareAtPrice: 38000,
    category: 'Tables',
    room: 'Living Room',
    collectionName: 'Terra Collection',
    badge: 'Natural Stone',
    rating: 4.9,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80',
    ],
    colors: [
      { name: 'Warm Travertine', hex: '#E6D7C3' },
    ],
  },
  {
    _id: 'col-p6',
    name: 'Komorebi Ceramic Table Lamp',
    slug: 'komorebi-ceramic-table-lamp',
    price: 6999,
    compareAtPrice: 8500,
    category: 'Lighting',
    room: 'Accessories',
    collectionName: 'Terra Collection',
    badge: 'Artisan Decor',
    rating: 4.9,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80',
    ],
    colors: [
      { name: 'Unglazed Terracotta', hex: '#C27A56' },
      { name: 'Chalk White', hex: '#F0ECE1' },
    ],
  },
  {
    _id: 'col-p7',
    name: 'Luma Lounge Chair',
    slug: 'luma-lounge-chair',
    price: 24999,
    compareAtPrice: 29999,
    category: 'Chairs',
    room: 'Living Room',
    collectionName: 'Nordic Living',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=80',
      'https://images.unsplash.com/photo-1580481077194-e0c55bd6374c?w=1000&q=80',
    ],
    colors: [
      { name: 'Forest Olive', hex: '#3E4B3E' },
      { name: 'Cream Sand', hex: '#EBE5DE' },
      { name: 'Warm Charcoal', hex: '#262624' },
    ],
  },
  {
    _id: 'col-p8',
    name: 'Kyoto Solid Oak Bookshelf',
    slug: 'kyoto-solid-oak-bookshelf',
    price: 45999,
    compareAtPrice: 52000,
    category: 'Storage',
    room: 'Living Room',
    collectionName: 'Nordic Living',
    badge: 'Limited Run',
    rating: 4.9,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=1000&q=80',
    ],
    colors: [
      { name: 'Bleached Oak', hex: '#E4DACB' },
      { name: 'Charcoal Wash', hex: '#333333' },
    ],
  },
  {
    _id: 'col-p9',
    name: 'Astra Bed Frame',
    slug: 'astra-bed-frame',
    price: 54999,
    compareAtPrice: 65000,
    category: 'Beds',
    room: 'Bedroom',
    collectionName: 'Modern Essentials',
    badge: 'Bestseller',
    rating: 5.0,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1000&q=80',
    ],
    colors: [
      { name: 'Pebble Grey', hex: '#D1CCC6' },
      { name: 'Warm Cream', hex: '#F7F3EC' },
      { name: 'Espresso', hex: '#2C221D' },
    ],
  },
  {
    _id: 'col-p10',
    name: 'Vera Fluted Nightstand',
    slug: 'vera-fluted-nightstand',
    price: 14999,
    compareAtPrice: 18000,
    category: 'Storage',
    room: 'Bedroom',
    collectionName: 'Modern Essentials',
    badge: 'Best Value',
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
    ],
    colors: [
      { name: 'Muted Taupe Oak', hex: '#B8A89A' },
      { name: 'Rich Walnut', hex: '#4A3525' },
    ],
  },
  {
    _id: 'col-p11',
    name: 'Atelier Minimalist Oak Desk',
    slug: 'atelier-minimalist-oak-desk',
    price: 34999,
    compareAtPrice: 42000,
    category: 'Storage',
    room: 'Home Office',
    collectionName: 'Modern Essentials',
    badge: 'Home Office',
    rating: 4.8,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1000&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80',
    ],
    colors: [
      { name: 'Natural White Oak', hex: '#D3BFA7' },
      { name: 'Blackened Oak', hex: '#222222' },
    ],
  },
  {
    _id: 'col-p12',
    name: 'Tivoli Rattan Sun Lounger',
    slug: 'tivoli-rattan-sun-lounger',
    price: 27999,
    compareAtPrice: 32999,
    category: 'Chairs',
    room: 'Outdoor',
    collectionName: 'Outdoor Living',
    badge: 'All Weather',
    rating: 4.7,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    ],
    colors: [
      { name: 'Sand & Natural Teak', hex: '#DBCBB9' },
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
                    to="/inspiration"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C564F] hover:text-[#1F2520] transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View Living Room Styling Guide</span>
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
