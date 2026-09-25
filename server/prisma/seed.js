import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to Supabase PostgreSQL via Prisma...');

  // Clean existing records in reverse dependency order
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  console.log('Cleared existing tables.');

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  // 1. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Ansari Administrator',
      email: 'admin@ansarifurniture.com',
      password: adminPassword,
      role: 'admin',
      phone: '+91 98765 43210',
      addresses: {
        create: [
          {
            fullName: 'Ansari Furniture Showroom',
            phone: '+91 98765 43210',
            street: '42 Heritage Timber Lane, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            isDefault: true,
          },
        ],
      },
    },
  });

  const demoCustomer = await prisma.user.create({
    data: {
      name: 'Aanya Sharma',
      email: 'aanya@example.com',
      password: customerPassword,
      role: 'customer',
      phone: '+91 98123 45678',
      addresses: {
        create: [
          {
            fullName: 'Aanya Sharma',
            phone: '+91 98123 45678',
            street: '14 Lotus Enclave, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log('Created Users:', adminUser.email, demoCustomer.email);

  // 2. Categories
  const categories = [
    { name: 'Sofas', slug: 'sofas', description: 'Curved, slatted, and upholstered statement seating.', image: '/images/showroom/slatted_sofa_set.jpg', itemCount: 14 },
    { name: 'Chairs', slug: 'chairs', description: 'Traditional ring-arm benches, armchairs, and dining seats.', image: '/images/showroom/circular_motif_bench.jpg', itemCount: 22 },
    { name: 'Tables', slug: 'tables', description: 'Solid teak oval glass dining tables and trestles.', image: '/images/showroom/teak_oval_dining.jpg', itemCount: 18 },
    { name: 'Beds', slug: 'beds', description: 'Carved wooden poster beds and luxury headboards.', image: '/images/showroom/hero_showroom.jpg', itemCount: 9 },
    { name: 'Storage', slug: 'storage', description: 'Heritage teak buffets, credenzas, and consoles.', image: '/images/showroom/craftsmanship_macro.jpg', itemCount: 12 },
    { name: 'Lighting', slug: 'lighting', description: 'Warm brass and hand-blown glass luminaires.', image: '/images/showroom/hero_showroom.jpg', itemCount: 15 },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }
  console.log(`Created ${categories.length} Categories.`);

  // 3. Collections
  const collections = [
    {
      name: 'Teak Collection',
      slug: 'teak-collection',
      eyebrow: 'TIMELESS HARDWOOD',
      tagline: 'Centuries of Indian Timber Excellence',
      description: 'Hand-rubbed Indian teak with natural grain movement, built to last generations.',
      heroImage: '/images/showroom/teak_oval_dining.jpg',
      secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
      accentColor: '#8B5A2B',
      itemCount: 28,
    },
    {
      name: 'Modern Collection',
      slug: 'modern-collection',
      eyebrow: 'ARCHITECTURAL LINES',
      tagline: 'Geometric Craftsmanship Meets Clarity',
      description: 'Crisp X-trestles, beveled tempered crystal, and minimalist wood joints.',
      heroImage: '/images/showroom/cross_leg_dining.jpg',
      secondaryImage: '/images/showroom/hero_showroom.jpg',
      accentColor: '#1C251E',
      itemCount: 19,
    },
    {
      name: 'Traditional Collection',
      slug: 'traditional-collection',
      eyebrow: 'HERITAGE CARVINGS',
      tagline: 'Authentic Indian Circular Motifs',
      description: 'Turned baluster legs, circular wheel armrests, and ornamental woodcraft.',
      heroImage: '/images/showroom/circular_motif_bench.jpg',
      secondaryImage: '/images/showroom/slatted_sofa_set.jpg',
      accentColor: '#631B2A',
      itemCount: 16,
    },
  ];

  for (const col of collections) {
    await prisma.collection.create({ data: col });
  }
  console.log(`Created ${collections.length} Collections.`);

  // 4. Products
  const products = [
    {
      name: 'Royal Teak Oval Dining Set',
      slug: 'royal-teak-oval-dining-set',
      description: 'Mastercrafted oval dining suite carved from seasoned Indian teakwood and crowned with a 12mm beveled crystal glass top. Supported by an intricately hand-sculpted fluted pedestal and accompanied by six matching carved dining chairs with cognac leatherette seats.',
      shortDescription: 'Solid Teak Wood · 6 Seater · Beveled Glass Top',
      price: 68999,
      compareAtPrice: 84999,
      category: 'Tables',
      room: 'Dining Room',
      collectionName: 'Teak Collection',
      images: [
        '/images/showroom/teak_oval_dining.jpg',
        '/images/showroom/hero_showroom.jpg',
        '/images/showroom/craftsmanship_macro.jpg',
      ],
      secondaryImage: '/images/showroom/hero_showroom.jpg',
      material: 'Solid Teak Wood & Beveled Tempered Glass',
      dimensions: { width: 210, height: 76, depth: 110, unit: 'cm' },
      colors: [
        { name: 'Warm Honey Teak', hex: '#A66A3A', bgClass: 'bg-[#A66A3A]' },
        { name: 'Deep Walnut Gloss', hex: '#3A261B', bgClass: 'bg-[#3A261B]' },
        { name: 'Natural Matte Teak', hex: '#8B5A2B', bgClass: 'bg-[#8B5A2B]' },
      ],
      rating: 5.0,
      reviewCount: 46,
      stock: 8,
      featured: true,
      bestseller: true,
      badge: 'Showroom Hero',
      tags: ['Solid Teak', 'Dining Set', 'Glass Top', '6 Seater', 'Handcrafted'],
      features: [
        'Hand-carved solid teak fluted pedestal with acanthus relief detailing',
        '12mm toughened beveled glass top with rounded safety corners',
        '6 ergonomic carved chairs with padded high-resilience cognac leatherette',
        'Treated against termites with natural neem extract and hand-rubbed oil polish',
      ],
      careInstructions: 'Clean glass with a microfiber cloth. Polish wood twice a year with natural beeswax.',
    },
    {
      name: 'Contemporary X-Trestle Glass Dining Suite',
      slug: 'contemporary-x-trestle-glass-dining-suite',
      description: 'An architectural union of geometric craftsmanship and contemporary warmth. Features bold crisscross X-trestle solid teak timber trestles holding a seamless tempered glass surface, paired with six high-back vertical-slatted ergonomic chairs.',
      shortDescription: 'Solid Teak Wood · Modern X-Base · 6 High-Back Chairs',
      price: 58999,
      compareAtPrice: 72000,
      category: 'Tables',
      room: 'Dining Room',
      collectionName: 'Modern Collection',
      images: [
        '/images/showroom/cross_leg_dining.jpg',
        '/images/showroom/hero_showroom.jpg',
        '/images/showroom/craftsmanship_macro.jpg',
      ],
      secondaryImage: '/images/showroom/hero_showroom.jpg',
      material: 'Kiln-Dried Solid Teak & Clear Glass',
      dimensions: { width: 200, height: 76, depth: 100, unit: 'cm' },
      colors: [
        { name: 'Golden Teak Finish', hex: '#C48A49', bgClass: 'bg-[#C48A49]' },
        { name: 'Smoked Walnut', hex: '#3A261B', bgClass: 'bg-[#3A261B]' },
      ],
      rating: 4.9,
      reviewCount: 38,
      stock: 12,
      featured: true,
      bestseller: true,
      badge: 'Bestseller',
      tags: ['Contemporary', 'X-Trestle', 'Glass Top', 'Dining', 'Slatted'],
      features: [
        'Heavy-gauge interlocking X-trestle solid teakwood joinery',
        '10mm crystal clear polished tempered glass top with suction pads',
        '6 high-back vertical slatted solid teak dining chairs with cushioned seats',
        'Non-scratch nylon leveler glides for marble and tile floors',
      ],
      careInstructions: 'Wipe glass surface with glass cleaner. Dust wood with soft dry cloth.',
    },
    {
      name: 'Heritage Ring-Arm Solid Teak Bench',
      slug: 'heritage-ring-arm-solid-teak-bench',
      description: 'A traditional Indian heritage showpiece celebrating authentic woodturning and carving. Features distinctive hand-carved circular ring motifs along the curved armrests, high curved vertical-slat backrest, and high-gloss honey teak finish.',
      shortDescription: 'Traditional Solid Teak · Carved Circular Armrests',
      price: 34999,
      compareAtPrice: 42000,
      category: 'Chairs',
      room: 'Living Room',
      collectionName: 'Traditional Collection',
      images: [
        '/images/showroom/circular_motif_bench.jpg',
        '/images/showroom/craftsmanship_macro.jpg',
        '/images/showroom/hero_showroom.jpg',
      ],
      secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
      material: '100% Solid Indian Teak Wood',
      dimensions: { width: 180, height: 95, depth: 65, unit: 'cm' },
      colors: [
        { name: 'Gloss Honey Teak', hex: '#D68936', bgClass: 'bg-[#D68936]' },
        { name: 'Antique Rosewood', hex: '#5A2A18', bgClass: 'bg-[#5A2A18]' },
      ],
      rating: 4.9,
      reviewCount: 29,
      stock: 6,
      featured: true,
      bestseller: true,
      badge: 'Handcrafted',
      tags: ['Traditional', 'Bench', 'Ring Motif', 'Living Room', 'Solid Wood'],
      features: [
        'Iconic concentric carved ring motif crafted from single solid wood timber',
        'Contoured lumbar curved slatted backrest for comfortable posture',
        'Turned solid wood baluster legs with heavy weight-bearing capacity',
        'Includes detachable linen-blend bench cushion for additional softness',
      ],
      careInstructions: 'Protect from excessive rain or direct harsh sunlight. Wipe with dry flannel cloth.',
    },
    {
      name: 'Nawab Curved Slatted Sofa Ensemble',
      slug: 'nawab-curved-slatted-sofa-ensemble',
      description: 'Grand 5-seater showroom ensemble comprising a 3-seater curved slatted sofa, two matching armchairs, and an oval slatted coffee table with glass top. Finished in rich honey teak with deep maroon-wine cushioned upholstery.',
      shortDescription: 'Solid Teak Wood · 3+1+1 Suite & Oval Glass Table',
      price: 89999,
      compareAtPrice: 105000,
      category: 'Sofas',
      room: 'Living Room',
      collectionName: 'Teak Collection',
      images: [
        '/images/showroom/slatted_sofa_set.jpg',
        '/images/showroom/craftsmanship_macro.jpg',
        '/images/showroom/hero_showroom.jpg',
      ],
      secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
      material: 'Solid Teakwood & Rich Wine Chenille',
      dimensions: { width: 220, height: 85, depth: 90, unit: 'cm' },
      colors: [
        { name: 'Royal Wine Maroon', hex: '#631B2A', bgClass: 'bg-[#631B2A]' },
        { name: 'Warm Amber Gold', hex: '#C2843A', bgClass: 'bg-[#C2843A]' },
        { name: 'Classic Cream Brocade', hex: '#F0E7D8', bgClass: 'bg-[#F0E7D8]' },
      ],
      rating: 5.0,
      reviewCount: 31,
      stock: 5,
      featured: true,
      bestseller: true,
      badge: 'Masterpiece',
      tags: ['Sofa Set', 'Slatted', 'Living Room', 'Wine Cushion', '3+1+1'],
      features: [
        'Full 5-seater ensemble: 1 three-seater, 2 single armchairs, 1 coffee table',
        'Steam-bent curved teakwood frame with vertical slatted surround',
        'High-density 40D foam wrapped in stain-resistant chenille upholstery',
        'Matching solid teak oval coffee table with tempered glass top included',
      ],
      careInstructions: 'Vacuum fabric cushions regularly. Wipe teakwood frame with beeswax polish.',
    },
  ];

  const createdProducts = [];
  for (const prod of products) {
    const p = await prisma.product.create({ data: prod });
    createdProducts.push(p);
  }
  console.log(`Created ${createdProducts.length} Products.`);

  // 5. Reviews
  await prisma.review.create({
    data: {
      productId: createdProducts[0].id,
      userId: demoCustomer.id,
      userName: 'Aanya Sharma',
      userLocation: 'Bengaluru, India',
      rating: 5,
      title: 'Stunning centerpiece for our dining room',
      comment: 'The craftsmanship of the fluted pedestal and the solid teak chairs is breathtaking. Delivered in pristine condition.',
      verifiedBuyer: true,
    },
  });

  await prisma.review.create({
    data: {
      productId: createdProducts[1].id,
      userName: 'Rohan Mehra',
      userLocation: 'Pune, India',
      rating: 5,
      title: 'Perfect combination of modern lines and teak wood',
      comment: 'The crisscross X-legs with glass top look so light yet the table is rock solid. Matches our contemporary apartment perfectly.',
      verifiedBuyer: true,
    },
  });

  // 6. Sample Order
  await prisma.order.create({
    data: {
      orderNumber: 'ANS-2026-908231',
      userId: demoCustomer.id,
      customerDetails: {
        fullName: 'Aanya Sharma',
        email: 'aanya@example.com',
        phone: '+91 98123 45678',
      },
      shippingAddress: {
        street: '14 Lotus Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
      },
      deliveryMethod: 'Standard White Glove',
      paymentMethod: 'Card / UPI',
      paymentStatus: 'Completed',
      subtotal: 68999,
      discount: 0,
      shippingFee: 0,
      tax: 0,
      total: 68999,
      status: 'Delivered',
      trackingCode: 'ANS-IND-908231',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            name: createdProducts[0].name,
            price: createdProducts[0].price,
            quantity: 1,
            image: createdProducts[0].images[0],
            color: 'Warm Honey Teak',
          },
        ],
      },
    },
  });

  // 7. Newsletter Subscriber
  await prisma.newsletterSubscriber.create({
    data: {
      email: 'aanya@example.com',
      status: 'active',
    },
  });

  console.log('✅ Supabase PostgreSQL seeded successfully via Prisma!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
