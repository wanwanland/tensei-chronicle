-- ソマリアのハンバーガー価格を修正
-- $1 USD = ~572 SOS (2024)
-- 安い食事 = ~$3 = ~1,700 SOS
-- ハンバーガー相当 = ~$2 = ~1,100-1,500 SOS (2025)
-- 以前の値(150,000 SOS)は100倍以上高すぎた

-- 1950-1960年代: ハンバーガー的な食事はほぼ存在しない、推定値
UPDATE eras_master SET big_mac_price = 0.5 WHERE year = 1950 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.6 WHERE year = 1951 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.6 WHERE year = 1952 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.7 WHERE year = 1953 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.7 WHERE year = 1954 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.8 WHERE year = 1955 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.8 WHERE year = 1956 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.9 WHERE year = 1957 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 0.9 WHERE year = 1958 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.0 WHERE year = 1959 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.0 WHERE year = 1960 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.2 WHERE year = 1961 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.4 WHERE year = 1962 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.6 WHERE year = 1963 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1.8 WHERE year = 1964 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 2.0 WHERE year = 1965 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 2.2 WHERE year = 1966 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 2.5 WHERE year = 1967 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 2.8 WHERE year = 1968 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 3.0 WHERE year = 1969 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 3.5 WHERE year = 1970 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 4.0 WHERE year = 1971 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 4.5 WHERE year = 1972 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 5.0 WHERE year = 1973 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 6.0 WHERE year = 1974 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 7.0 WHERE year = 1975 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 8.0 WHERE year = 1976 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 9.0 WHERE year = 1977 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 10 WHERE year = 1978 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 12 WHERE year = 1979 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 15 WHERE year = 1980 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 18 WHERE year = 1981 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 22 WHERE year = 1982 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 26 WHERE year = 1983 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 30 WHERE year = 1984 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 35 WHERE year = 1985 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 40 WHERE year = 1986 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 50 WHERE year = 1987 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 60 WHERE year = 1988 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 80 WHERE year = 1989 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 100 WHERE year = 1990 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 150 WHERE year = 1991 AND region = 'ソマリア'; -- civil war, inflation
UPDATE eras_master SET big_mac_price = 200 WHERE year = 1992 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 250 WHERE year = 1993 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 300 WHERE year = 1994 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 350 WHERE year = 1995 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 400 WHERE year = 1996 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 450 WHERE year = 1997 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 500 WHERE year = 1998 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 550 WHERE year = 1999 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 600 WHERE year = 2000 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 650 WHERE year = 2001 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 700 WHERE year = 2002 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 720 WHERE year = 2003 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 750 WHERE year = 2004 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 780 WHERE year = 2005 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 800 WHERE year = 2006 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 830 WHERE year = 2007 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 860 WHERE year = 2008 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 900 WHERE year = 2009 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 950 WHERE year = 2010 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 980 WHERE year = 2011 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1000 WHERE year = 2012 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1020 WHERE year = 2013 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1050 WHERE year = 2014 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1080 WHERE year = 2015 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1100 WHERE year = 2016 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1120 WHERE year = 2017 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1150 WHERE year = 2018 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1180 WHERE year = 2019 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1200 WHERE year = 2020 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1250 WHERE year = 2021 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1300 WHERE year = 2022 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1400 WHERE year = 2023 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1450 WHERE year = 2024 AND region = 'ソマリア';
UPDATE eras_master SET big_mac_price = 1500 WHERE year = 2025 AND region = 'ソマリア'; -- ~$2.60 at 572 SOS/$

-- 年収も修正: 以前の値が過大だった
-- ソマリアGDP per capita ~$500 (2024) → 年収は約$300-500 = 170,000-285,000 SOS
UPDATE eras_master SET avg_annual_income = 200000 WHERE year = 2020 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 220000 WHERE year = 2021 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 240000 WHERE year = 2022 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 260000 WHERE year = 2023 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 280000 WHERE year = 2024 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 300000 WHERE year = 2025 AND region = 'ソマリア';

-- 2010年代も修正
UPDATE eras_master SET avg_annual_income = 100000 WHERE year = 2010 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 110000 WHERE year = 2011 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 120000 WHERE year = 2012 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 130000 WHERE year = 2013 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 140000 WHERE year = 2014 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 150000 WHERE year = 2015 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 160000 WHERE year = 2016 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 170000 WHERE year = 2017 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 180000 WHERE year = 2018 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 190000 WHERE year = 2019 AND region = 'ソマリア';

-- 2000年代
UPDATE eras_master SET avg_annual_income = 30000 WHERE year = 2000 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 35000 WHERE year = 2001 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 40000 WHERE year = 2002 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 45000 WHERE year = 2003 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 50000 WHERE year = 2004 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 55000 WHERE year = 2005 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 60000 WHERE year = 2006 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 70000 WHERE year = 2007 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 80000 WHERE year = 2008 AND region = 'ソマリア';
UPDATE eras_master SET avg_annual_income = 90000 WHERE year = 2009 AND region = 'ソマリア';

-- SOS円換算レートも修正が必要
-- $1 = 572 SOS, $1 = 150 JPY → 1 SOS = 150/572 = 0.262 JPY
-- 以前の0.026は10分の1だった
