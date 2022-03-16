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
    const $token = localStorage.getItem('access_token');
    const role =localStorage.getItem('role');
    const id_user = localStorage.getItem('id');
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
                                    {/* {!search?
                                        folders.length?
                                        folders.map((item,index)=>{
                                            return( */}
                                           <TableRow
                                               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                           >
                                               <TableCell align="left">dhuihsa</TableCell>
                                               <TableCell align="left">ahsgcccccc cccc cccccc ccc ccccc cccccc ccc cccc chsgcccccc cccc cccccc ccc ccccc cccccc ccc cccc cccccc cc cccccc c ccc  cccccccc ccc cccccc cchsgcccccc cccc cccccc ccc ccccc cccccc ccc cccc cccccc cc cccccc c ccc  cccccccc ccc cccccc ccccccc cc cccccc c ccc  cccccccc ccc cccccc cccc ccccj</TableCell>
                                           </TableRow> 
                                                {/* )})
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
                                        } */}
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