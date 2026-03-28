-- Enable RLS on all tables
ALTER TABLE eras_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_simulations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to master data
CREATE POLICY "Allow anonymous read on eras_master" ON eras_master
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read on social_events" ON social_events
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read on regional_data" ON regional_data
  FOR SELECT USING (true);

-- Allow anonymous insert and read on life_simulations
CREATE POLICY "Allow anonymous insert on life_simulations" ON life_simulations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous read on life_simulations" ON life_simulations
  FOR SELECT USING (true);
