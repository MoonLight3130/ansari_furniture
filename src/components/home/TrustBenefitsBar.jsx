import React from 'react';
import { Truck, CreditCard, ShieldCheck, Headphones, ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrustBenefitsBar = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'Across India',
    },
    {
      icon: CreditCard,
      title: 'Easy EMI',
      subtitle: 'Options',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: '100% Safe & Secure',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      subtitle: "We're Here to Help",
    },
  ];

  return (
    <section className="bg-[#F4EFEB] border-b border-[#EAE2D9] py-5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left 4 Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#EAE2D9] flex items-center justify-center text-[#1F2520] shrink-0">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1F2520]">{b.title}</h4>
                    <p className="text-[11px] text-[#736B63]">{b.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Botanical Leaf Accent + Sustainability link (exact recreation from reference) */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EAE2D9] w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 text-left">
              {/* Decorative botanical illustration */}
              <div className="w-8 h-8 rounded-full bg-[#EAE2D9] flex items-center justify-center text-[#3E4E42]">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-script text-base text-[#4A584C] font-semibold leading-none block">
                  Crafted for a kinder tomorrow
                </span>
              </div>
            </div>

            <Link
              to="/about#sustainability"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2520] hover:text-[#7B5E43] group transition-colors whitespace-nowrap"
            >
              <span>Our Sustainability</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBenefitsBar;
