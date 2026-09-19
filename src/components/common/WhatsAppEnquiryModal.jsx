import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

const WhatsAppEnquiryModal = ({ isOpen, onClose, product = null }) => {
  const [topic, setTopic] = useState('Availability & Delivery');
  const [customNotes, setCustomNotes] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const enquiryTopics = [
    'Availability & Delivery',
    'Custom Dimensions / Sizing',
    'Wood Polish & Finish Options',
    'Showroom Visit & Viewing',
    'Bulk / Bespoke Commission',
  ];

  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    const showroomNumber = '919876543210';
    
    let text = `*New Furniture Enquiry — Anzari Furniture Showroom*\n`;
    if (product) {
      text += `*Product:* ${product.name}\n`;
      text += `*Price:* ₹${product.price ? product.price.toLocaleString('en-IN') : 'N/A'}\n`;
      text += `*Material:* ${product.material || 'Solid Wood'}\n`;
    }
    text += `*Topic:* ${topic}\n`;
    if (city) text += `*City/Pincode:* ${city}\n`;
    if (phone) text += `*Customer Contact:* ${phone}\n`;
    if (customNotes) text += `*Query:* ${customNotes}\n`;

    const encodedUrl = `https://wa.me/${showroomNumber}?text=${encodeURIComponent(text)}`;
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#241A14]/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#F8F4EC] rounded-3xl border border-[#DFD5C6] shadow-2xl overflow-hidden z-10 text-[#241A14]"
          >
            {/* Header with Warm Showroom Banner */}
            <div className="bg-[#3A261B] text-[#F8F4EC] px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-[#241A14] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-wide">
                    Talk to our Showroom Specialist
                  </h3>
                  <p className="text-[11px] text-[#DFD5C6] font-light">
                    Direct assistance for craftsmanship, bespoke sizing &amp; orders
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F8F4EC] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSendToWhatsApp} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              {/* If inquiring about a specific product */}
              {product && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#DFD5C6]">
                  <img
                    src={product.images?.[0] || '/images/showroom/hero_showroom.jpg'}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#DFD5C6]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold tracking-wider text-[#A66A3A] uppercase block">
                      Enquiring About
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#241A14] truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#70482D]">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

              {/* Inquiry Topic */}
              <div>
                <label className="text-xs font-semibold text-[#3A261B] block mb-1.5">
                  What would you like to enquire about?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {enquiryTopics.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setTopic(item)}
                      className={`text-left text-xs px-3 py-2 rounded-xl border transition-all ${
                        topic === item
                          ? 'bg-[#3A261B] text-[#F8F4EC] border-[#3A261B] font-medium shadow-xs'
                          : 'bg-white text-[#241A14] border-[#DFD5C6] hover:border-[#70482D]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#3A261B] block mb-1">
                    Your City / Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai 400050"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5C6] focus:outline-none focus:border-[#70482D]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3A261B] block mb-1">
                    WhatsApp Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5C6] focus:outline-none focus:border-[#70482D]"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="text-xs font-semibold text-[#3A261B] block mb-1">
                  Specific Requirements or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Do you have this in 8-seater? What are the delivery times to Pune? Can we visit the showroom this Sunday?"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#DFD5C6] focus:outline-none focus:border-[#70482D] resize-none"
                />
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between text-[11px] text-[#70482D] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A66A3A]" />
                  Direct Showroom Response
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B18A52]" />
                  Custom Dimensions Available
                </span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Start WhatsApp Conversation</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppEnquiryModal;
