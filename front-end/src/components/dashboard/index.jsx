import { Box, Grid, Paper, Avatar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop } from "@mui/material";
import React, { useEffect } from "react";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TableViewIcon from "@mui/icons-material/TableView";
import TimingEvent from "./TimingEvent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import QRcode from "./QRcode";
import moment from "moment"
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const [firstIn, setFirstIn] = React.useState("");
  const [lastOut, setLastOut] = React.useState("");
  const [render, setRender] = React.useState(false);
  const [liveTime, setLiveTime] = React.useState(new Date());
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [buttonClock, setButtonClock] = React.useState({
    clock_in: 'block',
    clock_out: 'none'
  })
  const date = new Date();
  const datestring = `Today: ${date.getDate()} - ${date.getMonth() + 1
    } - ${date.getFullYear()}`;
  const navigate = useNavigate();
  const $token = localStorage.getItem('access_token');
  const [loading, setLoading] = React.useState({
    loadNews: true,
    loadAttendance: true,
  })
  const getMyAttendance = () => {
    setLoading({ ...loading, loadAttendance: true })
    fetch(process.env.REACT_APP_API + "/attendance/getMyAttendance", {
      method: "GET",
      headers: { "Authorization": `Bearer ` + $token }
    })
      .then(response => response.json())
      .then(data => {
        checkButton(data.attendances)
        setLoading({ ...loading, loadAttendance: false })
      });
  };
  const checkButton = (arr) => {
    arr.map(a => {
      let now = new moment();
      let clock_in = new moment(a.clock_in).format("YYYY-MM-DD");
      if (now.format("YYYY-MM-DD") == clock_in) {
        if (a.clock_out != null) {
          setButtonClock({
            clock_in: 'block',
            clock_out: 'none'
          });
          setFirstIn(new moment(a.clock_in).format("HH:MM:ss"))
          setLastOut(new moment(a.clock_out).format("HH:MM:ss"))
        }
        else {
          setFirstIn(new moment(a.clock_in).format("HH:MM:ss"))
          setButtonClock({
            clock_in: 'none',
            clock_out: 'block'
          })
        }
      }
    })
  }
  const openQRClockIn = () => {
    setOpen1(true);
  }
  const openQRClockOut = () => {
    setOpen2(true);
  }
  const closeQRClockIn = () => {
    setOpen1(false);
    setRender(!render);
  }
  const closeQRClockOut = () => {
    setOpen2(false);
    setRender(!render);
  }
  const getNews = () => {
    setLoading({ ...loading, loadNews: true })
    fetch(process.env.REACT_APP_API + '/new/getAllNew', {
      method: "GET",
      headers: { "Authorization": `Bearer ` + localStorage.getItem('access_token') }
    })
      .then(response => response.json())
      .then(data => {
        setNews(data.data.reverse());
        setLoading({ ...loading, loadNews: false })
      });
  }
  useEffect(() => {
    getMyAttendance()
    getNews()
    setInterval(() => setLiveTime(new Date()), 1000);
  }, [render]);
  return (
    <>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading.loadAttendance && loading.loadNews}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{ display: { xs: "block", md: "grid" } }}
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
      >
        <Box gridColumn="span 8">
          <Paper sx={{ p: 1 }}>
            <Box sx={{ display: "flex", m: 3 }} justifyContent="space-between">
              <Box sx={{ display: "inherit" }}>
                <Avatar sx={{ width: 30, height: 30, backgroundColor: "orange" }}>
                  <EventIcon fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography sx={{ ml: 2, color: "black" }} variant="subtitle1">
                  Time Table
                </Typography>
              </Box>
              <Box sx={{ display: "inherit" }}>
                <Typography
                  sx={{
                    ml: 2,
                    color: "black",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                  variant="subtitle1"
                >
                  {datestring}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ m: 3 }}>
              <TimingEvent></TimingEvent>
            </Box>
          </Paper>
          <Paper sx={{ mt: 2, p: 1 }}>
            <Box
              sx={{ display: "flex", mt: 3, mx: 3 }}
              justifyContent="space-between"
            >
              <Box sx={{ display: "inherit" }}>
                <Avatar sx={{ width: 30, height: 30, backgroundColor: "orange" }}>
                  <AssignmentIndIcon fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography sx={{ ml: 2, color: "black" }} variant="subtitle1">
                  Pending approval
                </Typography>
              </Box>
            </Box>
            <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
              <Grid item xs={2} md={2} sx={{ mb: 2, pt: 3, pl: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRight: {
                      md: "1px solid rgb(227, 235, 241)",
                      xs: "none",
                    },
                  }}
                >
                  <Box sx={{ display: "flex" }} justifyContent="space-between">
                    <Typography
                      sx={{
                        ml: 2,
                        color: "black",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                      variant="subtitle1"
                    >
                      Time-off
                    </Typography>
                    <Typography
                      sx={{ ml: 2, color: "orange", fontSize: "13px" }}
                      variant="subtitle1"
                    >
                      0 pending
                    </Typography>
                  </Box>
                  <Box sx={{ m: 5, display: "flex" }} justifyContent="center">
                    <Avatar
                      sx={{ width: 60, height: 60, backgroundColor: "grey" }}
                    >
                      <AssignmentIcon fontSize="large" sx={{ color: "white" }} />
                    </Avatar>
                  </Box>
                  <Box sx={{ m: 5, display: "flex" }} justifyContent="center">
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      Hooray! No pending requests
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2} md={2} sx={{ mb: 2, pt: 3, pr: 3 }}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex" }} justifyContent="space-between">
                    <Typography
                      sx={{
                        ml: 2,
                        color: "black",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                      variant="subtitle1"
                    >
                      Time Attendance
                    </Typography>
                    <Typography
                      sx={{ ml: 2, color: "orange", fontSize: "13px" }}
                      variant="subtitle1"
                    >
                      0 pending
                    </Typography>
                  </Box>
                  <Box sx={{ m: 5, display: "flex" }} justifyContent="center">
                    <Avatar
                      sx={{ width: 60, height: 60, backgroundColor: "grey" }}
                    >
                      <AssignmentIndIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </Avatar>
                  </Box>
                  <Box sx={{ m: 5, display: "flex" }} justifyContent="center">
                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      Hooray! No pending requests
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box gridColumn="span 4">
          <Paper sx={{ mt: { xs: 3, md: 0 }, p: 1 }}>
            <Box sx={{ display: "flex", m: 3 }} justifyContent="space-between">
              <Box sx={{ display: "inherit" }}>
                <Avatar sx={{ width: 30, height: 30, backgroundColor: "orange" }}>
                  <AccessTimeIcon fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography sx={{ ml: 2, color: "black" }} variant="subtitle1">
                  Clock in/out
                </Typography>
              </Box>
              <Typography
                sx={{ ml: 2, color: "rgb(60, 82, 100)", fontSize: 18 }}
                variant="subtitle1"
              >
                {liveTime.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: false,
                })}
              </Typography>
            </Box>
            <Grid
              container
              columns={{ xs: 1, md: 2 }}
              sx={{ backgroundColor: "rgb(238 243 246)", pt: 2 }}
            >
              <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }}>
                <Typography sx={{ mx: 3 }} variant="body2">
                  First in: {firstIn ? firstIn : '-:-:-'}
                </Typography>
              </Grid>
              <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }}>
                <Typography sx={{ mx: 3, color: "black" }} variant="body2">
                  Last out: {lastOut ? lastOut : '-:-:-'}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={openQRClockIn}
              sx={{ mt: 3, mb: 2, ml: 5, mr: 2, width: "80%", display: buttonClock.clock_in }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", fontWeight: 500, color: "white" }}
              >
                Clock in
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={openQRClockOut}
              color='error'
              sx={{ mt: 3, mb: 2, ml: 5, width: "80%", display: buttonClock.clock_out }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", fontWeight: 500, color: "white" }}
              >
                Clock out
              </Typography>
            </Button>
            {/* <Timer firstIn={firstIn} lastOut={lastOut} setFirstIn={setFirstIn} setLastOut={setLastOut}></Timer> */}
          </Paper>
          <Paper sx={{ mt: { xs: 3, md: 2 }, p: 1 }}>
            <Box sx={{ display: "flex", m: 3 }} justifyContent="space-between">
              <Box sx={{ display: "inherit" }}>
                <Avatar sx={{ width: 30, height: 30, backgroundColor: "orange" }}>
                  <TableViewIcon fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography sx={{ ml: 2, color: "black" }} variant="subtitle1">
                  News
                </Typography>
              </Box>
              <Typography
                sx={{ ml: 2, color: "orange", fontSize: "13px" }}
                variant="subtitle1"
              >
                {news.length} news
              </Typography>
            </Box>
            <Box sx={{ overflowY: 'scroll', maxHeight: '330px', '&::-webkit-scrollbar': { display: 'none' }, p: 2 }}>
              {
                news.map((n) => (
                  <Box key={n.id} sx={{ border: 1, borderColor: "#e3ebf1", borderRadius: 2, p: 1, mb: 3, cursor: 'pointer' }} onClick={() => { navigate('/home/news') }}>
                    <Typography sx={{ ml: 2, color: "black", fontSize: "16px", fontWeight: 600 }} variant="subtitle1">
                      {n.title}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ ml: 1.5, color: "#657283", display: 'inline-block', verticalAlign: "middle" }} variant="caption">
                        <AccessTimeSharpIcon sx={{ mr: 1, fontSize: "18px" }} />
                        {new moment(n.updated_at).format('HH:MM | YYYY:MM:DD')}
                      </Typography>
                    </Box>
                  </Box>
                ))
              }
            </Box>

          </Paper>
        </Box>
        <Dialog
          open={open1}
          onClose={closeQRClockIn}
          aria-labelledby="draggable-dialog-title"
          sx={{ p: 3 }}
        >
          <DialogTitle id="draggable-dialog-title">QRCode</DialogTitle>
          <DialogContent>
            <DialogContentText>Your QR code is:</DialogContentText>
            <QRcode text="clockin"></QRcode>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#AEB6BF ",
                color: "white",
                "&:hover": { backgroundColor: "#808B96" },
                mb: 2,
                mr: 2,
              }}
              onClick={closeQRClockIn}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open2}
          onClose={closeQRClockOut}
          aria-labelledby="draggable-dialog-title"
          sx={{ p: 3 }}
        >
          <DialogTitle id="draggable-dialog-title">QRCode</DialogTitle>
          <DialogContent>
            <DialogContentText>Your QR code is:</DialogContentText>
            <QRcode text="clockout"></QRcode>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#AEB6BF ",
                color: "white",
                "&:hover": { backgroundColor: "#808B96" },
                mb: 2,
                mr: 2,
              }}
              onClick={closeQRClockOut}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Dashboard;
