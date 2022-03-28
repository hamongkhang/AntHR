import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import HandleOption from "./handleclick";
import HeaderEmployee from "./header";

const useStyles = makeStyles({
  hide_border: {
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    "&.MuiDataGrid-root	.MuiDataGrid-columnHeaderTitle": {
      fontWeight: 600,
      color: "#ffb74d",
    },
  },
});

const columns = [
  {
    field: "id",
    headerName: "ID",
    editable: false,
    sortable: false,
    width: 80,
  },
  {
    field: "name",
    headerName: "Name",
    editable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={params.row.avatar} />
          &nbsp; {params.row.name}
        </>
      );
    },
  },
  {
    field: "clockIn",
    headerName: "Clock In",
    width: 100,
    sortable: false,
  },
  {
    field: "clockInLocation",
    headerName: "Clock In Location",
    width: 180,
    editable: true,
    sortable: false,
  },
  {
    field: "clockOut",
    headerName: "Clock Out",
    width: 110,
    editable: true,
    sortable: false,
  },
  {
    field: "clockOutLocation",
    headerName: "Clock Out Location",
    width: 180,
    editable: true,
    sortable: false,
  },
  {
    field: "workSchedule",
    headerName: "Work Schedule",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "longgedTime",
    headerName: "Longged Time",
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: "paidTime",
    headerName: "Paid Time",
    width: 150,
    editable: true,
    sortable: false,
  },

  {
    field: "deficit",
    headerName: "Deficit",
    width: 150,
    editable: true,
    sortable: false,
  },

  {
    field: "",
    headerName: "",
    sortable: false,
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <HandleOption />
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    name: "khang ",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Jon",
    clockOut: 35,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 2,
    name: "hang ",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Cersei",
    clockOut: 42,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 3,
    name: "quan",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Jaime",
    clockOut: 45,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 4,
    name: "sang",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Arya",
    clockOut: 16,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 5,
    name: "phat",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Daenerys",
    clockOut: null,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 6,
    name: "huan",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: null,
    clockOut: 150,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 7,
    name: "huhu",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Ferrara",
    clockOut: 44,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
  {
    id: 8,
    name: "hihi",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU",
    clockIn: "-",
    clockInLocation: "Ferrara",
    clockOut: 44,
    clockOutLocation: "-",
    workSchedule: "8h",
    longgedTime: "0h",
    paidTime: "0h",
    deficit: "-8h",
  },
];

const EmployeeAttend = (props) => {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(rows);
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.secondary" }}>
        <HeaderEmployee />
        <Box sx={{ mr: 3, mt: 3, ml: 3, mb: 3 }}>
          <Box style={styles.BoxHeader} sx={{ bgcolor: "background.default" }}>
            <NotificationsRoundedIcon
              sx={{ color: "primary.main", fontSize: 30 }}
            />
            <Typography sx={{ pl: 1, pt: 0.5 }}>
              You can only update the attendance record within the last 31 days.
            </Typography>
          </Box>

          <Box style={styles.HeaderBody} sx={{ bgcolor: "background.default" }}>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                className={classes.hide_border}
                rows={tableData}
                columns={columns}
                pageSize={7}
                disableColumnMenu
                checkboxSelection
                disableSelectionOnClick
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  BoxHeader: {
    fontSize: 15,
    display: "flex",
    padding: "10px 24px",
    boxSizing: "inherit",
    border: "1px solid rgb(227 235 241)",
    borderRadius: "5px",
    marginTop: "2%",
    marginBottom: "2%",
  },
  HeaderBody: {
    width: "100%",
    display: "block",
    margin: "12px auto",
    overflowX: "auto",
    borderRadius: "5px",
  },
};

export default EmployeeAttend;
