import React from 'react';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/lib/locale/zh_TW';
import ItemFilterSystem from './components/ItemFilterSystem';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <div className="App">
        <ItemFilterSystem />
      </div>
    </ConfigProvider>
  );
}

export default App;