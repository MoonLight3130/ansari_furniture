import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Leaf, Award, HeartHandshake } from 'lucide-react';

const AboutPage = () => {
  const studios = [
    {
      city: 'Mumbai Experience Studio',
      address: '42 Heritage Lane, Near Pali Hill, Bandra West',
      phone: '+91 22 4589 1200',
      hours: 'Tue - Sun: 11:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
    },
    {
      city: 'Bengaluru Sanctuary',
      address: '108 Indiranagar 100ft Road, Stage 2',
      phone: '+91 80 6712 9900',
      hours: 'Tue - Sun: 10:30 AM - 7:30 PM',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&q=80',
    },
    {
      city: 'New Delhi Design Gallery',
      address: 'The Dhan Mill Compound, 100 Feet Rd, Chhatarpur',
      phone: '+91 11 2945 7700',
      hours: 'Mon - Sun: 11:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=700&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        
        {/* Hero Narrative */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-medium tracking-[0.3em] text-[#736B63] uppercase block">
            OUR HERITAGE &amp; ETHOS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1F2520] tracking-tight leading-tight">
            Furniture Crafted for Generations, Not Seasons.
          </h1>
          <p className="text-xs sm:text-base text-[#5C564F] leading-relaxed font-light pt-2">
            Founded with a reverent love for natural hardwoods and mindful living, Ansari Furniture designs heirloom-grade pieces that cultivate serenity, honest tactile beauty, and lasting warmth in modern spaces.
          </p>
        </div>

        {/* Big Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 rounded-3xl overflow-hidden aspect-[16/10] shadow-lg border border-[#EAE2D9]">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85"
              alt="Craftsmanship workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-4 bg-[#F3EDE4] rounded-3xl p-8 border border-[#EAE2D9] space-y-4">
            <span className="font-serif text-3xl font-bold text-[#1F2520] block">15+ Years</span>
            <p className="text-xs text-[#5C564F] leading-relaxed font-light">
              Every curve, chamfer, and mortise in our workshop is shaped by multigenerational carpenters honoring traditional joinery without visible screws or toxic lacquers.
            </p>
            <div className="pt-4 border-t border-[#DED6CC] flex items-center gap-3">
              <Leaf className="w-5 h-5 text-[#3E4E42]" />
              <span className="text-xs font-semibold text-[#1F2520]">100% Certified Sustainable Teak</span>
            </div>
          </div>
        </div>

        {/* Sustainability Pillars */}
        <div id="sustainability" className="py-10 border-y border-[#EAE2D9]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block mb-1">
              SUSTAINABILITY PLEDGE
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#1F2520]">
              Designing for a Kinder Tomorrow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] space-y-3">
              <Leaf className="w-6 h-6 text-[#3E4E42]" />
              <h3 className="font-serif text-lg font-bold text-[#1F2520]">Regenerative Forestry</h3>
              <p className="text-xs text-[#5C564F] leading-relaxed font-light">
                For every timber harvest, we plant five native hardwood saplings across the Western Ghats to preserve biodiversity and soil health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#3E4E42]" />
              <h3 className="font-serif text-lg font-bold text-[#1F2520]">Non-Toxic Organic Oils</h3>
              <p className="text-xs text-[#5C564F] leading-relaxed font-light">
                Our timber is nourished with raw cold-pressed linseed oils, food-grade beeswax, and zero VOC plant resins safe for homes with children.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#3E4E42]" />
              <h3 className="font-serif text-lg font-bold text-[#1F2520]">Living Wages for Artisans</h3>
              <p className="text-xs text-[#5C564F] leading-relaxed font-light">
                We empower craft families with comprehensive healthcare, safe solar-powered workspaces, and transparent fair-trade compensation.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Studios (Visit Our Store Anchor) */}
        <div id="stores" className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block mb-1">
              PHYSICAL SPACES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              Visit Our Experience Studios
            </h2>
            <p className="text-xs text-[#736B63] mt-2 font-light">
              Experience the tactile weight of solid walnut, test seat depths, and consult with our interior architects over herbal tea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studios.map((s) => (
              <div key={s.city} className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D9] shadow-sm flex flex-col justify-between">
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                  <img src={s.image} alt={s.city} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1F2520]">{s.city}</h3>
                    <p className="text-xs text-[#5C564F] mt-1 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#7B5E43] mt-0.5" />
                      <span>{s.address}</span>
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F4EFEB] space-y-1.5 text-xs text-[#736B63]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{s.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{s.hours}</span>
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
