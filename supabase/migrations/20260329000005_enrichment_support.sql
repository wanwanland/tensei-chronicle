-- Add source column to track static vs AI-enriched data
ALTER TABLE regional_data ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'static';

-- Remove duplicates before creating unique index
DELETE FROM regional_data a
USING regional_data b
WHERE a.ctid < b.ctid
  AND a.region_name = b.region_name
  AND a.year = b.year
  AND a.topic = b.topic;

-- Add unique constraint to prevent duplicate enrichment entries
CREATE UNIQUE INDEX IF NOT EXISTS idx_regional_data_unique
  ON regional_data (region_name, year, topic);
