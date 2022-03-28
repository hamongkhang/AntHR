import React, { useState, useEffect } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Divider, Typography, Dialog, Box, DialogContent, DialogActions, Button } from "@mui/material";
import { IconButton, Popover } from "@mui/material";
import { withStyles } from '@material-ui/styles';
import RestoreIcon from '@mui/icons-material/Restore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    hide_border: {
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "&.MuiDataGrid-root	.MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#ff9900",
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
        field: 'date',
        headerName: 'Date',
        width: 180,
        editable: true,
        sortable: false,
    },
    {
        field: 'clock_in',
        headerName: 'Clock In',
        width: 150,
        sortable: false,
    },
    {
        field: 'clock_out',
        headerName: 'Clock Out',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'work_schedule',
        headerName: 'Work Schedule',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'logged_time',
        headerName: 'Longged Time',
        width: 150,
        editable: true,
        sortable: false,
    },
    {
        field: 'paid_time',
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
        field: 'note',
        headerName: 'Note',
        width: 250,
        editable: true,
        sortable: false,
    },
];

const rows = [
    { id: 1, clock_in: '-', clockInLocation: 'Jon', clock_out: 35, clockOutLocation: '-', work_schedule: '8h', logged_time: '0h', paid_time: '0h', deficit: '-8h' },
];
const HandleOption = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [tableData, setTableData] = useState([]);
    const $token = localStorage.getItem('access_token');



    const getOneAttendance = () => {
        const _formData = new FormData();
        _formData.append('user_id', props.id);
        fetch(process.env.REACT_APP_API + "/attendance/getOneAttendance", {
            method: "POST",
            headers: { "Authorization": `Bearer ` + $token },
            body: _formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setTableData(rows);

                }
                else {
                    data.attendances.map((a, index) => {
                        a.no = index + 1
                        let clock_in = new Date(a.clock_in)
                        let str = clock_in.getHours() + 'h ' + clock_in.getMinutes() + 'm'
                        a.clock_in = str
                        let date = new Date(a.date)
                        a.date = date.toDateString()
                        if (a.clock_out == null) {
                            a.clock_out = '-'
                        }
                        else {
                            let clock_out = new Date(a.clock_out)
                            str = clock_out.getHours() + 'h ' + clock_out.getMinutes() + 'm'
                            a.clock_out = str
                        }
                        a.logged_time == '' ? a.logged_time = '0h' : a.logged_time = a.logged_time
                        a.paid_time == '' ? a.paid_time = '0h' : a.paid_time = a.paid_time
                        a.deficit == '' ? a.deficit = '0h' : a.deficit = a.deficit
                        a.work_schedule = '8h'
                    })
                    setTableData(data.attendances);
                }
            });
    };

    const handleChange = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleClickClose = () => {
        setOpenModal(false);
    };
    useEffect(() => {
        getOneAttendance()
    }, [])
    return (
        <>
            <IconButton aria-describedby={id} variant="contained" style={styles.option_dropbtn} onClick={handleChange}>
                <MoreHorizIcon />
            </IconButton>
            <Popover
                sx={{ mt: 0.5 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box style={styles.option_dropdown_content_li} onClick={handleClickOpen} className={props.classes.hover_li}>
                    <SearchIcon />
                    <Typography variant="body1">
                        &nbsp;
                        Detail
                    </Typography>
                </Box>
                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <RestoreIcon />
                    <Typography variant="body1">
                        &nbsp;
                        Revert
                    </Typography>
                </Box>

                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <CheckIcon />
                    <Typography variant="body1">
                        &nbsp;
                        Approve
                    </Typography>
                </Box>
                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <CheckIcon />
                    <Typography variant="body1">
                        &nbsp;
                        Confirm
                    </Typography>
                </Box>

                <Box
                    style={styles.option_dropdown_content_li}
                    className={props.classes.hover_li}
                >
                    <CheckIcon />
                    <Typography variant="body1">&nbsp; Approve</Typography>
                </Box>
                <Box
                    style={styles.option_dropdown_content_li}
                    className={props.classes.hover_li}
                >
                    <CheckIcon />
                    <Typography variant="body1">&nbsp; Confirm</Typography>
                </Box>
                <Dialog
                    open={openModal}
                    fullScreen
                    onClose={handleClickClose}
                    aria-labelledby="draggable-dialog-title"
                    sx={{ p: 3 }}
                >
                    <DialogContent>
                        <Box
                            sx={{
                                height: 475,
                                width: "100%",
                                mt: 4,
                            }}
                        >
                            <DataGrid
                                className={classes.hide_border}
                                rows={tableData}
                                columns={columns}
                                pageSize={7}
                                disableColumnMenu
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#AEB6BF ', color: 'white', '&:hover': { backgroundColor: '#808B96' }, mb: 2, mr: 2 }}
                            onClick={handleClickClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Popover>
        </>
    );
}

const styles = {
    option_dropbtn: {
        backgroundColor: "#989a9e",
        color: "white",
        padding: "5px",
        fontSize: "4px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    option_dropdown_content_li: {
        color: "black",
        padding: "5px 12px",
        display: "flex",
        cursor: "pointer",
    },
    hover_li: {
        "&:hover": {
            backgroundColor: "#dedfe0",
        },
    },
};

export default withStyles(styles)(HandleOption);
