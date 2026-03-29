CREATE TABLE IF NOT EXISTS event_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_key TEXT NOT NULL,
  region TEXT NOT NULL,
  media_links JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_event_media_unique
  ON event_media (event_key, region);

ALTER TABLE event_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read on event_media" ON event_media
  FOR SELECT USING (true);

CREATE POLICY "Allow insert on event_media" ON event_media
  FOR INSERT WITH CHECK (true);
