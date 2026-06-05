---
name: component
description: React コンポーネントの雛形を、このプロジェクトの規約どおりに作る。「コンポーネントを作って」「〇〇ボタン/カード/フォームを作りたい」「新しい画面/部品が欲しい」と言われたら使う。TypeScript + 関数コンポーネント + named export で生成する。
---

# React コンポーネント作成スキル

CLAUDE.md の規約に沿って、新しい React コンポーネントを作る。

## 確認すること（不明なら質問）
- コンポーネント名（`PascalCase`）
- 置き場所（基本は `src/components/<Name>/`。画面なら `src/pages/`）
- 必要な props（あれば）
- スタイルの方針（既存に合わせる。無ければプレーンな className）

## 生成するもの
`src/components/<Name>/` に以下を作る（プロジェクトの既存スタイルがあればそれに合わせる）:

- `<Name>.tsx` — コンポーネント本体
- `index.ts` — `export { <Name> } from "./<Name>";`（再エクスポート）

### 雛形の例

```tsx
// src/components/Button/Button.tsx
type ButtonProps = {
  /** ボタンに表示する文字 */
  label: string;
  /** 押されたときの処理 */
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

## ルール
- **関数コンポーネント + named export**。`export default` は使わない。
- props は `type <Name>Props` で定義し、各 prop に短い日本語コメントを付ける。
- 1 ファイル 1 コンポーネント。ファイル名は `PascalCase.tsx`。
- 作成後、簡単な使い方（import の書き方）を日本語で示す。
- テストが必要そうなら `<Name>.test.tsx` の作成も提案する（Vitest + Testing Library）。
