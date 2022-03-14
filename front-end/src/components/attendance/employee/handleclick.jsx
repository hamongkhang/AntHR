import React, { useState, useEffect } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from "@mui/system";
import { Divider,Typography } from "@mui/material";
import { IconButton, Popover } from "@mui/material";
import { withStyles } from '@material-ui/styles';


const HandleOption = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };


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

                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <Typography variant="body1">
                        &nbsp;
                        Revert
                    </Typography>
                </Box>

                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <Typography variant="body1">
                        &nbsp;
                        Approve
                    </Typography>
                </Box>
                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <Typography variant="body1">
                        &nbsp;
                        Confirm
                    </Typography>
                </Box>

                <Divider />
                <Box style={styles.option_dropdown_content_li} className={props.classes.hover_li}>
                    <Typography variant="body1">
                        &nbsp;
                        Reject
                    </Typography>
                </Box>
            </Popover>

        </>
    );
}

const styles = {
    option_dropbtn: {
        backgroundColor: '#989a9e',
        color: 'white',
        padding: '5px',
        fontSize: '4px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    option_dropdown_content_li: {
        color: 'black',
        padding: '5px 12px',
        display: 'block',
        cursor: 'pointer',
    },
    hover_li: {
        '&:hover': {
            backgroundColor: '#dedfe0',
        }
    },


}

export default withStyles(styles)(HandleOption);