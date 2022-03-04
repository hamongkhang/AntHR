import React from 'react'
import { Box, Grid, Typography, Divider, Avatar } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const LeftBoxInfor = (props) => {
    const { Item } = props
    return (
        <Item>
            <Grid container sx={{ mt: 5 }} justifyContent="center">
                <Grid item>
                    <Avatar src='http://localhost:3000/bg7.jpg' sx={{ height: 110, width: 110 }} variant='circular'></Avatar>
                </Grid>
            </Grid>
            <Typography sx={{ ml: 3, mr: 3, mt: 3, color: 'black', fontWeight: '600' }} variant='h5'>employee's name</Typography>
            {/* <Button sx={{ ml: 3, mt: 1 }} variant = 'outlined'>ONboading</Button> */}
            <Typography sx={{ ml: 3, mt: 1 }} variant='h6'>position</Typography>
            <Divider sx={{ mx: 3, my: 2 }} />
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <EmailOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black' }} variant='body2'>Email</Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <PhoneOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black' }} variant='body2'>Phone</Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <LanguageOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black' }} variant='body2'>GMT +07:00</Typography>
            </Box>
            <Divider sx={{ mx: 3, my: 2 }} />
            <Box sx={{ display: 'block', ml: 3, mt: 1 }}>
                <Typography variant='subtitle1'>DEPARTMENT</Typography>
                <Typography variant='body2' sx={{ color: 'black' }}>Department name</Typography>
            </Box>
            <Box sx={{ display: 'block', ml: 3, mt: 1 }}>
                <Typography variant='subtitle1'>OFFICE</Typography>
                <Typography variant='body2' sx={{ color: 'black' }}>Office name</Typography>
            </Box>
            <Divider sx={{ mx: 3, mt: 2, mb: 16, md:{mb:16}, display: { md: 'block', xs: 'none' } }} />
        </Item>
    )
}

export default LeftBoxInfor