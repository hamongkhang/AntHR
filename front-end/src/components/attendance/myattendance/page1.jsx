import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Button, Divider, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandleOption from "./handleclick";
import SelectDate from "./selectdate";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { color } from "@mui/system";

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
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    editable: false,
    sortable: false,
    width: 150,
  },
  {
    field: "clockIn",
    headerName: "Clock In",
    width: 100,
    sortable: false,
    sortable: false,
  },
  {
    field: "clockInLocation",
    headerName: "Clock In Location",
    width: 180,
    editable: false,
    sortable: false,
  },
  {
    field: "clockOut",
    headerName: "Clock Out",
    width: 110,
    editable: false,
    sortable: false,
  },
  {
    field: "clockOutLocation",
    headerName: "Clock Out Location",
    width: 180,
    editable: false,
    sortable: false,
  },
  {
    field: "workSchedule",
    headerName: "Work Schedule",
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "longgedTime",
    headerName: "Longged Time",
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "paidTime",
    headerName: "Paid Time",
    width: 150,
    editable: false,
    sortable: false,
  },

  {
    field: "deficit",
    headerName: "Deficit",
    width: 150,
    editable: false,
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
          <HandleOption date={params.row.date} />
        </>
      );
    },
  },
];
const rows = [
  {
    id: 1,
    date: "05 March 2022 ",
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
    date: "2 July 2022 ",
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
    date: "4 March 2022 ",
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
    date: "8 March 2022 ",
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
    date: "3 March 2022 ",
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
    date: "12 March 2022 ",
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
    date: "9 March 2022 ",
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
    date: "9 March 2022 ",
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

const MyAttend = () => {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(rows);
  }, []);

  return (
    <>
      <Box
        style={styles.BoxHeader}
        sx={{ m: 3, bgcolor: "background.default" }}
      >
        <NotificationsRoundedIcon
          sx={{ color: "primary.main", fontSize: 30 }}
        />
        <Typography sx={{ pl: 1, pt: 0.5 }}>
          You can only update the attendance record within the last 31 days.
        </Typography>
      </Box>

      <Box
        style={styles.BoxBody}
        sx={{ height: "auto", m: 3, bgcolor: "background.default" }}
      >
        <Box style={styles.HeaderBody}>
          <Grid container sx={{ width: "100%" }}>
            <Grid item lg={3} md={4} sm={4} xs={12} sx={{ display: "flex" }}>
              <Box style={styles.circle} sx={{ bgcolor: "orange" }}>
                <AccessTimeIcon sx={{ margin: "auto", color: "white" }} />
              </Box>
              <Typography variant="h6" style={styles.textAttendLeft}>
                &nbsp; My Attendance{" "}
              </Typography>
            </Grid>

            <Grid item lg={4.5} md={2} />

            <Grid item lg={4.5} md={6} sm={8} xs={12} sx={{ display: "flex" }}>
              <Box style={styles.textAttendRight}>First in 00-00</Box>
              <Box style={styles.textAttendRight}>Last out 00-00</Box>
              <Button
                variant="contained"
                style={styles.CheckAttend}
                sx={{
                  textTransform: "none",
                  color: "#ffff",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Click in 00h 00m 00s
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <SelectDate />

        <Box style={styles.HeaderBody}>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid
              item
              lg={2}
              md={2}
              sm={2.3}
              xs={6}
              style={styles.BoxSwapper}
              sx={{ ml: 2 }}
            >
              <Typography sx={{ fontWeight: 600, color: "primary.main" }}>
                Work Schedule
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>8h</Typography>
            </Grid>

            <Grid
              item
              lg={2}
              md={2}
              sm={2.3}
              xs={6}
              style={styles.BoxSwapper}
              sx={{ ml: 1, mr: 1 }}
            >
              <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                Logged Time
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>9h 33m</Typography>
            </Grid>

            <Grid
              item
              lg={2}
              md={2}
              sm={2}
              xs={6}
              style={styles.BoxSwapper}
              sx={{ mr: 1 }}
            >
              <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                Paid Time
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>9h 33m</Typography>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={2}
              xs={6}
              style={styles.BoxSwapper}
              sx={{ mr: 1 }}
            >
              <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                Deficit
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>9h 33m</Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={6} style={styles.BoxSwapper}>
              <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                Overtime
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>9h 33m</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box style={styles.HeaderBody}>
          <Box
            sx={{
              height: 475,
              width: "100%",
              mt: 4,
            }}
          >
            <DataGrid
              className={classes.hide_border}
              rows={tableData}
              columns={columns}
              pageSize={7}
              disableColumnMenu
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  BoxSwapper: {
    border: "1px solid rgb(227 235 241)",
    borderRadius: "5px",
  },

  BoxHeader: {
    fontSize: 15,
    display: "flex",
    padding: "10px 24px",
    boxSizing: "inherit",
    hieght: "100%",
    border: "1px solid rgb(227 235 241)",
    borderRadius: "5px",
  },
  BoxBody: {
    marginTop: "40px",
    border: "1px solid rgb(227 235 241)",
    borderRadius: "5px",
  },
  HeaderBody: {
    width: "96%",
    display: "block",
    margin: "12px auto",
    overflowX: "auto",
  },
  circle: {
    display: "flex",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
  },

  textAttendLeft: {
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(35 54 78)",
  },

  textAttendRight: {
    width: "28%",
    fontSize: "18px",
    display: "flex",
    fontFamily: "Palatino",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(35 54 78)",
    backgroundColor: "rgb(238 243 246)",
  },

  CheckAttend: {
    width: "38%",
    display: "flex",
    borderRadius: "5px",
    marginLeft: "30px",
  },
};

export default MyAttend;
