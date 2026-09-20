import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Leaf, Award, HeartHandshake, MessageCircle, Navigation } from 'lucide-react';

const AboutPage = () => {
  const branches = [
    {
      city: 'Kollam Showroom',
      tag: 'FLAGSHIP EXPERIENCE CENTRE',
      name: 'Anzari Furniture - Kollam',
      address: 'Main Showroom, NH 66, Near High School Junction, Chinnakada, Kollam, Kerala - 691001',
      phone: '+91 94471 23456 / 0474 274 5678',
      email: 'kollam@anzarifurniture.com',
      hours: 'Mon - Sun: 9:30 AM - 8:30 PM',
      image: '/images/showroom/hero_showroom.jpg',
      whatsapp: '919447123456',
      highlights: [
        '3-Floor Master Teak Dining & Living Gallery',
        'Traditional Ring-Arm & Baluster Diwan Display',
        'Direct Woodwork Customization Desk',
        'Spacious Customer Valet Parking',
      ],
    },
    {
      city: 'Thiruvananthapuram Showroom',
      tag: 'CAPITAL DESIGN GALLERY',
      name: 'Anzari Furniture - Thiruvananthapuram',
      address: 'Flagship Gallery, MC Road, Pattom - Kowdiar Avenue, Thiruvananthapuram, Kerala - 695004',
      phone: '+91 94472 34567 / 0471 245 6789',
      email: 'tvm@anzarifurniture.com',
      hours: 'Mon - Sun: 9:30 AM - 8:30 PM',
      image: '/images/showroom/teak_oval_dining.jpg',
      whatsapp: '919447234567',
      highlights: [
        'Luxury Beveled Glass & Teak Dining Pavilion',
        'Curved Slatted Settee & Living Room Lounge',
        'Architect & Interior Consultant Studio',
        'Statewide White-Glove Installation Hub',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        
        {/* Hero Narrative */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#70482D] uppercase">
              OUR KERALA HERITAGE &amp; ETHOS
            </span>
            <span className="w-6 h-[1.5px] bg-[#A66A3A]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#241A14] tracking-tight leading-tight">
            Heirloom Furniture Crafted for Generations.
          </h1>
          <p className="text-xs sm:text-base text-[#5A4B40] leading-relaxed font-light pt-2">
            Rooted in Kerala's legendary woodcraft traditions, Anzari Furniture designs heirloom-grade pieces from seasoned Burma and Nilambur teakwood. Serving discerning families with grand showrooms in <strong className="font-semibold text-[#241A14]">Kollam</strong> and <strong className="font-semibold text-[#241A14]">Thiruvananthapuram</strong>.
          </p>
        </div>

        {/* Big Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 rounded-3xl overflow-hidden aspect-[16/10] shadow-lg border border-[#DFD5C6] bg-white group">
            <img
              src="/images/showroom/hero_showroom.jpg"
              alt="Anzari Furniture Showroom in Kerala"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="md:col-span-4 bg-[#F5EFEB] rounded-3xl p-8 border border-[#DFD5C6] space-y-4 shadow-xs">
            <span className="font-serif text-3xl font-bold text-[#241A14] block">15+ Years</span>
            <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed font-light">
              Every curve, chamfer, and mortise in our furniture is carved by multigenerational Kerala carpenters honoring authentic joinery without visible screws or toxic lacquers.
            </p>
            <div className="pt-4 border-t border-[#DFD5C6] flex items-center gap-3">
              <Leaf className="w-5 h-5 text-[#3E4E42]" />
              <span className="text-xs font-semibold text-[#241A14]">100% Seasoned Burma &amp; Nilambur Teak</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#A66A3A]" />
              <span className="text-xs font-semibold text-[#241A14]">Lifetime Anti-Termite Guarantee</span>
            </div>
          </div>
        </div>

        {/* Sustainability & Quality Pillars */}
        <div id="sustainability" className="py-10 border-y border-[#DFD5C6]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#70482D] uppercase block mb-1">
              OUR PROMISE TO YOUR HOME
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#241A14]">
              Crafted With Uncompromising Honesty
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#DFD5C6] space-y-3 shadow-xs">
              <Leaf className="w-6 h-6 text-[#3E4E42]" />
              <h3 className="font-serif text-lg font-bold text-[#241A14]">Kiln-Dried Hardwood</h3>
              <p className="text-xs text-[#5A4B40] leading-relaxed font-light">
                Our timber is meticulously moisture-tested and seasoned to endure coastal Kerala humidity without warping, bending, or splitting.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#DFD5C6] space-y-3 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#A66A3A]" />
              <h3 className="font-serif text-lg font-bold text-[#241A14]">Organic Plant-Oil Polish</h3>
              <p className="text-xs text-[#5A4B40] leading-relaxed font-light">
                Finished with natural cold-pressed linseed oils and beeswax that let the natural timber breathe, safe for households with young children.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#DFD5C6] space-y-3 shadow-xs">
              <HeartHandshake className="w-6 h-6 text-[#70482D]" />
              <h3 className="font-serif text-lg font-bold text-[#241A14]">Kerala Artisan Heritage</h3>
              <p className="text-xs text-[#5A4B40] leading-relaxed font-light">
                We empower multigenerational woodworking families across Kerala with living wages, ethical timber procurement, and safe ateliers.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Studios — KOLLAM & THIRUVANANTHAPURAM */}
        <div id="stores" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#70482D] uppercase block mb-1">
              TWO SHOWROOM BRANCHES IN KERALA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#241A14]">
              Visit Our Experience Showrooms
            </h2>
            <p className="text-xs sm:text-sm text-[#70482D] mt-3 font-light leading-relaxed">
              Step into our spacious showrooms in <strong className="font-semibold text-[#241A14]">Kollam</strong> and <strong className="font-semibold text-[#241A14]">Thiruvananthapuram</strong> to feel the solid weight of authentic Burma teak, test seat depths, and discuss bespoke timber suites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branches.map((b) => (
              <div
                key={b.city}
                className="bg-white rounded-3xl overflow-hidden border border-[#DFD5C6] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow group"
              >
                {/* Branch Showcase Image */}
                <div className="aspect-[16/10] overflow-hidden bg-[#F5EFEB] relative">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#241A14]/85 text-[#F8F4EC] backdrop-blur-xs">
                      {b.tag}
                    </span>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#241A14]">
                      {b.name}
                    </h3>
                    
                    <p className="text-xs text-[#5A4B40] mt-3 flex items-start gap-2.5 leading-relaxed">
                      <MapPin className="w-4 h-4 shrink-0 text-[#A66A3A] mt-0.5" />
                      <span>{b.address}</span>
                    </p>

                    {/* Highlights List */}
                    <div className="mt-4 pt-4 border-t border-[#DFD5C6]/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#70482D] block mb-2">
                        Showroom Features:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {b.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2 text-[11px] text-[#3A261B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A66A3A]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact Info & Action Buttons */}
                  <div className="pt-4 border-t border-[#DFD5C6] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5A4B40]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#A66A3A]" />
                        <span className="font-medium">{b.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#A66A3A]" />
                        <span>{b.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`https://wa.me/${b.whatsapp}?text=Hello%20Anzari%20Furniture%2C%20I%20would%20like%20to%20visit%20your%20${encodeURIComponent(b.city)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-all shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Chat with {b.city.replace(' Showroom', '')} Branch</span>
                      </a>

                      <a
                        href={`tel:${b.phone.split('/')[0].trim().replace(/\s+/g, '')}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#3A261B] text-[#F8F4EC] text-xs font-semibold hover:bg-[#241A14] transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Now</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
