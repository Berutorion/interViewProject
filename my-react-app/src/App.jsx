import React from 'react';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/lib/locale/zh_TW';
import ItemFilterSystem from './components/ItemFilterSystem';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <div className="App">
        <h1>庫存查找系統</h1>
        <ItemFilterSystem />
      </div>
    </ConfigProvider>
  );
}

export default App;