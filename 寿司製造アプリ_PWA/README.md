# 寿司 製造計算アプリ（PWA）

製造数を入れると、使用ネタ枚数・トレー枚数・原魚換算kgが出る鮮魚部門用のスマホアプリです。
ブラウザで開いて「ホーム画面に追加」すると、独立したアプリのように使えます（オフライン対応）。

## GitHub Pages で公開する手順

1. GitHub で新しい **public** リポジトリを作成（例：`sushi-app`）。
2. このフォルダの中身をすべてリポジトリ直下にアップロード
   （「Add file」→「Upload files」→ 下の全ファイルをドラッグ →「Commit changes」）。
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png / icon-512.png / icon-180.png / icon-maskable-512.png
3. リポジトリの **Settings → Pages** を開く。
4. 「Build and deployment」→ Source を **Deploy from a branch**、
   Branch を **main / (root)** にして **Save**。
5. 1〜2分待つと `https://<ユーザー名>.github.io/sushi-app/` が発行される。

## スマホでアプリ化

- **iPhone（Safari）**：上記URLを開く → 共有ボタン → 「ホーム画面に追加」。
- **Android（Chrome）**：URLを開く → メニュー（⋮）→ 「アプリをインストール」or「ホーム画面に追加」。

以後はホーム画面のアイコンから起動でき、電波がなくても動きます。

## 中身を更新したいとき

商品やネタ、原価などを変えたい場合は index.html 内の `const DATA = {…}` を書き換えて
再アップロードするだけです（数値ロジックはそのまま）。手を入れにくい場合は元の作成者に依頼を。

※ Service Worker は https でのみ動きます（GitHub Pages はhttps対応）。
  ローカルの file:// で直接開くとオフライン機能は無効ですが、計算自体は動きます。
