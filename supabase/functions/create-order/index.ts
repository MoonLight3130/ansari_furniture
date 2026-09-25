import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Optional user identification from bearer token
    let userId: string | null = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const anonClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: { user } } = await anonClient.auth.getUser();
      if (user) {
        userId = user.id;
      }
    }

    const {
      customerDetails,
      items,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      subtotal,
      discount = 0,
      shippingFee = 0,
      tax = 0,
      total,
    } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ message: 'Order cannot be empty' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!customerDetails || !shippingAddress) {
      return new Response(JSON.stringify({ message: 'Customer details and shipping address are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate order number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ANS-${new Date().getFullYear()}-${randomSuffix}`;

    // Insert Order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from('Order')
      .insert({
        orderNumber,
        userId,
        customerDetails,
        shippingAddress,
        deliveryMethod: deliveryMethod || 'Standard White Glove',
        paymentMethod: paymentMethod || 'Card / UPI',
        paymentStatus: 'Completed',
        subtotal: Number(subtotal),
        discount: Number(discount),
        shippingFee: Number(shippingFee),
        tax: Number(tax),
        total: Number(total),
        status: 'Confirmed',
      })
      .select()
      .single();

    if (orderErr || !order) {
      console.error('Failed to insert order:', orderErr);
      return new Response(JSON.stringify({ message: orderErr?.message || 'Failed to create order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert Order Items & decrement stock
    const orderItemsToInsert = items.map((item: any) => ({
      orderId: order.id,
      productId: item.productId || item.product || null,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity || 1),
      image: item.image,
      color: item.color || null,
    }));

    const { data: createdItems, error: itemsErr } = await supabaseAdmin
      .from('OrderItem')
      .insert(orderItemsToInsert)
      .select();

    if (itemsErr) {
      console.error('Failed to insert order items:', itemsErr);
    }

    // Decrement stock for products
    for (const item of items) {
      const prodId = item.productId || item.product;
      if (prodId) {
        // Fetch current stock
        const { data: prod } = await supabaseAdmin
          .from('Product')
          .select('stock')
          .eq('id', prodId)
          .single();

        if (prod && typeof prod.stock === 'number') {
          const newStock = Math.max(0, prod.stock - Number(item.quantity || 1));
          await supabaseAdmin
            .from('Product')
            .update({ stock: newStock })
            .eq('id', prodId);
        }
      }
    }

    const fullOrder = {
      ...order,
      _id: order.id,
      items: (createdItems || []).map((i: any) => ({ ...i, _id: i.id })),
    };

    return new Response(JSON.stringify(fullOrder), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
