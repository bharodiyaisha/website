import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./layout.scss";

const drawerWidth = 240;

const Layout = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loginData")) || {};
  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: "primary.main" }} />
      <Divider sx={{ bgcolor: "primary.main" }} />
      <List sx={{ bgcolor: "primary.main", color: "white", height: "710px" }}>
        {
          <ListItemButton
            onClick={() => {
              navigate("dashboard");
            }}
          >
            <ListItemIcon>
              <DashboardCustomizeRoundedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: "white" }} />
          </ListItemButton>
        }
        {
          <ListItemButton
            onClick={() => {
              navigate("profile");
            }}
          >
            <ListItemIcon>
              <AccountBoxRoundedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile Page" sx={{ color: "white" }} />
          </ListItemButton>
        }
        {
          <ListItemButton
            onClick={() => {
              navigate("addSkill");
            }}
          >
            <ListItemIcon>
              <AddCircleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add Skill" sx={{ color: "white" }} />
          </ListItemButton>
        }
        {
          <ListItemButton
            onClick={() => {
              navigate("registerDetail");
            }}
          >
            <ListItemIcon>
              <NoteAddIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary="All Registration data"
              sx={{ color: "white" }}
            />
          </ListItemButton>
        }
        {
          <ListItemButton
            onClick={() => {
              navigate("logout");
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Logout page" sx={{ color: "white" }} />
          </ListItemButton>
        }
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Box
              component="img"
              sx={{
                height: 30,
                width: 30,
              }}
              alt="Profile"
              src={user?.profile}
            />
            <Button
              type="btn"
              variant="secondary"
              className="btn"
              onClick={() => {
                localStorage.removeItem("loginData");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100%",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
