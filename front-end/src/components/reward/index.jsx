import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const  Commendation=(props)=>{
    const $token=localStorage.getItem('access_token');
    const [render, setRender] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if($token){
        }else{
           navigate('/home');
        }
    }, [render])
    return (
    <Box 
      sx={{
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: "100%",
        height: '100vh',
        borderRadius: '5px',
        padding: "24px",
    }}>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            <Grid item xs={4} sm={8} md={12}>
                <Typography 
                    sx={{ 
                        fontWeight:"bold",
                        color:"#ff9900"
                    }} 
                    variant="h4"
                >
                    Internal reward portal
                </Typography> 
                <Typography 
                    sx={{ 
                        color:"rgb(35, 54, 78)"
                    }} 
                >
                    Appreciate the positive contributions of your colleagues here!
                </Typography> 
            </Grid>
            {/* <Grid item xs={4} sm={8} md={12}>
                <Typography 
                    sx={{ 
                        color:"rgb(35, 54, 78)"
                    }} 
                >
                    Appreciate the positive contributions of your colleagues here!
                </Typography> 
            </Grid> */}
        </Grid>        
    </Box>
    );
}

export default Commendation;