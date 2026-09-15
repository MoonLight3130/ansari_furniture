import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const articles = [
  {
    id: 1,
    category: 'Design Philosophy',
    date: 'April 2026',
    title: '5 Ways to Make Living Room Feel More Inviting',
    description: 'Explore the interplay between curved silhouettes, textured organic fabrics, and warm layered ambient lighting.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
    readTime: '4 min read',
  },
  {
    id: 2,
    category: 'Sustainability',
    date: 'March 2026',
    title: 'Sustainable Furniture: A Better Choice for Tomorrow',
    description: 'Why kiln-dried FSC teak and circular joinery outlive fast furniture, saving forests and heirloom stories.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&q=80',
    readTime: '6 min read',
  },
  {
    id: 3,
    category: 'Room Styling',
    date: 'February 2026',
    title: 'Bedroom Styling Tips for a Restful and Beautiful Space',
    description: 'Create a sanctuary rooted in gentle fluted woodwork, washed Belgian linens, and grounding terracotta accents.',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=700&q=80',
    readTime: '5 min read',
  },
];

const JournalSection = () => {
  return (
    <section className="py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase mb-1 block">
              OUR EDITORIAL JOURNAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              Ideas &amp; Inspiration
            </h2>
          </div>
          <Link
            to="/inspiration"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2520] hover:text-[#7B5E43] group transition-colors"
          >
            <span>Explore All Journal</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="flex flex-col group bg-white rounded-3xl overflow-hidden border border-[#EAE2D9] hover:border-[#C5B8AA] transition-all hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#1F2520]">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8C8379] mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5C564F] mt-2.5 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4EFEB]">
                  <Link
                    to="/inspiration"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JournalSection;
