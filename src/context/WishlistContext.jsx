import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ansari_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ansari_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    const pId = product._id || product;
    const exists = wishlist.some((item) => (item._id || item) === pId);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => (item._id || item) !== pId));
      addToast(`Removed "${product.name || 'item'}" from wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name || 'item'}" to your wishlist.`);
    }
  }, [wishlist, addToast]);

  const value = useMemo(() => ({
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
  }), [wishlist, toggleWishlist, isInWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
