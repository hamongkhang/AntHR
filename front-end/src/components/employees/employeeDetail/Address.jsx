import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Address = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, setEmployee } = props
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <LocationOnIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Address</Typography>
                </Box>
            </Box>

            <Box>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Country</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.country ? employee.country : '-'}</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>City</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.city ? employee.city : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Postal Code</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.postal_code ? employee.postal_code : '-'}</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>State</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>{employee.state ? employee.state : '-'}</Typography>
                    </Grid>
                </Grid>
            </Box>

        </Item>

    )
}

export default Address