import React, { useState } from "react";

import { Button } from "@mui/material";

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

const Profile = () => {
  const loginUserData = JSON.parse(localStorage.getItem("loginData"));

  const [regData, setRegData] = useState({ ...loginUserData });
  const [validation, setValidation] = useState(initialData);
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    if (error) {
      validator();
    }
  };

  const validator = () => {
    let errors = { ...initialData };
    let reg = /(7|8|9)\d{9}/;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;

    if (!regData.firstName) {
      errors.firstName = "FirstName is required";
      isValid = false;
    }
    if (!regData.middleName) {
      errors.middleName = "middleName is required";
      isValid = false;
    }

    if (!regData.lastName) {
      errors.lastName = "lastName is required";
      isValid = false;
    }
    if (!regData.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!regData.email) {
      errors.email = "EmailId is required";
      isValid = false;
    } else if (!regex.test(regData.email)) {
      errors.email = "Enter valid Email id";
      isValid = false;
    }
    if (!regData.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    if (!regData.phoneNo) {
      errors.phoneNo = "PhoneNumber is required";
      isValid = false;
    } else if (!reg.test(regData.phoneNo)) {
      errors.phoneNo = " Enter valid phoneNo";
      isValid = false;
    }
    if (!regData.birthDate) {
      errors.birthDate = "Birth date required ";
      isValid = false;
    }
    if (!regData.city) {
      errors.city = "Select city";
      isValid = false;
    }
    if (!regData.state) {
      errors.state = "Select state";
      isValid = false;
    }
    if (!regData.gender) {
      errors.gender = "Select gender";
      isValid = false;
    }
    if (!regData.hobby.length) {
      errors.hobby = "Select hobby";
      isValid = false;
    }
    if (!regData.language.length) {
      errors.language = "Select language";
      isValid = false;
    }
    if (!regData.profile) {
      errors.profile = "Add profile image ";
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };

  const handleHobby = (e) => {
    const newArray = [...regData.hobby];
    const { value } = e.target;
    if (regData.hobby.includes(value)) {
      let newItem = newArray.findIndex((index) => {
        return index === value;
      });
      newArray.splice(newItem, 1);
    } else {
      newArray.push(value);
    }
    setRegData({ ...regData, hobby: newArray });
  };

  const handleLanguage = (e) => {
    const newArray = [...regData.language];
    const { value } = e.target;
    if (regData.language.includes(value)) {
      let newItem = newArray.findIndex((index) => {
        return index === value;
      });
      newArray.splice(newItem, 1);
    } else {
      newArray.push(value);
    }
    setRegData({ ...regData, language: newArray });
  };

  const handleImage = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onSubmit = (e) => {
    if (validator()) {
      setError(false);
      const reg_records = JSON.parse(localStorage.getItem("registerData"));

      localStorage.setItem("loginData", JSON.stringify(regData));
      let currentIndex = reg_records.findIndex((e) => {
        return e.email === loginUserData.email;
      });

      if (reg_records.length > 0 && currentIndex >= 0) {
        reg_records.splice(currentIndex, 1, regData);
        localStorage.setItem("registerData", JSON.stringify([...reg_records]));
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="title">Profile Page</div>
      <div className="items">
        <div className="registration-detail">
          <div className="input-name">
            <label className="details">First Name:</label>
            <input
              type="text"
              placeholder="Enter first name"
              name="firstName"
              onChange={handleInput}
              value={regData.firstName}
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
              value={regData.middleName}
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
              value={regData.lastName}
            />
            {<p className="errors">{validation.lastName}</p>}
          </div>
          <div className="input-address">
            <label className="details">Address:</label>
            <textarea
              type="text"
              placeholder="Enter address"
              name="address"
              value={regData.address}
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
              value={regData.email}
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
              value={regData.password}
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
              value={regData.phoneNo}
            />
            {<p className="errors">{validation.phoneNo}</p>}
          </div>
          <div className="input-password">
            <label className="details">Birth date:</label>
            <input
              type="date"
              name="birthDate"
              onChange={handleInput}
              value={regData.birthDate}
            />
            {<p className="errors">{validation.birthDate}</p>}
          </div>
          <div className="input-select">
            <label className="details">City:</label>
            <select name="city" value={regData.city} onChange={handleInput}>
              <option value="">---Select City--</option>
              <option value="surat">Surat</option>
              <option value="mumbai">Mumbai</option>
              <option value="jaipur">Jaipur</option>
              <option value="amritsar">Amritsar</option>
            </select>
            {<p className="errors">{validation.city}</p>}
          </div>
          <div className="input-select">
            <label className="details">State:</label>
            <select name="state" value={regData.state} onChange={handleInput}>
              <option value="">---Select State---</option>
              <option value="gujarat">Gujarat</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="punjab">Punjab</option>
            </select>
            {<p className="errors">{validation.state}</p>}
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
                checked={regData.gender === "Male"}
              />
              Male
              <input
                className="dot"
                type="radio"
                name="gender"
                onChange={handleInput}
                value="Female"
                checked={regData.gender === "Female"}
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
                checked={regData.hobby?.includes("Cricket")}
                onChange={handleHobby}
              />
              Cricket
              <input
                className="dot"
                type="checkbox"
                name="hobby"
                value="Reading"
                checked={regData.hobby?.includes("Reading")}
                onChange={handleHobby}
              />
              Reading
              <input
                className="dot"
                type="checkbox"
                name="hobby"
                value="Cooking"
                checked={regData.hobby?.includes("Cooking")}
                onChange={handleHobby}
              />
              Cooking
              {<p className="errors">{validation.hobby}</p>}
            </div>
          </div>

          <div className="input-select">
            <label className="details">Language:</label>
            <div className="category">
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="English"
                checked={regData.language?.includes("English")}
                onChange={handleLanguage}
              />
              English
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="Gujarati"
                checked={regData.language?.includes("Gujarati")}
                onChange={handleLanguage}
              />
              Gujarati
              <input
                className="dot"
                type="checkbox"
                name="language"
                value="Hindi"
                checked={regData.language?.includes("Hindi")}
                onChange={handleLanguage}
              />
              Hindi
              {<p className="errors">{validation.language}</p>}
            </div>
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
            <img
              height="70px"
              width= "70px"
              alt="Profile"
              src={regData?.profile}
            />
            {<p className="errors">{validation.profile}</p>}
          </div>
        </div>
        <div>
          <Button type="btn" className="btnReg" onClick={onSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
