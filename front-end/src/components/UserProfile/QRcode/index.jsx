import React from 'react'
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import QRcode from '../../dashboard/QRcode';

const QREmployee = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ m: 5, display: 'flex' }} justifyContent='center'>
                    <Button variant="contained" onClick={handleClickOpen}
                        sx={{ mt: 3 }}>
                        <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 500, color: 'white' }}>
                            Show QR code
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                sx={{ p: 3 }}
            >
                <DialogTitle id="draggable-dialog-title">
                    QRCode
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your QR code is:
                    </DialogContentText>
                    <QRcode></QRcode>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#AEB6BF ', color: 'white', '&:hover': { backgroundColor: '#808B96' }, mb: 2, mr: 2 }}
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default QREmployee