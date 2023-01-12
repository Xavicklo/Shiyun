import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, InventoryGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";

const Scheduler = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [Inventorys, setInventorys] = useState([]);
  const [inventory, setInventory] = React.useState({
    title: "",
    price: "",
    quantity: "",
    orderDate: "",
    arrivalDate: "",
    expirationDate: "",
  });
  const handleChange = (e) => {
    setInventory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://shiyun-production.up.railway.app/inventory",
        inventory
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://shiyun-production.up.railway.app/inventorys")
      .then((res) => {
        console.log(res.data.result);
        setInventorys(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex items-end mb-3 justify-between">
        <Header category="Products" title="Inventory" />
        <div className="justify-end">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Item"
            required
          />
          <input
            type="text"
            name="price"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="quantity"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Quantity"
            required
          />
          <input
            type="text"
            name="orderDate"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Order Date"
            required
          />
          <input
            type="text"
            name="arrivalDate"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Arrival Date"
            required
          />
          <input
            type="text"
            name="expirationDate"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-32"
            placeholder="Expiration Date"
            required
          />
          <button
            onClick={handleClick}
            className="items-end text-white mt-12 mr-3 h-8 w-32 py-1 px-2 capitalize rounded-2xl text-md bg-red-700 "
          >
            Add Inventory
          </button>
        </div>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={Inventorys}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {InventoryGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Scheduler;
