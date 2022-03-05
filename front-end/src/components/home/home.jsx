import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Login from '../login';
import { ThemeProvider, Box } from '@mui/material';
import customTheme from "../../theme/customTheme";
import Header from "../Header";
import DrawerHeader from "../Header/DrawerHeader";
import useWindowDimensions from "../../config/windowDimensions";
import UserProfile from '../UserProfile';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const Home = (props) => {
    const { setReRender, checkLoggedIn } = props;
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (width > 900) {
            handleDrawerClose()
        }
        if(!checkLoggedIn){
            navigate('/login')
        }
    })
    return (
            <ThemeProvider theme={customTheme}>
            <Box sx={{ display: 'flex' }}>
                <Header
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                ></Header>
                <Main open={open} sx={{pt:10, px:5}}>
                    <DrawerHeader />
                    {/* routes path */}
                    <Routes>
                        <Route path="profile/*" element={<UserProfile />} />
                    </Routes>
                </Main>
            </Box>
        </ThemeProvider>
    );
}

export default Home;