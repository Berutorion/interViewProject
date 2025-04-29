import React, {useState,useMemo} from 'react';
import { Table, Card, Row, Col, Button } from 'antd';

const ItemResults = ({ isMobile, filteredItems }) => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });
    const [visibleCount, setVisibleCount] = useState(10);
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

      const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 10, filteredItems.length));
      };
    

        // 在過濾邏輯後添加分頁限制
const displayItems = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredItems.slice(start, end);
  }, [filteredItems, pagination]);

return (
isMobile ? (
    <div>
    <Row gutter={[16, 16]}>
      {filteredItems.slice(0, visibleCount).map(item => (
        <Col span={12} key={item.id}>
          <Card title={item.name}>
            <p>類別: {item.category}</p>
            <p>價格: ${item.price}</p>
            <p>庫存: {item.inStock ? '有庫存' : '缺貨'}</p>
          </Card>
        </Col>
      ))}
    </Row>
    
    {visibleCount < filteredItems.length && (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button type="primary" onClick={loadMore}>
          載入更多 (剩餘 {filteredItems.length - visibleCount} 筆)
        </Button>
      </div>
    )}
  </div>
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
  )
)    
}



export default ItemResults;