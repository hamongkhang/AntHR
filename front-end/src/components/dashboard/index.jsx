import { Box, Grid, Paper, Avatar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect } from 'react'
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimingEvent from './TimingEvent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import QRcode from './QRcode';

const Dashboard = () => {
  const [firstIn, setFirstIn] = React.useState('');
  const [lastOut, setLastOut] = React.useState('');
  const [liveTime, setLiveTime] = React.useState(new Date());
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const date = new Date();
  const datestring = `Today: ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
  useEffect(() => {
    setInterval(() => setLiveTime(new Date()), 30000);
  }, []);

  return (
    <Box sx={{ display: { xs: 'block', md: 'grid' } }} gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 8">
        <Paper sx={{ p: 1 }}>
          <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <EventIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Time Table</Typography>
            </Box>
            <Box sx={{ display: 'inherit' }}>
              <Typography sx={{ ml: 2, color: 'black', fontSize: '18px', fontWeight: 500 }} variant='subtitle1'>{datestring}</Typography>
            </Box>
          </Box>
          <Box sx={{ m: 3 }}>
            <TimingEvent></TimingEvent>
          </Box>
        </Paper>
        <Paper sx={{ mt: 2, p: 1 }}>
          <Box sx={{ display: 'flex', mt: 3, mx: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <AssignmentIndIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Pending approval</Typography>
            </Box>
          </Box>
          <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
            <Grid item xs={2} md={2} sx={{ mb: 2, pt: 3, pl: 3 }}>
              <Box sx={{ p: 2, borderRight: { md: '1px solid rgb(227, 235, 241)', xs: 'none' } }}>
                <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                  <Typography sx={{ ml: 2, color: 'black', fontSize: '16px', fontWeight: 600 }} variant='subtitle1'>Time-off</Typography>
                  <Typography sx={{ ml: 2, color: 'orange', fontSize: '13px' }} variant='subtitle1'>0 pending</Typography>
                </Box>
                <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                  <Avatar sx={{ width: 60, height: 60, backgroundColor: 'grey' }}>
                    <AssignmentIcon fontSize='large' sx={{ color: 'white' }} />
                  </Avatar>
                </Box>
                <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                  <Typography sx={{ color: 'gray', fontSize: '15px' }}>Hooray! No pending requests</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2} md={2} sx={{ mb: 2, pt: 3, pr: 3 }}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex' }} justifyContent='space-between'>
                  <Typography sx={{ ml: 2, color: 'black', fontSize: '16px', fontWeight: 600 }} variant='subtitle1'>Time Attendance</Typography>
                  <Typography sx={{ ml: 2, color: 'orange', fontSize: '13px' }} variant='subtitle1'>0 pending</Typography>
                </Box>
                <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                  <Avatar sx={{ width: 60, height: 60, backgroundColor: 'grey' }}>
                    <AssignmentIndIcon fontSize='large' sx={{ color: 'white' }} />
                  </Avatar>
                </Box>
                <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                  <Typography sx={{ color: 'gray', fontSize: '15px' }}>Hooray! No pending requests</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box gridColumn="span 4">
        <Paper sx={{ mt: { xs: 3, md: 0 }, p: 1 }}>
          <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <AccessTimeIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Clock in/out</Typography>
            </Box>
            <Typography sx={{ ml: 2, color: 'black', fontSize: 18 }} variant='subtitle1'>
              {liveTime.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })}</Typography>
          </Box>
          <Grid container columns={{ xs: 1, md: 2 }} sx={{ backgroundColor: 'rgb(238 243 246)', pt: 2 }}>
            <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }} >
              <Typography sx={{ mx: 3 }} variant='body2'>First in: - : - : - </Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Last out: - : - : - </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={()=> setOpen1(true)}
            sx={{ mt: 3,ml:5, mr:2, width: '40%' }}>
            <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 500, color: 'white' }}>
              Clock in
            </Typography>
          </Button>
          <Button variant="contained" onClick={()=> setOpen2(true)}
            sx={{ mt: 3, width: '40%', backgroundColor:'red' }}>
            <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 500, color: 'white' }}>
              Clock out
            </Typography>
          </Button>
          {/* <Timer firstIn={firstIn} lastOut={lastOut} setFirstIn={setFirstIn} setLastOut={setLastOut}></Timer> */}
        </Paper>
        <Paper sx={{ mt: { xs: 3, md: 2 }, p: 1 }}>
          <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <AccessTimeIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Todos</Typography>
            </Box>
            <Typography sx={{ ml: 2, color: 'orange', fontSize: '13px' }} variant='subtitle1'>0 pending</Typography>
          </Box>
          <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
            <Avatar sx={{ width: 60, height: 60, backgroundColor: 'grey' }}>
              <FactCheckIcon fontSize='large' sx={{ color: 'white' }} />
            </Avatar>
          </Box>
          <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
            <Typography sx={{ color: 'gray', fontSize: '15px' }}>Hooray! No pending requests</Typography>
          </Box>
        </Paper>
      </Box>
      <Dialog
        open={open1}
        onClose={()=> setOpen1(false)}
        aria-labelledby="draggable-dialog-title"
        sx={{ p: 3 }}
      >
        <DialogTitle id="draggable-dialog-title">
          QRCode
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your QR code is:
          </DialogContentText>
          <QRcode text ='clockin'></QRcode>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#AEB6BF ', color: 'white', '&:hover': { backgroundColor: '#808B96' }, mb: 2, mr: 2 }}
            onClick={()=> setOpen1(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={()=> setOpen2(false)}
        aria-labelledby="draggable-dialog-title"
        sx={{ p: 3 }}
      >
        <DialogTitle id="draggable-dialog-title">
          QRCode
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your QR code is:
          </DialogContentText>
          <QRcode text ='clockout'></QRcode>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#AEB6BF ', color: 'white', '&:hover': { backgroundColor: '#808B96' }, mb: 2, mr: 2 }}
            onClick={()=> setOpen2(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Dashboard