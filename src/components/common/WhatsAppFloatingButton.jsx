import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppEnquiryModal from './WhatsAppEnquiryModal';

const WhatsAppFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 select-none">
        {/* Tooltip on desktop/tablet */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden md:flex items-center gap-2 mb-2 px-3 py-1.5 rounded-xl bg-[#241A14] text-[#F8F4EC] text-[11px] shadow-lg border border-[#DFD5C6]/30 ml-auto w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Showroom team online — Enquire now</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-[#DFD5C6] hover:text-white text-xs ml-1"
                aria-label="Dismiss tooltip"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-full bg-[#25D366] sm:bg-[#241A14] text-white shadow-2xl hover:shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition-all duration-300 border border-[#25D366]/40 cursor-pointer group"
          aria-label="Enquire on WhatsApp"
        >
          {/* Subtle pulse ring around button on mobile */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none opacity-60 sm:opacity-0" />

          {/* WhatsApp Icon Circle */}
          <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 sm:bg-[#25D366] flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6 sm:w-4 sm:h-4 text-white fill-current" />
          </div>

          {/* Desktop Text Details */}
          <div className="text-left hidden sm:block pr-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
              <span className="text-[9px] tracking-widest text-[#DFD5C6] uppercase font-semibold block leading-none">
                Showroom Online
              </span>
            </div>
            <span className="text-xs font-serif font-bold text-[#F8F4EC] block leading-tight mt-0.5 group-hover:text-[#25D366] transition-colors">
              Enquire on WhatsApp
            </span>
          </div>
        </motion.button>
      </div>

      <WhatsAppEnquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default WhatsAppFloatingButton;
