import React from "react";
import { styled } from '@mui/material/styles';
import NavBar from "./NavBar";
import DrawerLeft from "./DrawerLeft";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Header = (props) => {
    const { open } = props;
    const { handleDrawerOpen } = props;
    const { handleDrawerClose } = props;
    const tabs = ['page1', 'page2'];
    return (
        <>
            <NavBar
                open={open}
                tabs={tabs}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}>
            </NavBar>
            <DrawerLeft
                open={open}
                tabs={tabs}
                handleDrawerClose={handleDrawerClose}
                DrawerHeader={DrawerHeader}>
            </DrawerLeft>
        </>
    )
}
export default Header;