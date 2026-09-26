import React, { useState } from 'react';
import { ArrowRight, Leaf, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/newsletter/subscribe', { email: cleanEmail });
      setSubscribed(true);
      addToast(res.data?.message || 'Subscribed successfully!');
      setEmail('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Subscription failed. Please try again.';
      if (err.code === '23505' || errorMsg.toLowerCase().includes('already subscribed')) {
        addToast('You are already subscribed to the Ansari Furniture journal.', 'info');
      } else {
        addToast(errorMsg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative bg-[#F3EDE4] rounded-3xl p-8 sm:p-14 lg:p-16 border border-[#EAE2D9] overflow-hidden">
          
          {/* Decorative subtle botanical leaves */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-[#EAE2D9]/40 flex items-center justify-center text-[#4A584C]/15 pointer-events-none">
            <Leaf className="w-36 h-36 rotate-45" />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase mb-2 block">
              JOIN OUR COMMUNITY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520] tracking-tight leading-tight mb-3">
              Design for a Kinder Tomorrow
            </h2>

            <p className="text-xs sm:text-sm text-[#5C564F] leading-relaxed mb-8 font-light">
              Receive private collection previews, architectural home tours, seasonal material guides, and a warm welcome offer of 10% off your first heirloom order.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-white/80 rounded-2xl border border-[#D5C9BD] text-[#2A352C]">
                <CheckCircle2 className="w-5 h-5 text-[#354238]" />
                <span className="text-xs font-semibold">
                  Thank you for subscribing. Use code <strong>WELCOME10</strong> at checkout for 10% off!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-white border border-[#DED6CC] text-xs text-[#1F2520] placeholder-[#8C8379] focus:outline-none focus:border-[#1F2520] shadow-xs"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <span className="block text-[10px] text-[#8C8379] mt-4 font-light">
              We respect your sanctuary. Unsubscribe seamlessly at any time.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
