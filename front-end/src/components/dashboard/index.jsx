import { Box, Grid, Paper, Avatar, Typography, Button } from '@mui/material'
import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Timer from './timer';

const Dashboard = () => {
  const [firstIn, setFirstIn] = React.useState('');
  const [lastOut, setLastOut] = React.useState('');
  return (
    <Box sx={{ display: { xs: 'block', md: 'grid' } }} gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 8">
        <Paper sx={{ p: 1 }}>
          <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <EventIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Upcomming Event</Typography>
            </Box>
          </Box>
          <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3 }} variant='body2'>Email</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>email</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3 }} variant='body2'>Password</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>********</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ mt:2, p: 1 }}>
          <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
            <Box sx={{ display: 'inherit' }}>
              <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                <EventIcon fontSize='small' sx={{ color: 'white' }} />
              </Avatar>
              <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Upcomming Event</Typography>
            </Box>
          </Box>
          <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3 }} variant='body2'>Email</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>email</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3 }} variant='body2'>Password</Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>********</Typography>
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
            <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>time</Typography>
          </Box>
          <Grid container columns={{ xs: 1, md: 2 }} sx={{ backgroundColor: 'rgb(238 243 246)', pt: 2 }}>
            <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }} >
              <Typography sx={{ mx: 3 }} variant='body2'>First in: {firstIn} </Typography>
            </Grid>
            <Grid item xs={1} md={1} sx={{ mb: 2, pl: 1 }}>
              <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Last out: {lastOut} </Typography>
            </Grid>
          </Grid>
          <Timer firstIn={firstIn} lastOut={lastOut} setFirstIn={setFirstIn} setLastOut={setLastOut}></Timer>
        </Paper>
      </Box>
    </Box>
  )
}

export default Dashboard