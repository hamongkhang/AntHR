import React, { useState, useEffect } from "react";
import {Tab, Grid, Tabs, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/styles";
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import MyAttend from "./myattendance/page1";
import EmployeeAttend from "./employee/page2";


const useStyles = makeStyles(theme => ({
    tabRoot: {
        "& .MuiTabs-indicator": {
            backgroundColor: "#86e681",
        },
    },
    tabTwo: {
        "&.Mui-selected.MuiTab-root": {
            color: "#17bd4b",
        },
    },

}));



const Attendance = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function TabPanel(props) {
        const { children, value, index } = props;

        return (
            <>
                {value === index &&
                    <Box style={styles.blockBox}>
                        <Box sx={{width: '100%', bgcolor:'background.secondary'}}>
                            {children}
                        </Box>
                    </Box>
                }
            </>
        );
    }

    return (
        <>
            <Box style={styles.Boxheader}>
                <Grid container spacing={2} sx={{ borderBottom: 1, borderColor: 'divider'}} style={styles.BoxShadow}>
                    <Grid item xs={3} sx={{ mt: 1 }}>
                        <Typography variant="h6" style={styles.headerText}>
                            <AccessAlarmRoundedIcon />&nbsp;{' '}  Attendance
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box style={styles.tabText}>
                            <Tabs value={value} onChange={handleChange} className={classes.tabRoot} >
                                <Tab className={classes.tabTwo} label="My ATTENDANCE" />
                                <Tab className={classes.tabTwo} label="EMPLOYEE ATTENDANCE" />
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={3} sx={{ mt: 1 }}>
                        <Typography variant="h6" style={styles.headerText}>
                            Attendance
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <TabPanel value={value} index={0}>
                <MyAttend />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EmployeeAttend />
            </TabPanel>
        </>
    );
}

const styles = {
    Boxheader:{
        zIndex:3,
        width:'100%', 
        position:'fixed',
        backgroundColor:'rgb(255 255 255)',
    },
    BoxShadow:{
        boxShadow: "1px 1px 3px #f0e9e9"
    },

    headerText: {
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgb(60 82 100)',
    },
    tabText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockBox: {
        display: 'flex',
        justifyContent: 'center',
    },
}

export default Attendance;




