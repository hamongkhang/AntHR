import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Divider, Avatar, Button } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { toast } from 'react-toastify';

toast.configure();

const LeftBoxInfor = (props) => {
    const { Item, avatar, email, phone, firstname, lastname } = props;
    const [srcImg, setScrImg] = useState('');
    const checkAvatar = () => {
        if (avatar) {
            if (avatar.search('https://') != -1) {
                setScrImg(avatar)
            }
            else {
                setScrImg(`${process.env.REACT_APP_FILE}/avatar/${avatar}`)
            }
        }
    }
    useEffect(() => {
        checkAvatar()
    }, [avatar])
    return (
        <Item>
            <Grid container sx={{ mt: 5 }} justifyContent="center">
                <Grid item>
                    <Avatar src={srcImg}
                        sx={{ height: 130, width: 130, border: 1, borderColor: 'ThreeDLightShadow' }}
                        variant='circular' />
                </Grid>
            </Grid>
            <Typography sx={{ ml: 3, mr: 3, mt: 3, color: 'black', fontWeight: '600' }} variant='h5'>{firstname} {lastname}</Typography>
            {/* <Button sx={{ ml: 3, mt: 1 }} variant = 'outlined'>ONboading</Button> */}
            <Typography sx={{ ml: 3, mt: 1 }} variant='h6'>position</Typography>
            <Divider sx={{ mx: 3, my: 2 }} />
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <EmailOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black', textOverflow: "ellipsis", overflow: "hidden" }} variant='body2'><a href={"mailto:" + email} style={{ color: "inherit", textDecoration: "none" }}>{email ? email : '-'}</a></Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <PhoneOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black' }} variant='body2'><a href={"tel:" + phone} style={{ color: "inherit", textDecoration: "none" }}>{phone ? phone : '-'}</a></Typography>
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
            <Divider sx={{ mx: 3, mt: 2, mb: 20, lg: { mb: 10 }, display: { md: 'block', xs: 'none' } }} />
        </Item>
    )
}

export default LeftBoxInfor