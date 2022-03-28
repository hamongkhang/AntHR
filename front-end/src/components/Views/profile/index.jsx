import React from "react";
import { Box} from "@mui/system";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import LeftProfile from "./left";

const Profile = () => {
    const styles = {
        styleContainer: {
            width: '90%',
            margin:'auto',
        },
        styleGrid:{
            margin:'18px',
        }
  
    }

    return (
        <>
            <div style={styles.styleContainer}>
                <Box sx={{ flexGrow: 1, mt:5, bgcolor:'rgb(227 235 241)' }}>
                    <Grid  container spacing={2} style={styles.styleGrid}>
                        <Grid item xs={3.5} sx={{ mt:2, mb:4}}>
                            <LeftProfile />
                        </Grid>
                        <Grid item xs={7}>
                           <Typography>
                                haha
                            </Typography>         
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Profile;