-- Cache table for LLM-generated event reactions
CREATE TABLE IF NOT EXISTS event_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_key TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  region TEXT NOT NULL,
  reactions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_event_reactions_unique
  ON event_reactions (event_key, age, gender, region);

ALTER TABLE event_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read on event_reactions" ON event_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow service role insert on event_reactions" ON event_reactions
  FOR INSERT WITH CHECK (true);
