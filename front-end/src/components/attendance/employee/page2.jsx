import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Backdrop } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import HandleOption from "./handleclick";
import HeaderEmployee from "./header";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    hide_border: {
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "&.MuiDataGrid-root	.MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#ffb74d",
        },
    },
});
const columns = [
    {
        field: "no", headerName: 'No.',
        editable: false,
        sortable: false,
        width: 80,
    },
    {
        field: 'name', headerName: "Employee's name",
        editable: false,
        width: 300,
        renderCell: (params) => {
            return (
                <>
                    <Avatar src={`${process.env.REACT_APP_FILE}/avatar/${params.row.avatar}`} />
                    &nbsp;{' '}
                    {params.row.name}
                </>
            );
        }
    },

    {
        field: 'work_schedule',
        headerName: 'Work Schedule',
        width: 200,
        editable: true,
        sortable: false,
    },
    {
        field: 'logged_time',
        headerName: 'Longged Time',
        width: 200,
        editable: true,
        sortable: false,
    },
    {
        field: 'paid_time',
        headerName: 'Paid Time',
        width: 200,
        editable: true,
        sortable: false,
    },
    {
        field: 'deficit',
        headerName: 'Deficit',
        width: 200,
        editable: true,
        sortable: false,
    },

    {
        field: '',
        headerName: '',
        sortable: false,
        width: 100,
        renderCell: (params) => {
            return (
                <>
                    <HandleOption id={params.row.user_id} />
                </>
            );
        },
    },
];

const rows = [
    { id: 1, name: 'khang ', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VVmS2rXsgDjK5zVJMIJINpFdxB3hP2h7HenrsVOWl7RgmFC9aAIGbRzPWkmc-EVETlE&usqp=CAU', clock_in: '-', clockInLocation: 'Jon', clock_out: 35, clockOutLocation: '-', work_schedule: '8h', logged_time: '0h', paid_time: '0h', deficit: '-8h' },
];

const EmployeeAttend = (props) => {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const $token = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false)
    const getAllAttendances = (id) => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + "/attendance/getAllAttendance", {
            method: "GET",
            headers: { "Authorization": `Bearer ` + $token }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setTableData(rows);
                    setLoading(false)

                }
                else {
                    data.attendances.map((a, index) => {
                        a.id = index;
                        a.no = index + 1;
                        a.work_schedule = a.work_schedule + 'h'
                    })
                    setTableData(data.attendances);
                    setLoading(false)
                }
            });
    };
    useEffect(() => {
        getAllAttendances();
    }, []);

    return (
        <>
            <Backdrop
                sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                sx={{ display: { xs: "block", md: "grid" } }}
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
            ></Box>
            <Box sx={{ width: '100%', bgcolor: 'background.secondary' }}>
                <HeaderEmployee />
                <Box sx={{ mr: 3, mt: 3, ml: 3, mb: 3 }}>
                    <Box style={styles.BoxHeader} sx={{ bgcolor: 'background.default' }}>
                        <NotificationsRoundedIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                        <Typography sx={{ pl: 1, pt: 0.5 }}>
                            You can only update the attendance record within the last 31 days.
                        </Typography>
                    </Box>

                    <Box style={styles.HeaderBody} sx={{ bgcolor: 'background.default' }}>
                        <Box sx={{ height: 500, width: '100%' }} >
                            <DataGrid
                                className={classes.hide_border}
                                rows={tableData}
                                columns={columns}
                                pageSize={7}
                                disableColumnMenu
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

const styles = {
    BoxHeader: {
        fontSize: 15,
        display: "flex",
        padding: "10px 24px",
        boxSizing: "inherit",
        border: "1px solid rgb(227 235 241)",
        borderRadius: "5px",
        marginTop: "2%",
        marginBottom: "2%",
    },
    HeaderBody: {
        width: "100%",
        display: "block",
        margin: "12px auto",
        overflowX: "auto",
        borderRadius: "5px",
    },
};

export default EmployeeAttend;
