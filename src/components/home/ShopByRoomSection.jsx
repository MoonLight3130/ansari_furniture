import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const rooms = [
  {
    name: 'Living Room',
    slug: 'Living Room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    itemCount: '18 Pieces',
  },
  {
    name: 'Bedroom',
    slug: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=600&q=80',
    itemCount: '14 Pieces',
  },
  {
    name: 'Dining Room',
    slug: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    itemCount: '12 Pieces',
  },
  {
    name: 'Home Office',
    slug: 'Home Office',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',
    itemCount: '9 Pieces',
  },
  {
    name: 'Outdoor',
    slug: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    itemCount: '8 Pieces',
  },
];

const ShopByRoomSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2] border-b border-[#EAE2D9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F2520]">
            Shop by Room
          </h2>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2520] hover:text-[#7B5E43] group transition-colors"
          >
            <span>View All Rooms</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Circular Vignettes Grid matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {rooms.map((room, idx) => (
            <Link
              key={idx}
              to={`/shop?room=${encodeURIComponent(room.slug)}`}
              className="flex flex-col items-center group text-center"
            >
              {/* Circular vignette container */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden p-1.5 border border-[#DED6CC] bg-white group-hover:border-[#7B5E43] transition-all duration-300 shadow-sm group-hover:shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Room Title */}
              <span className="font-serif text-sm sm:text-base font-semibold text-[#1F2520] group-hover:text-[#7B5E43] transition-colors mt-3.5">
                {room.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByRoomSection;
