/**
 * TODO: Build a typed, reusable inventory table.
 * Requirements in ASSESSMENT.md (sorting, filter/search, URL state, pagination).
 */
 import React from "react";
 import { Table } from "antd";
 
 interface InventoryItem {
   id: string;
   name: string;
   quantity: number;
   price: number;
 }
 
 const data: InventoryItem[] = [
   { id: "1", name: "Test Tubes", quantity: 100, price: 20 },
   { id: "2", name: "Centrifuge", quantity: 2, price: 500 },
   { id: "3", name: "Safety Goggles", quantity: 50, price: 15 },
 ];
 
 const columns = [
   { title: "ID", dataIndex: "id", key: "id" },
   { title: "Name", dataIndex: "name", key: "name" },
   { title: "Quantity", dataIndex: "quantity", key: "quantity" },
   { title: "Price", dataIndex: "price", key: "price" },
 ];
 
 const InventoryTable: React.FC = () => {
   return <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />;
 };
 
 export default InventoryTable;
 

