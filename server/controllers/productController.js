import prisma from '../config/prisma.js';

const normalizeProduct = (p) => {
  if (!p) return null;
  return {
    ...p,
    _id: p.id,
  };
};

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      room,
      collectionName,
      minPrice,
      maxPrice,
      material,
      rating,
      sort = 'featured',
      page = 1,
      limit = 12,
    } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { material: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { room: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'All') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (room && room !== 'All') {
      where.room = { equals: room, mode: 'insensitive' };
    }

    if (collectionName && collectionName !== 'All') {
      where.collectionName = { equals: collectionName, mode: 'insensitive' };
    }

    if (material && material !== 'All') {
      where.material = { contains: material, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (rating) {
      where.rating = { gte: Number(rating) };
    }

    // Sorting
    let orderBy = [];
    if (sort === 'featured') {
      orderBy = [{ featured: 'desc' }, { createdAt: 'desc' }];
    } else if (sort === 'bestseller') {
      orderBy = [{ bestseller: 'desc' }, { rating: 'desc' }];
    } else if (sort === 'price-low') {
      orderBy = [{ price: 'asc' }];
    } else if (sort === 'price-high') {
      orderBy = [{ price: 'desc' }];
    } else if (sort === 'newest') {
      orderBy = [{ createdAt: 'desc' }];
    } else if (sort === 'rating') {
      orderBy = [{ rating: 'desc' }];
    } else {
      orderBy = [{ createdAt: 'desc' }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [total, rawProducts] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
    ]);

    const products = rawProducts.map(normalizeProduct);

    res.json({
      products,
      page: Number(page),
      totalPages: Math.ceil(total / take) || 1,
      totalProducts: total,
    });
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;

    let product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier.toLowerCase() },
        ],
      },
      include: {
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(normalizeProduct(product));
  } catch (error) {
    console.error('getProductBySlugOrId error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
    res.json(products.map(normalizeProduct));
  } catch (error) {
    console.error('getFeaturedProducts error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getBestsellerProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { bestseller: true },
      take: 8,
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
    });
    res.json(products.map(normalizeProduct));
  } catch (error) {
    console.error('getBestsellerProducts error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const currentProduct = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id.toLowerCase() }],
      },
    });

    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const related = await prisma.product.findMany({
      where: {
        id: { not: currentProduct.id },
        OR: [
          { category: currentProduct.category },
          { room: currentProduct.room },
        ],
      },
      take: 4,
    });

    res.json(related.map(normalizeProduct));
  } catch (error) {
    console.error('getRelatedProducts error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getFilterMeta = async (req, res) => {
  try {
    const [categories, rooms, materials, collections, priceAggregate] = await Promise.all([
      prisma.product.findMany({ select: { category: true }, distinct: ['category'] }),
      prisma.product.findMany({ select: { room: true }, distinct: ['room'] }),
      prisma.product.findMany({ select: { material: true }, distinct: ['material'] }),
      prisma.product.findMany({ select: { collectionName: true }, distinct: ['collectionName'] }),
      prisma.product.aggregate({
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    res.json({
      categories: categories.map((c) => c.category),
      rooms: rooms.map((r) => r.room),
      materials: materials.map((m) => m.material),
      collections: collections.map((c) => c.collectionName),
      minPrice: priceAggregate._min.price || 0,
      maxPrice: priceAggregate._max.price || 200000,
    });
  } catch (error) {
    console.error('getFilterMeta error:', error);
    res.status(500).json({ message: error.message });
  }
};
