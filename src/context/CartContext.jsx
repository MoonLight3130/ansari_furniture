import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ansari_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('ansari_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, color = null) => {
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product._id && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: (product.images && product.images[0]) || '',
            slug: product.slug,
            color: selectedColor,
            quantity,
          },
        ];
      }
    });

    addToast(`"${product.name}" added to your bag.`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, color) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.color === color))
    );
    addToast('Item removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setPromoCode('');
  };

  const applyPromo = (code) => {
    if (code.toUpperCase() === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setPromoCode(code.toUpperCase());
      addToast('Promo code WELCOME10 applied! (10% off)');
      return { success: true, discount };
    } else if (code.toUpperCase() === 'LUXURY2026') {
      const discount = 5000;
      setDiscountAmount(discount);
      setPromoCode(code.toUpperCase());
      addToast('Promo code LUXURY2026 applied! (₹5,000 off)');
      return { success: true, discount };
    } else {
      addToast('Invalid promo code. Try WELCOME10', 'error');
      return { success: false };
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= 20000 || subtotal === 0 ? 0 : 2500;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        totalItems,
        shippingFee,
        discountAmount,
        promoCode,
        applyPromo,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
