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
                columns={{ xs: 4, sm: 9, md: 12 }}
            >
                <Grid item xs={4} sm={3} md={3} className="scrollReward" display={{ xs: "none", md: "block", sm: "block", position: 'fixed',overflowY:"auto",height:"450px",paddingBottom:"40px"}}>
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
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã khen thưởng</span> Nguyễn Hồng Quâns sss ssds
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
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Programme Development( Partnership Global) ss ss sss sss s
                                </Typography>
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
                                                <img
                                                    style={{
                                                        height: "30px",
                                                        width: "40px",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/value.png'}>
                                                </img>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Không ngừng vươn lên trong công việc
                                                </Typography>
                                            </Box>
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
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
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
                            marginBottom:"10px"
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
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã khen thưởng</span> Nguyễn Hồng Quâns sss ssds
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
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Programme Development( Partnership Global) ss ss sss sss s
                                </Typography>
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
                                                <img
                                                    style={{
                                                        height: "30px",
                                                        width: "40px",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/value.png'}>
                                                </img>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Không ngừng vươn lên trong công việc
                                                </Typography>
                                            </Box>
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
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
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
                            marginBottom:"10px"
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
                                    Hà Mộng Khang <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã khen thưởng</span> Nguyễn Hồng Quâns sss ssds
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
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Programme Development( Partnership Global) ss ss sss sss s
                                </Typography>
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
                                                <img
                                                    style={{
                                                        height: "30px",
                                                        width: "40px",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/value.png'}>
                                                </img>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Không ngừng vươn lên trong công việc
                                                </Typography>
                                            </Box>
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
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Publish
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>  
                </Grid>
                <Grid item xs={4} sm={3} md={3} display={{ xs: "none", md: "block", sm: "block"}} />
                <Grid item xs={4} sm={3} md={6} sx={{position:'relative'}}>
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor: "white",
                            marginBottom:"15px"
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                display: "flex",
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={2} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "60px",
                                        width: "60px",
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
                                        fontSize: "16px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "16px", fontWeight: "normal" }}>đã khen thưởng</span> Nguyễn Hồng Quâns sss ssds
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '12px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <MoreVertIcon />
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                        sx={{
                                            display: "flex",
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Grid item xs={4} sm={8} md={1}>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={4}>
                                            <img
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                    objectFit: 'cover',
                                                    borderRadius: "100%",
                                                    border: "2px solid #ff5722",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                            </img>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    marginTop: "10px"
                                                }}
                                            >
                                                Hà Mộng Khang
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Executive Cum Legal Assistant Consultant Employee
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={2}>
                                            <img
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/reward/gold.png'}>
                                            </img>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={4}>
                                            <img
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                    objectFit: 'cover',
                                                    borderRadius: "100%",
                                                    border: "2px solid #00e676",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                            </img>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    marginTop: "10px"
                                                }}
                                            >
                                                Hà Mộng Khang
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Manager Programme Development(Partnership Global)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={1}>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Programme Development(Partnership Global) ss ss sss sss s
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={2} md={3}>
                                            <Box
                                                sx={{
                                                    borderRadius: "5px",
                                                    backgroundColor: "#a7ffeb",
                                                    padding: "10px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Achievements
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={6} md={9}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        height: "40px",
                                                        width: "50px",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/value.png'}>
                                                </img>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Không ngừng vươn lên trong công việc
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <ThumbUpOutlinedIcon sx={{ marginRight: "10px" }} />
                                <ChatBubbleOutlineOutlinedIcon />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor: "white",
                            marginBottom:"15px"
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                display: "flex",
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1} sm={2} md={2} display={{ xs: "none", md: "block", sm: "block" }}>
                                <img
                                    style={{
                                        height: "60px",
                                        width: "60px",
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
                                        fontSize: "16px",
                                    }}
                                >
                                    Hà Mộng Khang <span style={{ fontSize: "16px", fontWeight: "normal" }}>đã khen thưởng</span> Nguyễn Hồng Quâns sss ssds
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(35, 54, 78)",
                                        fontSize: '12px',
                                    }}
                                >
                                    2 phút trước
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <MoreVertIcon />
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                        sx={{
                                            display: "flex",
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Grid item xs={4} sm={8} md={1}>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={4}>
                                            <img
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                    objectFit: 'cover',
                                                    borderRadius: "100%",
                                                    border: "2px solid #ff5722",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                            </img>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    marginTop: "10px"
                                                }}
                                            >
                                                Hà Mộng Khang
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Executive Cum Legal Assistant Consultant Employee
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={2}>
                                            <img
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/reward/gold.png'}>
                                            </img>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={4}>
                                            <img
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                    objectFit: 'cover',
                                                    borderRadius: "100%",
                                                    border: "2px solid #00e676",
                                                }}
                                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                src={process.env.REACT_APP_FILE + '/avatar/avatar.png'}>
                                            </img>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    marginTop: "10px"
                                                }}
                                            >
                                                Hà Mộng Khang
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Manager Programme Development(Partnership Global)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={1}>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Manager Programme Development(Partnership Global) ss ss sss sss s
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <Box sx={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, md: 3 }}
                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                    >
                                        <Grid item xs={2} sm={2} md={3}>
                                            <Box
                                                sx={{
                                                    borderRadius: "5px",
                                                    backgroundColor: "#a7ffeb",
                                                    padding: "10px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Achievements
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} sm={6} md={9}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        height: "40px",
                                                        width: "50px",
                                                    }}
                                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                                    src={process.env.REACT_APP_FILE + '/reward/value.png'}>
                                                </img>
                                                <Typography
                                                    sx={{
                                                        color: "rgb(35, 54, 78)",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Không ngừng vươn lên trong công việc
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                                <ThumbUpOutlinedIcon sx={{ marginRight: "10px" }} />
                                <ChatBubbleOutlineOutlinedIcon />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Manager;