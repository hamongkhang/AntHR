import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ApprovalIcon from '@mui/icons-material/Approval';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const Manager = (props) => {
    const $token = localStorage.getItem('access_token');
    const [render, setRender] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if ($token) {
        } else {
            navigate('/home');
        }
    }, [render])
    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: '100vh',
                borderRadius: '5px',
            }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 10, md: 12 }}
            >
                <Grid item xs={4} sm={5} md={4} className="scrollReward" display={{ xs: "none", md: "block", sm: "block", position: 'fixed',overflowY:"auto",height:"800px",paddingBottom:"800px"}}>
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor:"#4caf50",
                            marginBottom:"10px",
                            textAlign:'center',
                            marginRight:"10px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            <ApprovalIcon/> Waiting for approval                        
                        </Typography>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please confirm the employee's redemption information
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
                                </Button>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Block
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please confirm the employee's redemption information
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
                                </Button>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Block
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please confirm the employee's redemption information
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
                                </Button>
                            </Grid>
                            <Grid item xs={2} sm={4} md={6}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Block
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                </Grid>
                <Grid item xs={4} sm={5} md={4} display={{ xs: "none", md: "block", sm: "block"}} />
                <Grid item xs={4} sm={5} md={4} sx={{position:'fix',paddingBottom:"40px"}}>
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor:"#FF9800",
                            marginBottom:"10px",
                            textAlign:'center',
                            marginRight:"10px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            <LocalShippingOutlinedIcon/> Delivering
                        </Typography>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please wait for the staff to confirm receipt of the goods
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    disabled={true}
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Gifts are being delivered to staff
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please wait for the staff to confirm receipt of the goods
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    disabled={true}
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Gifts are being delivered to staff
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Please wait for the staff to confirm receipt of the goods
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    disabled={true}
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Gifts are being delivered to staff
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                </Grid>
                <Grid item xs={4} sm={5} md={4} className="scrollReward" display={{ xs: "none", md: "block", sm: "block", position: 'fixed',overflowY:"auto",height:"800px",paddingBottom:"800px",right:"40px"}}>
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor:"#2979ff",
                            marginBottom:"10px",
                            textAlign:'center',
                            marginRight:"10px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            <HistoryOutlinedIcon/> History
                        </Typography>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Employee received a gift
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Employee received a gift
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            marginRight:"10px",
                            backgroundColor:"white",
                            marginBottom:"10px",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={3} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                </img>
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> Bún thịt nướng thơm ngon nứt mũi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '10px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <Box sx={{position:"absolute",backgroundColor:"red",borderRadius:"15px",padding:"5px",marginTop:"5px",marginLeft:"5px"}}>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontSize:"12px",
                                        }} 
                                    >
                                      Sold out
                                    </Typography> 
                                    </Box>
                                <img
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/food_item.jpg'}>
                                                </img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={8} md={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "red",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",

                                                    }}
                                                >
                                                    500 points
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={8} md={12}>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "italic",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Employee received a gift
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    //onClick={(event) => onAddNews(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"red", 
                                        color:"##ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Box> 
                </Grid>
            </Grid>
        </Box>
    );
}

export default Manager;