import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, MessageCircle, Eye } from 'lucide-react';

const collections = [
  {
    id: 'teak-collection',
    name: 'Teak Collection',
    eyebrow: 'KERALA SHOWROOM FLAGSHIP',
    tagline: 'Handcrafted Seasoned Teakwood Dining Suites & Pedestal Tables',
    description: 'Mastercrafted oval and rectangular dining suites carved from seasoned solid Burma and Nilambur teakwood. Paired with 12mm crystal beveled glass tops and ergonomic high-back chairs.',
    heroImage: '/images/showroom/teak_oval_dining.jpg',
    pieces: '18 Showroom Ensembles',
    accent: 'bg-[#F5EFEB]',
    materials: ['Seasoned Burma Teak', '12mm Beveled Glass', 'Cognac Leatherette', 'Neem Anti-Termite'],
    products: [
      {
        name: 'Royal Teak Oval Dining Set',
        slug: 'royal-teak-oval-dining-set',
        price: 68999,
        comparePrice: 84999,
        spec: '6-Seater Oval · 12mm Beveled Glass Top · Fluted Pedestal',
        image: '/images/showroom/teak_oval_dining.jpg',
      },
      {
        name: 'Grand Teak Oval Glass Coffee Table',
        slug: 'grand-teak-oval-glass-coffee-table',
        price: 24999,
        comparePrice: 29999,
        spec: 'Solid Teak Frame · Tempered Glass · Slatted Shelf',
        image: '/images/showroom/slatted_sofa_set.jpg',
      },
      {
        name: 'Royal Teak 8-Seater Banquet Table',
        slug: 'contemporary-x-trestle-glass-dining-suite',
        price: 79999,
        comparePrice: 96000,
        spec: 'Grand Showroom Edition · Hand-Carved Pedestal',
        image: '/images/showroom/hero_showroom.jpg',
      },
    ],
  },
  {
    id: 'traditional-collection',
    name: 'Traditional Collection',
    eyebrow: 'HERITAGE KERALA CRAFT',
    tagline: 'Iconic Circular Ring Motifs & Artisan Baluster Carvings',
    description: 'A celebration of authentic Indian and Kerala heritage joinery. Features hand-carved circular ring motifs along broad armrests, contoured lumbar posture curves, and lustrous honey gloss finish.',
    heroImage: '/images/showroom/circular_motif_bench.jpg',
    pieces: '14 Heritage Designs',
    accent: 'bg-[#F2ECE3]',
    materials: ['100% Solid Indian Teak', 'Hand-Turned Balusters', 'Ring Carvings', 'Linen Blend Cushion'],
    products: [
      {
        name: 'Heritage Ring-Arm Solid Teak Bench',
        slug: 'heritage-ring-arm-solid-teak-bench',
        price: 34999,
        comparePrice: 42000,
        spec: 'Solid Teak 3-Seater · Iconic Circular Ring Armrests',
        image: '/images/showroom/circular_motif_bench.jpg',
      },
      {
        name: 'Shahi Hand-Carved Ring-Armchair',
        slug: 'shahi-hand-carved-ring-armchair',
        price: 16999,
        comparePrice: 21000,
        spec: 'Single Accent Armchair · Contoured Lumbar Contour',
        image: '/images/showroom/circular_motif_bench.jpg',
      },
      {
        name: 'Heritage Carved Woodcraft Baluster Settee',
        slug: 'heritage-ring-arm-solid-teak-bench',
        price: 44999,
        comparePrice: 52000,
        spec: 'Heirloom Timber Diwan · Turned Legs & Slatted Back',
        image: '/images/showroom/craftsmanship_macro.jpg',
      },
    ],
  },
  {
    id: 'modern-collection',
    name: 'Modern Collection',
    eyebrow: 'CONTEMPORARY LIVING',
    tagline: 'Architectural Geometric Joinery with Polished Tempered Glass',
    description: 'Crisp interlocking X-trestle timber joinery, crystal-clear tempered safety glass, and ergonomic vertical-slatted high-back seating designed for luminous, contemporary homes in Kollam and Thiruvananthapuram.',
    heroImage: '/images/showroom/cross_leg_dining.jpg',
    pieces: '16 Contemporary Suites',
    accent: 'bg-[#EFEAE2]',
    materials: ['Kiln-Dried Solid Teak', 'Crisscross X-Trestle', '10mm Clear Glass', 'Nylon Leveler Glides'],
    products: [
      {
        name: 'Contemporary X-Trestle Glass Dining Suite',
        slug: 'contemporary-x-trestle-glass-dining-suite',
        price: 58999,
        comparePrice: 72000,
        spec: '6 High-Back Chairs · Interlocking X-Trestle Teak Frame',
        image: '/images/showroom/cross_leg_dining.jpg',
      },
      {
        name: 'Contemporary Slatted High-Back Chair Pair',
        slug: 'contemporary-x-trestle-glass-dining-suite',
        price: 18999,
        comparePrice: 24000,
        spec: 'Set of 2 Ergonomic Solid Teak Dining Chairs',
        image: '/images/showroom/cross_leg_dining.jpg',
      },
    ],
  },
  {
    id: 'living-suites',
    name: 'Living Room Suites',
    eyebrow: 'REGAL HOSPITALITY',
    tagline: 'Curved Steam-Bent Teakwood Frames & Royal Wine Chenille',
    description: 'Grand 5-seater showroom ensembles comprising a 3-seater curved slatted sofa, two matching single armchairs, and an oval slatted coffee table with glass top. Finished in rich honey teak with premium deep wine cushions.',
    heroImage: '/images/showroom/slatted_sofa_set.jpg',
    pieces: '15 Curated Suites',
    accent: 'bg-[#F5EFEB]',
    materials: ['Steam-Bent Teak Frame', 'Royal Wine Chenille', '40D Foam', 'Oval Glass Table Included'],
    products: [
      {
        name: 'Nawab Curved Slatted Sofa Ensemble',
        slug: 'nawab-curved-slatted-sofa-ensemble',
        price: 89999,
        comparePrice: 105000,
        spec: 'Complete 3+1+1 Ensemble & Matching Oval Glass Coffee Table',
        image: '/images/showroom/slatted_sofa_set.jpg',
      },
      {
        name: 'Nawab Slatted Accent Armchair',
        slug: 'nawab-curved-slatted-sofa-ensemble',
        price: 19999,
        comparePrice: 24000,
        spec: 'Steam-Bent Teak · Ergonomic Slatted Surround',
        image: '/images/showroom/slatted_sofa_set.jpg',
      },
    ],
  },
  {
    id: 'solid-wood',
    name: 'Solid Wood',
    eyebrow: 'HEIRLOOM TIMBER',
    tagline: '100% Solid Hardwood King Beds & Lifetime Wardrobes',
    description: 'Zero MDF. Zero particle board. Massive seasoned teakwood king bed frames, lockable 4-door timber wardrobes, and artisan storage handcrafted to withstand generations of Kerala weather.',
    heroImage: '/images/showroom/hero_showroom.jpg',
    pieces: '20 Heirloom Designs',
    accent: 'bg-[#F0EAE1]',
    materials: ['100% Solid Seasoned Teak', 'Zero Creak Joinery', 'Brass Locks & Hinges', 'Lifetime Guarantee'],
    products: [
      {
        name: 'Royal Teak King Bedstead',
        slug: 'royal-teak-king-bedstead',
        price: 64999,
        comparePrice: 78000,
        spec: 'King Size (72x78 in) · Solid Teak Slats · Zero Creak',
        image: '/images/rooms/bedroom.jpg',
      },
      {
        name: 'Imperial Solid Teak 4-Door Wardrobe',
        slug: 'imperial-solid-teak-4-door-wardrobe',
        price: 78999,
        comparePrice: 95000,
        spec: 'Solid Timber Core · Internal Drawers & Mirror Pane',
        image: '/images/showroom/hero_showroom.jpg',
      },
    ],
  },
];

const CollectionsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#70482D] uppercase">
              SHOWROOM DESIGN SUITES
            </span>
            <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#241A14] tracking-tight">
            Curated Collections
          </h1>
          <p className="text-xs sm:text-base text-[#5A4B40] mt-4 leading-relaxed font-light">
            Discover our flagship teak dining sets, curved slatted living ensembles, and traditional hand-carved heritage furniture — handcrafted for homes across Kollam and Thiruvananthapuram.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#70482D]">
            <span className="px-3 py-1 rounded-full bg-white border border-[#DFD5C6] shadow-2xs">
              📍 Kollam Showroom
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#DFD5C6] shadow-2xs">
              📍 Thiruvananthapuram Showroom
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#DFD5C6] shadow-2xs">
              ✨ 100% Solid Seasoned Teak
            </span>
          </div>
        </div>

        {/* Editorial Collections List */}
        <div className="space-y-16">
          {collections.map((col, idx) => (
            <div
              key={col.id}
              className={`rounded-3xl border border-[#EAE2D9] overflow-hidden ${col.accent} p-6 sm:p-10 lg:p-12 transition-all hover:shadow-xl`}
            >
              {/* Collection Header Banner */}
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Left / Right */}
                <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A66A3A]" />
                    <span className="text-[11px] font-bold tracking-[0.25em] text-[#70482D] uppercase block">
                      {col.eyebrow} · {col.pieces}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241A14]">
                    {col.name}
                  </h2>

                  <p className="font-serif italic text-sm text-[#70482D]">
                    "{col.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed font-light">
                    {col.description}
                  </p>

                  {/* Material Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {col.materials.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/80 border border-[#DFD5C6] text-[#3A261B] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/shop?collection=${encodeURIComponent(col.name)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3A261B] text-[#F8F4EC] hover:bg-[#241A14] transition-all text-xs font-semibold tracking-wider uppercase shadow-md group"
                    >
                      <span>Explore {col.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={`https://wa.me/919447123456?text=Hello%20Anzari%20Furniture%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(col.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#DFD5C6] hover:border-[#25D366] text-[#241A14] text-xs font-medium hover:text-[#25D366] transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                      <span>Showroom WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Hero Showcase Imagery */}
                <div className={`lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-white border border-[#DFD5C6] ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Product Showcase Section inside Collection */}
              <div className="pt-6 border-t border-[#DFD5C6]/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#70482D]">
                    Featured Pieces in {col.name}
                  </span>
                  <Link
                    to={`/shop?collection=${encodeURIComponent(col.name)}`}
                    className="text-xs font-semibold text-[#3A261B] hover:text-[#70482D] transition-colors"
                  >
                    View all in shop →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {col.products.map((prod, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white rounded-2xl p-4 border border-[#DFD5C6] hover:border-[#A66A3A] hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#FAF7F2] relative">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#3A261B]/80 text-white text-[10px] font-medium backdrop-blur-xs">
                            In Stock
                          </span>
                        </div>

                        <h3 className="font-serif text-sm font-bold text-[#241A14] group-hover:text-[#70482D] transition-colors line-clamp-1">
                          {prod.name}
                        </h3>

                        <p className="text-[11px] text-[#70482D] mt-1 font-light line-clamp-2 leading-relaxed">
                          {prod.spec}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#DFD5C6]/50 flex items-center justify-between">
                        <div>
                          <span className="font-serif text-sm font-bold text-[#241A14]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.comparePrice && (
                            <span className="text-[10px] text-[#8C8379] line-through ml-2">
                              ₹{prod.comparePrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${prod.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#3A261B] group-hover:text-[#A66A3A] transition-colors"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Kerala Branches Banner */}
        <div className="mt-16 bg-[#3A261B] text-[#F8F4EC] rounded-3xl p-8 sm:p-12 border border-[#DFD5C6] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#D5C9BD] uppercase block">
                EXPERIENCE IN PERSON
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Visit Our Showrooms in Kollam &amp; Thiruvananthapuram
              </h2>
              <p className="text-xs sm:text-sm text-[#DFD5C6] leading-relaxed font-light">
                Feel the authentic weight of seasoned Burma teak, test dining seating comfort, and consult with our interior woodcraft specialists in person.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/about#stores"
                className="px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#241A14] text-xs font-semibold tracking-wider uppercase text-center hover:bg-white transition-all shadow-md"
              >
                View Showroom Addresses
              </Link>
              <a
                href="https://wa.me/919447123456?text=Hello%20Anzari%20Furniture%2C%20I%20would%20like%20to%20book%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold tracking-wider uppercase text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Book a Consultation</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollectionsPage;
