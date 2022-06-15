import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import "./logout.scss";

const Logout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/");
  };
  return (
    <div>
      <Button className="btn" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
