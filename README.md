# 百家樂勝率計算器（PWA）

8 副牌、逐局扣牌、補三張牌規則、蒙地卡羅試算（可安裝到手機主畫面）。

## 功能
- 手動輸入已開牌（支援 `A K Q J 10/T 2~9`，逗號或空白分隔），即時扣牌
- 選擇副數（預設 8）、模擬局數（建議手機 20k~60k）與可選亂數種子
- 一鍵計算下一局：莊/閒/和 的機率（Monte Carlo）
- 可安裝（PWA），首次連線後可離線使用

## 快速開始（GitHub Pages）
1. 在 GitHub 建立一個 **新公開 repo**，例如 `baccarat-pwa`
2. 上傳本專案所有檔案到 repo 根目錄（`index.html`, `manifest.webmanifest`, `sw.js`, `README.md`, `LICENSE`, `.nojekyll`）
3. 進入 **Settings → Pages**：
   - **Source**：Deploy from a branch
   - **Branch**：`main`（或你的預設分支），**Folder**：`/ (root)`
4. 儲存後等 1 分鐘，取得你的網站網址（例如 `https://<你的帳號>.github.io/baccarat-pwa/`）
5. 用手機開啟 → 加到主畫面（iOS Safari：分享→加入主畫面；Android Chrome：⋮→安裝 App）

> 若看到舊版，請重新整理或清除該站點快取；或在 `sw.js` 中把 `baccarat-mc-v1` 改成 `-v2` 促使更新。

## 自訂
- 調整預設值：打開 `index.html`，修改「副數/模擬局數/種子」的 `<input>` `value`
- 更換 App 名稱與主題色：改 `manifest.webmanifest` 的 `name`, `short_name`, `theme_color`
- 圖示：目前用 SVG Data URL；也可改用 PNG 檔，並在 `manifest.webmanifest` 更新 `icons`

## 授權
MIT License（見 LICENSE）
