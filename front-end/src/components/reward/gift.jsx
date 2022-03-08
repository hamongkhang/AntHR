import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Button } from '@mui/material';

const  Gift=(props)=>{
    return (
    <Box 
      sx={{
      maxWidth:"100%",
      height:'100%',
      padding:"20px",
    }}>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
        >
            {/* {
                directories.length?
                    directories.map((item,index)=>{
                        return( */}
                        <Grid item xs={4} sm={8} md={12}>
                            <Box
                                sx={{
                                    padding: "10px",
                                    marginRight:"10px",
                                    marginBottom:"10px",
                                    textAlign:'center',
                                    alignItems:"center"
                                }}
                            > 
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                >
                                    <Grid item xs={1} sm={2} md={4}  display={{ xs: "none", md: "block", sm: "none"}}></Grid>
                                    <Grid item xs={1} sm={2} md={1}>
                                        <img 
                                            style={{
                                                height: "70px",
                                                width: "70px",
                                                objectFit: 'cover',
                                                borderRadius: "100%",
                                                marginBottom:"5px",
                                                border:"2px solid #e65100",
                                                backgroundColor:"#ffb74d"
                                            }} 
                                            // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                            src={process.env.REACT_APP_FILE+'/reward/gold.png'}>
                                        </img>
                                        <Typography
                                            sx={{
                                                color: "rgb(35, 54, 78)",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            All gifts
                                        </Typography>
                                    </Grid><Grid item xs={1} sm={2} md={1}>
                                        <img 
                                            style={{
                                                height: "70px",
                                                width: "70px",
                                                objectFit: 'cover',
                                                borderRadius: "100%",
                                                marginBottom:"5px",
                                                border:"2px solid #e65100",
                                                backgroundColor:"#ffb74d"
                                            }} 
                                            // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                            src={process.env.REACT_APP_FILE+'/reward/food.png'}>
                                        </img>
                                        <Typography
                                            sx={{
                                                color: "rgb(35, 54, 78)",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Food
                                        </Typography>
                                    </Grid><Grid item xs={1} sm={2} md={1}>
                                        <img 
                                            style={{
                                                height: "70px",
                                                width: "70px",
                                                objectFit: 'cover',
                                                borderRadius: "100%",
                                                marginBottom:"5px",
                                                border:"2px solid #e65100",
                                                backgroundColor:"#ffb74d"
                                            }} 
                                            // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                            src={process.env.REACT_APP_FILE+'/reward/gift.png'}>
                                        </img>
                                        <Typography
                                            sx={{
                                                color: "rgb(35, 54, 78)",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Artifacts
                                        </Typography>
                                    </Grid><Grid item xs={1} sm={2} md={1}>
                                        <img 
                                            style={{
                                                height: "70px",
                                                width: "70px",
                                                objectFit: 'cover',
                                                borderRadius: "100%",
                                                marginBottom:"5px",
                                                border:"2px solid #e65100",
                                                backgroundColor:"#ffb74d"
                                            }} 
                                            // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                            src={process.env.REACT_APP_FILE+'/reward/vourcher.png'}>
                                        </img>
                                        <Typography
                                            sx={{
                                                color: "rgb(35, 54, 78)",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Voucher
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} sm={2} md={4} display={{ xs: "none", md: "block", sm: "none"}}></Grid>
                                </Grid>
                            </Box>
                        <Grid item xs={4} sm={8} md={12}>
                            <Box
                                sx={{
                                    padding: "10px",
                                    marginRight:"10px",
                                    marginBottom:"10px",
                                    textAlign:'center',
                                    alignItems:"center"
                                }}
                            > 
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 9, md: 12 }}
                                >
                                    <Grid item xs={4} sm={3} md={3}>
                                    <Box
                                    sx={{
                                        backgroundColor:"white",
                                        boxShadow: 'rgb(95 125 149 / 7%) 0px 4px 13px 0px',
                                        border:"1px solid rgb(235, 240, 244)",
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        width: "100%",
                                        borderRadius: '5px',
                                        padding: "24px",
                                    }}
                                > 
                                    <img 
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            fontWeight:"bold",
                                            color:"rgb(35, 54, 78)"
                                        }} 
                                        variant="h6"
                                    >
                                      Bún thịt nướng thơm ngon nứt mũi
                                    </Typography> 
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)"
                                        }} 
                                    >
                                      500.000 đồng
                                    </Typography>    
                                    <Typography 
                                        sx={{ 
                                            fontWeight: "bold",
                                            fontSize: "24px",
                                            lineheight: "20px",
                                            color:"red",
                                        }} 
                                    >
                                        500 points
                                    </Typography> 
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)"
                                        }} 
                                    >
                                       Đây là tô bún được bán ở chợ bà chiểu
                                    </Typography>    
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"#FFFF66", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Receive
                                    </Button>
                                </Box> 
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        </Grid>
                            {/* <Grid item xs={2} sm={3} md={3}>
                                <Box
                                    sx={{
                                        backgroundColor:"white",
                                        boxShadow: 'rgb(95 125 149 / 7%) 0px 4px 13px 0px',
                                        border:"1px solid rgb(235, 240, 244)",
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        width: "100%",
                                        borderRadius: '5px',
                                        padding: "24px",
                                    }}
                                > 
                                    <img 
                                        style={{
                                            height: "70px",
                                            width: "70px",
                                            objectFit: 'cover',
                                            borderRadius: "100%",
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            fontWeight:"bold",
                                            color:"rgb(35, 54, 78)"
                                        }} 
                                        variant="h6"
                                    >
                                       sssss ssss sssssss sssss sssss ss
                                    </Typography> 
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)",
                                            marginBottom:"15px"
                                        }} 
                                    >
                                        Finance Manager
                                    </Typography> 
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)"
                                        }} 
                                    >
                                        <LocalPhoneOutlinedIcon sx={{marginRight:"5px"}} /> 
                                        <a style={{color: "inherit",textDecoration:"none",fontSize:"16px"}} >aaad aaaaa aaaaa aaaa</a>
                                    </Typography>    
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)",
                                            textOverflow:"ellipsis",
                                            overflow: "hidden",
                                            marginBottom:"10px"
                                        }} 
                                    >
                                        <a  style={{color: "inherit",textDecoration:"none",fontSize:"14px"}}>aaaa aaaaa aaaaa aaaaa</a>
                                    </Typography>   
                                    <hr style={{color:"grey"}}></hr>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineheight: "20px",
                                            color:"rgb(95, 125, 149)",
                                            textOverflow:"ellipsis",
                                            overflow: "hidden",
                                        }} 
                                    >
                                        Line Manager Mộng Khang Hà
                                    </Typography>  
                                </Box> 
                            </Grid> */}
                        {/* )
                    }
                ):null
            }      */}
        </Grid>        
    </Box>
    );
}

export default Gift;