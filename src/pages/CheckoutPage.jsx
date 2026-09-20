import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, Truck, CreditCard, Lock, ArrowRight, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const CheckoutPage = () => {
  const { cartItems, subtotal, shippingFee, discountAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Address Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Maharashtra',
    pincode: user?.addresses?.[0]?.pincode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery (After Inspection)');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city || !formData.pincode) {
      addToast('Please complete all required shipping fields', 'error');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderPayload = {
        customerDetails: {
          fullName: formData.fullName,
          email: formData.email || 'guest@ansarifurniture.com',
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: cartItems.map((item) => ({
          product: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.color,
        })),
        deliveryMethod: 'Standard White Glove',
        paymentMethod,
        subtotal,
        discount: discountAmount,
        shippingFee,
        total,
      };

      const res = await api.post('/orders', orderPayload);
      setConfirmedOrder(res.data);

      // Automatically launch WhatsApp with order summary for showroom confirmation
      const showroomNumber = '919876543210';
      let waText = `*Showroom Order Booking — Anzari Furniture*\n\n`;
      waText += `*Order #:* ${res.data.orderNumber || 'Pending'}\n`;
      waText += `*Customer:* ${formData.fullName} (${formData.phone})\n`;
      waText += `*Delivery To:* ${formData.street}, ${formData.city} - ${formData.pincode}\n\n`;
      waText += `*Pieces Ordered:*\n`;
      cartItems.forEach((it, idx) => {
        waText += `${idx + 1}. *${it.name}* (Qty: ${it.quantity}) — ₹${((it.price || 0) * it.quantity).toLocaleString('en-IN')}\n`;
      });
      waText += `\n*Estimated Total:* ₹${total.toLocaleString('en-IN')}\n`;
      waText += `*Preference:* ${paymentMethod}\n\n`;
      waText += `Please confirm stock availability, custom finish, and dispatch timeline.`;

      window.open(`https://wa.me/${showroomNumber}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');

      clearCart();
      setStep(3);
      addToast('Your order enquiry has been sent to our showroom!');
    } catch (err) {
      console.error('Order creation error:', err);
      addToast(err.response?.data?.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 3 && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE2D9] text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EAE2D9] text-[#2A352C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#7B5E43] font-semibold block mb-1">
                Enquiry Booking Confirmed
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1F2520]">
                Thank You for Choosing Anzari Furniture
              </h1>
              <p className="text-xs text-[#5C564F] mt-2">
                Your order enquiry <strong className="text-[#1F2520]">{confirmedOrder.orderNumber}</strong> has been received by our showroom craftspeople.
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 text-left border border-[#EAE2D9] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#EAE2D9] pb-2">
                <span className="text-[#736B63]">Recipient:</span>
                <span className="font-semibold text-[#1F2520]">{confirmedOrder.customerDetails.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE2D9] pb-2">
                <span className="text-[#736B63]">Delivery Address:</span>
                <span className="font-medium text-[#1F2520] text-right">
                  {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EAE2D9] pb-2">
                <span className="text-[#736B63]">Payment Preference:</span>
                <span className="font-semibold text-[#1F2520]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-[#1F2520]">
                <span>Estimated Total:</span>
                <span>₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Anzari Furniture, I placed order enquiry #${confirmedOrder.orderNumber} for ₹${confirmedOrder.total?.toLocaleString('en-IN')}. Please confirm dispatch details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                to="/account"
                className="px-6 py-3 rounded-full bg-[#1F2520] text-[#FAF7F2] text-xs font-medium hover:bg-[#2A352C] transition-all"
              >
                View in My Orders
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full border border-[#DED6CC] text-[#1F2520] text-xs font-medium hover:bg-white transition-all"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Checkout Steps Tracker */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-[#1F2520] text-white' : 'bg-[#EAE2D9] text-[#736B63]'
              }`}>
                1
              </span>
              <span className="text-xs font-medium text-[#1F2520]">Shipping</span>
            </div>
            <div className="h-[1px] flex-1 bg-[#DED6CC] mx-4" />
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-[#1F2520] text-white' : 'bg-[#EAE2D9] text-[#736B63]'
              }`}>
                2
              </span>
              <span className="text-xs font-medium text-[#1F2520]">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE2D9]">
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1F2520]">
                    Shipping &amp; Delivery Address
                  </h2>
                  <p className="text-xs text-[#736B63] mt-1">
                    Please provide the destination for our white glove delivery team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Aanya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">Street / Apartment / Villa *</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="e.g. 14 Lotus Enclave, 4th Cross"
                    className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Kollam / Thiruvananthapuram"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Kerala"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2D2A26] block mb-1.5">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 560038"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Continue to Confirmation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D9]">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-[#1F2520]">
                      Showroom Confirmation &amp; Payment Preference
                    </h2>
                    <p className="text-xs text-[#736B63] mt-0.5">
                      Deliver to: {formData.street}, {formData.city}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#7B5E43] font-medium hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Showroom Payment Selection Options */}
                <div className="space-y-3">
                  {[
                    { id: 'Pay on White Glove Delivery (COD)', label: 'Pay on Delivery (Inspect piece first in your home)', icon: Truck },
                    { id: 'Showroom Visit & In-Person Inspection', label: 'Showroom Visit & Payment (Inspect in Kollam or Thiruvananthapuram showroom)', icon: ShieldCheck },
                    { id: 'UPI / Bank Transfer upon Dispatch', label: 'UPI / Bank Transfer (Pay after showroom stock verification)', icon: Lock },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? 'border-[#25D366] bg-[#25D366]/5'
                          : 'border-[#EAE2D9] hover:border-[#D5C9BD]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-[#25D366]"
                      />
                      <method.icon className="w-4 h-4 text-[#736B63]" />
                      <span className="text-xs font-medium text-[#1F2520]">{method.label}</span>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-[#F8F4EC] rounded-2xl border border-[#DFD5C6] text-xs text-[#70482D] space-y-1">
                  <p className="font-semibold flex items-center gap-1.5 text-[#241A14]">
                    <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                    No Upfront Online Payment Required
                  </p>
                  <p className="text-[11px] text-[#8C8379] leading-relaxed">
                    Clicking below will securely send your order specification to our WhatsApp showroom team. We will review timber availability and schedule your delivery with you directly.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{submitting ? 'Connecting to Showroom...' : `Confirm & Send Order via WhatsApp · ₹${total.toLocaleString('en-IN')}`}</span>
                </button>
              </div>
            )}

          </div>

          {/* Cart Review Sidebar (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9] space-y-5">
            <h3 className="font-serif text-lg font-semibold text-[#1F2520]">
              Order Summary ({cartItems.length} pieces)
            </h3>

            <div className="divide-y divide-[#F4EFEB] max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.color}`} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#FAF7F2]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-semibold text-[#1F2520] truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#736B63] block">
                      Qty: {item.quantity} · {item.color}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1F2520]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EAE2D9] space-y-2 text-xs text-[#5C564F]">
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
                <span>Total Due</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
