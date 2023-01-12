import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
const Employees = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = React.useState({
    name: "",
    phoneNumber: "",
    entryDay: "",
    position: "",
    createdTs: "",
    address: "",
    salary: "",
  });
  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://shiyun-production.up.railway.app/employee",
        employee
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://shiyun-production.up.railway.app/employees")
      .then((res) => {
        console.log(res.data.result);
        setEmployees(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex items-end mb-3 justify-between">
        <Header category="Management" title="Employees" />
        <div className="justify-end">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="entryDay"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Entry Day"
            required
          />
          <input
            type="text"
            name="position"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-24"
            placeholder="Position"
            required
          />
          <input
            type="text"
            name="createdTs"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-32"
            placeholder="Created Time"
            required
          />
          <input
            type="text"
            name="address"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="salary"
            onChange={handleChange}
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full items-end mt-12 mr-3 h-8 py-1 px-2 w-28"
            placeholder="Salary"
            required
          />
          <button
            onClick={handleClick}
            className="items-end text-white mt-12 mr-3 h-8 w-32 py-1 px-2 capitalize rounded-2xl text-md bg-red-700 "
          >
            Add Employee
          </button>
        </div>
      </div>
      <GridComponent
        dataSource={employees}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
