import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products?search=${encodeURIComponent(query)}&limit=5`);
        setResults(res.data.products || []);
      } catch (err) {
        console.error('Search query error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickTerms = ['Bouclé Sofa', 'Dining Table', 'Lounge Chair', 'Oak Bed', 'Home Office', 'Travertine'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl z-10 border border-[#EAE2D9] overflow-hidden"
        >
          {/* Search Header */}
          <form onSubmit={handleSubmit} className="p-5 border-b border-[#EAE2D9] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8C8379]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search furniture, styles, rooms, or materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-base sm:text-lg text-[#1F2520] placeholder-[#8C8379] focus:outline-none font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#8C8379] hover:text-[#1F2520]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1F2520] text-[#FAF7F2]"
            >
              <span>Search</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>

          {/* Quick Suggestions */}
          {!query && (
            <div className="p-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C8379] block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      navigate(`/shop?search=${encodeURIComponent(term)}`);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#EAE2D9] text-[#4A453F] hover:border-[#1F2520] hover:text-[#1F2520] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query && (
            <div className="p-4 max-h-96 overflow-y-auto divide-y divide-[#EAE2D9]/60">
              {loading ? (
                <div className="py-8 text-center text-xs text-[#8C8379]">Searching collections...</div>
              ) : results.length > 0 ? (
                results.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => {
                      onClose();
                      navigate(`/product/${product.slug || product._id}`);
                    }}
                    className="w-full flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-white transition-colors text-left group"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F2] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-[#7B5E43] block">
                        {product.room} · {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#1F2520] truncate group-hover:text-[#7B5E43] transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#1F2520]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C8379] group-hover:text-[#1F2520] group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#8C8379]">
                  No furniture pieces matching "{query}". Try "sofa", "table", or "chair".
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
