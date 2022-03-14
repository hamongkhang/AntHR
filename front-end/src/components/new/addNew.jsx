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
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddNew=(props)=>{
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [error, setError] = useState({
      title:null,
      content:null,
      important:null,
      file:null
    });
    const [addNews, setAddNews] = useState({
      title:'',
      content:'',
      important:'',
      file:''
    });
    const onChangeAddNews = (event) => {
      let _name = event.target.name;
      let _type = event.target.type;
      let _value = event.target.value;
      if(_type === "file"){
          setAddNews({...addNews,['file']:event.target.files[0]});
      }
      else{
        setAddNews({...addNews,[_name]:_value});
      }
  };
  const onAddNews = (e) => {
    const _formData = new FormData();
    _formData.append('title', addNews.title);
    _formData.append('file', addNews.file);
    if(checked){
      _formData.append('important', 1);
    }else{
      _formData.append('important', 0);
    }
    if(draftToHtml(convertToRaw(editorState.getCurrentContent()))===draftToHtml(convertToRaw(EditorState.createEmpty().getCurrentContent()))){
      _formData.append('content', '');
    }else{
      _formData.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
    const requestOptions = {
        method: 'POST',
        body: _formData,
        headers: {"Authorization": `Bearer `+props.token}
    };
    fetch(process.env.REACT_APP_API+'/new/createNew', requestOptions)
        .then((res) => res.json())
        .then((json) => {
          if(json.error){
            if (json.error === 'You are not admin!!!') {
              toast.error(`You are not admin!!!`, {
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
            toast.success(`Create new successfully !!!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });       
              setError('');
          }
        });
};
    return(
        <div maxWidth="100%" style={{ backgroundColor: '#eceff1', height: '100%',paddingLeft:"240px",paddingTop:"40px",paddingRight:"240px",paddingBottom:"40px" }}>
            <Box maxWidth="100%" style={{ backgroundColor: 'white', maxHeight: '100%',paddingRight:"40px", paddingLeft:"40px", paddingTop:"32px", paddingBottom:"32px", border:"solid 1px #cfd8dc",borderRadius:"5px", }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={4} sm={8} md={12} sx={{display:"flex"}}>
               <IconButton aria-label="delete" onClick={()=>window.location.reload()}>
                <ArrowBackIcon />
              </IconButton>
                <Typography 
                  sx={{ 
                    fontWeight:"bold",
                    marginTop:"8.5px",
                    color:"rgb(35, 54, 78)"
                  }} 
                  variant="h7"
                >
                  Back
                </Typography>
            </Grid>
               
              <Grid item xs={4} sm={8} md={12}>
                <Typography 
                  sx={{ 
                    fontWeight:"bold",
                    color:"rgb(35, 54, 78)"
                  }} 
                  variant="h6"
                >
                  Create News 
                </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
                <TextField
                  helperText={error.title?error.title[0]:null}
                  error={error.title?true:false}
                  id="title"
                  name="title"
                  label="Title *"
                  variant="outlined"
                  size='small'
                  type={'text'}
                  sx={{marginTop:'5px',width:"100%"}}
                  InputLabelProps={{ shrink: true}}
                  onChange={(event) => onChangeAddNews(event)}
                />
            </Grid>
            <Grid item xs={4} sm={8} md={12} sx={{display:"flex"}}>
                <Checkbox
                    sx={{marginTop:"-8px"}}
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography 
                  sx={{ 
                    color:"rgb(35, 54, 78)"
                  }} 
                  variant="h7"
                >
                  Mark as important 
                </Typography>
              </Grid>
             <Grid item xs={4} sm={8} md={12}>
                <Typography 
                  sx={{ 
                    color:error.content?"#d32f2f":"rgb(35, 54, 78)",
                  }} 
                  variant="h7"
                >
                  Content *
                </Typography>
                <Box 
                  sx={{
                    border:error.content?"solid 1px #d32f2f":"solid 1px rgb(212, 223, 231)",
                    borderRadius:"5px"
                  }}
                >
                  <Editor
                    defaultEditorState={editorState}
                    onEditorStateChange={editorState => {
                    setEditorState(editorState);
                  }}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </Box>
                <span className="errorNotify">{error.content?error.content:""}</span>
            </Grid>
             <Grid item xs={4} sm={8} md={12}>
                <TextField 
                  id="file" 
                  type="file" 
                  name="file"
                  label="Document" 
                  variant="outlined" 
                  InputLabelProps={{ shrink: true}}   
                  onChange={(event) => onChangeAddNews(event)}
                />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
                <Button 
                  type="submit"
                  onClick={(event) => onAddNews(event)}
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
      </div>
    );
}
export default AddNew;