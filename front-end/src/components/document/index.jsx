import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Stack, Backdrop } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import FolderIcon from "@mui/icons-material/Folder";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';

const Documents = (props) => {
  const navigate = useNavigate();
  const $token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [folders, setFolders] = useState([]);
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false)
  const [searchDocuments, setSearchDocuments] = useState([]);
  const clickOpenAdd = () => {
    setOpenAdd(!openAdd);
  };
  const clickOpenEdit = (event, id) => {
    setOpenEdit(!openEdit);
    for (var i = 0; i < folders.length; i++) {
      if (folders[i].id === id) {
        setEditFolders(folders[i]);
      }
    }
  };
  const [editFolders, setEditFolders] = useState({});
  const onChangeEditFolders = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    setEditFolders({ ...editFolders, [_name]: _value });
  };

  const onEditFolders = (e) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("name", editFolders.name);
    _formData.append("description", editFolders.description);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(
      process.env.REACT_APP_API + "/document/updateFolder/" + editFolders.id,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
            setLoading(false)
            toast.error(`You are not admin!!!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setError("");
          } else {
            setLoading(false)
            setError(json.error);
          }
        } else {
          setLoading(false)
          toast.success(`Update new successfully !!!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          setRender(!render);
          setOpenEdit(!openEdit);
        }
      });
  };
  const deleteFolders = (event, id, name) => {
    Swal.fire({
      title: 'Delete "' + name + '" Folders?',
      text: "Do you want to permanently delete this folders?",
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
    fetch(process.env.REACT_APP_API + "/document/destroyFolder/" + id, {
      method: "DELETE",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
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
          setLoading(false)
          setRender(!render);
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
  const [error, setError] = useState({
    name: null,
    description: null,
  });
  const [addFolders, setAddFolders] = useState({
    name: "",
    description: "",
  });
  const onChangeAddFolders = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    setAddFolders({ ...addFolders, [_name]: _value });
  };
  const onAddFolders = (e) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("name", addFolders.name);
    _formData.append("description", addFolders.description);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/document/createFolder", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
            setLoading(false)
            toast.error(`You are not admin!!!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setError("");
          } else {
            setLoading(false)
            setError(json.error);
          }
        } else {
          setLoading(false)
          toast.success(`Update folder successfully !!!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          setOpenAdd(!openAdd);
          setRender(!render);
        }
      });
  };
  const onChangeShare = (id) => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/document/changeShare/" + id, {
      method: "POST",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading(false)
          toast.error("Share failed.", {
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
          setLoading(false)
          setRender(!render);
          toast.success("Share successfully.", {
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
  const onChangeSearch = (e) => {
    if (e.target.value != "") {
      setSearch(true);
    } else {
      setSearch(false);
    }
    var a = [];
    for (var i = 0; i < folders.length; i++) {
      if (folders[i].name.indexOf(e.target.value) != -1) {
        a.push(folders[i]);
      } else {
        setSearchDocuments([]);
      }
    }
    setSearchDocuments(a);
  };
  const onSearch = (e) => {
    e.preventDefault();
  };
  const getDocuments = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/document/getAllFolder", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setFolders(data.data.reverse());
        setLoading(false)
      });
  };
  useEffect(() => {
    if ($token) {
      getDocuments();
    } else {
      navigate("/home");
    }
  }, [render]);
  return role == 1 ? (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        border: "1px solid rgb(227, 235, 241)",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openAdd}
        onClose={() => clickOpenAdd()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "70%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
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
                  fontWeight: "bold",
                  color: "rgb(35, 54, 78)",
                }}
                variant="h6"
              >
                New Folder
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextField
                helperText={error.name ? error.name[0] : null}
                error={error.name ? true : false}
                id="name"
                name="name"
                label="Name *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeAddFolders(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Description"
                name="description"
                onChange={(event) => onChangeAddFolders(event)}
                style={{
                  width: "100%",
                  border: "1px solid rgb(200, 200, 200)",
                  borderRadius: "5px",
                  paddingTop: "5px",
                  paddingLeft: "10px",
                }}
              />
              <span className="errorNotify">
                {error.description ? error.description : ""}
              </span>
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  onClick={(event) => onAddFolders(event)}
                  variant="contained"
                  size="medium"
                  sx={{
                    color: "#ffff",
                  }}
                >
                  Publish
                </Button>
                <Button
                  type="submit"
                  onClick={() => clickOpenAdd()}
                  variant="contained"
                  size="medium"
                  color="error"
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={() => clickOpenEdit()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "70%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
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
                  fontWeight: "bold",
                  color: "rgb(35, 54, 78)",
                }}
                variant="h6"
              >
                Edit Folder
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextField
                helperText={error.name ? error.name[0] : null}
                error={error.name ? true : false}
                id="name"
                name="name"
                value={editFolders.name}
                label="Name *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditFolders(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                value={editFolders.description}
                onChange={(event) => onChangeEditFolders(event)}
                name="description"
                style={{
                  width: "100%",
                  border: "1px solid rgb(200, 200, 200)",
                  borderRadius: "5px",
                  paddingTop: "5px",
                  paddingLeft: "10px",
                }}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  onClick={(event) => onEditFolders(event)}
                  sx={{
                    color: "#ffff",
                  }}
                  variant="contained"
                  size="medium"
                >
                  Publish
                </Button>
                <Button
                  type="submit"
                  onClick={() => clickOpenEdit()}
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Box
            sx={{
              borderBottom: "1px solid rgb(227, 235, 241)",
              padding: "20px",
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
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search By Name ...."
                    inputProps={{ "aria-label": "search by name..." }}
                    onChange={(event) => onChangeSearch(event)}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item xs={4} sm={2} md={5}></Grid>
              <Grid
                item
                xs={4}
                sm={3}
                md={3}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  onClick={(event) => clickOpenAdd(event)}
                  sx={{
                    height: 40.5,
                    width: "50%",
                    border: "1px solid #ff9900",
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                  }}
                  size="medium"
                >
                  <AddIcon /> New Folder
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Created By
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Created Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Share
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Number Of Files
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                      align="center"
                    >
                      <SettingsOutlinedIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!search ? (
                    folders.length ? (
                      folders.map((item, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Link
                                to={`view/${item.id}`}
                                style={{
                                  color: "rgba(0, 0, 0, 0.87)",
                                  textDecoration: "none",
                                }}
                              >
                                <FolderIcon
                                  sx={{ color: "rgb(79, 94, 113)" }}
                                />{" "}
                                {item.name ? item.name : "-"}
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              {item.author ? item.author : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.created_at
                                ? new Intl.DateTimeFormat("de-DE", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).format(new Date(item.created_at))
                                : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.description ? item.description : "-"}
                            </TableCell>
                            <TableCell align="right">
                              <Switch
                                defaultChecked={item.share === 1 ? true : false}
                                onChange={() => onChangeShare(item.id)}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              {item.sum ? item.sum : 0}
                            </TableCell>
                            <TableCell>
                              <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                              >
                                <Grid item xs={2} sm={4} md={6}>
                                  <Box
                                    onClick={(event) =>
                                      clickOpenEdit(event, item.id)
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      padding: "5px",
                                      borderRadius: "3px",
                                      float: "right",
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{ color: "blue" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={2} sm={4} md={6}>
                                  <Box
                                    onClick={(event) =>
                                      deleteFolders(event, item.id, item.name)
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      float: "left",
                                      padding: "5px",
                                      borderRadius: "3px",
                                    }}
                                  >
                                    <DeleteOutlinedIcon sx={{ color: "red" }} />
                                  </Box>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : null
                  ) : searchDocuments.length ? (
                    searchDocuments.map((item, index) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Link
                              to={`view/${item.id}`}
                              style={{
                                color: "rgba(0, 0, 0, 0.87)",
                                textDecoration: "none",
                              }}
                            >
                              <FolderIcon sx={{ color: "rgb(79, 94, 113)" }} />{" "}
                              {item.name ? item.name : "-"}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            {item.author ? item.author : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {item.created_at
                              ? new Intl.DateTimeFormat("de-DE", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }).format(new Date(item.created_at))
                              : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {item.description ? item.description : "-"}
                          </TableCell>
                          <TableCell align="right">
                            <Switch
                              defaultChecked={item.share === 1 ? true : false}
                              onChange={() => onChangeShare(item.id)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {item.sum ? item.sum : 0}
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                              <Grid item xs={2} sm={4} md={6}>
                                <Box
                                  onClick={(event) =>
                                    clickOpenEdit(event, item.id)
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    padding: "5px",
                                    borderRadius: "3px",
                                    float: "right",
                                  }}
                                >
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ color: "blue" }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={4} md={6}>
                                <Box
                                  onClick={(event) =>
                                    deleteFolders(event, item.id, item.name)
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    float: "left",
                                    padding: "5px",
                                    borderRadius: "3px",
                                  }}
                                >
                                  <DeleteOutlinedIcon sx={{ color: "red" }} />
                                </Box>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <Typography
                      align="center"
                      variant="h4"
                      sx={{
                        mb: 1.5,
                        color: "rgb(105, 129, 148)",
                        align: "center",
                      }}
                    >
                      No data found
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        border: "1px solid rgb(227, 235, 241)",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Box
            sx={{
              borderBottom: "1px solid rgb(227, 235, 241)",
              padding: "20px",
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
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search By Name ...."
                    inputProps={{ "aria-label": "search by name..." }}
                    onChange={(event) => onChangeSearch(event)}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Created By
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Created Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Number Of Files
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!search ? (
                    folders.length ? (
                      folders.map((item, index) => {
                        if (item.share == 1) {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Link
                                  to={`view/${item.id}`}
                                  style={{
                                    color: "rgba(0, 0, 0, 0.87)",
                                    textDecoration: "none",
                                  }}
                                >
                                  <FolderIcon
                                    sx={{ color: "rgb(79, 94, 113)" }}
                                  />{" "}
                                  {item.name ? item.name : "-"}
                                </Link>
                              </TableCell>
                              <TableCell align="right">
                                {item.author ? item.author : "-"}
                              </TableCell>
                              <TableCell align="right">
                                {item.created_at
                                  ? new Intl.DateTimeFormat("de-DE", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(new Date(item.created_at))
                                  : "-"}
                              </TableCell>
                              <TableCell align="right">
                                {item.description ? item.description : "-"}
                              </TableCell>
                              <TableCell align="right">
                                {item.sum ? item.sum : 0}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })
                    ) : null
                  ) : searchDocuments.length ? (
                    searchDocuments.map((item, index) => {
                      if (item.share == 1) {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Link
                                to={`view/${item.id}`}
                                style={{
                                  color: "rgba(0, 0, 0, 0.87)",
                                  textDecoration: "none",
                                }}
                              >
                                <FolderIcon
                                  sx={{ color: "rgb(79, 94, 113)" }}
                                />{" "}
                                {item.name ? item.name : "-"}
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              {item.author ? item.author : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.created_at
                                ? new Intl.DateTimeFormat("de-DE", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).format(new Date(item.created_at))
                                : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.description ? item.description : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.sum ? item.sum : 0}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })
                  ) : (
                    <Typography
                      align="center"
                      variant="h4"
                      sx={{
                        mb: 1.5,
                        color: "rgb(105, 129, 148)",
                        align: "center",
                      }}
                    >
                      No data found
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Documents;
