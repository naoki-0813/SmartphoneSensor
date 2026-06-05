---
name: setup
description: 新規プロジェクトを pnpm + Vite + React + TypeScript で初期化する。空のフォルダや、テンプレートをコピーしたばかりのフォルダで開発を始めるときに使う。「セットアップ」「初期化」「環境構築」「プロジェクトを作りたい」と言われたら使う。
---

# プロジェクト初期化スキル

このフォルダで Vite + React + TypeScript の開発環境を立ち上げる。
利用者は IT 初心者の可能性があるため、各ステップで「今なにをしているか」を
一言ずつ日本語で説明しながら進めること。

## 手順

1. **状況を確認する**
   - すでに `package.json` があるか確認する。あれば「既存プロジェクト」として扱い、
     上書きせず利用者に確認する。
   - `pnpm` が使えるか確認する（`pnpm -v`）。無ければ
     「`npm install -g pnpm` でインストールできます」と案内する。

2. **Vite で雛形を作る**
   - 空フォルダなら、カレントに作成する:
     `pnpm create vite . --template react-ts`
   - 既にファイルがあって上書きを避けたい場合は、利用者に確認する。

3. **依存をインストール**
   - `pnpm install`

4. **品質ツールを追加**（規約に合わせて）
   - `pnpm add -D prettier eslint vitest @testing-library/react @testing-library/jest-dom jsdom`
   - `package.json` の scripts に次を追加（無ければ）:
     - `"lint": "eslint ."`
     - `"format": "prettier --write ."`
     - `"test": "vitest run"`
   - リポジトリ直下に `.prettierrc.json`（`{}` でも可）を置く。

5. **動作確認**
   - `pnpm dev` で開発サーバが起動することを確認し、表示された URL を伝える。
   - うまくいかない場合はエラーを読み、原因と対処を日本語で説明する。

6. **最後に**
   - できたことを箇条書きで報告する（「開発サーバの起動 = `pnpm dev`」など）。
   - 次の一歩（最初のコンポーネントを作る等）を提案する。

## 注意
- 既存のコードを勝手に消さない。上書きの前に必ず確認する。
- `CLAUDE.md` の「プロジェクト概要」が空なら、内容を一緒に埋めることを提案する。
