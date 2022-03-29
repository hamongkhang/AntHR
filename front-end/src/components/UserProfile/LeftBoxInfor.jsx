import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Divider, Avatar, Button } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { toast } from 'react-toastify';

toast.configure();

const LeftBoxInfor = (props) => {
    const { Item, avatar, setRerender, email, phone, firstname, lastname, setLoading } = props;
    const $token = localStorage.getItem('access_token');
    const [srcImg, setScrImg] = useState('');
    const updateAvatar = (event) => {
        setLoading(true)
        if ($token) {
            const _formData = new FormData();
            _formData.append('avatar', event.target.files[0]);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            };
            fetch(
                `${process.env.REACT_APP_API}/employee/changeAvatar`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (!json.error) {
                        setLoading(false)
                        toast.success(`Update avatar successfully`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        localStorage.setItem('avatar',json.data.avatar);
                        setRerender(true)
                    } 
                    else {
                        setLoading(false)
                        toast.error(`error`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        } else {
            toast.warn(`No image selected`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const checkAvatar = () =>{
        if(avatar){
            if(avatar.search('https://') != -1){
                setScrImg(avatar)
            }
            else{
                setScrImg(`${process.env.REACT_APP_FILE}/avatar/${avatar}`)
            }
        }
    }
    useEffect(()=>{
        checkAvatar()
    },[avatar])
    return (
        <Item>
            <Grid container sx={{ mt: 5 }} justifyContent="center">
                <Grid item>
                    <label htmlFor="upload-avatar">
                    <input id="upload-avatar" type="file" name='avatar' onChange={(event) => updateAvatar(event)} hidden />
                        <Button sx={{borderRadius:50}} component='span'>
                            <Avatar src={srcImg}
                            sx={{ height: 130, width: 130, border:1, borderColor: 'ThreeDLightShadow' }} 
                            variant='circular' />
                        </Button>
                    </label>
                </Grid>
            </Grid>
            <Typography sx={{ ml: 3, mr: 3, mt: 3, color: 'black', fontWeight: '600' }} variant='h5'>{firstname} {lastname}</Typography>
            {/* <Button sx={{ ml: 3, mt: 1 }} variant = 'outlined'>ONboading</Button> */}
            <Typography sx={{ ml: 3, mt: 1 }} variant='h6'>position</Typography>
            <Divider sx={{ mx: 3, my: 2 }} />
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <EmailOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black',textOverflow:"ellipsis", overflow: "hidden"}} variant='body2'><a href={"mailto:"+email} style={{color: "inherit",textDecoration:"none"}}>{email?email:'-'}</a></Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: 3, mt: 1 }}>
                <PhoneOutlinedIcon fontSize='small' />
                <Typography sx={{ ml: 4, color: 'black' }} variant='body2'><a href={"tel:"+phone} style={{color: "inherit",textDecoration:"none"}}>{phone?phone:'-'}</a></Typography>
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
            <Divider sx={{ mx: 3, mt: 2, mb: 14, lg: { mb: 10 }, display: { md: 'block', xs: 'none' } }} />
        </Item>
    )
}

export default LeftBoxInfor