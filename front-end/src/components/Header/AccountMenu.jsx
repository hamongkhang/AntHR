import React from 'react'
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from 'react-router-dom';

const AccountMenu = (props) => {
    const { menuId } = props
    const { isMenuOpen } = props
    const { handleMenuClose } = props
    const { anchorEl } = props
    const { handleLogout } = props
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
                    display:'flex',
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
                <IconButton
                    size="small"
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
                    size="small"
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

export default AccountMenu