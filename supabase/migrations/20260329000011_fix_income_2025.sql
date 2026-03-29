-- Fix 2024-2025 income data based on actual statistics
-- Sources: OECD, BLS, INSEE, NBS China, National Tax Agency Japan

-- 日本: NTA reports ¥4,775,000 for 2024
UPDATE eras_master SET avg_annual_income = 4780000 WHERE year = 2024 AND region = '日本';
UPDATE eras_master SET avg_annual_income = 4850000 WHERE year = 2025 AND region = '日本';

-- フランス: INSEE reports ~€43,000 gross for 2024
UPDATE eras_master SET avg_annual_income = 43000 WHERE year = 2024 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 44500 WHERE year = 2025 AND region = 'フランス';

-- 中国: NBS reports ~¥90,500 average for 2024
UPDATE eras_master SET avg_annual_income = 90500 WHERE year = 2024 AND region = '中国';
UPDATE eras_master SET avg_annual_income = 95000 WHERE year = 2025 AND region = '中国';

-- インド: ~₹850,000 average for 2024
UPDATE eras_master SET avg_annual_income = 850000 WHERE year = 2024 AND region = 'インド';
UPDATE eras_master SET avg_annual_income = 900000 WHERE year = 2025 AND region = 'インド';

-- ナイジェリア: ~₦4,060,000 average for 2024
UPDATE eras_master SET avg_annual_income = 4060000 WHERE year = 2024 AND region = 'ナイジェリア';
UPDATE eras_master SET avg_annual_income = 4500000 WHERE year = 2025 AND region = 'ナイジェリア';

-- ロシア: ~₽1,055,000 average for 2024
UPDATE eras_master SET avg_annual_income = 1055000 WHERE year = 2024 AND region = 'ロシア';
UPDATE eras_master SET avg_annual_income = 1150000 WHERE year = 2025 AND region = 'ロシア';

-- アメリカ: BLS $62,027 average for 2024 (some sources higher)
UPDATE eras_master SET avg_annual_income = 62000 WHERE year = 2024 AND region = 'アメリカ';
UPDATE eras_master SET avg_annual_income = 65000 WHERE year = 2025 AND region = 'アメリカ';

-- イギリス: ~£35,000 average for 2024 (already correct)
-- オーストラリア: ~A$75,000 average (already correct)
-- ブラジル: ~R$54,000 (already correct)

-- フランスの1990年代FRF年収も修正 (INSEE historical data)
-- 1990年のフランス平均年収は約 FRF 120,000-130,000
UPDATE eras_master SET avg_annual_income = 125000 WHERE year = 1990 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 128000 WHERE year = 1991 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 131000 WHERE year = 1992 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 133000 WHERE year = 1993 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 135000 WHERE year = 1994 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 138000 WHERE year = 1995 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 141000 WHERE year = 1996 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 144000 WHERE year = 1997 AND region = 'フランス';
UPDATE eras_master SET avg_annual_income = 148000 WHERE year = 1998 AND region = 'フランス';
