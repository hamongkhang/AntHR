import React from 'react'
import {Menu, MenuItem, IconButton, Badge, Typography} from '@mui/material';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const MobileAccountMenu = (props) => {
    const {mobileMenuId} = props
    const {isMobileMenuOpen} = props
    const {handleMobileMenuClose} = props
    const {mobileMoreAnchorEl} = props
    const {handleLogout} = props

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem to='profile/overview' component={Link}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Typography>My Account</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <Typography>Logout</Typography>
            </MenuItem>
        </Menu>
    )
}

export default MobileAccountMenu