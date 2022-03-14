import React,{useState, useEffect}from "react";
import { Box } from "@mui/system";
import {Typography } from "@mui/material";
import HeaderEmployee from "./header";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { DataGrid } from "@mui/x-data-grid";
import HandleOption from "./handleclick";
import { makeStyles } from '@material-ui/core/styles';
import zIndex from "@mui/material/styles/zIndex";


const useStyles = makeStyles({
    hide_border: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none',
        },
    }
});

const columns = [
    {
        field: 'name', headerName: 'Name',
        editable: true,
        width: 150
    },
    {
        field: 'clockIn',
        headerName: 'Clock In',
        width: 100,
        sortable: false,
    },
    {
        field: 'clockInLocation',
        headerName: 'Clock In Location',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'clockOut',
        headerName: 'Clock Out',
        width: 110,
        editable: true,
        sortable: false,
    },
    {
        field: 'clockOutLocation',
        headerName: 'Clock Out Location',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'workSchedule',
        headerName: 'Work Schedule',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'longgedTime',
        headerName: 'Longged Time',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'paidTime',
        headerName: 'Paid Time',
        width: 150,
        editable: true,
        sortable: false,
    },

    {
        field: 'deficit',
        headerName: 'Deficit',
        width: 150,
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
                    <HandleOption />
                </>
            );
        },
    },
];

const rows = [
    { id: 1, name: 'khang ', clockIn: '-', clockInLocation: 'Jon', clockOut: 35, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 2, name: 'hang ', clockIn: '-', clockInLocation: 'Cersei', clockOut: 42, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 3, name: 'quan', clockIn: '-', clockInLocation: 'Jaime', clockOut: 45, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 4, name: 'sang', clockIn: '-', clockInLocation: 'Arya', clockOut: 16, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 5, name: 'phat', clockIn: '-', clockInLocation: 'Daenerys', clockOut: null, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 6, name: 'huan', clockIn: '-', clockInLocation: null, clockOut: 150, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 7, name: 'huhu', clockIn: '-', clockInLocation: 'Ferrara', clockOut: 44, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },
    { id: 8, name: 'hihi', clockIn: '-', clockInLocation: 'Ferrara', clockOut: 44, clockOutLocation: '-', workSchedule: '8h', longgedTime: '0h', paidTime: '0h', deficit: '-8h' },

];


const EmployeeAttend = (props) => {
    const classes = useStyles();

    const [tableData, setTableData] = useState([]);

    useEffect (()=>{
      setTableData(rows);

    },[]);

    return (
        <>
            <HeaderEmployee />
            <Box sx={{ mr: 3,mt:20, ml: 3,mb:3}}>
                <Box style={styles.BoxHeader} sx={{ bgcolor: 'background.default' }}>
                    <NotificationsRoundedIcon style={{ color: 'rgb(255 192 0)', fontSize: 30 }} />
                    <Typography sx={{ pl: 1, pt: 0.5 }}>
                        You can only update the attendance record within the last 31 days.
                    </Typography>
                </Box>

                <Box style={styles.HeaderBody} sx={{ bgcolor: 'background.default' }}>
                    <Box sx={{ height: 475, width: '100%' }} >
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
        </>
    );
}

const styles = {
    BoxHeader: {
        fontSize: 15,
        display: 'flex',
        padding: '10px 24px',
        boxSizing: 'inherit',
        border: '1px solid rgb(227 235 241)',
        borderRadius: '5px',
        marginTop: '10%',
        marginBottom: '2%',
    },
    HeaderBody: {
        width: '100%',
        display: 'block',
        margin: '12px auto',
        overflowX: 'auto',
        borderRadius: '5px',
    },
    // hide_border: {
    //     '&: .MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
    //         outline: 'none !important',
    //     }
    // }
}

export default EmployeeAttend;