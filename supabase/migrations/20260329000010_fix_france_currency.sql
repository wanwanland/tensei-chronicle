-- フランスの通貨は2002年にFRF→EURに移行
-- 1999-2001年のcurrencyをFRFに修正し、big_mac_priceもFRF値に
UPDATE eras_master SET currency = 'FRF', big_mac_price = 18.50 WHERE year = 1999 AND region = 'フランス';
UPDATE eras_master SET currency = 'FRF', big_mac_price = 18.50 WHERE year = 2000 AND region = 'フランス';
UPDATE eras_master SET currency = 'FRF', big_mac_price = 18.50 WHERE year = 2001 AND region = 'フランス';

-- avg_annual_incomeも修正: 1999-2001はFRF建てであるべき
-- 1 EUR = 6.55957 FRF
-- 1999: 25000 EUR → 163,989 FRF
-- 2000: 25000 EUR → 163,989 FRF (roughly, use original migration values * 6.56)
-- 2001: 26000 EUR → 170,549 FRF
-- Actually, let's check: the original migration set these as EUR values already
-- We'll convert them back to FRF
UPDATE eras_master SET avg_annual_income = 157000 WHERE year = 1999 AND region = 'フランス'; -- ~24000 EUR * 6.56
UPDATE eras_master SET avg_annual_income = 164000 WHERE year = 2000 AND region = 'フランス'; -- ~25000 EUR * 6.56
UPDATE eras_master SET avg_annual_income = 168000 WHERE year = 2001 AND region = 'フランス'; -- ~25600 EUR * 6.56
