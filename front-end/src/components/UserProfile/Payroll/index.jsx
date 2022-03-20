import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Payroll = (props) => {
    const { first_name, last_name } = props;
    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                <Avatar sx={{ width: 100, height: 100, backgroundColor: 'grey' }}>
                    <CurrencyExchangeIcon fontSize='large' sx={{ color: 'white', width: 60, height: 60 }} />
                </Avatar>
            </Box>
            <Box sx={{ mt: 5, mx: 5, display: 'flex' }} justifyContent='center'>
                <Typography sx={{ color: 'gray', fontSize: '15px' }}>Set up payroll for {last_name} {first_name}</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex' }} justifyContent='center'>
                <Button variant='contained' sx={{ color: 'white' }}>Set up</Button>
            </Box>
        </Box>
    )
}

export default Payroll