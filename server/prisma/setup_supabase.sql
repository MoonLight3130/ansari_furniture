-- ==========================================================
-- ANSARI FURNITURE - SUPABASE POSTGRESQL PRODUCTION SETUP
-- RLS Policies, Triggers, and Stored Procedures
-- ==========================================================

-- 1. Enable Row Level Security (RLS) on all public tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Collection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NewsletterSubscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;

-- 2. Configure UUID and Timestamp Defaults
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "Address" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Address" ALTER COLUMN "createdAt" SET DEFAULT now();

ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Product" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Category" ALTER COLUMN "createdAt" SET DEFAULT now();

ALTER TABLE "Collection" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Collection" ALTER COLUMN "createdAt" SET DEFAULT now();

ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Order" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "OrderItem" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "Review" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Review" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Review" ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "NewsletterSubscriber" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "NewsletterSubscriber" ALTER COLUMN "subscribedAt" SET DEFAULT now();
ALTER TABLE "NewsletterSubscriber" ADD COLUMN IF NOT EXISTS "userId" TEXT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'NewsletterSubscriber_userId_fkey'
      AND table_name = 'NewsletterSubscriber'
  ) THEN
    ALTER TABLE "NewsletterSubscriber"
    ADD CONSTRAINT "NewsletterSubscriber_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_userId_idx" ON "NewsletterSubscriber"("userId");

-- 3. Public Read Access Policies (Catalog, Reviews, Collections, Categories)
DROP POLICY IF EXISTS "Allow public read access to products" ON "Product";
CREATE POLICY "Allow public read access to products" ON "Product" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to categories" ON "Category";
CREATE POLICY "Allow public read access to categories" ON "Category" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to collections" ON "Collection";
CREATE POLICY "Allow public read access to collections" ON "Collection" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to reviews" ON "Review";
CREATE POLICY "Allow public read access to reviews" ON "Review" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert to reviews" ON "Review";
CREATE POLICY "Allow insert to reviews" ON "Review" FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on NewsletterSubscriber" ON "NewsletterSubscriber";
CREATE POLICY "Allow public select on NewsletterSubscriber" ON "NewsletterSubscriber" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to newsletter" ON "NewsletterSubscriber";
CREATE POLICY "Allow public insert to newsletter" ON "NewsletterSubscriber" FOR INSERT WITH CHECK (true);

-- 4. User and Address Policies
DROP POLICY IF EXISTS "Allow users to read own profile" ON "User";
CREATE POLICY "Allow users to read own profile" ON "User" FOR SELECT USING (auth.uid()::text = "id");

DROP POLICY IF EXISTS "Allow users to update own profile" ON "User";
CREATE POLICY "Allow users to update own profile" ON "User" FOR UPDATE USING (auth.uid()::text = "id");

DROP POLICY IF EXISTS "Allow users to insert own profile" ON "User";
CREATE POLICY "Allow users to insert own profile" ON "User" FOR INSERT WITH CHECK (auth.uid()::text = "id");

DROP POLICY IF EXISTS "Allow users to read own addresses" ON "Address";
CREATE POLICY "Allow users to read own addresses" ON "Address" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Allow users to manage own addresses" ON "Address";
CREATE POLICY "Allow users to manage own addresses" ON "Address" FOR ALL USING (auth.uid()::text = "userId");

-- 5. Order Policies
DROP POLICY IF EXISTS "Allow users to read own orders" ON "Order";
CREATE POLICY "Allow users to read own orders" ON "Order" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Allow users to read own order items" ON "OrderItem";
CREATE POLICY "Allow users to read own order items" ON "OrderItem" FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "Order" 
    WHERE "Order"."id" = "OrderItem"."orderId" 
    AND "Order"."userId" = auth.uid()::text
  )
);

-- 6. Trigger: Automatic Product Rating Recalculation on Review insert/update/delete
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_product_id text;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    target_product_id := OLD."productId";
  ELSE
    target_product_id := NEW."productId";
  END IF;

  UPDATE "Product"
  SET 
    "rating" = COALESCE(ROUND((SELECT AVG("rating") FROM "Review" WHERE "productId" = target_product_id)::numeric, 1), 5.0),
    "reviewCount" = COALESCE((SELECT COUNT(*) FROM "Review" WHERE "productId" = target_product_id), 0)
  WHERE "id" = target_product_id;

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_review_changed ON "Review";
CREATE TRIGGER on_review_changed
AFTER INSERT OR UPDATE OR DELETE ON "Review"
FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- 7. Stored Procedure: Filter Metadata Aggregation RPC
CREATE OR REPLACE FUNCTION get_filter_meta()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  res json;
BEGIN
  SELECT json_build_object(
    'categories', COALESCE((SELECT json_agg(DISTINCT "category") FROM "Product" WHERE "category" IS NOT NULL), '[]'::json),
    'rooms', COALESCE((SELECT json_agg(DISTINCT "room") FROM "Product" WHERE "room" IS NOT NULL), '[]'::json),
    'materials', COALESCE((SELECT json_agg(DISTINCT "material") FROM "Product" WHERE "material" IS NOT NULL), '[]'::json),
    'collections', COALESCE((SELECT json_agg(DISTINCT "collectionName") FROM "Product" WHERE "collectionName" IS NOT NULL), '[]'::json),
    'minPrice', COALESCE((SELECT MIN("price") FROM "Product"), 0),
    'maxPrice', COALESCE((SELECT MAX("price") FROM "Product"), 200000)
  ) INTO res;
  RETURN res;
