# タスク一覧

## Task 1: 環境構築と依存関係のインストール
- [x] Next.js プロジェクト初期化
- [x] 依存パッケージインストール (@supabase/supabase-js, lucide-react, framer-motion, clsx, tailwind-merge)
- [x] .env.local.example 作成
- [x] src/lib/supabase.ts 作成
- [x] src/lib/cn.ts 作成
- [x] src/lib/constants.ts 作成
- [x] src/types/index.ts 作成
- [x] Tailwind CSS テーマ設定 (globals.css)
- [x] REQUIREMENTS.md, TASKS.md 作成
- [x] ビルド確認

## Task 2: 共通UIコンポーネントの作成
- [x] CyberpunkBackground (動くグリッド + ノイズ + グラデーション)
- [x] ScanlineOverlay (CRTスキャンライン)
- [x] GlassPanel (ガラスモーフィズムカード)
- [x] NeonButton / NeonInput / NeonSelect
- [x] Header (グリッチテキスト)
- [x] InputTerminal (計器パネル風入力フォーム)
- [x] layout.tsx / page.tsx 更新
- [x] UI表示確認

## Task 3: シミュレーションロジックの実装
- [x] supabase/seed.sql (テーブル作成 + シードデータ)
- [x] src/actions/simulate.ts (Server Action)
- [x] InputTerminal → Server Action 連携
- [x] 動作確認 (Supabaseシードデータ投入済み、RLS設定済み、読み書き確認済み)

## Task 4: タイムライン表示の実装
- [x] TimelineNode (スクロールアニメーション)
- [x] TimelineConnector (接続線)
- [x] Timeline (コンテナ)
- [x] result/page.tsx (結果ページ + HUDバー)
- [ ] E2E動作確認 (ブラウザでフォーム送信→タイムライン表示を確認)
