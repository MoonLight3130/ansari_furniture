import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBenefitsBar from '../components/home/TrustBenefitsBar';
import ShopByRoomSection from '../components/home/ShopByRoomSection';
import FeaturedCollectionSection from '../components/home/FeaturedCollectionSection';
import AsymmetricStoryGrid from '../components/home/AsymmetricStoryGrid';
import EditorialStorySection from '../components/home/EditorialStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import JournalSection from '../components/home/JournalSection';
import NewsletterSection from '../components/home/NewsletterSection';
import QuickViewModal from '../components/common/QuickViewModal';
import VideoModal from '../components/common/VideoModal';
import api from '../services/api';

const HomePage = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const res = await api.get('/products/bestsellers');
        setBestsellers(res.data || []);
      } catch (err) {
        console.error('Failed to load bestsellers from API:', err);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Hero Section - Exact match to reference image with sofa floating tag & stats */}
      <HeroSection onQuickViewProduct={(p) => setQuickViewProduct(p)} />

      {/* 2. Trust Benefits Bar with botanical leaf accent */}
      <TrustBenefitsBar />

      {/* 3. Shop by Room - Circular vignettes */}
      <ShopByRoomSection />

      {/* 4. Featured Collection - The Modern Woodcraft / Split panel with dark green accent */}
      <FeaturedCollectionSection />

      {/* 5. Asymmetric Bottom 3-Block Grid (More Than Furniture + Bestsellers + Turn Houses into Homes) */}
      <AsymmetricStoryGrid
        bestsellers={bestsellers}
        onWatchStory={() => setIsVideoModalOpen(true)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 6. Editorial Craftsmanship & Dining Narrative */}
      <EditorialStorySection />

      {/* 7. Client Testimonials */}
      <TestimonialsSection />

      {/* 8. Editorial Inspiration Journal */}
      <JournalSection />

      {/* 9. Botanical Newsletter */}
      <NewsletterSection />

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
