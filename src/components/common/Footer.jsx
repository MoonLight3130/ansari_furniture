import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EAE2D9] pt-14 pb-10 text-[#5C564F]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Footer Row - Recreating the exact composition in the reference image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#EAE2D9]">
          
          {/* Logo & Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex flex-col group">
              <span className="font-serif text-3xl font-semibold tracking-tight text-[#1F2520]">
                Ansari
              </span>
              <span className="text-[10px] tracking-[0.35em] font-medium text-[#736B63] uppercase mt-0.5">
                F U R N I T U R E
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links as shown in the bottom bar of the reference image */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-[#4A453F]">
            <Link to="/shop" className="hover:text-[#1F2520] transition-colors">Shop</Link>
            <span className="text-[#D5C9BD] hidden sm:inline">|</span>
            <Link to="/collections" className="hover:text-[#1F2520] transition-colors">Collections</Link>
            <span className="text-[#D5C9BD] hidden sm:inline">|</span>
            <Link to="/about" className="hover:text-[#1F2520] transition-colors">About</Link>
            <span className="text-[#D5C9BD] hidden sm:inline">|</span>
            <Link to="/about#sustainability" className="hover:text-[#1F2520] transition-colors">Sustainability</Link>
            <span className="text-[#D5C9BD] hidden sm:inline">|</span>
            <Link to="/about" className="hover:text-[#1F2520] transition-colors">Support</Link>
          </div>

          {/* Social Icons & Statement from the reference */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Pinterest"
            >
              <span className="font-serif font-bold text-xs">P</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Editorial Tagline & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8379]">
          <p className="font-serif italic text-sm text-[#4A453F]">
            "Designing a kinder, more beautiful world — Together."
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <span>© {new Date().getFullYear()} Ansari Furniture. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-[#1F2520] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#1F2520] transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-[#1F2520] transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
