-- Enable RLS
ALTER TABLE boats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Boats: anyone can read, only authenticated users can write
CREATE POLICY "Public can view boats"
  ON boats FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert boats"
  ON boats FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update boats"
  ON boats FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete boats"
  ON boats FOR DELETE TO authenticated USING (true);

-- Contact submissions: anyone can insert, only authenticated can read/update
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
