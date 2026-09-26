-- ==============================================================================
-- Migration: Fix products and seed missing collection products
-- Fixes: collectionName mismatches, missing Living Room Suites & Solid Wood products
-- ==============================================================================

-- 0. Ensure Review table has automatic id and timestamp defaults (prevents 400 Bad Request on inserts)
ALTER TABLE "Review" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Review" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Review" ALTER COLUMN "updatedAt" SET DEFAULT now();

-- 1. Fix existing "Nawab" product: wrong name ("haran") and wrong collectionName
UPDATE "Product"
SET
  "name"           = 'Nawab Curved Slatted Sofa Ensemble',
  "collectionName" = 'Living Room Suites',
  "category"       = 'Sofas',
  "room"           = 'Living Room',
  "updatedAt"      = now()
WHERE "slug" = 'nawab-curved-slatted-sofa-ensemble';

-- 2. Fix "Grand Teak Oval Glass Coffee Table": category should be Tables not Sofas
UPDATE "Product"
SET
  "category"  = 'Tables',
  "updatedAt" = now()
WHERE "slug" = 'grand-teak-oval-glass-coffee-table';

-- 3. Fix "Heritage Ring-Arm Solid Teak Bench": fix "Aarm" typo
UPDATE "Product"
SET
  "name"      = 'Heritage Ring-Arm Solid Teak Bench',
  "updatedAt" = now()
WHERE "slug" = 'heritage-ring-arm-solid-teak-bench';

-- 4. Upsert: Shahi Hand-Carved Ring-Armchair (Traditional Collection)
INSERT INTO "Product" (
  "id", "name", "slug", "description", "shortDescription", "price", "compareAtPrice",
  "category", "room", "collectionName", "material", "dimensions",
  "rating", "reviewCount", "stock", "featured", "bestseller",
  "badge", "images", "tags", "features", "careInstructions",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid()::text,
  'Shahi Hand-Carved Ring-Armchair',
  'shahi-hand-carved-ring-armchair',
  'A masterpiece of Kerala woodcraft — hand-carved circular ring motifs frame every broad teak armrest. Contoured lumbar posture curve, honey gloss finish, and turned baluster legs give this accent chair its regal bearing.',
  'Single Accent Armchair · Contoured Lumbar Contour',
  16999,
  21000,
  'Chairs',
  'Living Room',
  'Traditional Collection',
  '100% Solid Indian Teak Wood',
  '{"unit":"cm","width":80,"depth":75,"height":90}'::jsonb,
  4.8,
  19,
  2,
  true,
  false,
  'Artisan Carved',
  ARRAY['/images/showroom/circular_motif_bench.jpg', '/images/showroom/craftsmanship_macro.jpg'],
  ARRAY['Traditional', 'Armchair', 'Ring Motif', 'Living Room', 'Solid Wood'],
  ARRAY['Hand-carved circular ring motifs along armrests', 'Ergonomic contoured lumbar posture backrest', 'Turned solid teak baluster legs', 'Linen blend 35D high-resilience foam cushion'],
  'Wipe with soft cotton cloth. Nourish with teak oil once a year.',
  now(),
  now()
)
ON CONFLICT ("slug") DO UPDATE
SET
  "name"             = EXCLUDED."name",
  "shortDescription" = EXCLUDED."shortDescription",
  "collectionName"   = EXCLUDED."collectionName",
  "category"         = EXCLUDED."category",
  "room"             = EXCLUDED."room",
  "material"         = EXCLUDED."material",
  "dimensions"       = EXCLUDED."dimensions",
  "features"         = EXCLUDED."features",
  "tags"             = EXCLUDED."tags",
  "badge"            = EXCLUDED."badge",
  "images"           = EXCLUDED."images",
  "updatedAt"        = now();

