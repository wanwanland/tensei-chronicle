-- ============================================================
-- Add missing important events found via native-language research
-- for each country. Uses ON CONFLICT DO NOTHING to skip duplicates.
-- ============================================================

-- ナイジェリア
INSERT INTO social_events (year, region, category, title, description) VALUES (1951, 'ナイジェリア', '政治', 'マッカーリー憲法', '地域自治と連邦制の基盤を築いた画期的な憲法') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1956, 'ナイジェリア', '経済', '石油発見', 'ニジェールデルタのオロイビリで商業規模の石油が初めて発見された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1962, 'ナイジェリア', '社会', '第一次国勢調査危機', '人口統計の操作疑惑が地域間の深刻な対立を引き起こした') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1966, 'ナイジェリア', '政治', 'イロンシ将軍政権', '最初の軍事政権で統一政策が北部の激しい反発を招いた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1975, 'ナイジェリア', '政治', 'ムルタラ・ムハンマドの改革', '腐敗した公務員の大量解雇と首都移転計画を発表') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1979, 'ナイジェリア', '政治', 'シャガリ大統領就任', '13年ぶりの民政復帰で第二共和政が発足') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1993, 'ナイジェリア', '政治', 'モシュッド・アビオラの当選無効化', '「6月12日」は民主主義の象徴的な日となった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2003, 'ナイジェリア', '政治', '第四共和政の最初の文民政権交代', 'オバサンジョが初めて選挙で再選された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2012, 'ナイジェリア', '社会', 'ボコ・ハラムのクリスマス爆弾テロ', 'マデラ教会への攻撃で数十人が死亡') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2015, 'ナイジェリア', '政治', '野党候補ブハリの当選', 'アフリカ史上初の現職大統領が選挙で敗北を認めた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2025, 'ナイジェリア', '政治', 'リバーズ州非常事態宣言', 'ティヌブ大統領が南部産油州に非常事態を宣言') ON CONFLICT DO NOTHING;

-- フランス
INSERT INTO social_events (year, region, category, title, description) VALUES (1950, 'フランス', '経済', 'SMIG（最低賃金）の創設', 'フランス初の法定最低賃金が労働者の生活を保障') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1950, 'フランス', '政治', 'ロベール・シューマン宣言', '欧州統合の出発点となった石炭鉄鋼共同体構想') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1953, 'フランス', '社会', '1953年のストライキ', '400万人が参加した大規模ストライキで社会保障が拡充') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1960, 'フランス', '政治', 'フランスの脱植民地化', 'アフリカ14カ国が一斉に独立した「アフリカの年」') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1964, 'フランス', '政治', 'フランスが中華人民共和国を承認', '西側主要国として初めて中国を外交承認') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1974, 'フランス', '社会', '成人年齢の引き下げ', 'ジスカールデスタン大統領が成人年齢を21歳から18歳に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1983, 'フランス', '経済', 'ミッテランの緊縮転換', '社会主義的政策から経済自由化路線への歴史的転換') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2000, 'フランス', '社会', '週35時間労働制の本格施行', '世界で最も短い法定労働時間が定着') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2004, 'フランス', '社会', 'スカーフ禁止法', '公立学校での宗教的シンボルの着用を禁止し世俗主義を強化') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2013, 'フランス', '社会', '同性婚合法化', '全ての人のための婚姻法が成立し大規模なデモが発生') ON CONFLICT DO NOTHING;

-- 中国
INSERT INTO social_events (year, region, category, title, description) VALUES (1950, '中国', '社会', '婚姻法の公布', '封建的な婚姻制度を廃止し男女平等を法制化した最初の法律') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1954, '中国', '政治', '第一回全国人民代表大会', '初の憲法が採択され毛沢東が国家主席に選出された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1955, '中国', '文化', '漢字簡化方案の公布', '簡体字とピンインの導入で識字率向上を目指した') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1959, '中国', '災害', '大飢饉の始まり', '大躍進の失敗で推定1500万〜5500万人が餓死した') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1969, '中国', '政治', '中ソ国境紛争', '珍宝島（ダマンスキー島）で武力衝突が発生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1984, '中国', '経済', '鄧小平の深圳視察', '経済特区の成功を確認し対外開放を全国に拡大') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2001, '中国', 'スポーツ', '北京オリンピック招致成功', '「全民族が歓喜した日」として記憶された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2003, '中国', '技術', '宇宙飛行士楊利偉の宇宙飛行', '中国が世界で3番目の有人宇宙飛行国に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2015, '中国', '社会', '一人っ子政策の廃止', '35年間続いた産児制限が「二人っ子政策」に転換') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2020, '中国', '技術', '嫦娥5号月面サンプルリターン', '44年ぶりの月面土壌採取に成功') ON CONFLICT DO NOTHING;

