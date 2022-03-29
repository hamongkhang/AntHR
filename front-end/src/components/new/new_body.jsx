import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Backdrop } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function NewBody(props) {
  const [loading, setLoading] = useState(false);
  const clickRender = (ren) => {
    props.onRender(ren);
  };
  const deleteNews = (event, id, title) => {
    Swal.fire({
      title: 'Delete "' + title + '" News?',
      text: "Do you want to permanently delete this news?",
      icon: "warning",
      marginTop: "200px",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };
  const onDelete = (id) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("id", id);
    fetch(process.env.REACT_APP_API + "/new/destroyNew/" + id, {
      method: "DELETE",
      body: _formData,
      headers: { Authorization: `Bearer ` + props.token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading(false)
          toast.error("Delete Failed.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          clickRender(!props.renderR);
          setLoading(false)
          toast.success("Deleted successfully.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        paddingLeft: "40px",
        paddingRight: "40px",
        maxWidth: "100%",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginBottom: "15px",
        border: "solid 1px #cfd8dc",
      }}
    >
       <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={3} sm={7} md={11}>
          <Link to={`view/${props.data.id}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "black",
              }}
              color="text.secondary"
              variant="h6"
            >
              {props.data.title}
              {props.data.important === 1 ? (
                <Button
                  disabled
                  sx={{
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                    marginLeft: "8px",
                    height: 22,
                  }}
                >
                  Important
                </Button>
              ) : null}
            </Typography>
          </Link>
          <Typography
            sx={{
              fontSize: "medium",
              mb: 1.5,
              color: "rgb(105, 129, 148)",
            }}
            color="text.secondary"
          >
            <AlarmIcon
              sx={{
                fontSize: "large",
                marginRight: "5px",
                marginBottom: "5px",
              }}
            />
            {new Intl.DateTimeFormat("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(props.data.updated_at))}{" "}
            | Admin
          </Typography>
        </Grid>
        {props.role == 1 ? (
          <Grid item xs={1} sm={1} md={1} sx={{ display: "flex" }}>
            <IconButton aria-label="delete">
              <Link to={`edit/${props.data.id}`}>
                <EditIcon />
              </Link>
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon
                sx={{ color: "red" }}
                onClick={(event) =>
                  deleteNews(event, props.data.id, props.data.title)
                }
              />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}
