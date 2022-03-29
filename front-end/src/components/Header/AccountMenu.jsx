import React from 'react'
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import { Tabs, Tab, Badge, Container, Toolbar, Avatar } from "@mui/material";

const AccountMenu = (props) => {
    const { menuId } = props
    const { isMenuOpen } = props
    const { handleMenuClose } = props
    const { anchorEl } = props
    const { handleLogout } = props
    const $token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    const last_name = localStorage.getItem('last_name');
    const first_name = localStorage.getItem('first_name');

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    display: 'flex',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
        >
            <MenuItem onClick={handleMenuClose} to='profile/overview' component={Link}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}

                >
                    <Grid item xs={4} sm={8} md={12}>
                        <Box sx={{ textAlign: "center", paddingTop: "20px", paddingBottom: "10px", paddingLeft: "20px", paddingRight: "20px", borderBottom: "1.5px solid rgb(235, 240, 244)" }}>
                            <img
                                style={{
                                    height: "60px",
                                    width: "60px",
                                    objectFit: 'cover',
                                    borderRadius: "100%",
                                    marginBottom: "20px"
                                }}
                                src={
                                    !localStorage.getItem('avatar') ? process.env.REACT_APP_FILE + '/avatar/avatar.png'
                                        :
                                        localStorage.getItem('avatar').search('https://') != -1 ?
                                            localStorage.getItem('avatar')
                                            :
                                            process.env.REACT_APP_FILE + '/avatar/' + localStorage.getItem('avatar')
                                }
                            >
                            </img>
                            <Typography sx={{ fontSize: "15px", lineHeight: "20px", fontWeight: "bold", color: "rgb(60, 82, 100)" }}>{last_name + " " + first_name}</Typography>
                            <Typography sx={{ fontSize: "14px", lineHeight: "20px", color: "rgb(95, 125, 149)" }}>{email}</Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", padding: "10px", borderBottom: "1.5px solid rgb(235, 240, 244)" }}>
                            <Typography sx={{ fontSize: "14px", lineHeight: "20px", color: "rgb(101, 114, 131)" }}>View Profile</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </MenuItem>
            <MenuItem>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}

                >
                    <Grid item xs={4} sm={8} md={12}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography onClick={handleLogout} sx={{ fontSize: "14px", lineHeight: "20px", alignItems: "center", color: "rgb(101, 114, 131)" }}>Log out</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </MenuItem>
        </Menu>
    )
}

export default AccountMenu