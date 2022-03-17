import React,{useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from 'react-toastify';
import { NavigationType, useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ActiveAccount=(props)=>{
  const navigate = useNavigate();
  const [error, setError] = useState({
    email:null,
    password:null,
    confirm_password:null,
  });
  const [account, setAccount] = useState({
    email:'',
    password:'',
    confirm_password:'',
  });
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      setAccount({...account, ['password']: event.target.value})
    };
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [values2, setValues2] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange2 = (prop) => (event) => {
      setValues2({ ...values2, [prop]: event.target.value });
      setAccount({...account,['confirm_password']: event.target.value})
    };
    const handleClickShowPassword2 = () => {
      setValues2({
        ...values2,
        showPassword: !values2.showPassword,
      });
    };
    const handleMouseDownPassword2 = (event) => {
      event.preventDefault();
    };
    const handleChangeEmail= (event) => {
      setAccount({...account,['email']: event.target.value})
    };
    const onActiveAccount = (e) => {
      const _formData = new FormData();
      _formData.append('email', account.email);
      _formData.append('password', account.password);
      _formData.append('confirm_password', account.confirm_password);
      const requestOptions = {
          method: 'POST',
          body: _formData,
      };
      fetch(process.env.REACT_APP_API+'/employee/createAccount', requestOptions)
          .then((res) => res.json())
          .then((json) => {
            if(json.error){
              if (json.error === 'No one account') {
                toast.error(`You have not been created an account by admin !!!`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError('');
            }else{
                setError(json.error);
            }
            }else{
              toast.success(`Active account successfully !!!`, {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });       
                setError('');
                navigate("/login");
            }
          });
  };
    return(
        <Box maxWidth="100%" sx={{height: '100%',paddingLeft:"10px",paddingTop:"40px",paddingRight:"10px",paddingBottom:"40px"}}>
           <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
              <Grid item xs={0.5} sm={2} md={4}></Grid>
              <Grid item xs={3} sm={4} md={4}>
              <Box maxWidth="100%" style={{ backgroundColor: 'white', maxHeight: '100%',paddingRight:"40px", paddingLeft:"40px", paddingTop:"32px", paddingBottom:"32px", border:"solid 1px #cfd8dc",borderRadius:"5px", }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={8} md={12}>
                <Typography
                  sx={{ 
                    color:"rgb(35, 54, 78)",
                    fontSize:"20px",
                    lineHeight:"24px",
                    fontWeight:"bold",
                    mb:1
                  }} 
                >
                  Welcome to AntHR !!!
                </Typography>
                <Typography
                  sx={{ 
                    color:"rgb(35, 54, 78)",                    
                    fontSize:"15px",
                    lineHeight:"24px",
                  }} 
                >
                  First, let’s set up your account with us.
                </Typography>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                <Typography
                  sx={{ 
                    color:"rgb(60, 82, 100)",
                    fontSize:"14px",
                    lineHeight:"24px",
                    fontWeight:"bold",
                    mb:1
                  }} 
                >
                  Email Address *
                </Typography>
                <TextField
                  helperText={error.email?error.email[0]:null}
                  error={error.email?true:false}
                  id="email"
                  name="email"
                  label="Email Address *"
                  variant="outlined"
                  size='small'
                  type={'text'}
                  sx={{marginTop:'5px',width:"100%"}}
                  InputLabelProps={{ shrink: true}}
                 onChange={(event) => handleChangeEmail(event)}
                />
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                <Typography
                  sx={{ 
                    color:"rgb(60, 82, 100)",
                    fontSize:"14px",
                    lineHeight:"24px",
                    fontWeight:"bold",
                    mb:1
                  }} 
                >
                  Password *
                </Typography>
                <FormControl sx={{marginTop:'5px',width:"100%"}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={handleChange('password')}
                      error={error.password?true:false}
                      endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      }
                      label="Password"
                  />
                  </FormControl>
                  <span className="errorNotify">{error.password?error.password:""}</span>
                  </Grid>
                  <Grid item xs={4} sm={8} md={12}>
                  <Typography
                  sx={{ 
                    color:"rgb(60, 82, 100)",
                    fontSize:"14px",
                    lineHeight:"24px",
                    fontWeight:"bold",
                    mb:1
                  }} 
                >
                  Confirm password *
                </Typography>
                <FormControl sx={{marginTop:'5px',width:"100%"}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values2.showPassword ? 'text' : 'password'}
                      onChange={handleChange2('password')}
                      error={error.confirm_password?true:false}
                      endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                        >
                          {values2.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      }
                      label="Confirm password"
                  />
                  </FormControl>
                  <span className="errorNotify">{error.confirm_password?error.confirm_password:""}</span>
                  </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <Button 
                  type="submit"
                  onClick={(event) => onActiveAccount(event)}
                  sx={{
                    height:40.5,
                    width:"100%",
                    border:"1px solid #ff9900",
                    backgroundColor:"#FFFF66", 
                    color:"#ff9900"
                  }}
                  size='medium' 
                  >
                  Active my account
                </Button>
              </Grid> 
            </Grid>
            </Box>
              </Grid>
              <Grid item xs={0.5} sm={2} md={4}></Grid>
            </Grid>
      </Box>
    );
}
export default ActiveAccount;