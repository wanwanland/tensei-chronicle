# 転生年表 (Tensei Chronicle) - 要件定義

## サービス概要
ユーザーが「別の時代、別の場所、別の性別で生まれていたら」というIFの人生をシミュレーションするウェブサービス。
統計データ（年収、物価）や社会ニュース、地域トピックを統合し、近未来的なUIで可視化する。

## 技術スタック
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS v4, Lucide-react
- Animation: Framer Motion
- Backend/DB: Supabase
- Design: サイバーパンク / ダークモード

## デザイン仕様
- ベースカラー: #000000
- アクセント: #00f3ff (ネオンシアン), #ff00ff (マゼンタ)
- ガラスモーフィズム、グリッド線、スキャンライン演出
- モノスペースフォント

## データベース
- eras_master: 年代マスタ（年収、物価、寿命）
- social_events: 社会的イベント
- regional_data: 地域別データ
- life_simulations: シミュレーション結果
