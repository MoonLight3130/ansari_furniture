-- ==============================================================================
-- Migration: Add userId column and foreign key to NewsletterSubscriber
-- Target: public."NewsletterSubscriber" -> public."User"("id")
-- Strategy: Non-destructive, idempotent, preserves all existing subscriber data
-- ==============================================================================

-- 1. Configure UUID and Timestamp Defaults on NewsletterSubscriber
ALTER TABLE "NewsletterSubscriber" 
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;

ALTER TABLE "NewsletterSubscriber" 
ALTER COLUMN "subscribedAt" SET DEFAULT now();

-- 2. Add userId column to NewsletterSubscriber (nullable for guest support)
ALTER TABLE "NewsletterSubscriber" 
ADD COLUMN IF NOT EXISTS "userId" TEXT NULL;

-- 2. Add Foreign Key referencing User(id) with ON DELETE SET NULL
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

-- 3. Create Index on userId for fast foreign key lookups and joins
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_userId_idx" 
ON "NewsletterSubscriber"("userId");

-- 4. Ensure Unique constraint on email (verified existing unique index NewsletterSubscriber_email_key)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'NewsletterSubscriber' AND indexname = 'NewsletterSubscriber_email_key'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'NewsletterSubscriber' AND constraint_name = 'NewsletterSubscriber_email_key'
  ) THEN
    ALTER TABLE "NewsletterSubscriber" ADD CONSTRAINT "NewsletterSubscriber_email_key" UNIQUE ("email");
  END IF;
END $$;

-- 5. Add RLS policy for user profile self-insertion
DROP POLICY IF EXISTS "Allow users to insert own profile" ON "User";
CREATE POLICY "Allow users to insert own profile" ON "User"
FOR INSERT WITH CHECK (auth.uid()::text = "id");

-- 6. Trigger to automatically synchronize auth.users -> public.User on signup
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
