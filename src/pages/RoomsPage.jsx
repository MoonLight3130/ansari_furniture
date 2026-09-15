import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const roomList = [
  {
    title: 'Living Room',
    subtitle: 'Where conversations flow and comfort anchors the home.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
    description: 'Curved sofas, sculptural armchairs, and low travertine tables thoughtfully composed for shared life.',
    popular: ['The Habitat Sofa', 'Luma Lounge Chair', 'Aura Travertine Coffee Table'],
  },
  {
    title: 'Bedroom',
    subtitle: 'A quiet sanctuary for restorative repose.',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1000&q=80',
    description: 'Upholstered linen beds, fluted nightstands, and soothing textures that quiet the mind at dusk.',
    popular: ['Astra Bed Frame', 'Vera Fluted Nightstand', 'Komorebi Lamp'],
  },
  {
    title: 'Dining Room',
    subtitle: 'Celebrating the warmth of shared tables.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=80',
    description: 'Substantial solid walnut and teak tables designed for intimate family meals and celebratory dinner parties.',
    popular: ['Terra Dining Table', 'The Modern Woodcraft Dining Set'],
  },
  {
    title: 'Home Office',
    subtitle: 'Clarity, posture, and creative calm.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1000&q=80',
    description: 'Clean solid oak desks with integrated wire routing and ergonomic seating designed for inspired daily focus.',
    popular: ['Atelier Minimalist Oak Desk', 'Kyoto Bookshelf'],
  },
  {
    title: 'Outdoor',
    subtitle: 'Seamless harmony with the elements.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
    description: 'All-weather teak and UV-resistant Sunbrella loungers engineered for garden verandas and breezy rooftops.',
    popular: ['Tivoli Rattan Sun Lounger'],
  },
];

const RoomsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium tracking-[0.3em] text-[#736B63] uppercase block mb-2">
            EXPLORE BY SPACE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1F2520] tracking-tight">
            Find Furniture for Every Corner
          </h1>
          <p className="text-xs sm:text-sm text-[#5C564F] mt-3 leading-relaxed font-light">
            Every room tells a distinct story. Explore our curated spaces to envision how Ansari pieces breathe calm into your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomList.map((room) => (
            <div
              key={room.title}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D9] flex flex-col justify-between group hover:border-[#C5B8AA] hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2] relative">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">{room.title}</h2>
                  <p className="text-xs text-white/80 font-light mt-1">{room.subtitle}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#5C564F] leading-relaxed font-light">
                  {room.description}
                </p>

                <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between">
                  <div className="text-[11px] text-[#8C8379]">
                    Key pieces: <span className="text-[#2D2A26] font-medium">{room.popular.join(', ')}</span>
                  </div>
                  <Link
                    to={`/shop?room=${encodeURIComponent(room.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2520] hover:text-[#7B5E43] group-hover:translate-x-1 transition-all"
                  >
                    <span>Shop {room.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RoomsPage;
