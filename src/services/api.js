import { supabase } from '../utils/supabase';

// Normalize items so they have both id and _id for backward compatibility
const normalize = (item) => {
  if (!item || typeof item !== 'object') return item;
  if (Array.isArray(item)) return item.map(normalize);
  return {
    ...item,
    _id: item.id || item._id,
  };
};

/**
 * Supabase-backed API service.
 * Implements standard REST methods (get, post, put, delete) matching existing frontend calls,
 * replacing the Express backend with Supabase Data API and PostgreSQL RPC.
 */
const api = {
  get: async (url, config = {}) => {
    try {
      const parsedUrl = new URL(url, 'http://localhost');
      const pathname = parsedUrl.pathname.replace(/^\/api/, '');
      const searchParams = parsedUrl.searchParams;

      // 1. /products/bestsellers
      if (pathname === '/products/bestsellers') {
        const { data, error } = await supabase
          .from('Product')
          .select('*')
          .eq('bestseller', true)
          .order('rating', { ascending: false })
          .limit(8);
        if (error) throw error;
        return { data: normalize(data || []) };
      }

      // 2. /products/featured
      if (pathname === '/products/featured') {
        const { data, error } = await supabase
          .from('Product')
          .select('*')
          .eq('featured', true)
          .order('createdAt', { ascending: false })
          .limit(8);
        if (error) throw error;
        return { data: normalize(data || []) };
      }

      // 3. /products/meta/filters
      if (pathname === '/products/meta/filters') {
        const { data, error } = await supabase.rpc('get_filter_meta');
        if (error) throw error;
        return { data };
      }

      // 4. /products/:id/related
      if (pathname.match(/^\/products\/([^/]+)\/related$/)) {
        const id = pathname.match(/^\/products\/([^/]+)\/related$/)[1];
        // Fetch current product to find category/room
        const { data: current } = await supabase
          .from('Product')
          .select('id, category, room')
          .or(`id.eq.${id},slug.eq.${id.toLowerCase()}`)
          .single();

        if (!current) {
          const { data: fallback } = await supabase.from('Product').select('*').limit(4);
          return { data: normalize(fallback || []) };
        }

        const { data: related, error } = await supabase
          .from('Product')
          .select('*')
          .neq('id', current.id)
          .or(`category.eq.${current.category},room.eq.${current.room}`)
          .limit(4);

        if (error) throw error;
        return { data: normalize(related || []) };
      }

      // 5. /reviews/product/:productId
      if (pathname.match(/^\/reviews\/product\/([^/]+)$/)) {
        const productId = pathname.match(/^\/reviews\/product\/([^/]+)$/)[1];
        const { data, error } = await supabase
          .from('Review')
          .select('*')
          .eq('productId', productId)
          .order('createdAt', { ascending: false });
        if (error) throw error;
        return { data: normalize(data || []) };
      }

      // 6. /products/:slug or :id
      if (pathname.startsWith('/products/') && !pathname.includes('?')) {
        const identifier = pathname.replace('/products/', '');
        const { data: product, error } = await supabase
          .from('Product')
          .select('*, reviews:Review(*)')
          .or(`id.eq.${identifier},slug.eq.${identifier.toLowerCase()}`)
          .single();

        if (error || !product) {
          throw new Error('Product not found');
        }
        return { data: normalize(product) };
      }

      // 7. /products (search, filtering, pagination, sorting)
      if (pathname === '/products' || pathname === '/products/') {
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category');
        const room = searchParams.get('room');
        const collectionName = searchParams.get('collection') || searchParams.get('collectionName');
        const material = searchParams.get('material');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const rating = searchParams.get('rating');
        const sort = searchParams.get('sort') || 'featured';
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 12;

        let query = supabase.from('Product').select('*', { count: 'exact' });

        if (search) {
          query = query.or(
            `name.ilike.%${search}%,description.ilike.%${search}%,material.ilike.%${search}%,category.ilike.%${search}%,room.ilike.%${search}%`
          );
        }

        if (category && category !== 'All') {
          query = query.ilike('category', category);
        }

        if (room && room !== 'All') {
          query = query.ilike('room', room);
        }

        if (collectionName && collectionName !== 'All') {
          query = query.ilike('collectionName', collectionName);
        }

        if (material && material !== 'All') {
          query = query.ilike('material', `%${material}%`);
        }

        if (minPrice) {
          query = query.gte('price', Number(minPrice));
        }

        if (maxPrice) {
          query = query.lte('price', Number(maxPrice));
        }

        if (rating) {
          query = query.gte('rating', Number(rating));
        }

        // Sorting
        if (sort === 'bestseller') {
          query = query.order('bestseller', { ascending: false }).order('rating', { ascending: false });
        } else if (sort === 'price-low') {
          query = query.order('price', { ascending: true });
        } else if (sort === 'price-high') {
          query = query.order('price', { ascending: false });
        } else if (sort === 'newest') {
          query = query.order('createdAt', { ascending: false });
        } else if (sort === 'rating') {
          query = query.order('rating', { ascending: false });
        } else {
          // featured
          query = query.order('featured', { ascending: false }).order('createdAt', { ascending: false });
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;
        if (error) throw error;

        return {
          data: {
            products: normalize(data || []),
            page,
            totalPages: Math.ceil((count || 0) / limit) || 1,
            totalProducts: count || 0,
          },
        };
      }

      // 8. /orders/myorders
      if (pathname === '/orders/myorders') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('Order')
          .select('*, items:OrderItem(*)')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false });

        if (error) throw error;
        return { data: normalize(data || []) };
      }

      // 9. /orders/:id
      if (pathname.startsWith('/orders/')) {
        const orderId = pathname.replace('/orders/', '');
        const { data, error } = await supabase
          .from('Order')
          .select('*, items:OrderItem(*)')
          .eq('id', orderId)
          .single();
        if (error) throw error;
        return { data: normalize(data) };
      }

      // Fallback
      throw new Error(`Unhandled GET path: ${pathname}`);
    } catch (err) {
      console.error('API GET Error:', err);
      throw err;
    }
  },

  post: async (url, body = {}) => {
    try {
      const parsedUrl = new URL(url, 'http://localhost');
      const pathname = parsedUrl.pathname.replace(/^\/api/, '');

      // 1. /orders -> Atomic order placement via PostgreSQL RPC
      if (pathname === '/orders' || pathname === '/orders/') {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase.rpc('create_order_rpc', {
          p_customer_details: body.customerDetails,
          p_shipping_address: body.shippingAddress,
          p_items: body.items,
          p_delivery_method: body.deliveryMethod || 'Standard White Glove',
          p_payment_method: body.paymentMethod || 'Card / UPI',
          p_subtotal: Number(body.subtotal || 0),
          p_discount: Number(body.discount || 0),
          p_shipping_fee: Number(body.shippingFee || 0),
          p_tax: Number(body.tax || 0),
          p_total: Number(body.total || 0),
          p_user_id: user ? user.id : null,
        });

        if (error) throw error;
        return { data: normalize(data) };
      }

      // 2. /reviews -> Insert into Review table (Postgres trigger auto-recalculates product rating)
      if (pathname === '/reviews' || pathname === '/reviews/') {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from('Review')
          .insert({
            productId: body.productId,
            userId: user ? user.id : null,
            userName: body.userName || 'Customer',
            userLocation: body.userLocation || 'India',
            rating: Number(body.rating || 5),
            title: body.title || '',
            comment: body.comment || '',
            verifiedBuyer: true,
          })
          .select()
          .single();

        if (error) throw error;
        return { data: normalize(data) };
      }

      // 3. /newsletter/subscribe
      if (pathname === '/newsletter/subscribe') {
        const email = (body.email || '').toLowerCase().trim();
        const { error } = await supabase
          .from('NewsletterSubscriber')
          .insert({ email });

        if (error && error.code !== '23505') {
          // 23505 is unique violation (already subscribed)
          throw error;
        }

        return {
          data: {
            message: 'Welcome to Ansari Furniture. You have successfully subscribed.',
          },
        };
      }

      // 4. /auth/register
      if (pathname === '/auth/register') {
        const { data, error } = await supabase.auth.signUp({
          email: body.email,
          password: body.password,
          options: {
            data: {
              name: body.name,
              phone: body.phone,
            },
          },
        });
        if (error) throw error;
        return {
          data: {
            _id: data.user?.id,
            id: data.user?.id,
            name: body.name,
            email: body.email,
            token: data.session?.access_token,
          },
        };
      }

      // 5. /auth/login
      if (pathname === '/auth/login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: body.email,
          password: body.password,
        });
        if (error) throw error;
        return {
          data: {
            _id: data.user?.id,
            id: data.user?.id,
            name: data.user?.user_metadata?.name || data.user?.email,
            email: data.user?.email,
            token: data.session?.access_token,
          },
        };
      }

      throw new Error(`Unhandled POST path: ${pathname}`);
    } catch (err) {
      console.error('API POST Error:', err);
      throw err;
    }
  },

  put: async (url, body = {}) => {
    const parsedUrl = new URL(url, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/^\/api/, '');

    if (pathname === '/auth/profile') {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('User')
        .update(body)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data: normalize(data) };
    }

    throw new Error(`Unhandled PUT path: ${pathname}`);
  },

  delete: async (url) => {
    throw new Error(`Unhandled DELETE path: ${url}`);
  },
};

export default api;
