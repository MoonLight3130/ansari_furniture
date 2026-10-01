import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const rooms = [
  {
    name: 'Living Room',
    slug: 'Living Room',
    image: '/images/rooms/living-room.jpg',
  },
  {
    name: 'Bedroom',
    slug: 'Bedroom',
    image: '/images/rooms/bedroom.jpg',
  },
  {
    name: 'Dining Room',
    slug: 'Dining Room',
    image: '/images/rooms/dining-room.jpg',
  },
  {
    name: 'Home Office',
    slug: 'Home Office',
    image: '/images/rooms/home-office.jpg',
  },
  {
    name: 'Kitchen',
    slug: 'Kitchen',
    image: '/images/rooms/kitchen.png',
  },
  {
    name: 'Outdoor',
    slug: 'Outdoor',
    image: '/images/rooms/outdoor.jpg',
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
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-[#1F2520]
              hover:text-[#7B5E43]
              group
              transition-colors
            "
          >
            <span>View All Rooms</span>

            <ArrowRight
              className="
                w-3.5 h-3.5
                group-hover:translate-x-1
                transition-transform
              "
            />
          </Link>
        </div>

        {/* Rooms Grid */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
            gap-x-4
            sm:gap-x-6
            lg:gap-x-8
            gap-y-8
            justify-items-center
          "
        >
          {rooms.map((room) => (
            <Link
              key={room.slug}
              to={`/shop?room=${encodeURIComponent(room.slug)}`}
              className="
                flex
                flex-col
                items-center
                group
                text-center
                w-full
              "
            >

              {/* Circular Image */}
              <div
                className="
                  w-28 h-28
                  sm:w-32 sm:h-32
                  lg:w-36 lg:h-36
                  xl:w-40 xl:h-40
                  rounded-full
                  overflow-hidden
                  p-1.5
                  border
                  border-[#DED6CC]
                  bg-white
                  group-hover:border-[#7B5E43]
                  transition-all
                  duration-300
                  shadow-sm
                  group-hover:shadow-md
                "
              >
                <div className="w-full h-full rounded-full overflow-hidden">

                  <img
                    src={room.image}
                    alt={`${room.name} furniture`}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-110
                      transition-transform
                      duration-500
                      ease-out
                    "
                    loading="lazy"
                  />

                </div>
              </div>

              {/* Room Name */}
              <span
                className="
                  font-serif
                  text-sm
                  sm:text-base
                  font-semibold
                  text-[#1F2520]
                  group-hover:text-[#7B5E43]
                  transition-colors
                  mt-3.5
                "
              >
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