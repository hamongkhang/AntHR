import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from "react-router-dom";
import AlarmIcon from '@mui/icons-material/Alarm';
import { Backdrop } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

toast.configure();
const NewView = (props) => {
  const $token = localStorage.getItem('access_token');
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true)
  let { id } = useParams();

  const [editNews, setEditNews] = useState({});
  const getOneNews = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + '/new/getOneNew/' + id, {
      method: "GET",
      headers: { "Authorization": `Bearer ` + $token }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setLoading(false)
          toast.error('Loading Failed', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else {
          setLoading(false)
          setEditNews(data.data);
        }

      });
  }
  useEffect(() => {
    if ($token) {
      getOneNews();
    }
  }, [render])
  return (
    <div maxWidth="100%" style={{ height: '100%', paddingLeft: "100px", paddingTop: "40px", paddingRight: "100px", paddingBottom: "40px" }}>
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box maxWidth="100%" style={{ backgroundColor: 'white', maxHeight: '100%', paddingRight: "40px", paddingLeft: "40px", paddingTop: "32px", paddingBottom: "32px", border: "solid 1px #cfd8dc", borderRadius: "5px", }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12} sx={{ display: "flex" }}>
            <Link to={`/home/news`}>
              <IconButton aria-label="delete">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography
              sx={{
                fontWeight: "bold",
                marginTop: "8.5px",
                color: "rgb(35, 54, 78)"
              }}
              variant="h7"
            >
              Back
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "black"
              }}
              color="text.secondary"
              variant="h6"
            >
              {editNews.title}
              {editNews.important === 1 ?
                <Button
                  disabled
                  sx={{
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                    marginLeft: '8px',
                    height: 22
                  }}
                >
                  Important
                </Button> : null}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12} sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: "medium",
                mb: 1.5,
                color: "rgb(105, 129, 148)",
              }}
              color="text.secondary"
            >
              <AlarmIcon sx={{ fontSize: "large", marginRight: "5px", marginBottom: "5px" }} />
              {editNews.updated_at ? new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', month: 'long', day: 'numeric'
              }).format(new Date(editNews.updated_at)) : null} | Admin
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={12}>
            <Box
              sx={{
                padding: "12px"
              }}
              dangerouslySetInnerHTML={{
                __html: editNews.content
              }}>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default NewView;