-- 5. Upsert: Royal Teak King Bedstead (Solid Wood collection)
INSERT INTO "Product" (
  "id", "name", "slug", "description", "shortDescription", "price", "compareAtPrice",
  "category", "room", "collectionName", "material", "dimensions",
  "rating", "reviewCount", "stock", "featured", "bestseller",
  "badge", "images", "tags", "features", "careInstructions",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid()::text,
  'Royal Teak King Bedstead',
  'royal-teak-king-bedstead',
  'Zero MDF. Zero particle board. A king bed frame carved entirely from seasoned solid teakwood with zero-creak mortise-and-tenon joinery, hand-carved headboard panel, and neem anti-termite treatment for Kerala climates.',
  'King Size (72x78 in) · Solid Teak Slats · Zero Creak',
  64999,
  78000,
  'Beds',
  'Bedroom',
  'Solid Wood',
  '100% Seasoned Solid Teakwood',
  '{"unit":"in","width":72,"length":78,"height":48}'::jsonb,
  5.0,
  27,
  1,
  true,
  true,
  'Zero Creak',
  ARRAY['/images/rooms/bedroom.jpg', '/images/showroom/craftsmanship_macro.jpg', '/images/showroom/hero_showroom.jpg'],
  ARRAY['Solid Wood', 'King Bed', 'Bedroom', 'Teak', 'Heirloom'],
  ARRAY['100% seasoned solid teakwood construction', 'Zero-creak mortise and tenon joinery', 'Hand-carved solid teak headboard panel', 'Neem natural anti-termite wood treatment'],
  'Keep away from direct excessive water. Dust regularly.',
  now(),
  now()
)
ON CONFLICT ("slug") DO UPDATE
SET
  "name"             = EXCLUDED."name",
  "shortDescription" = EXCLUDED."shortDescription",
  "collectionName"   = EXCLUDED."collectionName",
  "category"         = EXCLUDED."category",
  "room"             = EXCLUDED."room",
  "material"         = EXCLUDED."material",
  "dimensions"       = EXCLUDED."dimensions",
  "features"         = EXCLUDED."features",
  "tags"             = EXCLUDED."tags",
  "badge"            = EXCLUDED."badge",
  "images"           = EXCLUDED."images",
  "updatedAt"        = now();

-- 6. Upsert: Imperial Solid Teak 4-Door Wardrobe (Solid Wood collection)
INSERT INTO "Product" (
  "id", "name", "slug", "description", "shortDescription", "price", "compareAtPrice",
  "category", "room", "collectionName", "material", "dimensions",
  "rating", "reviewCount", "stock", "featured", "bestseller",
  "badge", "images", "tags", "features", "careInstructions",
  "createdAt", "updatedAt"
)
VALUES (
  gen_random_uuid()::text,
  'Imperial Solid Teak 4-Door Wardrobe',
  'imperial-solid-teak-4-door-wardrobe',
  'An heirloom wardrobe built for generations. Solid teakwood core with four lockable doors, integrated internal drawers, a full-length mirror panel, and adjustable hanging rods. Engineered for Kerala humidity with neem anti-termite treatment.',
  '4 Lockable Doors · Integrated Drawers · Solid Teak',
  78999,
  95000,
  'Storage',
  'Bedroom',
  'Solid Wood',
  '100% Seasoned Solid Teakwood',
  '{"unit":"cm","width":210,"depth":60,"height":220}'::jsonb,
  4.9,
  18,
  1,
  true,
  false,
  'Lifetime Timber',
  ARRAY['/images/showroom/hero_showroom.jpg', '/images/showroom/craftsmanship_macro.jpg'],
  ARRAY['Solid Wood', 'Wardrobe', 'Storage', 'Bedroom', 'Heirloom'],
  ARRAY['4 lockable doors with solid brass keys and hardware', 'Full-length internal vanity mirror', 'Reinforced internal drawers with dovetail joinery', 'Neem anti-termite treated seasoned timber'],
  'Wipe with clean dry microfiber. Oil brass hardware occasionally.',
  now(),
  now()
)
ON CONFLICT ("slug") DO UPDATE
SET
  "name"             = EXCLUDED."name",
  "shortDescription" = EXCLUDED."shortDescription",
  "collectionName"   = EXCLUDED."collectionName",
  "category"         = EXCLUDED."category",
  "room"             = EXCLUDED."room",
  "material"         = EXCLUDED."material",
  "dimensions"       = EXCLUDED."dimensions",
  "features"         = EXCLUDED."features",
  "tags"             = EXCLUDED."tags",
  "badge"            = EXCLUDED."badge",
  "images"           = EXCLUDED."images",
  "updatedAt"        = now();
