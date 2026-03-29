-- 「自民」は日本の自民党と紛らわしいので正式名称に修正
UPDATE social_events
SET title = '保守党・自由民主党 連立政権',
    description = '総選挙で過半数を得た政党がなく、キャメロン率いる保守党とクレッグ率いる自由民主党の連立政権が発足した'
WHERE region = 'イギリス' AND year = 2010 AND title = '保守・自民連立政権';
