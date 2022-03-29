import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ThemeProvider, Box } from "@mui/material";
import customTheme from "../../theme/customTheme";
import Header from "../Header";
import DrawerHeader from "../Header/DrawerHeader";
import useWindowDimensions from "../../config/windowDimensions";
import UserProfile from "../UserProfile";
import New from "../new";
import NewEdit from "../new/new_edit";
import Employee from "../employees";
import Directory from "../employees/directory";
import Dashboard from '../dashboard';
import Commendation from "../reward";
import NewView from "../new/new_view";
import Gift from "../reward/gift";
import Portal from "../reward/portal";
import Manager from "../reward/manager";
import Documents from "../document";
import DocumentView from "../document/view";
import CheckGoogleDrive from "../document/check_google";
import EmployeeDetail from "../employees/employeeDetail";
import Point from "../employees/point";
import EmployeeAttend from "../attendance/employee/page2";
import MyAttend from "../attendance/myattendance/page1";
import Company from '../company/Company';
import TimeOff from "../attendance/time_off";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const Home = (props) => {
  const { setReRender, checkLoggedIn } = props;
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState("");
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (width > 900) {
      handleDrawerClose();
    }
    if (localStorage.getItem("access_token")) {
      let token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        ></Header>
        <Main open={open} sx={{ pt: 10, px: 5 }}>
          <DrawerHeader />
          {/* routes path */}
          <Routes>
            <Route path="profile/*" element={<UserProfile />} />

            <Route path="news" element={<New />} />
            <Route path="news/edit/:id" element={<NewEdit />} />
            <Route path="news/view/:id" element={<NewView />} />

            <Route path="employees" element={<Employee />} />
            <Route path="employees/manage-employees" element={<Employee />} />
            <Route path="employees/directory" element={<Directory />} />
            <Route path="employees/detail/:id" element={<EmployeeDetail />} />
            <Route path="employees/points" element={<Point />} />

            <Route path="reward%20gate" element={<Commendation />} />
            <Route path="reward-gate/recognition-portal" element={<Portal />} />
            <Route path="reward-gate/commendation" element={<Commendation />} />
            <Route path="reward-gate/receiving-gifts" element={<Gift />} />
            <Route path="reward-gate/manager" element={<Manager />} />

            <Route path="documents" element={<Documents />} />
            <Route path="documents/view/:id" element={<DocumentView />} />
            <Route path="documents/check/" element={<CheckGoogleDrive />} />
            <Route path="attendance" element={<MyAttend />} />
            <Route path="attendance/my-attendance" element={<MyAttend />} />
            <Route path="attendance/time-off" element={<TimeOff />} />
            <Route
              path="attendance/employees-attendance"
              element={<EmployeeAttend />}
            />
            <Route path="company" element={<Company></Company>} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );

}

export default Home;
