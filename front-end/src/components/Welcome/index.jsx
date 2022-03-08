import { Box, Button, Card, Paper, Typography, ThemeProvider, Avatar } from '@mui/material'
import React from 'react'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import customIconColor from '../../theme/customIconColor';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()
    const navigateLogin = () =>{
        navigate('/login')
    }
    return (
        <ThemeProvider theme={customIconColor}>
            <Box sx={{ minHeight: '100vh', position: 'relative', background:`url(${process.env.REACT_APP_FILE}/background/background_1.png)` }}>
                <Avatar variant='square' 
                sx={{
                    height: 100, width: 100, 
                    position:'absolute', 
                    top:'3%', left:'2%'}} 
                    src={`${process.env.REACT_APP_FILE}/logo/logo1.png`}>
                </Avatar>
                <Card elevation={0} sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 320,
                    minWidth: 512,
                    background: 'transparent'
                }} >
                    <Typography sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 60%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                        fontSize={60}
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
                        color={'white'}>
                        The choice couldn't be better
                    </Typography>
                    <Button variant='contained'
                        sx={{
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 60%)',
                            position: 'absolute',
                            top:{xs:'90%', md:'60%'} , left: '50%',
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
                    opacity: '80%',
                    display:{md:'block',sm:'none', xs:'none'}
                }} >
                    <SupervisorAccountIcon color='primary' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 80
                    }}></SupervisorAccountIcon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '80%', left: '60%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 220,
                    minWidth: 220,
                    opacity: '90%',
                    display:{md:'block',sm:'none', xs:'none'}
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
                    minWidth: 150,
                    opacity: '70%',
                    display:{md:'block',sm:'none', xs:'none'}
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
                    top: '60%', left: '25%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 250,
                    minWidth: 250,
                    opacity: '90%',
                    display:{md:'block',sm:'none', xs:'none'}
                }} >
                    <PlagiarismIcon color='info' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 160
                    }}></PlagiarismIcon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '15%', left: '60%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 80,
                    minWidth: 80,
                    opacity: '70%',
                    display:{md:'block',sm:'none', xs:'none'}
                }} >
                    <EmojiEventsIcon color='warning' sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: "translate(-50%, -50%);",
                        fontSize: 70
                    }}></EmojiEventsIcon>
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '80%', left: '40%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 70,
                    minWidth: 70,
                    opacity: '50%',
                    display:{md:'block',sm:'none', xs:'none'}
                }} >
                </Card>
                <Card elevation={5} sx={{
                    position: 'absolute',
                    top: '5%', left: '45%',
                    transform: "translate(-50%, -50%);",
                    minHeight: 50,
                    minWidth: 50,
                    opacity: '50%',
                    display:{md:'block',sm:'none', xs:'none'}
                }} >
                </Card>
            </Box>
        </ThemeProvider>
    )
}

export default Welcome