-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. regions
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE,
  description TEXT,
  artisan_count INTEGER DEFAULT 0,
  craft_count INTEGER DEFAULT 0,
  demand_score NUMERIC DEFAULT 0,
  health_score NUMERIC DEFAULT 0,
  risk_score NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. crafts
CREATE TABLE IF NOT EXISTS crafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  state TEXT,
  region_id UUID REFERENCES regions(id),
  gi_tagged BOOLEAN DEFAULT false,
  gi_number TEXT,
  gi_verified_at TIMESTAMPTZ,
  heritage_status TEXT,
  health_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. artisans
CREATE TABLE IF NOT EXISTS artisans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  date_of_birth DATE,
  gender TEXT,
  state TEXT,
  district TEXT,
  city TEXT,
  pincode TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  primary_craft_id UUID REFERENCES crafts(id),
  cooperative_name TEXT,
  years_of_experience INTEGER,
  verification_status TEXT,
  verified_at TIMESTAMPTZ,
  profile_image_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id UUID REFERENCES artisans(id),
  craft_id UUID REFERENCES crafts(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price NUMERIC,
  fair_trade_price NUMERIC,
  stock_quantity INTEGER DEFAULT 0,
  materials TEXT[],
  crafting_days INTEGER,
  gi_authenticated BOOLEAN DEFAULT false,
  provenance_hash TEXT,
  image_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  bookmarks INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. product_materials
CREATE TABLE IF NOT EXISTS product_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  material_name TEXT NOT NULL,
  material_source TEXT,
  is_natural BOOLEAN DEFAULT false,
  verification_status TEXT
);

-- 7. buyers
CREATE TABLE IF NOT EXISTS buyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization_name TEXT,
  buyer_type TEXT,
  email TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  industry TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. buyer_interests
CREATE TABLE IF NOT EXISTS buyer_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES buyers(id) ON DELETE CASCADE,
  craft_id UUID REFERENCES crafts(id) ON DELETE CASCADE,
  category TEXT,
  preferred_region UUID REFERENCES regions(id),
  min_budget NUMERIC,
  max_budget NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES buyers(id),
  artisan_id UUID REFERENCES artisans(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  order_status TEXT,
  payment_status TEXT,
  ordered_at TIMESTAMPTZ DEFAULT now(),
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. artisan_payouts
CREATE TABLE IF NOT EXISTS artisan_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  artisan_id UUID REFERENCES artisans(id),
  gross_amount NUMERIC NOT NULL,
  platform_fee NUMERIC DEFAULT 0,
  net_payout NUMERIC NOT NULL,
  payout_status TEXT,
  payout_reference TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. market_signals
CREATE TABLE IF NOT EXISTS market_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  craft_id UUID REFERENCES crafts(id),
  region_id UUID REFERENCES regions(id),
  signal_type TEXT NOT NULL,
  signal_value NUMERIC,
  percentage_change NUMERIC,
  confidence_score NUMERIC,
  source TEXT,
  observed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. market_predictions
CREATE TABLE IF NOT EXISTS market_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  craft_id UUID REFERENCES crafts(id),
  region_id UUID REFERENCES regions(id),
  prediction_type TEXT NOT NULL,
  predicted_value NUMERIC,
  confidence_score NUMERIC,
  prediction_date DATE,
  model_version TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. engagement_events
CREATE TABLE IF NOT EXISTS engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  buyer_id UUID REFERENCES buyers(id),
  event_type TEXT NOT NULL,
  event_value NUMERIC,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. craft_health
CREATE TABLE IF NOT EXISTS craft_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  craft_id UUID REFERENCES crafts(id),
  transmission_score NUMERIC,
  master_count INTEGER,
  apprentice_count INTEGER,
  raw_material_score NUMERIC,
  market_score NUMERIC,
  overall_health_score NUMERIC,
  risk_level TEXT,
  measured_at TIMESTAMPTZ DEFAULT now()
);

