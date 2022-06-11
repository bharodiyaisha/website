import React, { useState } from "react";

import { Button } from "@mui/material";

import "./register.scss";
import { useNavigate } from "react-router-dom";

const initialData = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  email: "",
  password: "",
  phoneNo: "",
  birthDate: "",
  city: "",
  state: "",
  gender: "",
  hobby: [],
  language: [],
  profile: "",
};

const getLocalItems = () => {
  let list = localStorage.getItem("registerData");
  if (list) {
    return JSON.parse(localStorage.getItem("registerData"));
  } else {
    return [];
  }
};
const Register = () => {
  const [data, setData] = useState(initialData);
  const [items, setItems] = useState(getLocalItems());
  const [validation, setValidation] = useState(initialData);
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (error) {
      validator();
    }
  };
  const handleImage = (e) => {
    setData({
      ...data,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };
  const validator = () => {
    let errors = { ...initialData };
    let reg = /(7|8|9)\d{9}/;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;
    if (!data.firstName) {
      errors.firstName = "FirstName is required";
      isValid = false;
    }
    if (!data.middleName) {
      errors.middleName = "MiddleName is required";
      isValid = false;
    }
    if (!data.lastName) {
      errors.lastName = "LastName is required";
      isValid = false;
    }
    if (!data.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!data.email) {
      errors.email = "EmailId is required";
      isValid = false;
    } else if (!regex.test(data.email)) {
      errors.email = "Enter valid Email id";
      isValid = false;
    }
    if (!data.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    if (!data.phoneNo) {
      errors.phoneNo = "PhoneNumber is required";
      isValid = false;
    } else if (!reg.test(data.phoneNo)) {
      errors.phoneNo = " Enter valid phoneNo";
      isValid = false;
    }
    if (!data.birthDate) {
      errors.birthDate = "Birth date required ";
      isValid=false;
    }
    if (!data.city) {
      errors.city = "Select city";
      isValid=false;
    }
    if (!data.state) {
      errors.state = "Select state";
      isValid=false;
    }
    if (!data.gender) {
      errors.gender = "Select gender";
      isValid=false;
    }
    if (!data.hobby.length) {
      errors.hobby = "Select hobby";
      isValid=false;
    }
    if (!data.language.length) {
      errors.language = "Select language";
      isValid=false;
    }

    if (!data.profile) {
      errors.profile = "Add profile image ";
      isValid=false;
    }
    setValidation(errors);
    return isValid;
  };

  const navigate = useNavigate();

  const onRegister = () => {
    if (validator()) {
      // setItems([...items, data]);
      setError(false);
      localStorage.setItem("registerData", JSON.stringify([...items, data]));
      navigate("/");
    } else {
      setError(true);
    }
  };

  const handleHobby = (e) => {
    const newArray = [...data.hobby];
    const { value } = e.target;
    if (data.hobby.includes(value)) {
      let newItem = newArray.findIndex((index) => {
        return index === value;
      });
      newArray.splice(newItem, 1);
    } else {
      newArray.push(value);
    }
    setData({ ...data, hobby: newArray });
  };

  const handleLanguage = (e) => {
    const newArray = [...data.language];
    const { value } = e.target;
    if (data.language.includes(value)) {
      let newItem = newArray.findIndex((index) => {
        return index === value;
      });
      newArray.splice(newItem, 1);
    } else {
      newArray.push(value);
    }
    setData({ ...data, language: newArray });
  };

  return (
    // <div className="m_div">
    <div className="register-container">
      <div className="title">Registration form</div>
      <div className="items">
        <div className="registration-detail">
          <div className="input-name">
            <label className="regDetails">First Name:</label>
            <input
              type="text"
              placeholder="Enter first name"
              name="firstName"
              onChange={handleInput}
              value={data.firstName}
            />
            {<p className="errors">{validation.firstName}</p>}
          </div>
          <div className="input-name">
            <label className="details">Middle Name:</label>
            <input
              type="text"
              placeholder="Enter middle name"
              name="middleName"
              onChange={handleInput}
              value={data.middleName}
            />
            {<p className="errors">{validation.middleName}</p>}
          </div>
          <div className="input-name">
            <label className="details">Last Name:</label>
            <input
              type="text"
              placeholder="Enter last name"
              name="lastName"
              onChange={handleInput}
              value={data.lastName}
            />
            {<p className="errors">{validation.lastName}</p>}
          </div>
          <div className="input-address">
            <label className="details">Address:</label>
            <textarea
              type="text"
              placeholder="Enter address"
              name="address"
              value={data.address}
              onChange={handleInput}
            />
            {<p className="errors">{validation.address}</p>}
          </div>
          <div className="input-password">
            <label className="details">Email Id:</label>
            <input
              type="text"
              placeholder="Enter email id"
              name="email"
              value={data.email}
              onChange={handleInput}
            />
            {<p className="errors">{validation.email}</p>}
          </div>
          <div className="input-password">
            <label className="details">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleInput}
            />
            {<p className="errors">{validation.password}</p>}
          </div>
          <div className="input-password">
            <label className="details">Phone number:</label>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phoneNo"
              onChange={handleInput}
              value={data.phoneNo}
            />
            {<p className="errors">{validation.phoneNo}</p>}
          </div>
          <div className="input-password">
            <label className="details">Birth date:</label>
            <input
              type="date"
              name="birthDate"
              onChange={handleInput}
              value={data.birthDate}
            />
            {<p className="errors">{validation.birthDate}</p>}
          </div>
          <div className="input-select">
            <label className="details">City:</label>
            <select name="city" onChange={handleInput} value={data.city}>
              <option value="">---Select City--</option>
              <option value="surat">Surat</option>
              <option value="mumbai">Mumbai</option>
              <option value="jaipur">Jaipur</option>
              <option value="amritsar">Amritsar</option>
            </select>
            <p className="errors">{validation.city}</p>
          </div>
          <div className="input-select">
            <label className="details">State:</label>
            <select name="state" onChange={handleInput} value={data.state}>
              <option value="">---Select State---</option>
              <option value="gujarat">Gujarat</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="punjab">Punjab</option>
            </select>
            <p className="errors">{validation.state}</p>
          </div>

          <div className="input-select">
            <label className="details">Gender:</label>
            <div className="category">
              <input
                className="dot"
                type="radio"
                name="gender"
                onChange={handleInput}
                value="Male"
                checked={data.gender === "Male"}
              />
              Male
              <input
                className="dot"
                type="radio"
                name="gender"
                onChange={handleInput}
                value="Female"
                checked={data.gender === "Female"}
              />
              Female
              {<p className="errors">{validation.gender}</p>}
            </div>
          </div>

          <div className="input-select">
            <label className="details">Hobby:</label>
            <div className="category">
              <input
                className="dot"
                type="checkbox"
                name="hobby"
                value="Cricket"
                checked={data.hobby.includes("Cricket")}
                onChange={handleHobby}
              />
              Cricket
              <input
                className="dot"
                type="checkbox"
                name="hobby"
                value="Reading"
                checked={data.hobby.includes("Reading")}
                onChange={handleHobby}
              />
              Reading
              <input
                className="dot"
                type="checkbox"
                name="hobby"
                value="Cooking"
                checked={data.hobby.includes("Cooking")}
                onChange={handleHobby}
              />
              Cooking
            </div>
            {<p className="errors">{validation.hobby}</p>}
          </div>

          <div className="input-select">
            <label className="details">Language:</label>
            <div className="category">
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="English"
                checked={data.language.includes("English")}
                onChange={handleLanguage}
              />
              English
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="Gujarati"
                checked={data.language.includes("Gujarati")}
                onChange={handleLanguage}
              />
              Gujarati
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="Hindi"
                checked={data.language.includes("Hindi")}
                onChange={handleLanguage}
              />
              Hindi
            </div>
            {<p className="errors">{validation.language}</p>}
          </div>

          <div className="input-select">
            <label className="details">Add Profile:</label>
            <input
              type="file"
              accept=".gif,.jpg ,.png,.jpeg"
              name="profile"
              onChange={handleImage}
              required
            />
            {/* <img src={file}/> */}
            {<p className="errors">{validation.profile}</p>}
          </div>
        </div>
        <div>
          <Button type="submit" className="btnReg" onClick={onRegister}>
            Register
          </Button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Register;
