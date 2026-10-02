import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppEnquiryModal from './WhatsAppEnquiryModal';

const WhatsAppFloatingButton = ({ isCartOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Don't show floating WhatsApp button when cart drawer is open
  if (isCartOpen) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="
          fixed
          bottom-6 right-6
          sm:bottom-8 sm:right-8
          z-40
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-full
          bg-[#25D366]
          flex items-center justify-center
          shadow-[0_6px_20px_rgba(0,0,0,0.20)]
          hover:shadow-[0_8px_25px_rgba(37,211,102,0.35)]
          transition-shadow duration-300
          cursor-pointer
        "
        aria-label="Contact Anzari Furniture on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            d="
              M16.01 3
              C8.83 3 3 8.82 3 16
              C3 18.29 3.6 20.44 4.65 22.3
              L3 29
              L9.86 27.4
              C11.7 28.43 13.82 29 16 29
              C23.18 29 29 23.18 29 16
              C29 8.82 23.19 3 16.01 3Z

              M16.01 26.6
              C14 26.6 12 26.06 10.29 25.04
              L9.88 24.8
              L5.81 25.75
              L6.81 21.78
              L6.54 21.35
              C5.47 19.72 4.9 17.88 4.9 16
              C4.9 9.86 9.88 4.9 16.01 4.9
              C22.14 4.9 27.1 9.86 27.1 16
              C27.1 22.13 22.14 26.6 16.01 26.6Z

              M21.9 18.55
              C21.57 18.39 19.98 17.62 19.69 17.51
              C19.4 17.4 19.19 17.35 18.98 17.67
              C18.77 17.98 18.17 18.71 17.99 18.92
              C17.81 19.13 17.61 19.16 17.29 19
              C16.97 18.84 15.93 18.5 14.7 17.41
              C13.74 16.56 13.09 15.51 12.9 15.19
              C12.71 14.88 12.88 14.7 13.04 14.54
              C13.18 14.4 13.36 14.17 13.52 13.99
              C13.68 13.81 13.73 13.68 13.84 13.47
              C13.95 13.26 13.89 13.08 13.81 12.92
              C13.73 12.76 13.1 11.2 12.84 10.56
              C12.58 9.94 12.32 10.03 12.13 10.02
              C11.92 10.01 11.68 10 11.47 10
              C11.26 10 10.92 10.08 10.63 10.39
              C10.34 10.7 9.53 11.47 9.53 13.02
              C9.53 14.57 10.66 16.07 10.82 16.28
              C10.98 16.49 13.04 19.65 16.19 21
              C16.94 21.32 17.52 21.51 17.98 21.65
              C18.73 21.89 19.41 21.85 19.94 21.77
              C20.54 21.68 21.79 21 22.05 20.27
              C22.31 19.54 22.31 18.91 22.23 18.77
              C22.15 18.63 22.07 18.63 21.9 18.55Z
            "
          />
        </svg>
      </motion.button>

      {isOpen && (
        <WhatsAppEnquiryModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppFloatingButton;