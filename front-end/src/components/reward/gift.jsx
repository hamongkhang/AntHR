import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

const  Gift=(props)=>{
    const [openAdd, setOpenAdd] =useState(false);
    const [openEdit, setOpenEdit] =useState(false);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const clickOpenAdd=()=>{
        setOpenAdd(!openAdd);
    }
    const clickOpenEdit=()=>{
        setOpenEdit(!openEdit);
    }

    return (
    <Box 
      sx={{
      maxWidth:"100%",
      height:'100%',
      padding:"20px",
    }}>
        <Modal
            open={openAdd}
            onClose={()=>clickOpenAdd()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80%",
                    height:"70%",
                    bgcolor: 'background.paper',
                    border: '2px solid #ff9900',
                    boxShadow: 24,
                    p: 4,
                    borderRadius:"10px"
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={8} md={12}>
                    <Typography 
                         sx={{ 
                            fontWeight:"bold",
                            color:"rgb(35, 54, 78)"
                        }} 
                        variant="h6"
                    >
                        Create Gifts 
                    </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={6}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="name"
                        name="name"
                        label="Name *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={4} md={6}>
                    <FormControl fullWidth> 
                        <InputLabel id="demo-simple-select-label">Gift Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={age}
                            label="Age"
                            sx={{marginTop:"5px",height:"40px",padding:"8.5px 14px"}}
                            //onChange={handleChange}
                        >
                            <MenuItem value={10}>Food</MenuItem>
                            <MenuItem value={20}>Voucher</MenuItem>
                            <MenuItem value={30}>Artifacts</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={2} md={4}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="price"
                        name="price"
                        label="Price *"
                        variant="outlined"
                        size='small'
                        type={'number'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={2} md={4
                    }>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="score"
                        name="score"
                        label="Score *"
                        variant="outlined"
                        size='small'
                        type={'number'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <TextField 
                        id="file" 
                        type="file" 
                        name="file"
                        label="Image" 
                        variant="outlined" 
                        InputLabelProps={{ shrink: true}}   
                       // onChange={(event) => onChangeAddNews(event)}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="description"
                        name="description"
                        label="Description *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
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
                    <Grid item xs={4} sm={8} md={2}>
                        <Button 
                            type="submit"
                            onClick={()=>clickOpenAdd()}
                            //onClick={(event) => onAddNews(event)}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"rgb(204, 204, 204)", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Cancel
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        </Modal>
        <Modal
            open={openEdit}
            onClose={()=>clickOpenEdit()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80%",
                    height:"70%",
                    bgcolor: 'background.paper',
                    border: '2px solid #ff9900',
                    boxShadow: 24,
                    p: 4,
                    borderRadius:"10px"
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={8} md={12}>
                    <Typography 
                         sx={{ 
                            fontWeight:"bold",
                            color:"rgb(35, 54, 78)"
                        }} 
                        variant="h6"
                    >
                        Edit Gifts 
                    </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={6}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="name"
                        name="name"
                        label="Name *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={4} md={6}>
                    <FormControl fullWidth> 
                        <InputLabel id="demo-simple-select-label">Gift Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={age}
                            label="Age"
                            sx={{marginTop:"5px",height:"40px",padding:"8.5px 14px"}}
                            //onChange={handleChange}
                        >
                            <MenuItem value={10}>Food</MenuItem>
                            <MenuItem value={20}>Voucher</MenuItem>
                            <MenuItem value={30}>Artifacts</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={2} md={4}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="price"
                        name="price"
                        label="Price *"
                        variant="outlined"
                        size='small'
                        type={'number'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={2} md={4
                    }>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="score"
                        name="score"
                        label="Score *"
                        variant="outlined"
                        size='small'
                        type={'number'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <TextField 
                        id="file" 
                        type="file" 
                        name="file"
                        label="Image" 
                        variant="outlined" 
                        InputLabelProps={{ shrink: true}}   
                       // onChange={(event) => onChangeAddNews(event)}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="description"
                        name="description"
                        label="Description *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
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
                    <Grid item xs={4} sm={8} md={2}>
                        <Button 
                            type="submit"
                            onClick={()=>clickOpenEdit()}
                            //onClick={(event) => onAddNews(event)}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"rgb(204, 204, 204)", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Cancel
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        </Modal>
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
                                    <Grid item xs={1} sm={8} md={12}  display={{ xs: "none", md: "block", sm: "none"}}>
                                        <Box
                                            sx={{
                                            boxShadow: 'rgb(95 125 149 / 40%) 0px 4px 13px 0px',
                                            border: "2px solid #e0e0e0",
                                            borderRadius: '100%',
                                            width:"60px",
                                            height:"60px",
                                            backgroundColor:"rgb(42, 210, 95)",
                                            float:"right",
                                            }}
                                        >
                                            <IconButton onClick={()=>clickOpenAdd()} aria-label="delete">
                                                <AddCircleOutlineOutlinedIcon sx={{fontSize:40,color:"white"}} />
                                            </IconButton>
                                        </Box> 
                                    </Grid>
                                    <Grid item xs={1} sm={2} md={4}  display={{ xs: "none", md: "block", sm: "none"}}></Grid>
                                    <Grid item xs={1} sm={2} md={1} sx={{marginTop:"-40px"}}>
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
                                        </Grid>
                                        <Grid item xs={1} sm={2} md={1} sx={{marginTop:"-40px"}}>
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
                                    </Grid>
                                    <Grid item xs={1} sm={2} md={1} sx={{marginTop:"-40px"}}>
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
                                    </Grid>
                                    <Grid item xs={1} sm={2} md={1} sx={{marginTop:"-40px"}}>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
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
                                            marginBottom:"20px"
                                        }} 
                                       // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                       src={process.env.REACT_APP_FILE+'/reward/food_item.jpg'}>
                                    </img>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            float:"left",
                                        }}
                                    />
                                    <br></br><br></br><br></br>
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
                                        onClick={()=>clickOpenEdit()}
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
                                        Edit
                                    </Button>
                                    <Button 
                                        type="submit"
                                        //onClick={(event) => onAddNews(event)}
                                        sx={{
                                            height:40.5,
                                            width:"100%",
                                            border:"1px solid #ff9900",
                                            backgroundColor:"red", 
                                            color:"#ff9900",
                                            marginTop:"10px"
                                        }}
                                        size='medium' 
                                    >
                                        Delete
                                    </Button>
                                    </Box> 
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        </Grid>
        </Grid>        
    </Box>
    );
}

export default Gift;