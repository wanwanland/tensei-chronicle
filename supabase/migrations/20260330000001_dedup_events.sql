-- ============================================================
-- Remove duplicate social_events
-- Keep only one entry per (region, year, title) combination
-- ============================================================

-- Delete duplicates: keep the row with the smallest ctid (first inserted)
DELETE FROM social_events a
USING social_events b
WHERE a.ctid > b.ctid
  AND a.year = b.year
  AND a.title = b.title
  AND (a.region IS NOT DISTINCT FROM b.region);

-- Fix: ロサンゼルス暴動 was entered as both 1991 and 1992 (correct year is 1992)
DELETE FROM social_events WHERE year = 1991 AND title = 'ロサンゼルス暴動';

-- Add unique index to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_social_events_unique
  ON social_events (year, COALESCE(region, '__global__'), title);
