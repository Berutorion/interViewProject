import React, { useState, useEffect  } from 'react';
import ItemFilter from './ItemFilter';
import ItemResults from './ItemResults';
import items from '../data/items.json'; 


const ItemFilterSystem = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);


  // 響應式設計處理
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return (
  <div style={{ padding: '20px' }}>
 <ItemFilter 
        items={items} 
        onFilterChange={setFilteredItems} 
      />
    
    <ItemResults 
      isMobile={isMobile}
      filteredItems={filteredItems}
    />
  </div>
);
};

export default ItemFilterSystem;