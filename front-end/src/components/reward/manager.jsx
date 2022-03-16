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
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Manager = (props) => {
    const $token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    const [render, setRender] = useState(false);
    const [orders, setOrders] =useState([]);
    const [orders2, setOrders2] =useState([]);
    const navigate = useNavigate();
    const getOrders=()=>{
        fetch(process.env.REACT_APP_API+'/cart_present/getAllCartPresent', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
              setOrders(data.data.reverse());
        });
    }
    const getOrders2=()=>{
        fetch(process.env.REACT_APP_API+'/cart_present/getAllCartPresent', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
              setOrders2(data.data);
        });
    }
    const onPublishCart=(event,id)=>{
        fetch(process.env.REACT_APP_API+'/cart_present/changeStatusAdmin/'+id, {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
          .then(response => response.json())
          .then(data =>  {
             if(data.error){
                 if(data.error=="Not enough points !!!"){
                  toast.error('Employee has an inadequate score.', {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored"
                  });
                }else{
                    toast.error('Public Failed.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                }
             }
             else{
                  setRender(!render)
                  toast.success('Public successfully.', {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored"
                  });
             }
          });
    }
    const onConfirmEmployee=(event,id)=>{
        fetch(process.env.REACT_APP_API+'/cart_present/changeStatusClient/'+id, {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
          .then(response => response.json())
          .then(data =>  {
             if(data.error){
                    toast.error('Public Failed.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
             }
             else{
                  setRender(!render)
                  toast.success('Public successfully.', {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored"
                  });
             }
          });
    }
    const onBlockCart=(event,id)=>{
        Swal.fire({
            title: 'Delete this order?',
            text: "Do you want to permanently delete this order?",
            icon: 'warning',
            marginTop:"200px",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cance',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                onBlock(id);
            }
          })
    }
    const onBlock=(id)=>{
        fetch(process.env.REACT_APP_API+'/cart_present/destroyCartPresent/'+id, {
            method: "DELETE",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
           if(data.error){
                toast.error('Delete Failed.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
           }
           else{
                setRender(!render)
                toast.success('Delete successfully.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
           }
        });
    }
    console.log(orders)
    useEffect(() => {
        if ($token) {
            getOrders();
            getOrders2();
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
             {(role==1)?
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
                    {
                        orders2.length?
                            orders2.map((item,index)=>{
                                if(item.status==0){
                                return(
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
                                                {item.avatar?
                                                                (item.avatar.search('https://') !== -1)?
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={item.avatar}
                                                                        >
                                                                    </img>
                                                                    :
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+item.avatar}
                                                                        >
                                                                    </img>
                                                          :
                                                            <img
                                                                style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        objectFit: 'cover',
                                                                        borderRadius: "100%",
                                                                        float: "right",
                                                                        border: "2px solid #2196f3",
                                                                }}
                                                                src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}
                                                            >
                                                            </img>
                                                        }
                                        </Grid>
                                        <Grid item xs={3} sm={5} md={9}>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {item.last_name+" "+item.first_name} <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> {item.present_name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: '10px',
                                                }}
                                            >
                                                {moment(item.updated_at).fromNow()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={12}>
                                                 <img
                                                                style={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                }}
                                                                src={process.env.REACT_APP_FILE+'/present/image/'+item.present_image}>
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
                                                                {item.present_score?item.present_score
                                                                :null} Points
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
                                                onClick={(event) => onPublishCart(event,item.id)}
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
                                                onClick={(event) => onBlockCart(event,item.id)}
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
                                )}})
                        :null
                    }
                </Grid>
                :null}
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
                    {
                        orders.length?
                            orders.map((item,index)=>{
                                if(item.status==1){
                                    return(
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
                            {item.avatar?
                                                                (item.avatar.search('https://') !== -1)?
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={item.avatar}
                                                                        >
                                                                    </img>
                                                                    :
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+item.avatar}
                                                                        >
                                                                    </img>
                                                          :
                                                            <img
                                                                style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        objectFit: 'cover',
                                                                        borderRadius: "100%",
                                                                        float: "right",
                                                                        border: "2px solid #2196f3",
                                                                }}
                                                                src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}
                                                            >
                                                            </img>
                                                        }
                            </Grid>
                            <Grid item xs={3} sm={5} md={9}>
                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {item.last_name+" "+item.first_name} <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã đổi phần thưởng</span> {item.present_name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: '10px',
                                                }}
                                            >
                                                {moment(item.updated_at).fromNow()}
                                            </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12}>
                            <img
                                                                style={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                }}
                                                                src={process.env.REACT_APP_FILE+'/present/image/'+item.present_image}>
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
                                                                {item.present_score?item.present_score
                                                                :null} Points
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
                            {(role==1)?
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    disabled={true}
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
                            :
                            <Grid item xs={4} sm={8} md={12}>
                                <Button 
                                    type="submit"
                                    onClick={(event) => onConfirmEmployee(event,item.id)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    Confirm receipt
                                </Button>
                            </Grid>
                            }
                        </Grid>
                    </Box> 
                        )}})
                        :null
                    }
                </Grid>
                {(role==1)?
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
                :null}
            </Grid>
        </Box>
    );
}

export default Manager;