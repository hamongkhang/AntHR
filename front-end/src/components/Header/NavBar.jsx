import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Badge, Container, Toolbar, Typography, IconButton, Box, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from '@mui/icons-material/MoreVert';
import useWindowDimensions from "../../config/windowDimensions";
import AccountMenu from "./AccountMenu";
import MobileAccountMenu from "./MobileAccountMenu";
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotifyMenu from "./NotifyMenu";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBar = (props) => {
    const { handleDrawerOpen, tabs } = props;
    const [render, setRender] = React.useState(false)
    const [tab, setTab] = React.useState(tabs[0].value);
    const [tabMenus, setTabMenus] = React.useState(tabs[0].child);
    const [tabMenu, setTabMenu] = React.useState({
        value: 'manage-employees',
        path: 'employees/manage-employees'
    });
    const { width } = useWindowDimensions();
    const navigate = useNavigate();

    const [anchorElNotify, setAnchorElNotify] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpenNotify = Boolean(anchorElNotify);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const role = localStorage.getItem('role');
    const handleChangeTab = (event, newPath) => {
        setTab(newPath);
        let t = tabs.find(tab => (tab.value == newPath))
        setTabMenus(t ? t.child : [])
        if (t.child.length > 0) {
            setTabMenu(t.child[0])
        }
        else {
            setTabMenu({ value: '', path: '' })
        }
    };
    const handleChangeMenu = (e, newPath) => {
        let t = tabMenus.find(tab => (tab.value == newPath))
        setTabMenu(t ? t : { value: '', path: '' })
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotifyMenuOpen = (event) => {
        setAnchorElNotify(event.currentTarget);
    };
    const handleNotifyMenuClose = (event) => {
        setAnchorElNotify(null);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        let $token = localStorage.getItem('access_token')
        const requestOptions = {
            method: 'POST',
            headers: { "Authorization": `Bearer ` + $token }
        };
        fetch(process.env.REACT_APP_API + '/user/logout', requestOptions)
            .then((res) => res.json())
            .then((json) => {
            });
        localStorage.clear();
        navigate('/')
    }
    const [notify, setNotify] = React.useState([]);
    const getNotify = () => {
        fetch(process.env.REACT_APP_API + "/notify/getNotify", {
            method: "GET",
            headers: { Authorization: `Bearer ` + localStorage.getItem('access_token') },
        })
            .then((response) => response.json())
            .then((data) => {
                setNotify(data.data.reverse());
            });
    };
    const deleteNotify = (id) => {
        fetch(process.env.REACT_APP_API + "/notify/destroyNotify/" + id, {
            method: "DELETE",
            headers: { Authorization: `Bearer ` + localStorage.getItem('access_token') },
        })
            .then((response) => response.json())
            .then((data) => {
                setRender(!render);
            });
    }
    useEffect(() => {
        getNotify();
        if (width < 900) {
            setAnchorEl(null);
        }
        else if (width > 900) {
            setMobileMoreAnchorEl(null);
        }
    }, [render])
    return (
        <>
            <AppBar position="fixed" open={props.open} color='secondary'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(props.open && { display: 'none' }) }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            <Avatar variant='square'
                                sx={{ height: 50, width: 50 }}
                                src={`${process.env.REACT_APP_FILE}/logo/logo1.png`}
                                component={Link} to='/home'>
                            </Avatar>
                        </Typography>


                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <Avatar variant='square'
                                sx={{ height: 50, width: 50 }}
                                src={`${process.env.REACT_APP_FILE}/logo/logo1.png`}
                                component={Link} to='/home'>
                            </Avatar>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tabs value={tab} onChange={handleChangeTab} textColor='primary' indicatorColor='primary' TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}>
                                {
                                    tabs.map((tab) => {
                                        if (role == 1) {
                                            return (
                                                <Tab key={tab.value} value={tab.value} label={tab.value} to={`${tab.value}`} component={Link}
                                                    sx={{ color: 'white', fontWeight: '600', display: 'block' }}
                                                ></Tab>
                                            )
                                        }
                                        else {
                                            if (tab.value != 'employees') {
                                                return (
                                                    <Tab key={tab.value} value={tab.value} label={tab.value} to={`${tab.value}`} component={Link}
                                                        sx={{ color: 'white', fontWeight: '600', display: 'block' }}
                                                    ></Tab>
                                                )
                                            }
                                        }
                                    }

                                    )
                                }
                            </Tabs>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                color="inherit"
                                sx={{ display: role == 1 ? 'block' : 'none' }}
                                component={Link} to='/home/company'>
                                <ApartmentIcon sx={{ mb: '8px' }} />
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                aria-controls={'notifyMenu'}
                                onClick={handleNotifyMenuOpen}
                            >
                                <Badge badgeContent={notify.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar
                                    src={
                                        !localStorage.getItem('avatar') ? process.env.REACT_APP_FILE + '/avatar/avatar.png'
                                            :
                                            localStorage.getItem('avatar').search('https://') != -1 ?
                                                localStorage.getItem('avatar')
                                                :
                                                process.env.REACT_APP_FILE + '/avatar/' + localStorage.getItem('avatar')

                                    }
                                    sx={{ width: 24, height: 24 }} variant='circular'>
                                </Avatar>
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

                </Container>
                <Toolbar disableGutters sx={{ backgroundColor: 'white' }}>
                    <Box sx={{ ml: 5 }}>
                        <Typography sx={{
                            display: window.location.pathname.search('profile') != -1 ? 'block' : 'none',
                            color: 'rgb(60, 82, 100)',
                            fontSize: 25, fontWeight: 600
                        }}>Profile</Typography>
                        <Typography sx={{
                            display: window.location.pathname.search('employees/detail') != -1 ? 'block' : 'none',
                            color: 'rgb(60, 82, 100)',
                            fontSize: 25, fontWeight: 600
                        }}>Information</Typography>
                        <Typography sx={{
                            display: window.location.pathname.search('/company') != -1 ? 'block' : 'none',
                            color: 'rgb(60, 82, 100)',
                            fontSize: 25, fontWeight: 600
                        }}>Company Information</Typography>
                        <Typography sx={{
                            display: window.location.pathname == '/home' ? 'block' : 'none',
                            color: 'rgb(60, 82, 100)',
                            fontSize: 25, fontWeight: 600
                        }}>Dashboard</Typography>
                    </Box>
                    <Box justifyContent='space-around' sx={{
                        width: 1,
                        display:
                            window.location.pathname.search('profile') != -1 ||
                                window.location.pathname.search('employees/detail') != -1 ||
                                window.location.pathname.search('/company') != -1 ||
                                window.location.pathname == '/home' ? 'none' : 'flex',
                    }}>
                        <Tabs value={tabMenu.value} onChange={handleChangeMenu}>
                            {
                                tabMenus.map(child => (
                                    <Tab key={child.value} label={child.value} value={child.value} to={child.path} component={Link} />
                                )
                                )
                            }
                        </Tabs>
                    </Box>

                </Toolbar>
            </AppBar>
            <AccountMenu
                menuId={menuId}
                isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
                anchorEl={anchorEl}
                handleLogout={handleLogout} />
            <MobileAccountMenu
                mobileMenuId={mobileMenuId}
                isMobileMenuOpen={isMobileMenuOpen}
                handleMobileMenuClose={handleMobileMenuClose}
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                handleLogout={handleLogout} />
            <NotifyMenu
                menuId={'notifyMenu'}
                isMenuOpen={isMenuOpenNotify}
                handleMenuClose={handleNotifyMenuClose}
                anchorEl={anchorElNotify}
                notify={notify}
                setNotify={setNotify}
                deleteNotify={deleteNotify} />
        </>
    )
}
export default NavBar;