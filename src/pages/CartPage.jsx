import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
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

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520] mb-8">
          Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE2D9] max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#736B63] mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#1F2520]">Your bag is currently empty</h2>
            <p className="text-xs text-[#736B63] leading-relaxed">
              Explore our handcrafted furniture to discover pieces designed to last generations.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] text-xs font-medium hover:bg-[#2A352C] transition-all shadow-sm"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Items Table (col-span-8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9] divide-y divide-[#EAE2D9]">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.color}`} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-center justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-2xl object-cover bg-[#FAF7F2] shrink-0"
                    />
                    <div>
                      <Link
                        to={`/product/${item.slug || item.productId}`}
                        className="font-serif text-base font-semibold text-[#1F2520] hover:text-[#7B5E43] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#736B63] mt-1">
                        Finish / Color: <strong className="text-[#1F2520]">{item.color}</strong>
                      </p>
                      <span className="text-sm font-bold text-[#1F2520] block sm:hidden mt-2">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#DED6CC] rounded-full bg-[#FAF7F2] px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                        className="px-1 text-sm text-[#736B63] hover:text-[#1F2520]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#1F2520]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                        className="px-1 text-sm text-[#736B63] hover:text-[#1F2520]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="hidden sm:block font-serif text-base font-bold text-[#1F2520] min-w-[90px] text-right">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.productId, item.color)}
                      className="text-[#8C8379] hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary (col-span-4) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9] space-y-6">
              <h3 className="font-serif text-xl font-semibold text-[#1F2520]">Order Summary</h3>

              {/* Promo input */}
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WELCOME10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#1F2520] text-xs font-medium hover:bg-[#1F2520] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex justify-between text-xs text-green-800 bg-green-50 px-3.5 py-2 rounded-xl border border-green-200">
                  <span>Applied: <strong>{promoCode}</strong></span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-[#5C564F] pt-2 border-t border-[#F4EFEB]">
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
                  <span>{shippingFee === 0 ? 'Complimentary Free' : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#EAE2D9] text-base font-bold text-[#1F2520]">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#736B63] space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#354238]" />
                  <span>100% Encrypted &amp; Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;
