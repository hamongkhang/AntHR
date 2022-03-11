import React from 'react';
import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChangePassword from '../../change_password';

const Account = (props) => {
    const { Item, email } = props
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Item sx={{ mt: 2 }}>
            <Box>
                <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                    <Box sx={{ display: 'inherit' }}>
                        <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                            <ManageAccountsIcon fontSize='small' sx={{ color: 'white' }} />
                        </Avatar>
                        <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Account Information</Typography>
                    </Box>
                    <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={() => setModalShow(true)}>Change Password</Button>
                </Box>
                <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Email</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' ,textOverflow:"ellipsis", overflow: "hidden"}} variant='body2'><a href={"mailto:"+email} style={{color: "inherit",textDecoration:"none"}}>{email}</a></Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3 }} variant='body2'>Password</Typography>
                    </Grid>
                    <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                        <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>********</Typography>
                    </Grid>
                </Grid>
            </Box>
            <ChangePassword
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Item>
    )
}

export default Account