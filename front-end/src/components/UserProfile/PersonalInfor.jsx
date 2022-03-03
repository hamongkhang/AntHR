import { Box, Grid, Typography, Button,  Avatar, } from '@mui/material'
import React, { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PersonalInforForm from './PersonalInforForm';

const PersonalInfor = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, errors, setEmployee, setErrors, updatePersonal } = props


    const handleChange = () => {
        setOpenForm(!openForm)
    }
    
    useEffect(() => {
    })
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <PersonIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Personal Information</Typography>
                </Box>
                {
                    openForm ?
                    ''
                        :
                        <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={handleChange}>edit</Button>
                }
            </Box>
            {
                openForm ?
                    <PersonalInforForm 
                    employee={employee} 
                    errors={errors}
                    setEmployee={setEmployee}
                    setErrors={setErrors}
                    updatePersonal={updatePersonal}
                    handleChange={handleChange}>
                    </PersonalInforForm>
                    :
                    <Box>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>First Name</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Quan</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Last Name</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Nguyen Hong</Typography>
                            </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Gender</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Male</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Date of Birth</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>03/04/2001</Typography>
                            </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Email</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Quan.nguyen22@gmail.com</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Phone Number</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>113 114 115</Typography>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Item>

    )
}

export default PersonalInfor