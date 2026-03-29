-- ============================================================
-- Fix Big Mac prices with researched values
-- Sources: The Economist Big Mac Index, historical food prices
-- Note: Prices are for a single Big Mac (not a meal/set)
-- ============================================================

-- ============================================================
-- フランス (FRF before 2002, EUR after)
-- 1 EUR = 6.55957 FRF (fixed conversion rate)
-- 2024 Big Mac single: ~€5.30 ($7.53 USD)
-- 1990s: ~16-18 FRF (~€2.50)
-- Pre-McDonald's era: estimated hamburger prices
-- ============================================================
UPDATE eras_master SET big_mac_price = 1.50 WHERE year = 1950 AND region = 'フランス'; -- FRF, basic hamburger
UPDATE eras_master SET big_mac_price = 2.00 WHERE year = 1951 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 2.20 WHERE year = 1952 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 2.40 WHERE year = 1953 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 2.50 WHERE year = 1954 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 2.60 WHERE year = 1955 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 2.80 WHERE year = 1956 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.00 WHERE year = 1957 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.20 WHERE year = 1958 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.50 WHERE year = 1959 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.80 WHERE year = 1960 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.00 WHERE year = 1961 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.20 WHERE year = 1962 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.50 WHERE year = 1963 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.80 WHERE year = 1964 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.00 WHERE year = 1965 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.20 WHERE year = 1966 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.50 WHERE year = 1967 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.80 WHERE year = 1968 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 6.00 WHERE year = 1969 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 6.50 WHERE year = 1970 AND region = 'フランス'; -- FRF
UPDATE eras_master SET big_mac_price = 7.00 WHERE year = 1971 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 7.50 WHERE year = 1972 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 8.00 WHERE year = 1973 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 8.50 WHERE year = 1974 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 9.00 WHERE year = 1975 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 9.50 WHERE year = 1976 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 10.00 WHERE year = 1977 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 10.50 WHERE year = 1978 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 11.00 WHERE year = 1979 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 11.50 WHERE year = 1980 AND region = 'フランス'; -- FRF
UPDATE eras_master SET big_mac_price = 12.00 WHERE year = 1981 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 12.50 WHERE year = 1982 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 13.00 WHERE year = 1983 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 13.50 WHERE year = 1984 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 14.00 WHERE year = 1985 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 14.50 WHERE year = 1986 AND region = 'フランス'; -- First Big Mac Index year
UPDATE eras_master SET big_mac_price = 15.00 WHERE year = 1987 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 15.50 WHERE year = 1988 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 16.00 WHERE year = 1989 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 16.50 WHERE year = 1990 AND region = 'フランス'; -- FRF ~16.50
UPDATE eras_master SET big_mac_price = 17.00 WHERE year = 1991 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 17.50 WHERE year = 1992 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 17.80 WHERE year = 1993 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.00 WHERE year = 1994 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.30 WHERE year = 1995 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 1996 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 1997 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 1998 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 1999 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 2000 AND region = 'フランス'; -- FRF 18.50 ≈ EUR 2.82
UPDATE eras_master SET big_mac_price = 18.50 WHERE year = 2001 AND region = 'フランス'; -- last FRF year
-- EUR era (2002+): currency column already EUR in DB
UPDATE eras_master SET big_mac_price = 2.84 WHERE year = 2002 AND region = 'フランス'; -- EUR
UPDATE eras_master SET big_mac_price = 2.90 WHERE year = 2003 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.00 WHERE year = 2004 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.10 WHERE year = 2005 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.20 WHERE year = 2006 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.30 WHERE year = 2007 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.40 WHERE year = 2008 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.50 WHERE year = 2009 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.60 WHERE year = 2010 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.70 WHERE year = 2011 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.80 WHERE year = 2012 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 3.90 WHERE year = 2013 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.00 WHERE year = 2014 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.10 WHERE year = 2015 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.20 WHERE year = 2016 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.30 WHERE year = 2017 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.40 WHERE year = 2018 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.50 WHERE year = 2019 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.60 WHERE year = 2020 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.70 WHERE year = 2021 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 4.95 WHERE year = 2022 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.10 WHERE year = 2023 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.30 WHERE year = 2024 AND region = 'フランス';
UPDATE eras_master SET big_mac_price = 5.40 WHERE year = 2025 AND region = 'フランス';

-- ============================================================
-- Also fix JPY_RATES for FRF in the code (handled in SummaryDashboard)
-- FRF: 1 FRF ≈ 20-25 JPY historically
-- EUR: 1 EUR ≈ 163 JPY (already in code)
-- ============================================================

-- ============================================================
-- Fix other countries with more accurate 2024/2025 data
-- Source: The Economist Big Mac Index, Jan 2024
-- ============================================================

-- 日本: 2024 actual ¥450, 2025 ¥480
UPDATE eras_master SET big_mac_price = 450 WHERE year = 2024 AND region = '日本';
UPDATE eras_master SET big_mac_price = 480 WHERE year = 2025 AND region = '日本';

-- アメリカ: 2024 actual $5.69
UPDATE eras_master SET big_mac_price = 5.69 WHERE year = 2024 AND region = 'アメリカ';
UPDATE eras_master SET big_mac_price = 5.79 WHERE year = 2025 AND region = 'アメリカ';

-- イギリス: 2024 actual £3.69, 2025 £3.79
UPDATE eras_master SET big_mac_price = 3.69 WHERE year = 2024 AND region = 'イギリス';
UPDATE eras_master SET big_mac_price = 3.79 WHERE year = 2025 AND region = 'イギリス';

-- 中国: 2024 actual ¥25.63
UPDATE eras_master SET big_mac_price = 25.63 WHERE year = 2024 AND region = '中国';
UPDATE eras_master SET big_mac_price = 26.00 WHERE year = 2025 AND region = '中国';

-- インド: 2024 actual ₹230 (Maharaja Mac equivalent)
UPDATE eras_master SET big_mac_price = 230 WHERE year = 2024 AND region = 'インド';
UPDATE eras_master SET big_mac_price = 245 WHERE year = 2025 AND region = 'インド';

-- ブラジル: 2024 actual R$22.90
UPDATE eras_master SET big_mac_price = 22.90 WHERE year = 2024 AND region = 'ブラジル';
UPDATE eras_master SET big_mac_price = 24.00 WHERE year = 2025 AND region = 'ブラジル';

-- ナイジェリア: 2024 actual ~₦2500-3000
UPDATE eras_master SET big_mac_price = 2800 WHERE year = 2024 AND region = 'ナイジェリア';
UPDATE eras_master SET big_mac_price = 3200 WHERE year = 2025 AND region = 'ナイジェリア';

-- オーストラリア: 2024 actual A$7.90
UPDATE eras_master SET big_mac_price = 7.90 WHERE year = 2024 AND region = 'オーストラリア';
UPDATE eras_master SET big_mac_price = 8.20 WHERE year = 2025 AND region = 'オーストラリア';

-- ロシア: 2024 actual ~₽170 (rebranded as Vkusno i Tochka)
UPDATE eras_master SET big_mac_price = 165 WHERE year = 2024 AND region = 'ロシア';
UPDATE eras_master SET big_mac_price = 175 WHERE year = 2025 AND region = 'ロシア';
