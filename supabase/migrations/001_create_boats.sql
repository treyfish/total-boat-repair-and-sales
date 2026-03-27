CREATE TABLE boats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  year INTEGER,
  make TEXT,
  model TEXT,
  length_ft DECIMAL(5,1),
  engine_make TEXT,
  engine_hp INTEGER,
  hull_material TEXT,
  fuel_type TEXT DEFAULT 'Gas',
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'pending', 'sold')),
  featured BOOLEAN DEFAULT FALSE,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_boats_status ON boats(status);
CREATE INDEX idx_boats_featured ON boats(featured) WHERE featured = TRUE;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER boats_updated_at
  BEFORE UPDATE ON boats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
