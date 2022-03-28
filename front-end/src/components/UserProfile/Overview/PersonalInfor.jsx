import { Box, Grid, Typography, Button, Avatar, } from '@mui/material'
import React, { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import PersonalInforForm from './PersonalInforForm';
import { toast } from 'react-toastify';

toast.configure();

const PersonalInfor = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, errors, setEmployee, setErrors } = props
    const $token = localStorage.getItem('access_token');

    const updatePersonal = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('first_name', employee.first_name);
        _formData.append('last_name', employee.last_name);
        _formData.append('gender', employee.gender);
        _formData.append('birthday', employee.birthday);
        _formData.append('phone', employee.phone);
        _formData.append('email', employee.email);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { "Authorization": `Bearer ` + $token }
        };
        fetch(process.env.REACT_APP_API + '/employee/changeInformation', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    if (json.error.error) {
                        toast.error(`${json.error.error}`, {
                            position: 'top-center',
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        setErrors({
                            first_name: json.error.first_name ? json.error.first_name : [],
                            last_name: json.error.last_name ? json.error.last_name : [],
                            birthday: json.error.birthday ? json.error.birthday : [],
                            gender: json.error.gender ? json.error.gender : [],
                            phone: json.error.phone ? json.error.phone : [],
                            email: json.error.email ? json.error.email : [],
                        });
                    }
                } else {
                    toast.success(`Update profile successful`, {
                        position: 'top-center',
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    handleChange()
                }
            });
    }

    const handleChange = () => {
        setOpenForm(!openForm)
    }

    useEffect(() => {
        console.log(employee.gender == null);
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
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.first_name !=null ? employee.first_name : '-'}</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Last Name</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.last_name !=null ? employee.last_name : '-'}</Typography>
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
                                <Typography sx={{ mx: 3, color: 'black',textOverflow:"ellipsis", overflow: "hidden" }} variant='body2'><a href={"mailto:"+employee.email} style={{color: "inherit",textDecoration:"none"}}>{employee.email ? employee.email : '-'}</a></Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Phone Number</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'><a href={"tel:"+employee.phone} style={{color: "inherit",textDecoration:"none"}}>{employee.phone ? employee.phone : '-'}</a></Typography>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Item>

    )
}

export default PersonalInfor