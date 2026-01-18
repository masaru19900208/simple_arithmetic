# MathMaster - 算数マスター

Android端末向けのシンプルな算数問題アプリです。
React + Vite + Capacitor で開発されています。

## 機能

- **計算モード**: 足し算、引き算、掛け算、割り算、ランダム
- **難易度設定**: かんたん、ふつう、むずかしい（足し算は3桁計算に対応）
- **結果表示**: タイム計測、正誤判定、計算履歴の振り返り機能
- **ランキング**: ローカル保存によるランキング機能
- **UI**: テンキー入力、ライトテーマ、フリガナ付きの完全日本語対応

## 開発・テスト手順

このプロジェクトはWeb技術で書かれていますが、Androidアプリとして動作させることを前提としています。

### 前提条件

- Node.js (v18以上推奨)
- Android Studio (実機テスト・ビルド用)

### セットアップ

```bash
npm install
```

### 開発サーバー起動（ブラウザでの確認）

```bash
npm run dev
```

### Android実機でのテスト・ビルド

Android端末での動作確認やリリースビルドの作成には、Android Studioが必要です。
詳細な手順は以下のガイドを参照してください。

- 📖 **[Android実機およびエミュレータでの動作テストガイド](./android_testing_guide.md)**
- 🚀 **[Google Play ストアへの申請手引書](./play_store_submission_guide.md)**

## 技術スタック

- Frontend: React, TypeScript, Vite
- Styling: Chakra UI
- State Management: Zustand
- Mobile Runtime: Capacitor
