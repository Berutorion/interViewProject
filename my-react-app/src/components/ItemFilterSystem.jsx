import React, { useState, useEffect, useMemo } from 'react';
import { Input, Checkbox, Slider, Select, Table, Card, Row, Col, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import items from '../data/items.json'; 

const { Option } = Select;

const ItemFilterSystem = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });

  // 響應式設計處理
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 獲取所有類別選項
  const categories = useMemo(() => {
    return [...new Set(items.map(item => item.category))];
  }, []);

  // 過濾和排序邏輯
  const filteredItems = useMemo(() => {
    let result = [...items];
    
    // 名稱搜索
    if (searchText) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // 類別篩選
    if (selectedCategories.length > 0) {
      result = result.filter(item => 
        selectedCategories.includes(item.category)
      );
    }
    
    // 價格範圍
    result = result.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // 庫存篩選
    if (inStockOnly) {
      result = result.filter(item => item.inStock);
    }
    
    // 排序
    if (sortOrder) {
      result.sort((a, b) => 
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }
    
    return result;
  }, [searchText, selectedCategories, priceRange, inStockOnly, sortOrder]);

  const columns = [
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '類別', dataIndex: 'category', key: 'category' },
    { title: '價格', dataIndex: 'price', key: 'price' },
    { 
      title: '庫存', 
      dataIndex: 'inStock', 
      key: 'inStock',
      render: (inStock) => (inStock ? '有庫存' : '缺貨')
    }
  ];

  // 在過濾邏輯後添加分頁限制
const displayItems = useMemo(() => {
  const start = (pagination.current - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return filteredItems.slice(start, end);
}, [filteredItems, pagination]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="搜索商品名稱"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginRight: '10px' }}
        />
        
        <Select
          mode="multiple"
          placeholder="選擇類別"
          style={{ width: 200, marginRight: '10px' }}
          onChange={setSelectedCategories}
        >
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
        
        <div style={{ width: 200, display: 'inline-block', marginRight: '10px' }}>
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={setPriceRange}
          />
          <div>價格範圍: ${priceRange[0]} - ${priceRange[1]}</div>
        </div>
        
        <Checkbox
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          style={{ marginRight: '10px' }}
        >
          僅顯示有庫存
        </Checkbox>
        
        <Radio.Group
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <Radio.Button value="asc">價格升序</Radio.Button>
          <Radio.Button value="desc">價格降序</Radio.Button>
          <Radio.Button value={null}>預設排序</Radio.Button>
        </Radio.Group>
      </div>
      
      {isMobile ? (
        <Row gutter={[16, 16]}>
          {filteredItems.slice(0, 10).map(item => ( // 限制顯示數量
            <Col span={12} key={item.id}>
              <Card title={item.name}>
                <p>類別: {item.category}</p>
                <p>價格: ${item.price}</p>
                <p>庫存: {item.inStock ? '有庫存' : '缺貨'}</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Table
        columns={columns}
        dataSource={displayItems}
        rowKey="id"
        pagination={{
          ...pagination,
          total: filteredItems.length,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
        }}
        scroll={{ y: 600 }}
      />
      )}
    </div>
  );
};

export default ItemFilterSystem;