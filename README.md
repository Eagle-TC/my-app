# 安巡：個人防護具穿戴巡檢 PWA

繁體中文、適合手機的巡檢表。支援八項防護具檢查、拍照（每份最多六張）、IndexedDB 本機紀錄、搜尋、查看、含照片的 JSON 備份、Google Drive 上傳。無建置依賴。

## 開發

使用現有 checkout，不需另建 worktree。需要 Node.js 及 Python 3。

```sh
cd /workspace/my-app
npm start
```

開發伺服器使用 5173 埠。`npm test` 執行資料驗證測試，`npm run check` 檢查 JavaScript 語法。此 Python 伺服器僅供開發；正式使用請將本目錄的靜態檔案部署至 HTTPS 主機。此版本沒有登入後的跨裝置紀錄列表，歷史列表來自本機資料；雲端備份可從 Drive 開啟。

## Google Drive 設定

1. 在 Google Cloud 專案啟用 Google Drive API。
2. 設定 OAuth 同意畫面與使用對象；測試模式需將使用者加為測試使用者。
3. 建立類型為「網頁應用程式」的 OAuth 用戶端，將實際 HTTPS 網站來源加入「已授權的 JavaScript 來源」。本機開發可使用 `http://localhost:5173`。
4. 在 App「雲端設定」填入用戶端 ID（不是 client secret，請勿在前端放密鑰）。
5. 儲存巡檢後按「上傳 Drive」，由 Google 登入並授權 `drive.file`，僅允許存取此 App 建立或經授權的檔案。

所需 HTTPS 目的地：`accounts.google.com`（登入程式與授權）、`www.googleapis.com`（Drive API）。手機需允許登入彈出視窗；首次載入登入程式後若瀏覽器攔截視窗，再按一次上傳。存取權杖僅保留於記憶體。資料及照片傳送至使用者授權的 Drive 帳號，每次巡檢是一個子資料夾，內含原始照片與巡檢紀錄 JSON。上傳進度保存在本機以支援重試；已完成備份再次點擊不建立重複檔案。請勿在傳輸途中變更帳號。

## 安裝與資料保存

正式網站需 HTTPS，才支援相機與離線 Service Worker。Android Chrome 可選「安裝應用程式」或「加入主畫面」；iPhone Safari 使用分享選單的「加入主畫面」。先連線開啟一次以快取 App，之後可離線填表、拍照及儲存，恢復網路後手動上傳 Drive。

本機資料不等同雲端備份，清除網站資料、移除瀏覽器或裝置遺失可能造成資料遺失，請確認上傳完成或定期匯出。JSON 匯出含照片，可獨立保存；目前不提供重新匯入。照片沿用原始檔，可能包含相機位置資訊。公用手機上請留意本機紀錄可被同一瀏覽器使用者查看。

## 驗證範圍

單元測試與本機 HTTP 檢查不等於真實手機或雲端整合驗證。實際相機、加入主畫面、離線重啟與 Drive 上傳需在 HTTPS 網站及有效 OAuth 用戶端設定後，以手機端驗收。
