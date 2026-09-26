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

    const { productId, rating, comment, title, userName, userLocation } = await req.json();

    if (!productId || !rating || !comment) {
      return new Response(
        JSON.stringify({ message: 'Product, rating, and review comment are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Insert review
    const { data: review, error: reviewErr } = await supabaseAdmin
      .from('Review')
      .insert({
        id: crypto.randomUUID(),
        productId,
        userId,
        userName: userName || 'Verified Customer',
        userLocation: userLocation || 'India',
        rating: Number(rating),
        title: title || '',
        comment,
        verifiedBuyer: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewErr || !review) {
      return new Response(
        JSON.stringify({ message: reviewErr?.message || 'Failed to submit review' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Fetch all reviews for this product to recalculate average
    const { data: allReviews } = await supabaseAdmin
      .from('Review')
      .select('rating')
      .eq('productId', productId);

    if (allReviews && allReviews.length > 0) {
      const totalRating = allReviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
      const avgRating = Number((totalRating / allReviews.length).toFixed(1));

      await supabaseAdmin
        .from('Product')
        .update({
          rating: avgRating,
          reviewCount: allReviews.length,
        })
        .eq('id', productId);
    }

    const normalizedReview = {
      ...review,
      _id: review.id,
      product: review.productId,
      user: review.userId,
    };

    return new Response(JSON.stringify(normalizedReview), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Review creation error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
