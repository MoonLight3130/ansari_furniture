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

    // Verify admin access
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ message: 'Unauthorized - Missing token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const anonClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authErr } = await anonClient.auth.getUser();

    // Check if user has admin role in public.User or auth metadata
    let isAdmin = false;
    if (user) {
      if (user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin') {
        isAdmin = true;
      } else {
        const { data: profile } = await supabaseAdmin
          .from('User')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile?.role === 'admin') {
          isAdmin = true;
        }
      }
    }

    // In case request uses service role key directly
    if (authHeader.includes(supabaseServiceKey)) {
      isAdmin = true;
    }

    if (!isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden - Admin privileges required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/admin/, '').replace(/^\/functions\/v1\/admin/, '');
    const method = req.method;

    // 1. Analytics: GET /analytics
    if (path === '/analytics' || path === '' || path === '/') {
      const [
        { count: totalProducts },
        { count: totalOrders },
        { count: totalUsers },
        { data: orders },
        { data: lowStockProducts },
        { data: recentOrders },
      ] = await Promise.all([
        supabaseAdmin.from('Product').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('Order').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('User').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
        supabaseAdmin.from('Order').select('total, status'),
        supabaseAdmin.from('Product').select('*').lte('stock', 5).limit(5),
        supabaseAdmin.from('Order').select('*, items:OrderItem(*)').order('createdAt', { ascending: false }).limit(6),
      ]);

      const totalSales = (orders || []).reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);
      const statusMap: Record<string, number> = {};
      for (const ord of orders || []) {
        statusMap[ord.status] = (statusMap[ord.status] || 0) + 1;
      }
      const statusCounts = Object.entries(statusMap).map(([_id, count]) => ({ _id, count }));

      return new Response(
        JSON.stringify({
          totalSales,
          totalOrders: totalOrders || 0,
          totalProducts: totalProducts || 0,
          totalUsers: totalUsers || 0,
          lowStockCount: (lowStockProducts || []).length,
          lowStockProducts: (lowStockProducts || []).map((p: any) => ({ ...p, _id: p.id })),
          recentOrders: (recentOrders || []).map((o: any) => ({ ...o, _id: o.id })),
          statusCounts,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Products Management
    if (path.startsWith('/products')) {
      const parts = path.split('/').filter(Boolean); // ['products', ':id']
      const id = parts[1];

      if (method === 'GET') {
        const { data: products } = await supabaseAdmin
          .from('Product')
          .select('*')
          .order('createdAt', { ascending: false });
        return new Response(JSON.stringify((products || []).map((p: any) => ({ ...p, _id: p.id }))), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (method === 'POST') {
        const body = await req.json();
        const slug = (body.name || 'product')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`;

        const { data: newProd, error } = await supabaseAdmin
          .from('Product')
          .insert({
            ...body,
            slug,
            images: body.images?.length ? body.images : ['/images/showroom/hero_showroom.jpg'],
          })
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ ...newProd, _id: newProd.id }), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (method === 'PUT' && id) {
        const body = await req.json();
        delete body.id;
        delete body._id;
        const { data: updated, error } = await supabaseAdmin
          .from('Product')
          .update(body)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ ...updated, _id: updated.id }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (method === 'DELETE' && id) {
        await supabaseAdmin.from('Product').delete().eq('id', id);
        return new Response(JSON.stringify({ message: 'Product removed' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 3. Orders Management
    if (path.startsWith('/orders')) {
      const parts = path.split('/').filter(Boolean); // ['orders', ':id', 'status']
      const id = parts[1];

      if (method === 'GET') {
        const { data: orders } = await supabaseAdmin
          .from('Order')
          .select('*, items:OrderItem(*)')
          .order('createdAt', { ascending: false });
        return new Response(JSON.stringify((orders || []).map((o: any) => ({ ...o, _id: o.id }))), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (method === 'PUT' && id) {
        const { status, trackingCode } = await req.json();
        const updateData: any = {};
        if (status) updateData.status = status;
        if (trackingCode !== undefined) updateData.trackingCode = trackingCode;

        const { data: updated, error } = await supabaseAdmin
          .from('Order')
          .update(updateData)
          .eq('id', id)
          .select('*, items:OrderItem(*)')
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ ...updated, _id: updated.id }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 4. Users List
    if (path === '/users') {
      const { data: users } = await supabaseAdmin
        .from('User')
        .select('id, name, email, role, phone, createdAt, addresses:Address(*)')
        .order('createdAt', { ascending: false });

      return new Response(JSON.stringify((users || []).map((u: any) => ({ ...u, _id: u.id }))), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Admin endpoint not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Admin API error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
