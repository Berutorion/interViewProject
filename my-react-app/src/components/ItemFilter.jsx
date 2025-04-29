import React , {useState, useMemo, useEffect} from 'react';
import { Input, Checkbox, Slider, Select, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const ItemFilter = ({ items, onFilterChange }) =>{

    const [searchText, setSearchText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortOrder, setSortOrder] = useState(null);
    
  // 獲取所有類別選項
  const categories = useMemo(() => {
    return [...new Set(items.map(item => item.category))];
  }, [items]);

  // 篩選邏輯
  useEffect(() => {
    const filtered = items.filter(item => {
      const matchesSearch = !searchText || 
        item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(item.category);
      const matchesPrice = item.price >= priceRange[0] && 
        item.price <= priceRange[1];
      const matchesStock = !inStockOnly || item.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    // 排序
    const sorted = [...filtered].sort((a, b) => {
      if (!sortOrder) return 0;
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    onFilterChange(sorted);
  }, [items, searchText, selectedCategories, priceRange, inStockOnly, sortOrder, onFilterChange]);
    return (
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
      value={selectedCategories}
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
);
} 
export default ItemFilter;