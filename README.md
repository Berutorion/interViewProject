# 商品篩選系統 (React + Ant Design)

這是一個基於 React 16.14.0 和 Ant Design 的商品篩選系統，專為處理大型商品數據集(10,000+筆)而設計。

## 主要功能

- **高效篩選**：
  - 多條件組合篩選（類別、價格範圍、庫存狀態）
  - 即時關鍵字搜索
- **排序功能**：
  - 價格升序/降序排列
- **響應式設計**：
  - 桌面端：表格展示
  - 移動端：卡片式布局
- **效能優化**：
  - 分頁加載
  - 虛擬滾動

## 技術棧

- React 16.14.0
- Ant Design 5.x
- Vite 建置工具
- ES6+ 語法

## 專案結構

```
src/
├── components/
│ ├── ItemFilter.jsx # 篩選器組件（含所有篩選邏輯）
│ ├── ItemResults.jsx # 結果展示組件
│ └── ItemFilterSystem.jsx # 主容器組件
├── data/
│ └── items.json # 商品數據
├── App.jsx # 應用入口
└── main.jsx # 渲染入口
```


## 安裝與運行

1. 安裝依賴：
```
npm install
```
2. 啟動開發服務器：
```
npm run dev

```
3. 生產環境建置：
```
npm run build
```
