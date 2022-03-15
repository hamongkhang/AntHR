import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ApprovalIcon from '@mui/icons-material/Approval';
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Portal = (props) => {
    const $token = localStorage.getItem('access_token');
    const id_user = localStorage.getItem('id');
    const [render, setRender] = useState(false);
    const [employees, setEmployees]= useState([]);
    const [users, setUsers]= useState([]);
    const [praise, setPraise]= useState([]);
    const [praise1, setPraise1]= useState([]);
    const navigate = useNavigate();
    const getEmployees = () =>{
        fetch(process.env.REACT_APP_API+'/employee/getAllEmployee', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
              setUsers(data.data[0].reverse());
              setEmployees(data.data[1].reverse());
        });
    }
    const getPraise = () =>{
        fetch(process.env.REACT_APP_API+'/praise/getAllPraise', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setPraise(data.data.reverse());     
        });
    }
    const getPraise2 = () =>{
        fetch(process.env.REACT_APP_API+'/praise/getAllPraise', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setPraise1(data.data);     
        });
    }
    console.log(praise)
    console.log(praise1)

    const onPublicPraise=(event,id)=>{
        fetch(process.env.REACT_APP_API+'/praise/changeStatus/'+id, {
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
    const onBlockPraise=(event,id)=>{
        Swal.fire({
            title: 'Delete this news?',
            text: "Do you want to permanently delete this news?",
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
        fetch(process.env.REACT_APP_API+'/praise/destroyPraise/'+id, {
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

    useEffect(() => {
        if ($token) {
            getEmployees();
            getPraise();
            getPraise2();
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
                <Grid item xs={4} sm={3} md={3} className="scrollReward" display={{ xs: "none", md: "block", sm: "block", position: 'fixed',overflowY:"auto",height:"800px",paddingBottom:"800px"}}>
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
                    {praise1.length?
                            praise1.map((item,index)=>{
                                if(item.status===0){
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
                                        {employees.length?
                                                    employees.map((itemUser,index)=>{
                                                        if(itemUser.user_id===item.author){
                                                            if(itemUser.avatar){
                                                                if(itemUser.avatar.search('https://') !== -1){
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }
                                                            }
                                                            else{
                                                                return(
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
                                                                );
                                                            }
                                                        }else{
                                                            return(
                                                                null
                                                            );
                                                         }
                                                        }
                                                    )
                                                    :null
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
                                                 {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.author){
                                                        return(
                                                            itemUser.last_name+" "+itemUser.first_name+" "
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            } 
                                            <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã khen thưởng</span>
                                            {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.recipient){
                                                        return(
                                                            " "+itemUser.last_name+" "+itemUser.first_name
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
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
                                        <Grid item xs={4} sm={8} md={12} sx={{textAlign:"center"}}>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "18px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                + {item.score?item.score:null} Points
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                + {item.present?item.present:null}
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
                                                {item.message}
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
                                                                {item.cheer}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={12}>
                                            <Button 
                                                type="submit"
                                                onClick={(event) => onPublicPraise(event,item.id)}
                                                sx={{
                                                    height:40.5,
                                                    width:"100%",
                                                    border:"1px solid #ff9900",
                                                    backgroundColor:"#FFFF66", 
                                                    color:"#ff9900",
                                                    marginBottom:"10px"
                                                }}
                                                size='medium' 
                                            >
                                                Publish
                                            </Button>
                                            <Button 
                                                type="submit"
                                                onClick={(event) => onBlockPraise(event,item.id)}
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
                                );}})
                            :null
                    }
                </Grid>
                <Grid item xs={4} sm={3} md={3} display={{ xs: "none", md: "block", sm: "block"}} />
                <Grid item xs={4} sm={3} md={6} sx={{position:'relative'}}>
                    {praise.length?
                            praise.map((item,index)=>{
                                if(item.status===1){
                                return(
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
                                             {employees.length?
                                                    employees.map((itemUser,index)=>{
                                                        if(itemUser.user_id===item.author){
                                                            if(itemUser.avatar){
                                                                if(itemUser.avatar.search('https://') !== -1){
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <img
                                                                    style={{
                                                                        height: "60px",
                                                                        width: "60px",
                                                                        objectFit: 'cover',
                                                                        borderRadius: "100%",
                                                                        float: "right",
                                                                        border: "2px solid #2196f3",
                                                                    }}
                                                                    src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}
                                                                    >
                                                                </img>
                                                                );
                                                            }
                                                        }else{
                                                            return(
                                                                null
                                                            );
                                                         }
                                                        }
                                                    )
                                                    :null
                                                }
                                        </Grid>
                                        <Grid item xs={3} sm={5} md={9}>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                }}
                                            >
                                            {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.author){
                                                        return(
                                                            itemUser.last_name+" "+itemUser.first_name+" "
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
                                            <span style={{ fontSize: "16px", fontWeight: "normal" }}>đã khen thưởng</span>
                                            {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.recipient){
                                                        return(
                                                            " "+itemUser.last_name+" "+itemUser.first_name
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {moment(item.updated_at).fromNow()}
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
                                                    {employees.length?
                                                    employees.map((itemUser,index)=>{
                                                        if(itemUser.user_id===item.author){
                                                            if(itemUser.avatar){
                                                                if(itemUser.avatar.search('https://') !== -1){
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "100px",
                                                                            width: "100px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            border: "2px solid #ff5722",
                                                                        }}
                                                                        src={itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "100px",
                                                                            width: "100px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            border: "2px solid #ff5722",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <img
                                                                    style={{
                                                                        height: "100px",
                                                                        width: "100px",
                                                                        objectFit: 'cover',
                                                                        borderRadius: "100%",
                                                                        border: "2px solid #ff5722",
                                                                    }}
                                                                    src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}
                                                                    >
                                                                </img>
                                                                );
                                                            }
                                                        }else{
                                                            return(
                                                                null
                                                            );
                                                         }
                                                        }
                                                    )
                                                    :null
                                                }
                                                        <Typography
                                                            sx={{
                                                                color: "rgb(35, 54, 78)",
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                marginTop: "10px"
                                                            }}
                                                        >
                                                              {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.author){
                                                        return(
                                                            itemUser.last_name+" "+itemUser.first_name+" "
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
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
                                                    {employees.length?
                                                    employees.map((itemUser,index)=>{
                                                        if(itemUser.user_id===item.recipient){
                                                            if(itemUser.avatar){
                                                                if(itemUser.avatar.search('https://') !== -1){
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "100px",
                                                                            width: "100px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            border: "2px solid #ff5722",
                                                                        }}
                                                                        src={itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "100px",
                                                                            width: "100px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            border: "2px solid #ff5722",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <img
                                                                    style={{
                                                                        height: "100px",
                                                                        width: "100px",
                                                                        objectFit: 'cover',
                                                                        borderRadius: "100%",
                                                                        border: "2px solid #00e676",
                                                                    }}
                                                                    src={process.env.REACT_APP_FILE+'/avatar/avatar.png'}
                                                                    >
                                                                </img>
                                                                );
                                                            }
                                                        }else{
                                                            return(
                                                                null
                                                            );
                                                         }
                                                        }
                                                    )
                                                    :null
                                                }
                                                        <Typography
                                                            sx={{
                                                                color: "rgb(35, 54, 78)",
                                                                fontWeight: "bold",
                                                                fontSize: "18px",
                                                                marginTop: "10px"
                                                            }}
                                                        >
                                                            {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.recipient){
                                                        return(
                                                            " "+itemUser.last_name+" "+itemUser.first_name
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
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
                                        <Grid item xs={4} sm={8} md={12} sx={{alignItems:"center",textAlign:"center"}}>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "24px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                + {item.score} Points
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "18px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                 + {item.present?item.present:null}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} sm={8} md={12}>
                                            <Typography
                                                sx={{
                                                    color: "black",
                                                    fontSize: "18px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {item.message}
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
                                                                    textOverflow:"ellipsis",
                                                                    overflow: "hidden",                                                                }}
                                                            >
                                                                {item.cheer}
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
                                )}})
                        :null
                    }
                </Grid>
               <Grid item xs={4} sm={3} md={3}  className="scrollReward2" 
               display={{ xs: "none", md: "block", sm: "block",overflowY:"auto",height:"800px",paddingBottom:"800px",position:"fixed",right:"30px"}}
               >
                    <Box
                        sx={{
                            boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                            border: "1.5px solid #e0e0e0",
                            borderRadius: '10px',
                            padding: "10px",
                            backgroundColor:"#ff9800",
                            marginBottom:"10px",
                            textAlign:'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            <HistoryIcon/> History
                        </Typography>
                    </Box> 
                    {praise.length?
                            praise.map((item,index)=>{
                                if(item.author==id_user){
                                return(
                                    <Box
                                    sx={{
                                        boxShadow: 'rgb(95 125 149 / 20%) 0px 4px 13px 0px',
                                        border: "1.5px solid #e0e0e0",
                                        borderRadius: '10px',
                                        padding: "10px",
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
                                        {employees.length?
                                                    employees.map((itemUser,index)=>{
                                                        if(itemUser.user_id===item.author){
                                                            if(itemUser.avatar){
                                                                if(itemUser.avatar.search('https://') !== -1){
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <img
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            objectFit: 'cover',
                                                                            borderRadius: "100%",
                                                                            float: "right",
                                                                            border: "2px solid #2196f3",
                                                                        }}
                                                                        src={process.env.REACT_APP_FILE+'/avatar/'+itemUser.avatar}
                                                                        >
                                                                    </img>
                                                                    );
                                                                }
                                                            }
                                                            else{
                                                                return(
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
                                                                );
                                                            }
                                                        }else{
                                                            return(
                                                                null
                                                            );
                                                         }
                                                        }
                                                    )
                                                    :null
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
                                                  {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.author){
                                                        return(
                                                            itemUser.last_name+" "+itemUser.first_name+" "
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            } 
                                            <span style={{ fontSize: "12px", fontWeight: "normal" }}>đã khen thưởng</span>
                                            {employees.length?
                                                employees.map((itemUser,index)=>{
                                                    if(itemUser.user_id===item.recipient){
                                                        return(
                                                            " "+itemUser.last_name+" "+itemUser.first_name
                                                        )}else{
                                                        return(
                                                            null
                                                        )
                                                        }
                                                    })
                                                :null
                                            }
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
                                        <Grid item xs={4} sm={8} md={12} sx={{textAlign:"center"}}>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "18px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                + {item.score?item.score:null} Points
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#76ff03",
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                + {item.present?item.present:null}
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
                                               {item.message}
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
                                                                {item.cheer}
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
                                                    backgroundColor:"red", 
                                                    color:"#ff9900",
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
            </Grid>
        </Box>
    );
}

export default Portal;