#!/usr/bin/env node
/**
 * PostToolUse フック: Claude が編集／作成したファイルを Prettier で自動整形する。
 *
 * - Claude Code から標準入力(stdin)で JSON が渡される。その中の file_path を取り出す。
 * - 対象拡張子のときだけ `prettier --write` を実行する。
 * - Prettier が未導入でも、失敗しても、ここでは静かに終了する（開発を止めない）。
 *
 * このスクリプトは「初期値」です。整形が不要なら settings.json の hooks から外せます。
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const TARGET_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|css|scss|html|md)$/i;

async function main() {
  let raw = "";
  // 標準入力(stdin)を chunk ごとに読み取る。
  for await (const chunk of process.stdin) raw += chunk;
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return;
  }

  const filePath =
    payload?.tool_input?.file_path ??
    payload?.tool_input?.path ??
    payload?.tool_response?.file_path;

  if (!filePath || !TARGET_EXT.test(filePath)) return;
  if (!existsSync(filePath)) return;

  const isWin = process.platform === "win32";
  const cmd = isWin ? "pnpm.cmd" : "pnpm";

  // pnpm 経由でプロジェクトの Prettier を呼ぶ。未導入なら失敗するが握りつぶす。
  const res = spawnSync(cmd, ["exec", "prettier", "--write", filePath], {
    stdio: "ignore",
    timeout: 20000,
  });

  // フックは常に正常終了させ、エラーで作業を止めない。
  void res;
}

main()
  .catch(() => {})
  .finally(() => process.exit(0));
