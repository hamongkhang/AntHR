import { Box, Button, Card, Paper, Typography, ThemeProvider } from '@mui/material'
import React from 'react'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import RedeemIcon from '@mui/icons-material/Redeem';
import customIconColor from '../../theme/customIconColor';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()
    const navigateLogin = () =>{
        navigate('/login')
    }
    return (
        <ThemeProvider theme={customIconColor}>
            <Box sx={{ minHeight: '100vh', position: 'relative' }}>
                <Card elevation={0} sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 412,
                    minWidth: 512
                }} >
                    <Typography sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 60%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                        fontSize={46}
                        fontWeight={700}
                        fontFamily={'revert'}
                        textAlign={'center'}>
                        Welcome to AntHR
                    </Typography>
                    <Typography sx={{ mt: 2 }}
                        fontSize={27}
                        fontWeight={500}
                        fontFamily={'revert'}
                        textAlign={'center'}
                        color={'GrayText'}>
                        The choice couldn't be better
                    </Typography>
                    <Button variant='contained'
                        sx={{
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 60%)',
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: "translate(-50%, -50%);",
                            color:'white'
                        }} onClick={()=>navigateLogin()}>
                        Let's Started
                    </Button>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '15%', left: '30%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 120,
                    minWidth: 120,
                    textAlign: 'center',
                }} >
                    <RedeemIcon color='primary' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 80
                    }}></RedeemIcon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '60%', left: '25%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 220,
                    minWidth: 220,
                    textAlign: 'center',
                }} >
                    <QrCode2Icon color='secondary' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 160
                    }}></QrCode2Icon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '30%', left: '75%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 150,
                    minWidth: 150
                }} >
                    <TrackChangesIcon color='error' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 100
                    }}>
                    </TrackChangesIcon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '80%', left: '60%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 250,
                    minWidth: 250
                }} >
                    <PlagiarismIcon color='info' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 160
                    }}></PlagiarismIcon>
                </Card>
            </Box>
        </ThemeProvider>
    )
}

export default Welcome