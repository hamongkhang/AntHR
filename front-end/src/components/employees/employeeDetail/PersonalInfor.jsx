import { Box, Grid, Typography, Button, Avatar, } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const PersonalInfor = (props) => {
    const { Item } = props
    const { employee, setEmployee } = props
    return (
        <Item>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <PersonIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Personal Information</Typography>
                </Box>
            </Box>
            <Box>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>First Name</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.first_name!=null ? employee.first_name : '-'}</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Last Name</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.last_name!=null ? employee.last_name : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Gender</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.gender !=null ? employee.gender : '-'}</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Date of Birth</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.birthday !=null ? employee.birthday : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Email</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black', textOverflow: "ellipsis", overflow: "hidden" }} variant='body2'><a href={"mailto:" + employee.email} style={{ color: "inherit", textDecoration: "none" }}>{employee.email!=null ? employee.email : '-'}</a></Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Phone Number</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'><a href={"tel:" + employee.phone} style={{ color: "inherit", textDecoration: "none" }}>{employee.phone!=null ? employee.phone : '-'}</a></Typography>
                    </Grid>
                </Grid>
            </Box>
        </Item>

    )
}

export default PersonalInfor