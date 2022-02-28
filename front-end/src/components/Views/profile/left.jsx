import React from "react";
import { Box, Typography } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { Divider } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const LeftProfile = () => {

    const styles = {
        styledInfor: {
            borderRadius: 10,
            border: '1px solid rgb(255 255 255)',
            gap: 1,
            paddingTop: 0,
            backgroundColor: 'rgb(255 255 255)',
            margin: 15,
        },

        cardMedia: {
            width: '150px',
            height: '150px',
            marginTop:'25px'
        },
        headBox:{
            marginLeft: '25px',
        },

        headerName: {
            fontWeight: 600,
        },
        styleDivider:{
            backgroundColor: 'rgb(235 240 244)',
            width: '80%',
            borderBottomWidth: 2
        }
    }

    return (
        <>
            <div style={styles.styledInfor}>
                <Box  style={styles.headBox}>
                    <CardHeader
                        avatar={
                            <Avatar
                                style={styles.cardMedia}
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU'
                                alt='Avatar'
                            >
                            </Avatar>
                        }
                    />
                    <Typography style={styles.headerName}>
                        Tran Phat
                    </Typography>
                    <Typography sx={{lineHeight:3}}>
                       CEO / Owner / Founder 
                    </Typography>
                    <Divider style={styles.styleDivider}/>
                    <EmailOutlinedIcon />
                </Box>
            </div>
        </>
    );
}

export default LeftProfile;