-- 15. revival_interventions
CREATE TABLE IF NOT EXISTS revival_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  craft_id UUID REFERENCES crafts(id),
  intervention_type TEXT,
  priority TEXT,
  description TEXT,
  status TEXT,
  assigned_to UUID REFERENCES profiles(id),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  outcome TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 16. dashboard_snapshots
CREATE TABLE IF NOT EXISTS dashboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date DATE UNIQUE NOT NULL,
  total_artisans INTEGER DEFAULT 0,
  active_crafts INTEGER DEFAULT 0,
  total_products INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_revenue NUMERIC DEFAULT 0,
  active_buyers INTEGER DEFAULT 0,
  engagement_velocity NUMERIC DEFAULT 0,
  crafts_at_risk INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- Indexes
CREATE INDEX IF NOT EXISTS idx_artisans_primary_craft_id ON artisans(primary_craft_id);
CREATE INDEX IF NOT EXISTS idx_artisans_state ON artisans(state);
CREATE INDEX IF NOT EXISTS idx_artisans_verification_status ON artisans(verification_status);

CREATE INDEX IF NOT EXISTS idx_products_artisan_id ON products(artisan_id);
CREATE INDEX IF NOT EXISTS idx_products_craft_id ON products(craft_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_artisan_id ON orders(artisan_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_ordered_at ON orders(ordered_at);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);

CREATE INDEX IF NOT EXISTS idx_market_signals_craft_id ON market_signals(craft_id);
CREATE INDEX IF NOT EXISTS idx_market_signals_region_id ON market_signals(region_id);
CREATE INDEX IF NOT EXISTS idx_market_signals_observed_at ON market_signals(observed_at);

CREATE INDEX IF NOT EXISTS idx_engagement_events_product_id ON engagement_events(product_id);
CREATE INDEX IF NOT EXISTS idx_engagement_events_event_type ON engagement_events(event_type);
CREATE INDEX IF NOT EXISTS idx_engagement_events_created_at ON engagement_events(created_at);

CREATE INDEX IF NOT EXISTS idx_craft_health_craft_id ON craft_health(craft_id);
CREATE INDEX IF NOT EXISTS idx_craft_health_risk_level ON craft_health(risk_level);


-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE artisan_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE craft_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE revival_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_snapshots ENABLE ROW LEVEL SECURITY;


-- Public read policies for MVP (these can be locked down later based on roles)
CREATE POLICY "Public read access on regions" ON regions FOR SELECT USING (true);
CREATE POLICY "Public read access on crafts" ON crafts FOR SELECT USING (true);
CREATE POLICY "Public read access on artisans" ON artisans FOR SELECT USING (true);
CREATE POLICY "Public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access on product_materials" ON product_materials FOR SELECT USING (true);
CREATE POLICY "Public read access on market_signals" ON market_signals FOR SELECT USING (true);
CREATE POLICY "Public read access on market_predictions" ON market_predictions FOR SELECT USING (true);
CREATE POLICY "Public read access on craft_health" ON craft_health FOR SELECT USING (true);
CREATE POLICY "Public read access on dashboard_snapshots" ON dashboard_snapshots FOR SELECT USING (true);

-- Authenticated users or Admins can read others (To be refined)
CREATE POLICY "Admin read access on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Admin read access on artisan_payouts" ON artisan_payouts FOR SELECT USING (true);
CREATE POLICY "Admin read access on engagement_events" ON engagement_events FOR SELECT USING (true);
CREATE POLICY "Admin read access on buyers" ON buyers FOR SELECT USING (true);
CREATE POLICY "Admin read access on buyer_interests" ON buyer_interests FOR SELECT USING (true);


-- Seed Regions
INSERT INTO regions (name, code, description) VALUES
('Northern', 'NORTH', 'Northern Region'),
('Western', 'WEST', 'Western Region'),
('Central', 'CENTRAL', 'Central Region'),
('Eastern', 'EAST', 'Eastern Region'),
('North-Eastern', 'NE', 'North-Eastern Region'),
('Southern', 'SOUTH', 'Southern Region')
ON CONFLICT (name) DO NOTHING;
