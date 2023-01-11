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

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = React.useState({
    customer_id: "",
    amount: "",
    mealType: "",
    paymentType: "",
    itemId: "",
  });
  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(order);
    try {
      const res = await axios.post("https://shiyun-production.up.railway.app/orders", order);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://shiyun-production.up.railway.app/orders")
      .then((res) => {
        console.log(res.data.result);
        setOrders(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex items-end mb-3 justify-between">
        <Header category="Products" title="Orders" />
        <div className="justify-end">
        <input
          type="text"
          name="customer_id"
          onChange={handleChange}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
          placeholder="Cust Id"
          required
        />
        <input
          type="text"
          name="amount"
          onChange={handleChange}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="mealType"
          onChange={handleChange}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
          placeholder="Meal Type"
          required
        />
        <input
          type="text"
          name="paymentType"
          onChange={handleChange}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
          placeholder="Payment Type"
          required
        />
        <input
          type="text"
          name="itemId"
          onChange={handleChange}
          className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
          placeholder="Item Id"
          required
        />
        <button 
        onClick={handleClick}
        className="items-end text-white mt-12 mr-3 h-8 w-32 py-1 px-2 capitalize rounded-2xl text-md bg-red-700 ">
          Add Orders
        </button>
        </div>
      </div>

      <GridComponent
        id="gridcomp"
        dataSource={orders}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
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
export default Orders;
