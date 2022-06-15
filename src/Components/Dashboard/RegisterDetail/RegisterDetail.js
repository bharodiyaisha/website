import React from "react";
import { useNavigate } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import "./registerDetail.scss";

const RegisterDetail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginData")) || {};

  const onDelete = (e) => {
    let user_records = JSON.parse(localStorage.getItem("registerData"));
    let currentIndex = user_records.findIndex((e) => {
      return e.email === user.email;
    });
    if (user_records.length >= 1) {
      user_records.splice(currentIndex, 1);
    }
    if (user_records) {
      localStorage.setItem("registerData", JSON.stringify(user_records));
      localStorage.removeItem("loginData");
      navigate("/");
    }
  };

  const login = [
    {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      password: user.password,
      phoneNo: user.phoneNo,
      birthDate: user.birthDate,
      city: user.city,
      state: user.state,
      gender: user.gender,
      hobby: user.hobby,
      language: user.language,
      edit: (
        <Edit
          onClick={() => {
            navigate("/profile");
          }}
        />
      ),
      delete: <Delete onClick={onDelete} />,
    },
  ];

  const columns = [
    { Header: "FirstName", accessor: "firstName", className: "column" },
    { Header: "MiddleName", accessor: "middleName", className: "column" },
    { Header: "LastName", accessor: "lastName", className: "column" },
    { Header: "Address", accessor: "address", className: "column" },
    { Header: "Email", accessor: "email", className: "column" },
    { Header: "Password", accessor: "password", className: "column" },
    { Header: "PhoneNo", accessor: "phoneNo", className: "column" },
    { Header: "BirthDate", accessor: "birthDate", className: "column" },
    { Header: "City", accessor: "city", className: "column" },
    { Header: "State", accessor: "state", className: "column" },
    { Header: "Gender", accessor: "gender", className: "column" },
    { Header: "Hobby", accessor: "hobby", className: "column" },
    { Header: "Language", accessor: "language", className: "column" },
    { Header: "Edit", accessor: "edit", className: "column" },
    { Header: "Delete", accessor: "delete", className: "column" },
  ];

  return (
    <div>
      <ReactTable
        data={login}
        columns={columns}
        defaultPageSize={1}
        pageSizeOptions={[2, 4, 6]}
        className="table"
      />
    </div>
  );
};

export default RegisterDetail;
