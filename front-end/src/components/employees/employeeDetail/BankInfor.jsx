import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const BankInfor = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, setEmployee } = props
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <AccountBalanceIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Bank Information</Typography>
                </Box>
            </Box>
            <Box>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Bank's name</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                    </Grid>
                </Grid>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>User name</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Bank number</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Item>

    )
}

export default BankInfor