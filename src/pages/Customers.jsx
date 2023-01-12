import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = React.useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    createdTs: "",
    orderId: "",
  });
  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://shiyun-production.up.railway.app/customer",
        customer
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://shiyun-production.up.railway.app/customers")
      .then((res) => {
        console.log(res.data.result);
        setCustomers(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className="flex items-end mb-3 justify-between">
    <Header category="Management" title="Customers" />
    <div className="justify-end">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="age"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Age"
            required
          />
          <input
            type="text"
            name="gender"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-20"
            placeholder="Gender"  
            required
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-32"
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="createdTs"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Created Time"
            required
          />
          <input
            type="text"
            name="orderId"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Order Id"
            required
          />
          <button
            onClick={handleClick}
            className="items-end text-white mt-12 mr-3 h-8 w-32 py-1 px-2 capitalize rounded-2xl text-md bg-red-700 "
          >
            Add Customer
          </button>
        </div>
      </div>
      <GridComponent
        dataSource={customers}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
