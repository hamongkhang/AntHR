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
    const tabs = [
        {
            value:'employees',
            child:[
                {
                    value:'manage-employees',
                    path:'employees/manage-employees'
                },
                {
                    value:'directory',
                    path:'employees/directory'
                }
                
            ]
        },
        {
            value:'attendance',
            child:[
                {
                    value:'my-attendance',
                    path:'attendance/my-attendance'
                },
                {
                    value:'employees-attendance',
                    path:'attendance/employees-attendance'
                }
                
            ]
        },
        {
            value:'documents',
            child:[
            ]
        },
        {
            value:'news',
            child:[
            ]
        },
    ];
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