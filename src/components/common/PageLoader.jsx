import React from 'react';

const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F5F0E8] p-8 text-center animate-fade-in">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#DFD5C6]" />
        <div className="absolute inset-0 rounded-full border-2 border-[#70482D] border-t-transparent animate-spin" />
      </div>
      <span className="font-serif text-sm tracking-widest uppercase text-[#70482D] font-medium">
        Anzari Furniture
      </span>
      <span className="text-[11px] text-[#A66A3A] mt-1 font-light tracking-wider">
        Loading craftsmanship...
      </span>
    </div>
  );
};

export default PageLoader;
