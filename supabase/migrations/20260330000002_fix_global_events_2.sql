-- Remove country-specific events from global (region=NULL)
-- These are already registered under their respective country, or are not truly global

-- Already exists in アメリカ → delete global duplicate
DELETE FROM social_events WHERE region IS NULL AND title = 'iPhone発売';
DELETE FROM social_events WHERE region IS NULL AND title = 'IBM PC発売';
DELETE FROM social_events WHERE region IS NULL AND title = 'アポロ11号月面着陸';
DELETE FROM social_events WHERE region IS NULL AND title = '9.11同時多発テロ';
DELETE FROM social_events WHERE region IS NULL AND title = 'ニクソンショック';
DELETE FROM social_events WHERE region IS NULL AND title = 'ベトナム戦争終結';
DELETE FROM social_events WHERE region IS NULL AND title = '水素爆弾実験';

-- Already exists in ロシア
DELETE FROM social_events WHERE region IS NULL AND title = 'スプートニク打ち上げ';

-- No corresponding country
DELETE FROM social_events WHERE region IS NULL AND title = 'アラブの春';
DELETE FROM social_events WHERE region IS NULL AND title = '第三次中東戦争';
DELETE FROM social_events WHERE region IS NULL AND title = '朝鮮戦争勃発';
DELETE FROM social_events WHERE region IS NULL AND title = '朝鮮戦争休戦';

-- スマトラ沖地震はインドに影響大だが既にインドに津波エントリあり
DELETE FROM social_events WHERE region IS NULL AND title = 'スマトラ沖地震・津波';
