-- Move country-specific events out of global (region=NULL) to their proper region
-- These events are primarily about one country and shouldn't appear in every timeline

-- ベルリンの壁・ドイツ再統一 → ドイツはない国なので削除(既にロシア/イギリス/フランス側に類似あり)
DELETE FROM social_events WHERE region IS NULL AND title = 'ベルリンの壁建設';
DELETE FROM social_events WHERE region IS NULL AND title = 'ベルリンの壁崩壊';
DELETE FROM social_events WHERE region IS NULL AND title = 'ドイツ再統一';

-- 天安門事件 → 中国固有
UPDATE social_events SET region = '中国' WHERE region IS NULL AND title = '天安門事件';

-- ボパール化学工場事故 → インド固有
UPDATE social_events SET region = 'インド' WHERE region IS NULL AND title = 'ボパール化学工場事故';

-- チェルノブイリ → ロシア(ソ連)固有
UPDATE social_events SET region = 'ロシア' WHERE region IS NULL AND title = 'チェルノブイリ原発事故';

-- 東日本大震災 → 日本固有
UPDATE social_events SET region = '日本' WHERE region IS NULL AND title = '東日本大震災';

-- キューバ革命 → 削除(対応国なし)
DELETE FROM social_events WHERE region IS NULL AND title = 'キューバ革命';

-- ケネディ暗殺 → アメリカ
UPDATE social_events SET region = 'アメリカ' WHERE region IS NULL AND title = 'ケネディ大統領暗殺';

-- Brexit → イギリス
UPDATE social_events SET region = 'イギリス' WHERE region IS NULL AND title = 'Brexit国民投票';

-- ソ連崩壊 → ロシア
UPDATE social_events SET region = 'ロシア' WHERE region IS NULL AND title = 'ソ連崩壊';

-- 湾岸戦争 → 削除(対応国なし、アメリカ側に既にある)
DELETE FROM social_events WHERE region IS NULL AND title = '湾岸戦争';

-- イラク戦争 → アメリカ
UPDATE social_events SET region = 'アメリカ' WHERE region IS NULL AND title = 'イラク戦争';

-- ルワンダ虐殺 → 削除(対応国なし)
DELETE FROM social_events WHERE region IS NULL AND title = 'ルワンダ虐殺';

-- エボラ出血熱 → ナイジェリア(西アフリカ圏で最も関連)
UPDATE social_events SET region = 'ナイジェリア' WHERE region IS NULL AND title = 'エボラ出血熱流行';

-- EU発足 → フランス
UPDATE social_events SET region = 'フランス' WHERE region IS NULL AND title = 'EU発足';

-- ロシアのウクライナ侵攻 → ロシア
UPDATE social_events SET region = 'ロシア' WHERE region IS NULL AND title = 'ロシアのウクライナ侵攻';

-- キャンプ・デービッド合意 → アメリカ
UPDATE social_events SET region = 'アメリカ' WHERE region IS NULL AND title = 'キャンプ・デービッド合意';

-- ガザ紛争 → 削除(対応国なし)
DELETE FROM social_events WHERE region IS NULL AND title = 'ガザ紛争激化';
