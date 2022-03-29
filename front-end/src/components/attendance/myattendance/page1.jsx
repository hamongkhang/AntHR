import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Button, Divider, Grid, Typography, Backdrop } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandleOption from "./handleclick";
import SelectDate from "./selectdate";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';


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
    field: "no", headerName: 'No.',
    editable: false,
    sortable: false,
    width: 80,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 180,
    editable: true,
    sortable: false,
  },
  {
    field: 'clock_in',
    headerName: 'Clock In',
    width: 100,
    sortable: false,
  },

  {
    field: 'clock_out',
    headerName: 'Clock Out',
    width: 110,
    editable: true,
    sortable: false,
  },
  {
    field: 'work_schedule',
    headerName: 'Work Schedule',
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: 'logged_time',
    headerName: 'Longged Time',
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: 'paid_time',
    headerName: 'Paid Time',
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: 'deficit',
    headerName: 'Deficit',
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: 'note',
    headerName: 'Note',
    width: 150,
    editable: true,
    sortable: false,
  },
  {
    field: '',
    headerName: '',
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
  { id: 1, name: 'khang ', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU', clock_in: '-', clockInLocation: 'Jon', clock_out: 35, clockOutLocation: '-', work_schedule: '8h', logged_time: '0h', paid_time: '0h', deficit: '-8h' },
];

const MyAttend = () => {
  const classes = useStyles();
  const [infor, setInfor] = useState({
    work_schedule: '0h',
    paid_time: '0h',
    logged_time: '0h',
    deficit: '0h'
  });
  const [tableData, setTableData] = useState([]);
  const $token = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(false)

  const getMyAttendance = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/attendance/getMyAttendance", {
      method: "GET",
      headers: { "Authorization": `Bearer ` + $token }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setTableData(rows);;
          setLoading(false)

        }
        else {
          data.attendances.map((a, index) => {
            a.no = index + 1
            let clock_in = new Date(a.clock_in)
            let str = clock_in.getHours() + 'h ' + clock_in.getMinutes() + 'm'
            a.clock_in = str
            let date = new Date(a.date)
            a.date = date.toDateString()
            if (a.clock_out == null) {
              a.clock_out = '-'
            }
            else {
              let clock_out = new Date(a.clock_out)
              str = clock_out.getHours() + 'h ' + clock_out.getMinutes() + 'm'
              a.clock_out = str
            }
            a.logged_time == '' ? a.logged_time = '0h' : a.logged_time = a.logged_time
            a.paid_time == '' ? a.paid_time = '0h' : a.paid_time = a.paid_time
            a.deficit == '' ? a.deficit = '0h' : a.deficit = a.deficit
            a.work_schedule = '8h'
          })
          setTableData(data.attendances);
          setInfor(data.infor);
          setLoading(false)
        }
      });
  };
  useEffect(() => {
    getMyAttendance();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Typography sx={{ fontWeight: 600, pb: 1 }}>{infor.work_schedule}h</Typography>
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
              <Typography sx={{ fontWeight: 600, pb: 1 }}>{infor.logged_time == '' ? '0h' : infor.logged_time}</Typography>
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
              <Typography sx={{ fontWeight: 600, pb: 1 }}>{infor.paid_time == '' ? '0h' : infor.paid_time}</Typography>
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
              <Typography sx={{ fontWeight: 600, pb: 1 }}>{infor.deficit}</Typography>
            </Grid>
            {/* <Grid item lg={2} md={2} sm={2} xs={6} style={styles.BoxSwapper}>
              <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                Overtime
              </Typography>
              <Typography sx={{ fontWeight: 600, pb: 1 }}>9h 33m</Typography>
            </Grid> */}
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
