import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import NewsletterSubscriber from './models/NewsletterSubscriber.js';
import Category from './models/Category.js';
import Collection from './models/Collection.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ansari_furniture';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await NewsletterSubscriber.deleteMany({});
    await Category.deleteMany({});
    await Collection.deleteMany({});

    console.log('Previous database records cleared.');

    // Seed Users (User.create will trigger pre-save hook to hash password)
    const adminUser = await User.create({
      name: 'Ansari Administrator',
      email: 'admin@ansarifurniture.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210',
      addresses: [{
        fullName: 'Ansari Design Studio',
        phone: '+91 98765 43210',
        street: '42 Heritage Lane, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true,
      }],
    });

    const demoCustomer = await User.create({
      name: 'Aanya Sharma',
      email: 'aanya@example.com',
      password: 'customer123',
      role: 'customer',
      phone: '+91 98123 45678',
      addresses: [{
        fullName: 'Aanya Sharma',
        phone: '+91 98123 45678',
        street: '14 Lotus Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true,
      }],
    });

    console.log('Users created: Admin & Customer');

    // Seed Products (High quality realistic photography matching the editorial reference)
    const productsData = [
      {
        name: 'The Habitat Sofa',
        slug: 'the-habitat-sofa',
        description: 'An architectural centerpiece designed for effortless comfort. Featuring organic contours, plush textured bouclé upholstery, and a reinforced kiln-dried teak foundation. Designed to age gracefully in sunlit modern living rooms.',
        shortDescription: 'Organic curved 3-seater sofa with Italian textured bouclé.',
        price: 49999,
        compareAtPrice: 59999,
        category: 'Sofas',
        room: 'Living Room',
        collectionName: 'Milano Collection',
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80',
        material: 'Kiln-Dried Teak Wood & Textured Bouclé',
        dimensions: { width: 235, height: 78, depth: 95, unit: 'cm' },
        colors: [
          { name: 'Warm Ivory', hex: '#FAF7F2', bgClass: 'bg-[#FAF7F2]' },
          { name: 'Oatmeal Beige', hex: '#E2D7CB', bgClass: 'bg-[#E2D7CB]' },
          { name: 'Olive Green', hex: '#4A584C', bgClass: 'bg-[#4A584C]' },
        ],
        rating: 4.9,
        reviewCount: 38,
        stock: 14,
        featured: true,
        bestseller: true,
        badge: 'Hero Pick',
        tags: ['Bouclé', 'Curved', 'Living Room', 'Bestseller'],
        features: [
          'Handcrafted solid teakwood frame with joint mortise-and-tenon construction',
          'High-resilience multi-density foam core with feather-down blend top wrap',
          'Stain-resistant textured European bouclé weave',
          'Includes 2 coordinated accent bolster pillows'
        ]
      },
      {
        name: 'Luma Lounge Chair',
        slug: 'luma-lounge-chair',
        description: 'The Luma Lounge Chair balances understated geometry with exceptional cocooning relaxation. Crafted from natural ash wood with olive textured fabric, it embodies warm minimalism.',
        shortDescription: 'Sculpted accent chair with solid timber and plush padding.',
        price: 24999,
        compareAtPrice: 29999,
        category: 'Chairs',
        room: 'Living Room',
        collectionName: 'Nordic Living',
        images: [
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=80',
          'https://images.unsplash.com/photo-1580481077194-e0c55bd6374c?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1580481077194-e0c55bd6374c?w=1000&q=80',
        material: 'Solid Ash Wood & Textured Olive Linen',
        dimensions: { width: 78, height: 82, depth: 85, unit: 'cm' },
        colors: [
          { name: 'Forest Olive', hex: '#3E4B3E', bgClass: 'bg-[#3E4B3E]' },
          { name: 'Cream Sand', hex: '#EBE5DE', bgClass: 'bg-[#EBE5DE]' },
          { name: 'Warm Charcoal', hex: '#262624', bgClass: 'bg-[#262624]' }
        ],
        rating: 4.9,
        reviewCount: 42,
        stock: 19,
        featured: true,
        bestseller: true,
        badge: 'Bestseller',
        tags: ['Chairs', 'Lounge', 'Solid Wood'],
        features: ['Ergonomic lumbar slope', 'Hand-rubbed organic oil finish', 'Non-marking felt glides']
      },
      {
        name: 'Terra Dining Table',
        slug: 'terra-dining-table',
        description: 'A monument of organic dining elegance. Terra presents a circular fluted pedestal handcrafted from solid Indian walnut, inviting intimate family conversations and gatherings.',
        shortDescription: 'Solid walnut round pedestal dining table with beveled rim.',
        price: 39999,
        compareAtPrice: 47999,
        category: 'Tables',
        room: 'Dining Room',
        collectionName: 'Terra Collection',
        images: [
          'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80',
          'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80',
        material: '100% Solid Indian Walnut',
        dimensions: { width: 140, height: 76, depth: 140, unit: 'cm' },
        colors: [
          { name: 'Natural Walnut', hex: '#5C4033', bgClass: 'bg-[#5C4033]' },
          { name: 'Smoked Oak', hex: '#3F352E', bgClass: 'bg-[#3F352E]' }
        ],
        rating: 4.8,
        reviewCount: 29,
        stock: 12,
        featured: true,
        bestseller: true,
        badge: 'Bestseller',
        tags: ['Dining', 'Walnut', 'Pedestal Table'],
        features: ['Comfortably seats 6 adults', 'Protective matte sealant against heat and moisture']
      },
      {
        name: 'Astra Bed Frame',
        slug: 'astra-bed-frame',
        description: 'Immerse your evenings in tailored serenity. The Astra Bed Frame features an upholstered fluted headboard wrapped in breathable washed linen, framed by refined rounded oak joinery.',
        shortDescription: 'King-sized upholstered bed frame in natural linen and oak.',
        price: 54999,
        compareAtPrice: 65000,
        category: 'Beds',
        room: 'Bedroom',
        collectionName: 'Modern Essentials',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
          'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1000&q=80',
        material: 'American White Oak & Belgian Washed Linen',
        dimensions: { width: 190, height: 115, depth: 215, unit: 'cm' },
        colors: [
          { name: 'Pebble Grey', hex: '#D1CCC6', bgClass: 'bg-[#D1CCC6]' },
          { name: 'Warm Cream', hex: '#F7F3EC', bgClass: 'bg-[#F7F3EC]' },
          { name: 'Espresso', hex: '#2C221D', bgClass: 'bg-[#2C221D]' }
        ],
        rating: 5.0,
        reviewCount: 31,
        stock: 8,
        featured: true,
        bestseller: true,
        badge: 'Bestseller',
        tags: ['Bedroom', 'Linen', 'King Size'],
        features: ['Reinforced solid birch slat suspension', 'Zero-creak engineered mounting brackets']
      },
      {
        name: 'Nova Fabric Sofa',
        slug: 'nova-fabric-sofa',
        description: 'Deep seats, tailored French seams, and a relaxed silhouette make the Nova Sofa the ultimate sanctuary for modern living rooms. Upholstered in spill-resistant textured linen weave.',
        shortDescription: 'Relaxed deep-seat 3.5 seater with feather-blend cushions.',
        price: 64999,
        compareAtPrice: 74999,
        category: 'Sofas',
        room: 'Living Room',
        collectionName: 'Milano Collection',
        images: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
        material: 'Premium Linen Blend & Teak',
        dimensions: { width: 245, height: 80, depth: 102, unit: 'cm' },
        colors: [
          { name: 'Ivory Linen', hex: '#F4EFEB', bgClass: 'bg-[#F4EFEB]' },
          { name: 'Graphite', hex: '#3B3B39', bgClass: 'bg-[#3B3B39]' }
        ],
        rating: 4.9,
        reviewCount: 19,
        stock: 11,
        featured: false,
        bestseller: true,
        badge: 'Editorial Choice',
        tags: ['Sofa', 'Linen', 'Living Room'],
        features: ['Removable dry-cleanable cushion covers', 'High-density hypoallergenic fill']
      },
      {
        name: 'The Modern Woodcraft Dining Set',
        slug: 'the-modern-woodcraft-dining-set',
        description: 'Our signature dining ensemble. Comprises a substantial 8-seater solid teak table and 6 sculptural ergonomic chairs with gently curved backrests and woven paper-cord seats.',
        shortDescription: 'Signature 8-seater dining table with 6 sculpted chairs.',
        price: 89999,
        compareAtPrice: 105000,
        category: 'Tables',
        room: 'Dining Room',
        collectionName: 'Milano Collection',
        images: [
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=80',
          'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1000&q=80',
        material: 'Grade-A Sustainable Teak & Natural Danish Cord',
        dimensions: { width: 220, height: 76, depth: 100, unit: 'cm' },
        colors: [
          { name: 'Caramel Teak', hex: '#8B5A2B', bgClass: 'bg-[#8B5A2B]' },
          { name: 'Dark Walnut', hex: '#4B3621', bgClass: 'bg-[#4B3621]' }
        ],
        rating: 5.0,
        reviewCount: 22,
        stock: 5,
        featured: true,
        bestseller: false,
        badge: 'Featured Collection',
        tags: ['Dining Set', 'Teak', 'Artisan'],
        features: ['Includes 1 Table + 6 Sculpted Chairs', 'Lifetime warranty on timber stability']
      },
      {
        name: 'Aura Travertine Coffee Table',
        slug: 'aura-travertine-coffee-table',
        description: 'Sculpted from genuine Roman silver-veined travertine stone, with soft rounded organic edges and a low-slung stance. Every single piece displays a unique geological story.',
        shortDescription: 'Honed solid natural travertine round coffee table.',
        price: 32999,
        compareAtPrice: 38000,
        category: 'Tables',
        room: 'Living Room',
        collectionName: 'Terra Collection',
        images: [
          'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000&q=80',
          'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80',
        material: 'Italian Honed Travertine Stone',
        dimensions: { width: 95, height: 35, depth: 95, unit: 'cm' },
        colors: [
          { name: 'Warm Travertine', hex: '#E6D7C3', bgClass: 'bg-[#E6D7C3]' }
        ],
        rating: 4.9,
        reviewCount: 16,
        stock: 7,
        featured: true,
        bestseller: false,
        badge: 'Natural Stone',
        tags: ['Travertine', 'Coffee Table', 'Luxury'],
        features: ['Naturally stain-sealed surface', 'Solid heavy cylindrical fluted pedestal']
      },
      {
        name: 'Atelier Minimalist Oak Desk',
        slug: 'atelier-minimalist-oak-desk',
        description: 'Designed for focus, clarity, and aesthetic peace. Integrates discreet wire-routing cavities, two soft-close pencil drawers, and chamfered edges crafted from solid white oak.',
        shortDescription: 'Architectural executive writing desk with concealed cable channel.',
        price: 34999,
        compareAtPrice: 42000,
        category: 'Storage',
        room: 'Home Office',
        collectionName: 'Modern Essentials',
        images: [
          'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1000&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80',
        material: 'American White Oak & Brushed Brass Accents',
        dimensions: { width: 150, height: 75, depth: 70, unit: 'cm' },
        colors: [
          { name: 'Natural White Oak', hex: '#D3BFA7', bgClass: 'bg-[#D3BFA7]' },
          { name: 'Blackened Oak', hex: '#222222', bgClass: 'bg-[#222222]' }
        ],
        rating: 4.8,
        reviewCount: 15,
        stock: 9,
        featured: true,
        bestseller: false,
        badge: 'Home Office',
        tags: ['Desk', 'Office', 'Oak'],
        features: ['Integrated concealed cable storage hub', 'Dual seamless sliding drawers']
      },
      {
        name: 'Tivoli Rattan Sun Lounger',
        slug: 'tivoli-rattan-sun-lounger',
        description: 'Engineered for weatherproof open-air tranquility. Handwoven all-weather synthetic rattan over powder-coated aluminum chassis with quick-dry Sunbrella outdoor cushions.',
        shortDescription: 'All-weather teak and woven outdoor reclining lounger.',
        price: 27999,
        compareAtPrice: 32999,
        category: 'Chairs',
        room: 'Outdoor',
        collectionName: 'Outdoor Living',
        images: [
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
        material: 'Weatherproof Teak & UV-Resistant Sunbrella Fabric',
        dimensions: { width: 75, height: 38, depth: 200, unit: 'cm' },
        colors: [
          { name: 'Sand & Natural Teak', hex: '#DBCBB9', bgClass: 'bg-[#DBCBB9]' }
        ],
        rating: 4.7,
        reviewCount: 11,
        stock: 15,
        featured: false,
        bestseller: false,
        badge: 'Outdoor',
        tags: ['Outdoor', 'Patio', 'Lounger'],
        features: ['4 recline positions', 'Concealed rear wheels for smooth relocation', 'Quick-dry foam core']
      },
      {
        name: 'Vera Fluted Nightstand',
        slug: 'vera-fluted-nightstand',
        description: 'Subtle fluted tambour detailing with a brass drop handle. Perfect companion for restful bedroom spaces, featuring a soft-close drawer and lower open shelf for books.',
        shortDescription: 'Fluted wood bedside table with brass hardware.',
        price: 14999,
        compareAtPrice: 18000,
        category: 'Storage',
        room: 'Bedroom',
        collectionName: 'Modern Essentials',
        images: [
          'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1000&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
        material: 'Solid Ash Wood & Milled Brass',
        dimensions: { width: 50, height: 55, depth: 42, unit: 'cm' },
        colors: [
          { name: 'Muted Taupe Oak', hex: '#B8A89A', bgClass: 'bg-[#B8A89A]' },
          { name: 'Rich Walnut', hex: '#4A3525', bgClass: 'bg-[#4A3525]' }
        ],
        rating: 4.8,
        reviewCount: 24,
        stock: 22,
        featured: false,
        bestseller: true,
        badge: 'Best Value',
        tags: ['Nightstand', 'Bedroom', 'Storage'],
        features: ['Soft-close German drawer runners', 'Integrated hidden cord port']
      },
      {
        name: 'Komorebi Ceramic Table Lamp',
        slug: 'komorebi-ceramic-table-lamp',
        description: 'Hand-thrown terracotta ceramic base with an oatmeal linen drum shade. Casts a soothing, warm diffused glow reminiscent of twilight in a serene sanctuary.',
        shortDescription: 'Artisanal ceramic table lamp with linen diffuser.',
        price: 6999,
        compareAtPrice: 8500,
        category: 'Lighting',
        room: 'Accessories',
        collectionName: 'Terra Collection',
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80',
        material: 'Handcrafted Ceramic & Pure Linen Shade',
        dimensions: { width: 35, height: 52, depth: 35, unit: 'cm' },
        colors: [
          { name: 'Unglazed Terracotta', hex: '#C27A56', bgClass: 'bg-[#C27A56]' },
          { name: 'Chalk White', hex: '#F0ECE1', bgClass: 'bg-[#F0ECE1]' }
        ],
        rating: 4.9,
        reviewCount: 47,
        stock: 35,
        featured: true,
        bestseller: false,
        badge: 'Artisan Decor',
        tags: ['Lamp', 'Lighting', 'Accessories'],
        features: ['3-way dimmable switch', 'Braided vintage cotton electrical cord']
      },
      {
        name: 'Kyoto Solid Oak Bookshelf',
        slug: 'kyoto-solid-oak-bookshelf',
        description: 'An asymmetrical architectural shelving unit inspired by traditional Japanese carpentry. Designed without visible hardware for an airy, gallery-like presentation.',
        shortDescription: 'Open-backed architectural room divider and bookcase.',
        price: 45999,
        compareAtPrice: 52000,
        category: 'Storage',
        room: 'Living Room',
        collectionName: 'Nordic Living',
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=80',
          'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=1000&q=80'
        ],
        secondaryImage: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=1000&q=80',
        material: 'FSC-Certified Solid European Oak',
        dimensions: { width: 160, height: 185, depth: 36, unit: 'cm' },
        colors: [
          { name: 'Bleached Oak', hex: '#E4DACB', bgClass: 'bg-[#E4DACB]' },
          { name: 'Charcoal Wash', hex: '#333333', bgClass: 'bg-[#333333]' }
        ],
        rating: 4.9,
        reviewCount: 18,
        stock: 6,
        featured: false,
        bestseller: false,
        badge: 'Limited Run',
        tags: ['Bookshelf', 'Storage', 'Oak'],
        features: ['Mortise and tenon joints', 'Functions as room divider']
      }
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`Seeded ${insertedProducts.length} luxury furniture products.`);

    // Seed Sample Reviews
    const sampleReviews = [
      {
        product: insertedProducts[0]._id, // Habitat Sofa
        user: demoCustomer._id,
        userName: 'Aanya Sharma',
        userLocation: 'Bengaluru, India',
        rating: 5,
        title: 'The centerpiece of our living room!',
        comment: 'The quality and design are exceptional. Ansari Furniture completely transformed my living space. Truly worth every rupee. The bouclé fabric is so soft yet easy to maintain.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[0]._id,
        userName: 'Vikramaditya Roy',
        userLocation: 'Mumbai, India',
        rating: 5,
        title: 'Impeccable craftsmanship and comfort',
        comment: 'The curves are sculpted to perfection and the comfort is unmatched. White glove delivery was on time and assembled everything effortlessly.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[1]._id, // Luma Lounge Chair
        userName: 'Devika Singhania',
        userLocation: 'New Delhi, India',
        rating: 5,
        title: 'A work of art in the corner',
        comment: 'The olive green hue is subtle and earthy. It sits beautifully with our wooden floorboards. Absolutely love the joinery.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[2]._id, // Terra Dining Table
        userName: 'Rohan Mehra',
        userLocation: 'Pune, India',
        rating: 5,
        title: 'Solid walnut at its best',
        comment: 'Sturdy, perfectly proportioned, and our family dinners feel so much more intimate around a round table.',
        verifiedBuyer: true,
      }
    ];

    await Review.insertMany(sampleReviews);
    console.log('Seeded customer reviews.');

    // Seed Sample Order for Aanya
    await Order.create({
      orderNumber: 'ANS-2026-894102',
      user: demoCustomer._id,
      customerDetails: {
        fullName: 'Aanya Sharma',
        email: 'aanya@example.com',
        phone: '+91 98123 45678',
      },
      items: [{
        product: insertedProducts[0]._id,
        name: insertedProducts[0].name,
        price: insertedProducts[0].price,
        quantity: 1,
        image: insertedProducts[0].images[0],
        color: 'Warm Ivory',
      }],
      shippingAddress: {
        street: '14 Lotus Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
      },
      deliveryMethod: 'Standard White Glove',
      paymentMethod: 'Card / UPI',
      paymentStatus: 'Completed',
      subtotal: 49999,
      discount: 0,
      shippingFee: 0,
      tax: 0,
      total: 49999,
      status: 'Delivered',
      trackingCode: 'ANS-IND-778921',
    });

    // Seed Newsletter subscriber
    await NewsletterSubscriber.create({
      email: 'aanya@example.com',
      status: 'active'
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
