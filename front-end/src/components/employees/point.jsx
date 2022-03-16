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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Point = (props) => {
    const $token=localStorage.getItem('access_token');
    const [userPoints, setUserPoints]= useState([]);
    const [render, setRender] = useState(false);
    const navigate = useNavigate();
    const getDirectory = () =>{
        fetch(process.env.REACT_APP_API+'/employee/getUserPoints', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
        })
        .then(response => response.json())
        .then(data =>  {
            setUserPoints(data.data.reverse());
        });
    }
    console.log(userPoints)
    useEffect(() => {
        if($token){
          getDirectory();
        }else{
           navigate('/home');
        }
    }, [render])
    return (
        <Box 
            sx={{
                maxWidth:"100%",
                height:'100%',
                border:"1px solid rgb(227, 235, 241)",
                borderRadius:"5px",
                backgroundColor:"white"
            }}
        >
            <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
            >
                    <Grid item xs={4} sm={8} md={12}>
                        <Box
                            sx={{
                                padding:"20px"
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Employees</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Points</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody> 
                                    {
                                        userPoints.length?
                                        userPoints.map((item,index)=>{
                                           if(item.role!=1){
                                            return(
                                           <TableRow
                                               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                           >
                                               <TableCell align="left" sx={{width:"250px",}}>
                                                   <Box sx={{display:"flex"}}>
                                                    <img 
                                                        style={{
                                                            height: "50px",
                                                            width: "50px",
                                                            objectFit: 'cover',
                                                            borderRadius: "100%",
                                                            marginRight:"10px"
                                                        }} 
                                                        src={
                                                            item.avatar
                                                            ?
                                                                (item.avatar.search('https://') != -1)
                                                                ?
                                                                    item.avatar
                                                                :
                                                                    process.env.REACT_APP_FILE+'/avatar/'+item.avatar
                                                            :
                                                                process.env.REACT_APP_FILE+'/avatar/avatar.png'
                                                        }
                                                    >
                                                    </img>
                                                    <Box sx={{textOverflow:"ellipsis",overflow: "hidden",}}>
                                                        <Typography
                                                            sx={{ 
                                                                color:"rgb(105, 129, 148)",
                                                                fontSize:"18px"
                                                            }} 
                                                        >
                                                            {item.last_name?item.last_name:" - "} {item.first_name?item.first_name:" - "}
                                                        </Typography>
                                                        <Typography
                                                            sx={{ 
                                                                color:"rgb(105, 129, 148)",
                                                                fontSize:"12px"
                                                            }} 
                                                        >
                                                            {item.email?item.email:" - "} | {item.phone?item.phone:" - "}
                                                        </Typography>
                                                    </Box>
                                                   </Box>
                                               </TableCell>
                                               <TableCell align="left" sx={{color:"rgb(105, 129, 148)"}}>
                                                   <Box sx={{display:"flex"}}>
                                                   <Box
                                                        sx={{
                                                            backgroundColor:"#1976d2",
                                                            borderRadius:"2px",
                                                            marginBottom:"10px",
                                                            height:"20px",
                                                            marginRight:"10px",
                                                            width:item.score?item.score/5:"1px"
                                                        }}
                                                   >
                                                   </Box>
                                                   <Box>
                                                       {item.score?item.score+" points":"0 point"}
                                                   </Box>
                                                   </Box>
                                                   <Box sx={{display:"flex"}}>
                                                   <Box
                                                        sx={{
                                                            backgroundColor:"#f44336",
                                                            borderRadius:"2px",
                                                            marginBottom:"10px",
                                                            height:"20px",
                                                            marginRight:"10px",
                                                            width:item.score_spent?item.score_spent/5:"1px"
                                                        }}
                                                   >
                                                   </Box>
                                                   <Box>
                                                       {item.score_spent?item.score_spent+" points":"0 point"}
                                                   </Box>
                                                   </Box>
                                                   <Box sx={{display:"flex"}}>
                                                   <Box
                                                        sx={{
                                                            backgroundColor:"#388e3c",
                                                            borderRadius:"2px",
                                                            height:"20px",
                                                            marginRight:"10px",
                                                            width:item.gift?item.gift/5:"1px"
                                                        }}
                                                   >
                                                   </Box>
                                                   <Box>
                                                       {item.gift?item.gift+" points":"0 point"}
                                                   </Box>
                                                   </Box>
                                               </TableCell>
                                           </TableRow> 
                                         )}else{
                                             return(
                                                 null
                                             )
                                         }})
                                        :
                                        <Typography
                                            align="center"
                                            variant="h4" 
                                            sx={{ 
                                                mb: 1.5,
                                                color:"rgb(105, 129, 148)",
                                            }} 
                                            color="text.secondary" 
                                        >
                                            No data found
                                        </Typography>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
            </Grid>
        </Box>
    );
}

export default Point;