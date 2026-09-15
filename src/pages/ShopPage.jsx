import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Check, RotateCcw } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import api from '../services/api';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMeta, setFilterMeta] = useState({
    rooms: ['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Outdoor', 'Accessories'],
    categories: ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Lighting'],
    materials: ['Teak', 'Walnut', 'Oak', 'Bouclé', 'Linen', 'Travertine'],
    minPrice: 0,
    maxPrice: 150000,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active filter states from URL or defaults
  const currentRoom = searchParams.get('room') || 'All';
  const currentCategory = searchParams.get('category') || 'All';
  const currentCollection = searchParams.get('collection') || 'All';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentSearch = searchParams.get('search') || '';
  const currentMaterial = searchParams.get('material') || 'All';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  // Fetch filter metadata
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await api.get('/products/meta/filters');
        if (res.data) {
          setFilterMeta((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error fetching filter meta:', err);
      }
    };
    fetchMeta();
  }, []);

  // Fetch products matching filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(searchParams);
        const res = await api.get(`/products?${queryParams.toString()}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    currentRoom !== 'All' ||
    currentCategory !== 'All' ||
    currentCollection !== 'All' ||
    currentSearch !== '' ||
    currentMaterial !== 'All' ||
    currentMaxPrice !== '';

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-[#8C8379] mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-[#1F2520] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1F2520] font-medium">Furniture Collection</span>
          {currentRoom !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[#7B5E43] font-semibold">{currentRoom}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE2D9]">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block mb-1">
              CURATED CATALOGUE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              {currentRoom !== 'All' ? currentRoom : currentCategory !== 'All' ? currentCategory : 'All Furniture'}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C564F] mt-1 font-light">
              Showing {products.length} handcrafted pieces designed for modern warmth.
            </p>
          </div>

          {/* Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#DED6CC] bg-white text-xs font-medium text-[#1F2520]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#354238]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-[#DED6CC]">
              <span className="text-xs text-[#736B63]">Sort by:</span>
              <select
                value={currentSort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="text-xs font-medium text-[#1F2520] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Pieces</option>
                <option value="bestseller">Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-[#736B63]">Active Filters:</span>
            {currentRoom !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DED6CC] text-xs font-medium text-[#1F2520]">
                Room: {currentRoom}
                <button onClick={() => updateFilter('room', 'All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {currentCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DED6CC] text-xs font-medium text-[#1F2520]">
                Category: {currentCategory}
                <button onClick={() => updateFilter('category', 'All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {currentMaterial !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DED6CC] text-xs font-medium text-[#1F2520]">
                Material: {currentMaterial}
                <button onClick={() => updateFilter('material', 'All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {currentSearch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DED6CC] text-xs font-medium text-[#1F2520]">
                Search: "{currentSearch}"
                <button onClick={() => updateFilter('search', '')}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-xs text-[#7B5E43] hover:underline ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Main Content Grid (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* Desktop Filters Sidebar (col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-[#EAE2D9]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D9]">
              <span className="font-serif text-base font-semibold text-[#1F2520]">Refine Selection</span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#7B5E43] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Room Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736B63] mb-3">
                Space / Room
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => updateFilter('room', 'All')}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-colors text-left ${
                    currentRoom === 'All' ? 'bg-[#1F2520] text-white font-medium' : 'text-[#4A453F] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>All Spaces</span>
                </button>
                {filterMeta.rooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => updateFilter('room', room)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-colors text-left ${
                      currentRoom === room ? 'bg-[#1F2520] text-white font-medium' : 'text-[#4A453F] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{room}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="pt-4 border-t border-[#EAE2D9]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736B63] mb-3">
                Category
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => updateFilter('category', 'All')}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-colors text-left ${
                    currentCategory === 'All' ? 'bg-[#1F2520] text-white font-medium' : 'text-[#4A453F] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>All Categories</span>
                </button>
                {filterMeta.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-colors text-left ${
                      currentCategory === cat ? 'bg-[#1F2520] text-white font-medium' : 'text-[#4A453F] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="pt-4 border-t border-[#EAE2D9]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736B63] mb-3">
                Material
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['Teak', 'Walnut', 'Oak', 'Bouclé', 'Linen', 'Travertine'].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => updateFilter('material', currentMaterial === mat ? 'All' : mat)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      currentMaterial === mat
                        ? 'bg-[#1F2520] text-white font-medium'
                        : 'bg-[#FAF7F2] text-[#4A453F] border border-[#EAE2D9] hover:border-[#1F2520]'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid (col-span-9) */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-[#EAE2D9] animate-pulse space-y-3">
                    <div className="aspect-[4/3] bg-[#EAE2D9]/60 rounded-xl" />
                    <div className="h-4 bg-[#EAE2D9]/60 rounded w-3/4" />
                    <div className="h-4 bg-[#EAE2D9]/60 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE2D9] space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#1F2520]">
                  No furniture pieces match your current filters.
                </h3>
                <p className="text-xs text-[#736B63] max-w-sm mx-auto">
                  Try clearing your filters or exploring our full collection of modern living pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-full bg-[#1F2520] text-[#FAF7F2] text-xs font-medium hover:bg-[#2A352C] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default ShopPage;
