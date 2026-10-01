import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EAE2D9] pt-14 pb-10 text-[#5C564F]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#EAE2D9]">

          {/* Logo & Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/brand/logo.png"
                alt="Anzari Furniture Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[#1F2520]">
                  Anzari
                </span>

                <span className="text-[10px] tracking-[0.35em] font-medium text-[#736B63] uppercase mt-0.5">
                  F U R N I T U R E
                </span>
              </div>
            </Link>
          </div>


          {/* Contact & Social Links */}
          <div className="flex items-center gap-4">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/anzari_furniture_timbers_mart/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>


            {/* Email */}
            <a
              href="mailto:Anzarifurniture@gmail.com"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Email"
              title="Email"
            >
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.5 6 7.15 5.36a2.25 2.25 0 0 0 2.7 0L20.5 6"
                />
              </svg>
            </a>


            {/* Phone */}
            <a
              href="tel:+94962 71949"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="Phone"
              title="Call Anzari Furniture"
            >
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 3.75h2.5c.55 0 1.02.4 1.11.94l.63 3.74a1.13 1.13 0 0 1-.33.98L7.5 11.06a14.44 14.44 0 0 0 5.44 5.44l1.65-1.66a1.13 1.13 0 0 1 .98-.33l3.74.63c.54.09.94.56.94 1.11v2.5c0 .69-.56 1.25-1.25 1.25C10.03 20 4 13.97 4 6.25 4 5.56 4.56 5 5.25 5V3.75Z"
                />
              </svg>
            </a>


            {/* YouTube */}
            <a
              href="https://www.youtube.com/@anzarifurniture"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-[#DED6CC] flex items-center justify-center text-[#4A453F] hover:bg-[#1F2520] hover:text-white hover:border-[#1F2520] transition-all"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

          </div>
        </div>


        {/* Bottom Editorial Tagline & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8379]">

          <p className="font-serif italic text-sm text-[#4A453F] text-center sm:text-left">
            "Designing a kinder, more beautiful world — Together."
          </p>


          <div className="flex flex-wrap items-center justify-center gap-5">

            <span>
              © {new Date().getFullYear()} Ansari Furniture. All rights reserved.
            </span>

            <span className="hidden sm:inline text-[#D5C9BD]">
              |
            </span>

            <span>
              Designed &amp; Developed by{" "}
              <a
                href="https://promptlogix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#4A453F] hover:text-[#1F2520] underline underline-offset-4 decoration-[#CFC4B8] hover:decoration-[#1F2520] transition-all"
              >
                PromptLogix
              </a>
            </span>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;