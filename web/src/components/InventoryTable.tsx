/**
 * TODO: Build a typed, reusable inventory table.
 * Requirements in ASSESSMENT.md (sorting, filter/search, URL state, pagination).
 */
 import React, { useMemo, useState } from "react";
 import { Table, Input, Select, Space } from "antd";
 import { SearchOutlined } from '@ant-design/icons';
 import type { ColumnsType, TableProps } from 'antd/es/table';
 import { useSearchParams } from "react-router-dom";
 
 // Define data type for inventory items
 interface InventoryItem {
   id: string;
   name: string;
   quantity: number;
   expirationDate: string;
   supplier: string;
   category: string;
   price: number;
 }
 
 const { Option } = Select;

 const InventoryTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
  });

  // Sorter State
  const [sorter, setSorter] = useState<{
    field: string;
    order: 'ascend' | 'descend' | undefined;
  }>({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') as 'ascend' | 'descend' | undefined,
  });

  // Pagination State
  const [pagination, setPagination] = useState({
    current: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '5', 10),
  });

  // Mock Data
  const mockData: InventoryItem[] = useMemo (() => [
    { 
      id: "1", 
      name: "Test Tubes", 
      quantity: 100,
      expirationDate: "2024-12-31",
      supplier: "Lab Supply Co",
      category: "glassware", 
      price: 20,
   },
    { 
      id: "2",
      name: "Centrifuge",
      quantity: 2,
      expirationDate: "2025-06-15",
      supplier: "Equipment Plus",
      category: "equipment",
      price: 500,
    },
    { id: "3",
      name: "Safety Goggles",
      quantity: 50,
      expirationDate: "2024-03-20",
      supplier: "Safety First",
      category: "safety",
      price: 15,
    },
  ], []);

  // Update URL params when filters, sorting, or pagination changes
   const updateUrlParams = (
    newFilters: typeof filters,
    newSorter: typeof sorter,
    newPagination = pagination
  ) => {
    const params = new URLSearchParams();

    // Filters
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.search) params.set('search', newFilters.search);

    // Sorting
    if (newSorter.field) params.set('sortField', newSorter.field);
    if (newSorter.order) params.set('sortOrder', newSorter.order);

    // Pagination
    if (newPagination.current > 1) params.set('page', newPagination.current.toString());
    if (newPagination.pageSize !== 5) params.set('pageSize', newPagination.pageSize.toString());

    setSearchParams(params);
  };

  // Handle sorting, filtering, and pagination events from Ant Design Table
   const handleTableChange: TableProps<InventoryItem>['onChange'] = (
    newPagination,
    tableFilters,
    tableSorter
  ) => {
    const currentSorter = Array.isArray(tableSorter) ? tableSorter[0] : tableSorter;

    const newSorter = {
      field: (currentSorter?.field as string) || '',
      order: currentSorter?.order as 'ascend' | 'descend' | undefined,
    };

    setSorter(newSorter);
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 5,
    });

    updateUrlParams(filters, newSorter, {
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 5,
    });
  };

  // Handle search by name
   const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    setPagination({ ...pagination, current: 1 }); // Reset to first page
    updateUrlParams(newFilters, sorter, { ...pagination, current: 1 });
  };

  // Handle category filter
  const handleCategoryChange = (value: string) => {
    const newFilters = { ...filters, category: value };
    setFilters(newFilters);
    setPagination({ ...pagination, current: 1 }); // Reset to first page
    updateUrlParams(newFilters, sorter, { ...pagination, current: 1 });
  };

  // Define table columns
  const columns: ColumnsType<InventoryItem> = [
    { 
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
     },
    { 
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sorter.field === 'name' ? sorter.order : undefined,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              handleSearch(e.target.value);
            }}
            prefix={<SearchOutlined />}
            allowClear
            onPressEnter={() => confirm()}
          />
        </div>
      ),
      
    },
    { 
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sorter.field === 'quantity' ? sorter.order : undefined,
    },
    { 
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sorter.field === 'price' ? sorter.order : undefined,
      render: (value: number) => `$${value}`,
     },
     {
      title: "Expiration Date",
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      sorter: (a, b) =>
        new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime(),
      sortOrder: sorter.field === 'expirationDate' ? sorter.order : undefined,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Select
            placeholder="Select category"
            value={filters.category || undefined}
            onChange={handleCategoryChange}
            allowClear
            style={{ width: 150 }}
          >
            <Option value="glassware">Glassware</Option>
            <Option value="equipment">Equipment</Option>
            <Option value="safety">Safety</Option>
          </Select>
        </div>
      ),
    }, 
  ];

  return (
    <div>
      {/* Top filters */}
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Select
            placeholder="Filter by category"
            value={filters.category || undefined}
            onChange={handleCategoryChange}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="glassware">Glassware</Option>
            <Option value="equipment">Equipment</Option>
            <Option value="safety">Safety</Option>
          </Select>

          <Input
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            style={{ width: 200 }}
          />
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  );
};
 
 export default InventoryTable;
 

