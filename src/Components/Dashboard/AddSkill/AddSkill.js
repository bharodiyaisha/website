import React, { useEffect, useState } from "react";

import Select from "react-select";

const AddSkill = () => {
  const [skill, setSkill] = useState([]);

  let log_user = JSON.parse(localStorage.getItem("loginData"));
  let reg_user = JSON.parse(localStorage.getItem("registerData"));

  const AddData = () => {
    if (log_user) {
      localStorage.setItem("loginData", JSON.stringify({ ...log_user, skill }));
    }
    let currentIndex = reg_user.findIndex((e) => {
      return e.email === log_user.email;
    });
    if (reg_user.length > 0 && currentIndex >= 0) {
      reg_user.splice(currentIndex, 1, { ...log_user, skill });
      localStorage.setItem("registerData", JSON.stringify([...reg_user]));
    }
  };

  useEffect((e) => {
    if (log_user.skill) {
      setSkill(log_user.skill);
    }
  }, []);

  const SkillData = [
    {
      value: 1,
      label: "Communication",
    },
    {
      value: 2,
      label: "project management",
    },
    {
      value: 3,
      label: "presentation",
    },
    {
      value: 4,
      label: "Technical",
    },
  ];

  const inputHandle = (e) => {
    setSkill(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  useEffect(() => {
    AddData();
  }, [skill]);

  return (
    <div>
      <Select isMulti options={SkillData} onChange={inputHandle}></Select>
      <center>
        <b>The selected Skill:</b>
        <h4>{skill + ""}</h4>
      </center>
    </div>
  );
};

export default AddSkill;
