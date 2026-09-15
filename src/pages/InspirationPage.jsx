import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Bookmark } from 'lucide-react';

const journalEntries = [
  {
    id: 1,
    title: '5 Ways to Make Living Room Feel More Inviting',
    category: 'Interior Architecture',
    date: 'April 14, 2026',
    author: 'Tanya Sen, Lead Stylist',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    summary: 'From low-profile curved seating that invites conversation to sculptural ambient lighting that flatters evening shadows, discover the key design tenets of modern hospitality.',
  },
  {
    id: 2,
    title: 'Sustainable Furniture: A Better Choice for Tomorrow',
    category: 'Material Ethics',
    date: 'March 28, 2026',
    author: 'Kabeer Ansari, Founder',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80',
    summary: 'Fast furniture contributes millions of tons of non-biodegradable landfill annually. Learn why heirloom joinery in FSC-certified teak remains the most ecological choice.',
  },
  {
    id: 3,
    title: 'Bedroom Styling Tips for a Restful and Beautiful Space',
    category: 'Sanctuary Living',
    date: 'March 10, 2026',
    author: 'Meera Chawla, Wellness Architect',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=900&q=80',
    summary: 'Reducing visual noise, embracing natural linen drape, and anchoring sleep spaces with rounded fluted wood elements to lower evening cortisol levels.',
  },
  {
    id: 4,
    title: 'Travertine & Wood: The Art of Material Contrast',
    category: 'Materiality',
    date: 'February 22, 2026',
    author: 'Ansari Design Studio',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=900&q=80',
    summary: 'How the porous, tactile geological coolness of Roman travertine balances the warm tactile soul of seasoned Indian walnut.',
  },
];

const InspirationPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium tracking-[0.3em] text-[#736B63] uppercase block mb-2">
            THE EDITORIAL JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1F2520] tracking-tight">
            Ideas, Craft &amp; Living
          </h1>
          <p className="text-xs sm:text-sm text-[#5C564F] mt-3 leading-relaxed font-light">
            Thoughts on conscious homemaking, material explorations, and architectural perspectives from our design studio.
          </p>
        </div>

        {/* Featured Top Article */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D9] mb-14 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
              <img
                src={journalEntries[0].image}
                alt={journalEntries[0].title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#736B63]">
                <span className="font-semibold text-[#7B5E43] uppercase tracking-wider text-[10px]">
                  {journalEntries[0].category}
                </span>
                <span>·</span>
                <span>{journalEntries[0].date}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520] leading-snug">
                {journalEntries[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed font-light">
                {journalEntries[0].summary}
              </p>
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#1F2520] block">
                  Written by {journalEntries[0].author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalEntries.slice(1).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D9] flex flex-col justify-between group hover:border-[#C5B8AA] transition-all hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8C8379] mb-2">
                    <span className="text-[#7B5E43] font-semibold">{item.category}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C564F] mt-2 leading-relaxed font-light line-clamp-3">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between text-xs text-[#1F2520] font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InspirationPage;
