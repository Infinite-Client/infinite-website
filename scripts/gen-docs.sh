#!/bin/bash

# プロジェクトルートを取得
PROJECT_DIR=$(pwd)
echo "プロジェクトルート: $PROJECT_DIR"

# ---------------------------------------------
# 1. ドキュメントの生成
# ---------------------------------------------
echo "--- ドキュメントを生成中 ---"
cd infinite-client/
./gradlew genDocs

# プロジェクトルートに戻る
cd ..

# ---------------------------------------------
# 2. rsyncによる再帰的な移動 (重複ファイルは保持)
# ---------------------------------------------

# rsyncのオプション解説:
# -a: アーカイブモード (再帰的に処理し、パーミッション等を保持)
# -v: 詳細表示
# --ignore-existing: 移動先にファイルが存在する場合、上書きせずにソースをスキップ
# --remove-source-files: 転送が成功した後、移動元のファイルを削除 (mvと同じ効果)

# --- 英語ドキュメントの移動 ---
SOURCE_EN="infinite-client/build/docs/en_us/"
DEST_EN="$PROJECT_DIR/docs/"
echo "--- 英語ドキュメントを移動中: $SOURCE_EN -> $DEST_EN ---"
# 注意: SOURCE_ENの末尾の '/' は、ディレクトリの中身を移動するために必須です
rsync -av --ignore-existing --remove-source-files "$SOURCE_EN" "$DEST_EN"

# --- 日本語ドキュメントの移動 ---
SOURCE_JA="infinite-client/build/docs/ja_jp/"
DEST_JA="$PROJECT_DIR/i18n/ja/docusaurus-plugin-content-docs/current/"
echo "--- 日本語ドキュメントを移動中: $SOURCE_JA -> $DEST_JA ---"
rsync -av --ignore-existing --remove-source-files "$SOURCE_JA" "$DEST_JA"

echo "--- 処理が完了しました ---"