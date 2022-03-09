import React, {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Switch from '@mui/material/Switch';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DocumentView=(props)=>{
    return(
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
                                borderBottom:"1px solid rgb(227, 235, 241)",
                                padding:"20px"
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                            <Grid item xs={4} sm={3} md={4}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search By Name ...."
                                        inputProps={{ 'aria-label': 'search by name...' }}
                                    />
                                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={2} md={5}></Grid>
                            <Grid item xs={4} sm={3} md={3}>
                                <Box 
                                    type="submit"
                                    onclick="document.getElementById('fileUpload').click();"
                                    sx={{
                                        height:40.5,
                                        width:"21%",
                                        borderRadius:"5px",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900",
                                        position:"absolute",
                                    }}
                                    size='medium' 
                                >
                                    <InputBase
                                        type="file"
                                        id="fileUpload"
                                        sx={{
                                            marginLeft:"5px",
                                            position:"relative",

                                        }}
                                    />
                                </Box>
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
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
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Name</TableCell>
                                            <TableCell align="right" sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Size</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}} align="center"><SettingsOutlinedIcon /></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row"><ArticleIcon sx={{color:"#1890ff"}} /> {row.name}</TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell>
                                                    <Grid
                                                        container
                                                        spacing={{ xs: 2, md: 3 }}
                                                        columns={{ xs: 6, sm: 9, md: 12 }}
                                                    >
                                                        <Grid item xs={2} sm={1} md={4}></Grid>
                                                        <Grid item xs={2} sm={3} md={2}>
                                                            <Box
                                                                sx={{
                                                                    backgroundColor:"rgb(224, 230, 234)",
                                                                    paddingTop:"5px",
                                                                    paddingBottom:"5px",
                                                                    borderRadius:"3px",
                                                                    textAlign:"center",
                                                                }}
                                                            >
                                                                <DownloadOutlinedIcon sx={{color:"rgb(42, 210, 95)"}}  />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2} sm={3} md={2}>
                                                            <Box
                                                                sx={{
                                                                    backgroundColor:"rgb(224, 230, 234)",
                                                                    paddingTop:"5px",
                                                                    paddingBottom:"5px",
                                                                    borderRadius:"3px",
                                                                    textAlign:"center",
                                                                }}
                                                            >
                                                                <DeleteOutlinedIcon sx={{color:"red"}}  />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2} sm={1} md={4}></Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
            </Grid>
        </Box>
    );
}
export default DocumentView;