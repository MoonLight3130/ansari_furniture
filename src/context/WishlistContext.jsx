import React, { createContext, useContext, useState, useEffect } from 'react';
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

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  };

  const toggleWishlist = (product) => {
    const pId = product._id || product;
    const exists = isInWishlist(pId);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => (item._id || item) !== pId));
      addToast(`Removed "${product.name || 'item'}" from wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name || 'item'}" to your wishlist.`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
