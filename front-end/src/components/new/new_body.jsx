
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function NewBody(props){

  return (
    <Box 
     sx={{
      backgroundColor:"white",
      paddingLeft:"40px",
      paddingRight:"40px",
      maxWidth:"100%",
      paddingTop:"10px",
      paddingBottom:"10px",
      marginBottom:"15px",
      border:"solid 1px #cfd8dc"
    }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={3} sm={7} md={11}>
                <Typography 
                  sx={{ 
                    fontWeight:"bold",
                    mb: 1,
                    color:"black"
                  }} 
                  color="text.secondary" 
                  variant="h6"
                >
                  {props.data.title} 
                  {props.data.important===1?
                  <Button 
                    disabled
                    sx={{
                      backgroundColor:"#FFFF66", 
                      color:"#ff9900",
                      marginLeft:'8px',
                      height:22
                    }}
                  >
                    Important
                  </Button>:null}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize:"medium",
                    mb: 1.5,
                    color:"rgb(105, 129, 148)",
                  }} 
                  color="text.secondary" 
                >
                 <AlarmIcon sx={{fontSize:"large",marginRight:"5px",marginBottom:"5px"}}/>
                                                {new Intl.DateTimeFormat('de-DE', { 
                                                    year: 'numeric', month: 'long', day: 'numeric' 
                                                }).format(new Date(props.data.updated_at))} | Admin
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} sx={{display:"flex"}}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon sx={{color:"red"}} />
              </IconButton>
              </Grid>
            </Grid>
    </Box>
  );
}