-- インド
INSERT INTO social_events (year, region, category, title, description) VALUES (1950, 'インド', '経済', '計画委員会の設立', 'ネルー主導の混合経済体制による国家建設が始まった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1955, 'インド', '社会', 'ヒンドゥー法典法の施行', 'ヒンドゥー教徒の婚姻・相続を近代化した画期的法律') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1961, 'インド', '政治', 'ゴア解放', 'ポルトガル領ゴアを軍事力で併合し植民地支配に終止符') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1971, 'インド', '政治', 'バングラデシュ独立戦争', 'インド軍の介入でパキスタンが降伏し新国家が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1977, 'インド', '政治', 'ジャナタ党政権', '非常事態宣言後の選挙で初の非国民会議派政権が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1992, 'インド', '社会', 'マンディル・マスジド問題', 'バーブリー・マスジドの破壊がヒンドゥー・ムスリム対立を激化') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2005, 'インド', '政治', '情報公開法（RTI法）の施行', '市民が政府情報にアクセスする権利を獲得') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2008, 'インド', '政治', '米印原子力協力協定', '核不拡散体制の例外としてインドの核開発を事実上承認') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2016, 'インド', '政治', '外科的攻撃', 'パキスタン支配下のカシミールでテロリスト拠点を越境攻撃') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2020, 'インド', '社会', '農業改革法と農民抗議', '史上最大規模の農民デモが1年以上続いた') ON CONFLICT DO NOTHING;

-- ブラジル
INSERT INTO social_events (year, region, category, title, description) VALUES (1951, 'ブラジル', '政治', 'ヴァルガスの民主的復帰', '48.7%の得票率で大統領に返り咲いた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1953, 'ブラジル', '経済', 'ペトロブラス設立', '国営石油会社の設立が経済ナショナリズムの象徴に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1960, 'ブラジル', '政治', 'ブラジリア遷都', 'クビチェックの「50年を5年で」計画の集大成') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1968, 'ブラジル', '政治', 'AI-5の発令', '最も弾圧的な制度令で市民の自由が完全に剥奪された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1974, 'ブラジル', '政治', 'ガイゼル大統領の漸進的開放', '軍事政権からの段階的な民政移管が始まった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1985, 'ブラジル', '政治', 'タンクレード・ネーヴェスの死', '初の文民大統領に選出されるも就任前に急死') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1988, 'ブラジル', '社会', 'SUS（統一医療制度）の創設', '新憲法により全国民への無料医療が保障された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2003, 'ブラジル', '社会', 'ボルサ・ファミリア開始', '条件付き現金給付プログラムで数百万世帯が貧困から脱出') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2014, 'ブラジル', '政治', 'ラヴァ・ジャト作戦開始', 'ブラジル史上最大の汚職捜査で政財界が震撼') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2022, 'ブラジル', '環境', 'アマゾン保護への転換', 'ルーラ復帰でアマゾン破壊率が前年比50%減少') ON CONFLICT DO NOTHING;

