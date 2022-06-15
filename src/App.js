import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Layout from "./Components/Dashboard/Layout/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Dashboard/Profile/Profile";
import Protected from "./Components/Protected";
import Logout from "./Components/Dashboard/Logout/Logout";
import RegisterDetail from "./Components/Dashboard/RegisterDetail/RegisterDetail";
import AddSkill from "./Components/Dashboard/AddSkill/AddSkill";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route index  path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="dashboard"
              element={<Protected Component={Dashboard} />}
            />
            <Route
              path="profile"
              element={<Protected Component={Profile} />}
            />
            <Route
              path="addSkill"
              element={<Protected Component={AddSkill} />}
            />
            <Route
              path="registerDetail"
              element={<Protected Component={RegisterDetail} />}
            />
            <Route
              path="logout"
              element={<Protected Component={Logout} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
