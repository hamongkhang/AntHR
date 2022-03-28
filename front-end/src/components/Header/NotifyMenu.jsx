import React from 'react';
import { Menu, MenuItem, Divider, Typography, Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';

const NotifyMenu = (props) => {
    const { menuId, isMenuOpen, handleMenuClose, anchorEl, notify, deleteNotify } = props;
    
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
            <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: "16px", lineHeight: "25px", fontWeight: 600, color: "black" }}>Documents</Typography>
            </Box>

            <Box sx={{ overflowY: 'scroll', maxHeight: '110px', '&::-webkit-scrollbar': {display:'none'} }}>
                {
                    notify.map((n) => {
                        if (n.category == 2) {
                            return (
                                <MenuItem key={n.id}>
                                    <Box sx={{ textAlign: "left", width: 300 }}>
                                        <Typography sx={{ fontSize: "16px", lineHeight: "25px", color: "black", textOverflow: 'ellipsis' }} noWrap>{n.title}</Typography>
                                        <Typography sx={{ fontSize: "12px", lineHeight: "20px", alignItems: "center", color: "rgb(101, 114, 131)" }}>{n.content}</Typography>
                                    </Box>
                                    <Button onClick={() => deleteNotify(n.id)} sx={{ textAlign: "center", width: 50, lineHeight: '45px' }}>
                                        <DeleteOutlineOutlinedIcon color='error'></DeleteOutlineOutlinedIcon>
                                    </Button>
                                </MenuItem>
                            )
                        }
                    })
                }
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: "16px", lineHeight: "25px", fontWeight: 600, color: "black" }}>News</Typography>
            </Box>
            <Box sx={{ overflowY: 'scroll', maxHeight: '110px', '&::-webkit-scrollbar': {display:'none'}}}>
                {
                    notify.map((n) => {
                        if (n.category == 1) {
                            return (
                                <MenuItem key={n.id}>
                                    <Box sx={{ textAlign: "left", width: 300 }}>
                                        <Typography sx={{ fontSize: "16px", lineHeight: "25px", color: "black" }}>{n.title}</Typography>
                                        <Typography sx={{ fontSize: "12px", lineHeight: "20px", alignItems: "center", color: "rgb(101, 114, 131)" }}>{n.content}</Typography>
                                    </Box>
                                    <Button onClick={() => deleteNotify(n.id)} sx={{ textAlign: "center", width: 50, lineHeight: '45px' }}>
                                        <DeleteOutlineOutlinedIcon color='error'></DeleteOutlineOutlinedIcon>
                                    </Button>
                                </MenuItem>
                            )
                        }
                    })
                }
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: "16px", lineHeight: "25px", fontWeight: 600, color: "black" }}>Other Notifications</Typography>
            </Box>
            <Box sx={{ overflowY: 'scroll', maxHeight: '110px', '&::-webkit-scrollbar': {display:'none'} }}>
                {
                    notify.map((n) => {
                        if (n.category == 3) {
                            return (
                                <MenuItem key={n.id}>
                                    <Box sx={{ textAlign: "left", width: 300 }}>
                                        <Typography sx={{ fontSize: "16px", lineHeight: "25px", color: "black" }}>{n.title}</Typography>
                                        <Typography sx={{ fontSize: "12px", lineHeight: "20px", alignItems: "center", color: "rgb(101, 114, 131)" }}>{n.content}</Typography>
                                    </Box>
                                    <Button onClick={() => deleteNotify(n.id)} sx={{ textAlign: "center", width: 50, lineHeight: '45px' }}>
                                        <DeleteOutlineOutlinedIcon color='error'></DeleteOutlineOutlinedIcon>
                                    </Button>
                                </MenuItem>
                            )
                        }
                    })
                }
            </Box>
        </Menu>
    )
}

export default NotifyMenu