import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discountAmount,
    promoCode,
    applyPromo,
    total,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode.trim());
    }
  };

  const handleWhatsAppCartEnquiry = () => {
    const showroomNumber = '919876543210';
    let text = `*Showroom Furniture Enquiry — Anzari Furniture*\n\n`;
    text += `Hello, I would like to enquire about the availability, custom finish, and delivery of the following pieces:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   Quantity: ${item.quantity}\n`;
      if (item.selectedColor) text += `   Color/Finish: ${item.selectedColor}\n`;
      text += `   Price: ₹${((item.price || 0) * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    text += `*Estimated Total:* ₹${total.toLocaleString('en-IN')}\n\n`;
    text += `Please confirm showroom availability, dispatch schedule, and delivery options.`;

    window.open(`https://wa.me/${showroomNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setIsCartOpen(false);
  };

  const freeDeliveryThreshold = 20000;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF7F2] z-50 shadow-2xl flex flex-col justify-between border-l border-[#EAE2D9]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EAE2D9] flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#1F2520]" />
                <h3 className="font-serif text-xl font-medium text-[#1F2520]">
                  Your Shopping Bag
                </h3>
                <span className="text-xs bg-[#EAE2D9] text-[#2D2A26] px-2.5 py-0.5 rounded-full font-medium">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#736B63] hover:text-[#1F2520] hover:bg-[#FAF7F2] rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping banner */}
            <div className="bg-[#F4EFEB] px-6 py-3 border-b border-[#EAE2D9]">
              {subtotal >= freeDeliveryThreshold ? (
                <div className="text-xs font-medium text-[#2A352C] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4A584C]" />
                  <span>Congratulations! You qualify for <strong>Free White Glove Delivery</strong> across India.</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#5C564F] mb-1.5">
                    <span>Add <strong>₹{(freeDeliveryThreshold - subtotal).toLocaleString('en-IN')}</strong> for Free Delivery</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#DED6CC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2A352C] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EAE2D9]/70 flex items-center justify-center text-[#736B63]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#1F2520]">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#736B63] max-w-[240px] leading-relaxed">
                    Explore our thoughtfully crafted collections to bring timeless design into your home.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#1F2520] text-[#FAF7F2] text-xs font-medium hover:bg-[#2A352C] transition-all"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.color}`}
                    className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EAE2D9] relative group hover:border-[#D5C9BD] transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F2]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start pr-6">
                          <Link
                            to={`/product/${item.slug || item.productId}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm font-semibold text-[#1F2520] hover:text-[#7B5E43] line-clamp-1"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <p className="text-xs text-[#736B63] mt-0.5">
                          Color: <span className="text-[#2D2A26] font-medium">{item.color}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#DED6CC] rounded-full bg-[#FAF7F2] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                            className="p-1 text-[#736B63] hover:text-[#1F2520]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#1F2520]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                            className="p-1 text-[#736B63] hover:text-[#1F2520]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#1F2520]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.productId, item.color)}
                      className="absolute top-3 right-3 text-[#A89D91] hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EAE2D9] space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApply} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8379]" />
                    <input
                      type="text"
                      placeholder="Promo code (try WELCOME10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-full border border-[#DED6CC] bg-[#FAF7F2] focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full border border-[#1F2520] text-xs font-medium text-[#1F2520] hover:bg-[#1F2520] hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoCode && (
                  <div className="flex justify-between text-xs text-[#2A352C] bg-[#EAE2D9]/60 px-3 py-1.5 rounded-lg">
                    <span>Applied: {promoCode}</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-[#5C564F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1F2520] font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White Glove Delivery</span>
                    <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#F4EFEB] text-sm font-semibold text-[#1F2520]">
                    <span>Total (GST Incl.)</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCartEnquiry}
                  className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire List on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 rounded-full border border-[#DFD5C6] text-[#241A14] hover:bg-[#F5F0E8] transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>View Full Enquiry Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
