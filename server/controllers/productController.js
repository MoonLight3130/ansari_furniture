import Product from '../models/Product.js';

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

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { material: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { room: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (room && room !== 'All') {
      query.room = { $regex: new RegExp(`^${room}$`, 'i') };
    }

    if (collectionName && collectionName !== 'All') {
      query.collectionName = { $regex: new RegExp(`^${collectionName}$`, 'i') };
    }

    if (material && material !== 'All') {
      query.material = { $regex: material, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Sorting
    let sortOption = {};
    if (sort === 'featured') {
      sortOption = { featured: -1, createdAt: -1 };
    } else if (sort === 'bestseller') {
      sortOption = { bestseller: -1, rating: -1 };
    } else if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      products,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalProducts: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    let product;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    }
    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestsellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ bestseller: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const related = await Product.find({
      _id: { $ne: currentProduct._id },
      $or: [
        { category: currentProduct.category },
        { room: currentProduct.room },
      ],
    }).limit(4);

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilterMeta = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const rooms = await Product.distinct('room');
    const materials = await Product.distinct('material');
    const collections = await Product.distinct('collectionName');
    
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: '$price' },
          max: { $max: '$price' }
        }
      }
    ]);

    res.json({
      categories,
      rooms,
      materials,
      collections,
      minPrice: priceStats[0]?.min || 0,
      maxPrice: priceStats[0]?.max || 200000,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