-- 南アフリカ
INSERT INTO social_events (year, region, category, title, description) VALUES (1952, '南アフリカ', '社会', '反抗運動（Defiance Campaign）', 'ANCとインド人会議による初の大規模非暴力抵抗') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1955, '南アフリカ', '政治', '自由憲章の採択', '非人種差別の南アフリカのビジョンを描いた歴史的文書') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1961, '南アフリカ', '政治', '共和国宣言と英連邦脱退', 'アパルトヘイトへの国際的圧力で英連邦から離脱') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1963, '南アフリカ', '政治', 'リヴォニア裁判', 'マンデラを含む8名が終身刑を宣告された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1983, '南アフリカ', '政治', '統一民主戦線（UDF）結成', '国内最大の反アパルトヘイト組織が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1986, '南アフリカ', '政治', 'ルビコン演説の失敗', 'ボタ大統領の改革拒否が国際社会の制裁強化を招いた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1993, '南アフリカ', '政治', 'クリス・ハニ暗殺', 'SACP議長の暗殺が民主化交渉の危機と国民の団結を生んだ') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1995, '南アフリカ', 'スポーツ', 'ラグビーW杯優勝', 'マンデラがスプリングボクスのジャージを着て国民統合を象徴') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2012, '南アフリカ', '社会', 'マリカナ虐殺', '警察がストライキ中の鉱山労働者34人を射殺') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2021, '南アフリカ', '社会', '7月暴動', 'ズマ元大統領の逮捕を機に大規模な暴動と略奪が発生') ON CONFLICT DO NOTHING;

-- ソマリア
INSERT INTO social_events (year, region, category, title, description) VALUES (1960, 'ソマリア', '政治', '英領・伊領ソマリランドの統合', '2つの旧植民地が合併してソマリア共和国が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1972, 'ソマリア', '文化', 'ソマリ語正書法の制定', 'ラテン文字によるソマリ語の公式表記が確立された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1977, 'ソマリア', '政治', 'オガデン戦争', 'エチオピアのソマリ人居住地域を取り戻すため全面戦争に突入') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1978, 'ソマリア', '政治', 'ソ連との同盟破棄', 'オガデン戦争でソ連がエチオピア支援に回り同盟が崩壊') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1988, 'ソマリア', '災害', 'ハルゲイサ爆撃', '政府軍が自国の第二の都市を空爆し数万人が死亡') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1992, 'ソマリア', '政治', '「希望回復」作戦', '大飢饉を受け米軍主導の国連人道介入が実施された') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1993, 'ソマリア', '政治', 'モガディシュの戦闘（ブラックホーク・ダウン）', '米兵18名が死亡し米国が撤退') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2006, 'ソマリア', '政治', 'イスラム法廷連合の支配', 'モガディシュに初めて秩序をもたらすも短命に終わった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2012, 'ソマリア', '政治', '連邦政府の正式樹立', '21年ぶりに国際社会が承認する正式政府が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2017, 'ソマリア', '災害', 'モガディシュ爆弾テロ', 'ソマリア史上最悪のテロで500人以上が死亡') ON CONFLICT DO NOTHING;

-- オーストラリア
INSERT INTO social_events (year, region, category, title, description) VALUES (1957, 'オーストラリア', '社会', 'アルバート・ナマジラの市民権', '先住民アーティストが初めてオーストラリア市民権を取得') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1963, 'オーストラリア', '政治', 'イルカラ樹皮請願', '先住民が土地権を求めて連邦議会に初めて正式に請願') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1966, 'オーストラリア', '社会', 'ウェーブヒル・ウォークオフ', 'グリンジ族の農場ストライキが土地権運動の原点に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1972, 'オーストラリア', '政治', 'テント大使館の設置', '先住民活動家が国会議事堂前にテント大使館を設立') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1975, 'オーストラリア', '政治', 'ウィットラム解任', '総督が首相を解任する憲政史上最大の危機が発生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1993, 'オーストラリア', '政治', 'ネイティブ・タイトル法', 'マボ判決を受け先住民の土地権を法律で認めた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1997, 'オーストラリア', '社会', '盗まれた世代報告書', '先住民の子供を強制的に家族から引き離した政策の実態を公表') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2002, 'オーストラリア', '災害', 'バリ島爆弾テロ', 'オーストラリア人88人を含む202人がテロで死亡') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2019, 'オーストラリア', '災害', 'ブラック・サマー森林火災', '12万平方キロが焼失し30億匹の動物が被害を受けた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2025, 'オーストラリア', '政治', 'ビクトリア州条約', 'オーストラリア初の先住民との条約が法制化された') ON CONFLICT DO NOTHING;

