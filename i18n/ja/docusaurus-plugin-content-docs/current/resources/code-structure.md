---
sidebar_position: 3
title: コード構造
---

# コード構造

機能の追加やデバッグを行う際に参照できるよう、Modの簡易的なマップです。

## ソースセット

- `src/main/resources`: 共有メタデータ (`fabric.mod.json`)、メインのミキシンリスト (`infinite.mixins.json`)、およびアクセスワイドナー (`infinite.accesswidener`)。
- `src/client/kotlin`: Kotlinで書かれた全てのクライアントサイドコード。Fabricは `org.infinite.InfiniteClient` を `ClientModInitializer` として実行します。
- `src/client/resources`: クライアント専用のミキシン設定 (`infinite.client.mixins.json`)。

## エントリーポイント

- `src/client/kotlin/org/infinite/InfiniteClient.kt`: クライアントを起動し、コマンド/キーバインドを登録し、設定をロードし、参加/退出時に全ての機能を開始/停止します。
- `src/client/kotlin/org/infinite/Features.kt`: 機能カテゴリを宣言し、各機能インスタンスを接続します。
- `src/client/kotlin/org/infinite/InfiniteDataGenerator.kt`: クライアントアセットのためにFabricデータ生成にフックします。

## 機能システム

- 機能は `src/client/kotlin/org/infinite/features` (移動、レンダリング、戦闘、自動、サーバー、ユーティリティ) 以下にあります。
- 各機能は `ConfigurableFeature` を拡張し、`settings` (`org.infinite.settings` から) を定義し、コマンド、レンダリングフック、ティックハンドラを登録できます。
- カテゴリは `featureCategories` に収集され、ヘルパー `feature()` は `Feature` メタデータを構築します。

## 共有ライブラリ

- `org.infinite.libs`: コマンド (`InfiniteCommand`)、キーバインド (`InfiniteKeyBind`)、ワールドアクセス (`WorldManager`)、レンダリング (`graphics`)、プレイヤーユーティリティのための共通ヘルパー。
- `org.infinite.utils`: `LogQueue`、`FakePlayerEntity`、数学ヘルパーなどの小さなユーティリティ。

## アセット

- `src/main/resources/assets/infinite`: Modにバンドルされているアイコンやその他のブランドアセット。
