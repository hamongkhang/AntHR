import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


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
            sx={{
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Grid item xs={4} sm={8} md={12}>
                <Typography 
                    sx={{ 
                        fontWeight:"bold",
                        color:"#ff9900",
                        mb:1
                    }} 
                    variant="h4"
                >
                    Internal reward portal
                </Typography> 
                <Typography 
                    sx={{ 
                        color:"rgb(35, 54, 78)",
                        marginBottom:"30px",
                        fontWeight:"bold",
                        mb:4
                    }} 
                >
                    Appreciate the positive contributions of your colleagues here!
                </Typography> 
            </Grid>
            <Grid item xs={4} sm={8} md={12} 
                sx={{
                    display:"flex",
                }}
            > 
                <img 
                    style={{
                        height: "60px",
                        width: "60px",
                        objectFit: 'cover',
                        borderRadius: "100%",
                        marginLeft:"auto",
                    }} 
                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                    src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                </img>&ensp;&ensp;
                <Typography 
                    sx={{ 
                        color:"rgb(35, 54, 78)",
                        fontWeight:"bold",
                        marginTop:"auto",
                        marginBottom:"auto",
                        marginRight:"auto",
                    }} 
                    variant="h5"
                >
                    Hello, HA MONG KHANG
                </Typography> 
            </Grid>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
                sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display:"flex",
                    paddingLeft:"40px",
                    paddingRight:"40px",
                }}
            >
                <Grid item xs={4} sm={3} md={4}> 
                    <Box
                        sx={{
                            backgroundColor:"#dcedc8",
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '5px',
                            padding: "20px",
                            marginTop:"40px",
                            marginBottom:"40px"
                        }}  
                    >
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h6"
                        >
                                Recognition Points
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"#4caf50",
                                fontWeight:"bold",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h3"
                        >
                               150 points
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h7"
                        >
                              Please reward your colleagues or exchange gifts.
                        </Typography><br></br>
                        <Typography 
                            sx={{ 
                                color:"#ef5350",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h7"
                        >
                              Expiration Date: 31/12/2030
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={3} md={4}> 
                <Box
                        sx={{
                            backgroundColor:"#b2ebf2",
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '5px',
                            padding: "20px",
                            marginTop:"40px",
                            marginBottom:"40px"
                        }}  
                    >
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h6"
                        >
                                Recognition Coins
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"#03a9f4",
                                fontWeight:"bold",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h3"
                        >
                               150 points
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h7"
                        >
                              Get special offers and rewards packages, including discount codes and travel packages.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={3} md={4}> 
                    <Box
                        sx={{
                            backgroundColor:"#ffe0b2",
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '5px',
                            padding: "20px",
                            marginTop:"40px",
                            marginBottom:"40px"
                        }}  
                    >
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h6"
                        >
                                Recognition Points Spent
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"#f4511e",
                                fontWeight:"bold",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h3"
                        >
                               150 points
                        </Typography>
                        <Typography 
                            sx={{ 
                                color:"rgb(35, 54, 78)",
                                marginTop:"auto",
                                marginBottom:"auto",
                                marginRight:"auto",
                                mb:1
                             }} 
                            variant="h7"
                        >
                              This is the score you have awarded to your friends after positive contributions.
                        </Typography><br></br>
                    </Box>
                </Grid>
            </Grid>  
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display:"flex",
                }}
            >
                 <Grid item xs={0} sm={1} md={2}> 
                 </Grid>
                <Grid item xs={4} sm={8} md={8}> 
                    <Typography 
                        sx={{ 
                            color:"rgb(35, 54, 78)",
                            fontWeight:"bold",
                            mb:2,
                            marginTop:"40px",
                        }} 
                        variant="h5"
                    >
                        You want to reward?
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '3px',
                            paddingTop: "40px",
                            paddingBottom: "40px",
                            paddingRight: "20px",
                            paddingLeft: "20px",
                            border:"solid 2px #5c6bc0",
                        }}  
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                                textAlign: 'center',
                                display:"flex",
                            }}
                        >
                            <Grid item xs={4} sm={2} md={2}> 
                                <img 
                                    style={{
                                        height: "60px",
                                        width: "60px",
                                        objectFit: 'cover',
                                        borderRadius: "100%",
                                    }} 
                                    src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                </img>
                            </Grid>  
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid> 
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid> 
                            <Grid item xs={4} sm={2} md={2}> 
                            </Grid>  
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid>   
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid>   
                            <Grid item xs={4} sm={2} md={2}> 
                            </Grid>  
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid>   
                            <Grid item xs={4} sm={3} md={5}> 
                                <TextField
                                    //helperText={error.title?error.title[0]:null}
                                    //error={error.title?true:false}
                                    id="title"
                                    name="title"
                                    label="Title *"
                                    variant="outlined"
                                    size='small'
                                    type={'text'}
                                    sx={{width:"100%"}}
                                    InputLabelProps={{ shrink: true}}
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid>   
                        </Grid>
                    </Box>
                </Grid>
                    <Grid item xs={0} sm={1} md={2}> 
                 </Grid>
            </Grid>   
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display:"flex",
                }}
            >
                 <Grid item xs={0} sm={1} md={2}> 
                 </Grid>
                <Grid item xs={4} sm={8} md={8}> 
                    <Typography 
                        sx={{ 
                            color:"rgb(35, 54, 78)",
                            fontWeight:"bold",
                            mb:2,
                            marginTop:"40px",
                        }} 
                        variant="h5"
                    >
                        Why did you choose this person?
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '3px',
                            paddingTop: "40px",
                            paddingBottom: "40px",
                            paddingRight: "20px",
                            paddingLeft: "20px",
                            marginBottom:"40px",
                            border:"solid 2px #5c6bc0",
                            display:"flex"
                        }}  
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                alignItems: 'center',
                                textAlign: 'center',
                                display:"flex",
                            }}
                        >
                            <Grid item xs={4} sm={8} md={4}> 
                                <Box
                                    sx={{
                                        borderRadius:"2px",
                                        boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                                        border:"1px solid #5c6bc0",
                                        paddingLeft:"10px",
                                        paddingRight:"10px",
                                        paddingTop:"20px",
                                        paddingBottom:"20px",
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight:"bold",
                                        }} 
                                        variant="h6"
                                    >
                                        Clarity
                                    </Typography>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <img 
                                        style={{
                                            height: "100px",
                                            width: "100px",
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_6.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                        Great Inspirational Leadership
                                    </Typography>
                                    <img 
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            marginLeft:"10px"
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_3.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                        Growth Mindset
                                    </Typography>
                                </Box>    
                            </Grid>
                            <Grid item xs={4} sm={8} md={4}> 
                                <Box
                                    sx={{
                                        borderRadius:"2px",
                                        boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                                        border:"1px solid #5c6bc0",
                                        paddingLeft:"10px",
                                        paddingRight:"10px",
                                        paddingTop:"20px",
                                        paddingBottom:"20px",
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight:"bold",
                                        }} 
                                        variant="h6"
                                    >
                                        Courage
                                    </Typography>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <img 
                                        style={{
                                            height: "100px",
                                            width: "100px",
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_1.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                         Expressing and contributing yourself
                                    </Typography>
                                    <img 
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            marginLeft:"10px"
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_2.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                        Challenging development
                                    </Typography>
                                </Box>     
                            </Grid>
                            <Grid item xs={4} sm={8} md={4}> 
                                <Box
                                    sx={{
                                        borderRadius:"2px",
                                        boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                                        border:"1px solid #5c6bc0",
                                        paddingLeft:"10px",
                                        paddingRight:"10px",
                                        paddingTop:"20px",
                                        paddingBottom:"20px",
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                            fontWeight:"bold",
                                        }} 
                                        variant="h6"
                                    >
                                        Humanity
                                    </Typography>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <img 
                                        style={{
                                            height: "100px",
                                            width: "100px",
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_4.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                        Helping people grow together
                                    </Typography>
                                    <img 
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            marginLeft:"10px"
                                        }} 
                                        src={process.env.REACT_APP_FILE+'/reward/leader_5.png'}>
                                    </img>
                                    <Typography 
                                        sx={{ 
                                            color:"rgb(35, 54, 78)",
                                        }} 
                                    >
                                        Excellent communication
                                    </Typography>
                                </Box>     
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}> 
                                <TextField 
                                    id="message" 
                                    type="text" 
                                    name="message"
                                    sx={{
                                        width:"100%",
                                    }}
                                    label="Message" 
                                    variant="outlined" 
                                    InputLabelProps={{ shrink: true}}   
                                    //onChange={(event) => onChangeAddNews(event)}
                                />
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}> 
                                <Typography 
                                    sx={{ 
                                        color:"rgb(35, 54, 78)",
                                    }} 
                                >
                                    Your compliments will be approved by the admin and made visible to everyone
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                    <Grid item xs={0} sm={1} md={2}> 
                    </Grid>
            </Grid>   
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                 <Grid item xs={4} sm={2} md={4}></Grid>
            <Grid item xs={4} sm={4} md={4}>
                <Button 
                    type="submit"
                    //onClick={(event) => onAddNews(event)}
                    sx={{
                        height:40.5,
                        width:"100%",
                        border:"1px solid #ff9900",
                        backgroundColor:"#FFFF66", 
                        color:"#ff9900",
                        marginBottom:"40px"
                    }}
                    size='medium' 
                >
                    Publish
                </Button>
            </Grid>  
            <Grid item xs={4} sm={2} md={4}></Grid>
            </Grid> 
        </Grid>        
    </Box>
    );
}

export default Commendation;