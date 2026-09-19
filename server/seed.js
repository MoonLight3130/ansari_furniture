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

    // Seed Users
    const adminUser = await User.create({
      name: 'Ansari Administrator',
      email: 'admin@ansarifurniture.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210',
      addresses: [{
        fullName: 'Ansari Furniture Showroom',
        phone: '+91 98765 43210',
        street: '42 Heritage Timber Lane, Bandra West',
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

    // Seed Products — matching the showroom reference image
    const productsData = [
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
          '/images/showroom/craftsmanship_macro.jpg'
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
          'Treated against termites with natural neem extract and hand-rubbed oil polish'
        ],
        careInstructions: 'Clean glass with a microfiber cloth. Polish wood twice a year with natural beeswax.'
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
          '/images/showroom/craftsmanship_macro.jpg'
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
          'Non-scratch nylon leveler glides for marble and tile floors'
        ],
        careInstructions: 'Wipe glass surface with glass cleaner. Dust wood with soft dry cloth.'
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
          '/images/showroom/hero_showroom.jpg'
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
          'Includes detachable linen-blend bench cushion for additional softness'
        ],
        careInstructions: 'Protect from excessive rain or direct harsh sunlight. Wipe with dry flannel cloth.'
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
          '/images/showroom/hero_showroom.jpg'
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
          'Matching solid teak oval coffee table with tempered glass top included'
        ],
        careInstructions: 'Vacuum fabric cushions regularly. Wipe teakwood frame with beeswax polish.'
      },
      {
        name: 'Shahi Hand-Carved Ring-Armchair',
        slug: 'shahi-hand-carved-ring-armchair',
        description: 'Single accent armchair matching our Heritage Ring-Arm series. Features carved circular wheel motifs on the armrests, ergonomic curved lumbar contour, and brilliant satin lacquer.',
        shortDescription: 'Solid Teak Accent Armchair with Ring Motifs',
        price: 16999,
        compareAtPrice: 21000,
        category: 'Chairs',
        room: 'Living Room',
        collectionName: 'Traditional Collection',
        images: [
          '/images/showroom/circular_motif_bench.jpg',
          '/images/showroom/craftsmanship_macro.jpg'
        ],
        secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
        material: 'Solid Indian Teak Wood',
        dimensions: { width: 75, height: 95, depth: 65, unit: 'cm' },
        colors: [
          { name: 'Gloss Honey Teak', hex: '#D68936', bgClass: 'bg-[#D68936]' },
          { name: 'Walnut Brown', hex: '#4A3525', bgClass: 'bg-[#4A3525]' },
        ],
        rating: 4.8,
        reviewCount: 19,
        stock: 15,
        featured: false,
        bestseller: false,
        badge: 'Handcrafted',
        tags: ['Armchair', 'Accent Chair', 'Solid Wood', 'Carved'],
        features: [
          'Authentic Indian circular ring carving on broad armrests',
          'Curved slat lumbar support designed for prolonged comfortable sitting',
          'Turned solid wood legs with concealed brass floor glides'
        ],
        careInstructions: 'Wipe with a clean dry cotton cloth.'
      },
      {
        name: 'Rajputana Glass-Top Oval Coffee Table',
        slug: 'rajputana-glass-top-coffee-table',
        description: 'Oval solid teak coffee table with vertical slatted perimeter and lower magazine shelf, protected with a heavy-gauge beveled tempered glass top. Handcrafted in our Rajasthan workshop.',
        shortDescription: 'Solid Teak Oval Coffee Table with Tempered Glass',
        price: 18999,
        compareAtPrice: 24000,
        category: 'Tables',
        room: 'Living Room',
        collectionName: 'Teak Collection',
        images: [
          '/images/showroom/slatted_sofa_set.jpg',
          '/images/showroom/craftsmanship_macro.jpg'
        ],
        secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
        material: 'Solid Teak Wood & Tempered Glass',
        dimensions: { width: 120, height: 48, depth: 65, unit: 'cm' },
        colors: [
          { name: 'Honey Teak', hex: '#A66A3A', bgClass: 'bg-[#A66A3A]' },
          { name: 'Dark Walnut', hex: '#3A261B', bgClass: 'bg-[#3A261B]' },
        ],
        rating: 4.9,
        reviewCount: 22,
        stock: 14,
        featured: false,
        bestseller: true,
        badge: 'Made to Order',
        tags: ['Coffee Table', 'Oval', 'Glass Top', 'Living Room'],
        features: [
          'Curved slatted wooden apron with bottom storage tier',
          '8mm beveled tempered safety glass top with non-slip silicone pads',
          'Silky smooth hand-sanded edges'
        ],
        careInstructions: 'Wipe glass with glass cleaner. Use coasters for hot beverages.'
      },
      {
        name: 'Samrat Carved Teak King Bed',
        slug: 'samrat-carved-teak-king-bed',
        description: 'Regal solid teak king-size bedstead with fluted corner pillars, handcrafted relief headboard, and architectural tenon joinery built to endure for generations with zero squeaks.',
        shortDescription: '100% Solid Seasoned Teak · King Size · Fluted Posts',
        price: 64999,
        compareAtPrice: 78000,
        category: 'Beds',
        room: 'Bedroom',
        collectionName: 'Solid Wood',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
          '/images/showroom/craftsmanship_macro.jpg'
        ],
        secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
        material: '100% Solid Seasoned Teak',
        dimensions: { width: 195, height: 130, depth: 215, unit: 'cm' },
        colors: [
          { name: 'Natural Teak Finish', hex: '#9E6A3B', bgClass: 'bg-[#9E6A3B]' },
          { name: 'Rich Walnut', hex: '#4A3525', bgClass: 'bg-[#4A3525]' },
        ],
        rating: 5.0,
        reviewCount: 35,
        stock: 7,
        featured: true,
        bestseller: true,
        badge: 'Solid Wood',
        tags: ['Bed', 'King Size', 'Teak Wood', 'Bedroom', 'Heirloom'],
        features: [
          'Reinforced 18-slat solid hardwood platform with central support keel',
          'Hand-carved fluted corner posts with spherical finials',
          'Zero-squeak interlocking steel brackets inside wooden housings'
        ],
        careInstructions: 'Dust with a soft cloth. Apply wood wax once yearly to maintain lustre.'
      },
      {
        name: 'Imperial Sheesham 3-Door Wardrobe',
        slug: 'imperial-sheesham-3-door-wardrobe',
        description: 'Handcrafted 3-door wooden armoire carved from dense north-Indian Sheesham hardwood. Features full-length coat hanging sections, four storage shelves, two lockable jewelry drawers, and antique brass latch hardware.',
        shortDescription: 'Solid Sheesham Hardwood · 3-Door with Brass Hardware',
        price: 74999,
        compareAtPrice: 92000,
        category: 'Storage',
        room: 'Bedroom',
        collectionName: 'Solid Wood',
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=80',
          '/images/showroom/craftsmanship_macro.jpg'
        ],
        secondaryImage: '/images/showroom/craftsmanship_macro.jpg',
        material: 'Solid Sheesham & Antique Brass',
        dimensions: { width: 150, height: 200, depth: 60, unit: 'cm' },
        colors: [
          { name: 'Sheesham Natural', hex: '#63381B', bgClass: 'bg-[#63381B]' },
          { name: 'Honey Teak Polish', hex: '#B8783B', bgClass: 'bg-[#B8783B]' },
        ],
        rating: 4.8,
        reviewCount: 16,
        stock: 4,
        featured: false,
        bestseller: true,
        badge: 'Heirloom',
        tags: ['Wardrobe', 'Storage', 'Sheesham', 'Bedroom', 'Armoire'],
        features: [
          'Triple paneled doors with traditional recessed carvings',
          'Heavy-duty solid brass hinges and drop handle latches',
          'Deep storage shelves designed to accommodate Indian sarees and quilts'
        ],
        careInstructions: 'Keep interior dry. Polish brass hardware gently with lemon and salt if tarnished.'
      }
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`Seeded ${insertedProducts.length} authentic wooden furniture products.`);

    // Seed Categories
    const categoriesData = [
      { name: 'Tables', slug: 'tables', description: 'Handcrafted dining and center tables in solid teak and sheesham.', image: '/images/showroom/teak_oval_dining.jpg', itemCount: 3 },
      { name: 'Chairs', slug: 'chairs', description: 'Ergonomic carved wooden chairs and traditional Indian benches.', image: '/images/showroom/circular_motif_bench.jpg', itemCount: 2 },
      { name: 'Sofas', slug: 'sofas', description: 'Curved slatted wooden sofa ensembles with plush upholstery.', image: '/images/showroom/slatted_sofa_set.jpg', itemCount: 1 },
      { name: 'Beds', slug: 'beds', description: 'Regal solid wood bed frames built for generations.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', itemCount: 1 },
      { name: 'Storage', slug: 'storage', description: 'Carved wardrobes, armoires, and wooden sideboards.', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80', itemCount: 1 },
    ];
    await Category.insertMany(categoriesData);

    // Seed Collections
    const collectionsData = [
      {
        name: 'Teak Collection',
        slug: 'teak-collection',
        eyebrow: 'SIGNATURE SHOWROOM',
        tagline: 'Handcrafted Solid Teakwood Masterpieces',
        description: 'Premium seasoned teak dining sets, glass-top tables, and curved slatted sofa suites.',
        heroImage: '/images/showroom/teak_oval_dining.jpg',
        accentColor: '#A66A3A',
        itemCount: 3,
      },
      {
        name: 'Traditional Collection',
        slug: 'traditional-collection',
        eyebrow: 'HERITAGE CRAFT',
        tagline: 'Timeless Indian Showroom Elegance',
        description: 'Heirloom Indian designs featuring iconic circular ring-motif carvings, turned legs, and slatted backs.',
        heroImage: '/images/showroom/circular_motif_bench.jpg',
        accentColor: '#70482D',
        itemCount: 2,
      },
      {
        name: 'Modern Collection',
        slug: 'modern-collection',
        eyebrow: 'CONTEMPORARY LIVING',
        tagline: 'Architectural Geometric Joinery',
        description: 'Contemporary cross-leg trestles, tempered beveled glass surfaces, and sleek high-back slatted seating.',
        heroImage: '/images/showroom/cross_leg_dining.jpg',
        accentColor: '#3A261B',
        itemCount: 1,
      },
      {
        name: 'Solid Wood',
        slug: 'solid-wood',
        eyebrow: 'HEIRLOOM TIMBER',
        tagline: '100% Solid Hardwood Construction',
        description: 'Heavy seasoned Indian teak and sheesham wardrobes, king-size beds, and artisan storage.',
        heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
        accentColor: '#241A14',
        itemCount: 2,
      },
    ];
    await Collection.insertMany(collectionsData);

    // Seed Reviews
    const sampleReviews = [
      {
        product: insertedProducts[0]._id,
        userName: 'Sunita Venkatesh',
        userLocation: 'Bengaluru, India',
        rating: 5,
        title: 'Showroom masterpiece in our dining room!',
        comment: 'We visited the showroom and fell in love with this oval dining table immediately. The beveled glass top and the carved pedestal base are mesmerizing. Every guest asks where we bought it.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[0]._id,
        userName: 'Vikramaditya Roy',
        userLocation: 'Mumbai, India',
        rating: 5,
        title: 'Heirloom quality teak and leatherette',
        comment: 'The woodwork is heavy, dense, and finished to a smooth silky touch. The chairs are exceptionally comfortable with great back support. White glove assembly was prompt.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[2]._id, // Heritage Ring-Arm Solid Teak Bench
        userName: 'Devika Singhania',
        userLocation: 'New Delhi, India',
        rating: 5,
        title: 'The circular carved armrests are exquisite',
        comment: 'Reminds me of our ancestral home in Jaipur. The circular motif in the armrests is carved out of solid teak with zero rough edges. Sturdy and magnificent.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[1]._id, // Contemporary X-Trestle
        userName: 'Rohan Mehra',
        userLocation: 'Pune, India',
        rating: 5,
        title: 'Perfect combination of modern lines and teak wood',
        comment: 'The crisscross X-legs with glass top look so light yet the table is rock solid. Matches our contemporary apartment perfectly.',
        verifiedBuyer: true,
      },
      {
        product: insertedProducts[3]._id, // Nawab Slatted Sofa
        userName: 'Ananya Deshmukh',
        userLocation: 'Hyderabad, India',
        rating: 5,
        title: 'Luxurious and authentically Indian',
        comment: 'The slatted curve of the 3-seater and the rich wine cushions gave our living room that grand royal ambience. Exceptional woodwork.',
        verifiedBuyer: true,
      }
    ];

    await Review.insertMany(sampleReviews);
    console.log('Seeded authentic customer reviews.');

    // Seed Sample Order
    await Order.create({
      orderNumber: 'ANS-2026-908231',
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
        color: 'Warm Honey Teak',
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
      subtotal: 68999,
      discount: 0,
      shippingFee: 0,
      tax: 0,
      total: 68999,
      status: 'Delivered',
      trackingCode: 'ANS-IND-908231',
    });

    await NewsletterSubscriber.create({
      email: 'aanya@example.com',
      status: 'active'
    });

    console.log('Database seeded successfully with authentic Indian wooden furniture!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