END;
$$;

-- 8. Stored Procedure: Atomic Order Placement RPC with Inventory Decrement
CREATE OR REPLACE FUNCTION create_order_rpc(
  p_customer_details jsonb,
  p_shipping_address jsonb,
  p_items jsonb,
  p_delivery_method text DEFAULT 'Standard White Glove',
  p_payment_method text DEFAULT 'Card / UPI',
  p_subtotal double precision DEFAULT 0,
  p_discount double precision DEFAULT 0,
  p_shipping_fee double precision DEFAULT 0,
  p_tax double precision DEFAULT 0,
  p_total double precision DEFAULT 0,
  p_user_id text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order_id text := gen_random_uuid()::text;
  v_order_number text := 'ANS-' || to_char(now(), 'YYYY') || '-' || floor(100000 + random() * 900000)::text;
  v_item jsonb;
  v_prod_id text;
  v_qty integer;
  v_result jsonb;
BEGIN
  -- Insert Order
  INSERT INTO "Order" (
    "id",
    "orderNumber",
    "userId",
    "customerDetails",
    "shippingAddress",
    "deliveryMethod",
    "paymentMethod",
    "paymentStatus",
    "subtotal",
    "discount",
    "shippingFee",
    "tax",
    "total",
    "status",
    "createdAt",
    "updatedAt"
  ) VALUES (
    v_order_id,
    v_order_number,
    p_user_id,
    p_customer_details,
    p_shipping_address,
    p_delivery_method,
    p_payment_method,
    'Completed',
    p_subtotal,
    p_discount,
    p_shipping_fee,
    p_tax,
    p_total,
    'Confirmed',
    now(),
    now()
  );

  -- Insert Order Items and decrement inventory
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_prod_id := COALESCE(v_item->>'productId', v_item->>'product', v_item->>'_id');
    v_qty := COALESCE((v_item->>'quantity')::integer, 1);

    INSERT INTO "OrderItem" (
      "id",
      "orderId",
      "productId",
      "name",
      "price",
      "quantity",
      "image",
      "color"
    ) VALUES (
      gen_random_uuid()::text,
      v_order_id,
      v_prod_id,
      v_item->>'name',
      COALESCE((v_item->>'price')::double precision, 0),
      v_qty,
      COALESCE(v_item->>'image', ''),
      v_item->>'color'
    );

    IF v_prod_id IS NOT NULL THEN
      UPDATE "Product"
      SET "stock" = GREATEST(0, "stock" - v_qty)
      WHERE "id" = v_prod_id;
    END IF;
  END LOOP;

  -- Build response JSON
  SELECT jsonb_build_object(
    'id', o."id",
    '_id', o."id",
    'orderNumber', o."orderNumber",
    'customerDetails', o."customerDetails",
    'shippingAddress', o."shippingAddress",
    'deliveryMethod', o."deliveryMethod",
    'paymentMethod', o."paymentMethod",
    'paymentStatus', o."paymentStatus",
    'subtotal', o."subtotal",
    'discount', o."discount",
    'shippingFee', o."shippingFee",
    'tax', o."tax",
    'total', o."total",
    'status', o."status",
    'createdAt', o."createdAt",
    'items', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', oi."id",
          '_id', oi."id",
          'orderId', oi."orderId",
          'productId', oi."productId",
          'name', oi."name",
          'price', oi."price",
          'quantity', oi."quantity",
          'image', oi."image",
          'color', oi."color"
        )
      )
      FROM "OrderItem" oi
      WHERE oi."orderId" = o."id"
    )
  ) INTO v_result
  FROM "Order" o
  WHERE o."id" = v_order_id;

  RETURN v_result;
END;
$$;

-- 9. Trigger: Automatically Synchronize auth.users -> public.User on signup
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."User" ("id", "name", "email", "password", "role", "createdAt", "updatedAt")
  VALUES (
    NEW.id::text,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    '',
    'customer',
    now(),
    now()
  )
  ON CONFLICT ("id") DO UPDATE
  SET "email" = EXCLUDED."email",
      "name" = COALESCE(EXCLUDED."name", public."User"."name"),
      "updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

