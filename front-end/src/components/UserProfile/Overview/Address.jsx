import { Box, Grid, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddressForm from './AddressForm';
import { toast } from 'react-toastify';

toast.configure();

const Address = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, errors, setEmployee, setErrors } = props
    const $token = localStorage.getItem('access_token');

    const handleChange = () => {
        setOpenForm(!openForm)
    }
    const updateAddress = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('postal_code', employee.postal_code);
        _formData.append('city', employee.city);
        _formData.append('country', employee.country);
        _formData.append('state', employee.state);
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
                            postal_code: json.error.postal_code ? json.error.postal_code : [],
                            city: json.error.city ? json.error.city : [],
                            country: json.error.country ? json.error.country : [],
                            state: json.error.state ? json.error.state : [],
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
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <LocationOnIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Address</Typography>
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
                    <AddressForm
                    employee={employee} 
                    errors={errors}
                    setEmployee={setEmployee}
                    setErrors={setErrors}
                    updateAddress={updateAddress}
                    handleChange={handleChange}>
                    </AddressForm>
                    :
                    <Box>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Country</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.country?employee.country:'-'}</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>City</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.city?employee.city:'-'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Postal Code</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.postal_code?employee.postal_code:'-'}</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>State</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.state?employee.state:'-'}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Item>

    )
}

export default Address