-- ロシア
INSERT INTO social_events (year, region, category, title, description) VALUES (1955, 'ロシア', '政治', 'ワルシャワ条約機構の設立', '冷戦の東側軍事同盟が正式に発足した') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1961, 'ロシア', '技術', 'ガガーリンの宇宙飛行', '人類初の宇宙飛行が全世界に衝撃を与えた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1979, 'ロシア', '政治', 'アフガニスタン侵攻', '10年に及ぶ泥沼の戦争がソ連崩壊の遠因となった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1985, 'ロシア', '政治', 'ゴルバチョフのペレストロイカ', '改革と情報公開が体制変革の引き金に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1991, 'ロシア', '政治', '8月クーデター未遂', '保守派のクーデター失敗がソ連崩壊を決定的にした') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1993, 'ロシア', '政治', '10月政変', 'エリツィンが議会を戦車で砲撃し新憲法を強行制定した') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1998, 'ロシア', '経済', 'ロシア経済危機', 'デフォルトでルーブルが暴落し国民の貯蓄が消失') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2008, 'ロシア', '政治', 'ジョージア戦争', '南オセチアを巡る5日間の戦争でロシアが軍事介入') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2014, 'ロシア', '政治', 'クリミア併合', 'ウクライナからクリミア半島を一方的に併合し国際社会と対立') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2022, 'ロシア', '政治', 'ウクライナ全面侵攻', '第二次大戦後欧州最大の戦争が勃発') ON CONFLICT DO NOTHING;

-- アメリカ
INSERT INTO social_events (year, region, category, title, description) VALUES (1954, 'アメリカ', '社会', 'ブラウン対教育委員会判決', '公立学校の人種隔離を違憲とした画期的な最高裁判決') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1963, 'アメリカ', '社会', 'ワシントン大行進', 'キング牧師の「I Have a Dream」演説が公民権運動の転機に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1969, 'アメリカ', '文化', 'ウッドストック', '40万人が集った音楽フェスティバルがカウンターカルチャーの象徴に') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1974, 'アメリカ', '政治', 'ウォーターゲート事件', 'ニクソン大統領がスキャンダルで辞任した初の大統領') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1986, 'アメリカ', '技術', 'チャレンジャー号爆発', 'スペースシャトルが打ち上げ73秒後に爆発し乗員7名が死亡') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2001, 'アメリカ', '災害', '9.11同時多発テロ', '3000人が犠牲となり世界秩序が根本から変わった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2008, 'アメリカ', '政治', 'オバマ大統領当選', 'アメリカ初のアフリカ系大統領が誕生') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2020, 'アメリカ', '社会', 'ジョージ・フロイド事件', '警察による殺害が全米規模のBLM運動を引き起こした') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2021, 'アメリカ', '政治', '連邦議会襲撃事件', 'トランプ支持者が議事堂を占拠した前代未聞の事件') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2024, 'アメリカ', '政治', 'トランプ大統領再選', '刑事起訴されながらも大統領に返り咲いた異例の事態') ON CONFLICT DO NOTHING;

-- イギリス
INSERT INTO social_events (year, region, category, title, description) VALUES (1952, 'イギリス', '社会', 'エリザベス2世即位', '70年間の在位が始まった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1966, 'イギリス', 'スポーツ', 'ワールドカップ優勝', 'ウェンブリーでの勝利が英国サッカー史上最大の栄光') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1969, 'イギリス', '政治', '北アイルランド紛争', '30年に及ぶ「ザ・トラブルズ」が始まった') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1979, 'イギリス', '政治', 'サッチャー首相就任', '英国初の女性首相が新自由主義改革を推進') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1982, 'イギリス', '政治', 'フォークランド紛争', 'アルゼンチンとの領土紛争で英国が勝利') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1997, 'イギリス', '社会', 'ダイアナ妃の死', '全世界が追悼した王室の悲劇') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (1998, 'イギリス', '政治', 'ベルファスト合意', '北アイルランドに30年ぶりの和平をもたらした') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2012, 'イギリス', 'スポーツ', 'ロンドンオリンピック', '3度目の夏季五輪で英国が成功を収めた') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2016, 'イギリス', '政治', 'Brexit国民投票', 'EU離脱の決定が英国と欧州を揺るがした') ON CONFLICT DO NOTHING;
INSERT INTO social_events (year, region, category, title, description) VALUES (2022, 'イギリス', '社会', 'エリザベス2世崩御', '在位70年の女王の死去で国民が深い悲しみに包まれた') ON CONFLICT DO NOTHING;
