import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Backdrop, Stack } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Modal from "@mui/material/Modal";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TextField from "@mui/material/TextField";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import CircularProgress from "@mui/material/CircularProgress";

const DocumentView = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const $token = localStorage.getItem("access_token");
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchDocuments, setSearchDocuments] = useState([]);
  const [render, setRender] = useState(false);
  const role = localStorage.getItem("role");
  const [error, setError] = useState({
    name: null,
    description: null,
  });
  const [addDocuments, setAddDocuments] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const onChangeAddDocuments = (event) => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append("name", event.target.files[0]);
    _formData.append("size", event.target.files[0].size);
    _formData.append("name_show", event.target.files[0].name);
    _formData.append("folder_id", id);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(
      process.env.REACT_APP_API + "/document/createDocument",
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
            setLoading(false);
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
            setLoading(false);
            toast.error("khang", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          setLoading(false);
          toast.success(`Create document successfully !!!`, {
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
        }
      });
  };

  const getOneDocumentFolders = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + "/document/getOneFolder/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data.data.reverse());
        setLoading(false);
      });
  };
  const deleteDocuments = (event, id, name) => {
    Swal.fire({
      title: 'Delete "' + name + '" Files?',
      text: "Do you want to permanently delete this file?",
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
    setLoading(true);
    const _formData = new FormData();
    _formData.append("id", id);
    fetch(process.env.REACT_APP_API + "/document/destroyDocument/" + id, {
      method: "DELETE",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
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
          setLoading(false);
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
  const downloadDocuments = (event, id, name) => {
    window.location.href =
      process.env.REACT_APP_API + "/document/downloadDocument/" + id;
  };

  const onChangeSearch = (e) => {
    if (e.target.value != "") {
      setSearch(true);
    } else {
      setSearch(false);
    }
    var a = [];
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].name_show.indexOf(e.target.value) != -1) {
        a.push(documents[i]);
      } else {
        setSearchDocuments([]);
      }
    }
    setSearchDocuments(a);
  };
  const onSearch = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if ($token) {
      getOneDocumentFolders();
    } else {
      navigate("/home");
    }
  }, [render]);
  const getFile = (event) => {
    document.getElementById("fileUpload").click();
    setUploadFile(!uploadFile);
  };
  const [openModal, setOpenModal] = useState(false);
  const clickOpenModal = (event) => {
    setOpenModal(!openModal);
  };
  const [uploadFile, setUploadFile] = useState(false);
  const clickUploadFileShow = (event) => {
    setUploadFile(!uploadFile);
  };
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editDocuments, setEditDocuments] = useState({});

  const EditDocumentShow = (event, id, name) => {
    setOpenModalEdit(!openModalEdit);
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].id === id) {
        setEditDocuments(documents[i]);
      }
    }
  };
  const onChangeEditDocuments = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    setEditDocuments({ ...editDocuments, [_name]: _value });
  };
  const onChangeEditDocumentFile = (event) => {
    setEditDocuments({
      ...editDocuments,
      ["name_show"]: event.target.files[0].name,
      ["name"]: event.target.files[0],
      ["size"]: event.target.files[0].size,
    });
  };
  const onEditDocuments = (e) => {
    setLoading(true);
    const _formData = new FormData();
    _formData.append("name_show", editDocuments.name_show);
    _formData.append("name", editDocuments.name);
    _formData.append("size", editDocuments.size);
    _formData.append("folder_id", id);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(
      process.env.REACT_APP_API +
        "/document/updateDocument/" +
        editDocuments.id,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
            setLoading(false);
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
            setLoading(false);
            setError(json.error);
          }
        } else {
          setLoading(false);
          toast.success(`Update document successfully !!!`, {
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
          setOpenModalEdit(!openModalEdit);
        }
      });
  };
  const uploadGoogleDrive = (event) => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + "/google_document/checkGoogleDocument/", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        localStorage.setItem("folder_id", id);
        window.location.href = data.data;
      });
  };
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
        sx={{ color: "orange", zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openModal}
        onClose={(event) => clickOpenModal(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <iframe
            src="https://docs.google.com/gview?url=www.khuyenmaihcmc.vn/files/Ho_so/Huong_dan_su_dung_trang_web.docx&embedded=true"
            style={{ width: "100%", height: "100%" }}
            frameBorder={0}
          />
        </Box>
      </Modal>
      <Modal
        open={openModalEdit}
        onClose={(event) => EditDocumentShow(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "60%",
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
                Edit Document
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextField
                helperText={error.name ? error.name[0] : null}
                error={error.name ? true : false}
                id="name_show"
                name="name_show"
                value={editDocuments.name_show}
                label="Name *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditDocuments(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <InputBase
                type="file"
                id="fileEdit"
                name="name"
                onChange={(event) => onChangeEditDocumentFile(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={6}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  onClick={(event) => onEditDocuments(event)}
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
                  onClick={() => EditDocumentShow()}
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
      <Modal
        open={uploadFile}
        onClose={(event) => clickUploadFileShow(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "40%",
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
                Upload File
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={8} md={4}>
                  <Button
                    type="submit"
                    onClick={(event) => getFile(event)}
                    sx={{
                      height: 40.5,
                      width: "100%",
                      border: "1px solid #ff9900",
                      backgroundColor: "#FFFF66",
                      color: "#ff9900",
                    }}
                    size="medium"
                  >
                    <ImportantDevicesIcon />
                    &nbsp; Upload
                  </Button>
                </Grid>
                <Grid item xs={4} sm={8} md={8}>
                  <Typography
                    sx={{
                      color: "rgb(35, 54, 78)",
                      fontSize: "16px",
                      marginTop: "8px",
                    }}
                  >
                    Upload file from your Computer
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={8} md={4}>
                  <Button
                    type="submit"
                    onClick={(event) => uploadGoogleDrive(event)}
                    sx={{
                      height: 40.5,
                      width: "100%",
                      border: "1px solid #ff9900",
                      backgroundColor: "#FFFF66",
                      color: "#ff9900",
                    }}
                    size="medium"
                  >
                    <AddToDriveIcon />
                    &nbsp; Upload
                  </Button>
                </Grid>
                <Grid item xs={4} sm={8} md={8}>
                  <Typography
                    sx={{
                      color: "rgb(35, 54, 78)",
                      fontSize: "16px",
                      marginTop: "8px",
                    }}
                  >
                    Upload file from your Google Drive
                  </Typography>
                </Grid>
              </Grid>
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
                    onClick={(event) => onSearch(event)}
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item xs={4} sm={2} md={5}></Grid>
              <Grid item xs={4} sm={3} md={3}>
                <InputBase
                  type="file"
                  id="fileUpload"
                  name="name"
                  onChange={(event) => onChangeAddDocuments(event)}
                  sx={{
                    display: "none",
                  }}
                />
                <Button
                  type="submit"
                  onClick={(event) => clickUploadFileShow(event)}
                  sx={{
                    height: 40.5,
                    width: "100%",
                    border: "1px solid #ff9900",
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                  }}
                  size="medium"
                >
                  <CloudUploadOutlinedIcon />
                  &nbsp; Upload
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
                      align="right"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Size
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
                    documents.length ? (
                      documents.map((item, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(event) => clickOpenModal(event)}
                            >
                              <ArticleIcon sx={{ color: "#1890ff" }} />{" "}
                              {item.name_show ? item.name_show : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.size ? item.size : "-"} KB
                            </TableCell>
                            <TableCell>
                              <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 6, sm: 8, md: 12 }}
                              >
                                <Grid item xs={1} sm={1} md={1.5}></Grid>
                                <Grid item xs={2} sm={2} md={3}>
                                  <Box
                                    onClick={(event) =>
                                      downloadDocuments(
                                        event,
                                        item.id,
                                        item.name_show
                                      )
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <DownloadOutlinedIcon
                                      sx={{ color: "rgb(42, 210, 95)" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={2} sm={2} md={3}>
                                  <Box
                                    onClick={(event) =>
                                      EditDocumentShow(
                                        event,
                                        item.id,
                                        item.name_show
                                      )
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{ color: "blue" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={2} sm={2} md={3}>
                                  <Box
                                    onClick={(event) =>
                                      deleteDocuments(
                                        event,
                                        item.id,
                                        item.name_show
                                      )
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <DeleteOutlinedIcon sx={{ color: "red" }} />
                                  </Box>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1.5}></Grid>
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
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={(event) => clickOpenModal(event)}
                          >
                            <ArticleIcon sx={{ color: "#1890ff" }} />{" "}
                            {item.name_show ? item.name_show : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {item.size ? item.size : "-"} KB
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 6, sm: 8, md: 12 }}
                            >
                              <Grid item xs={1} sm={1} md={1.5}></Grid>
                              <Grid item xs={2} sm={2} md={3}>
                                <Box
                                  onClick={(event) =>
                                    downloadDocuments(
                                      event,
                                      item.id,
                                      item.name_show
                                    )
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "3px",
                                    textAlign: "center",
                                  }}
                                >
                                  <DownloadOutlinedIcon
                                    sx={{ color: "rgb(42, 210, 95)" }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={2} md={3}>
                                <Box
                                  onClick={(event) =>
                                    EditDocumentShow(
                                      event,
                                      item.id,
                                      item.name_show
                                    )
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "3px",
                                    textAlign: "center",
                                  }}
                                >
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ color: "blue" }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={2} md={3}>
                                <Box
                                  onClick={(event) =>
                                    deleteDocuments(
                                      event,
                                      item.id,
                                      item.name_show
                                    )
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "3px",
                                    textAlign: "center",
                                  }}
                                >
                                  <DeleteOutlinedIcon sx={{ color: "red" }} />
                                </Box>
                              </Grid>
                              <Grid item xs={1} sm={1} md={1.5}></Grid>
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
                      }}
                      color="text.secondary"
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
        sx={{ color: "orange", zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openModal}
        onClose={(event) => clickOpenModal(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <iframe
            src="https://docs.google.com/gview?url=www.khuyenmaihcmc.vn/files/Ho_so/Huong_dan_su_dung_trang_web.docx&embedded=true"
            style={{ width: "100%", height: "100%" }}
            frameBorder={0}
          />
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
                    onClick={(event) => onSearch(event)}
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
                      align="right"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "rgb(101, 114, 131)",
                      }}
                    >
                      Size
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
                    documents.length ? (
                      documents.map((item, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              onClick={(event) => clickOpenModal(event)}
                            >
                              <ArticleIcon sx={{ color: "#1890ff" }} />{" "}
                              {item.name_show ? item.name_show : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {item.size ? item.size : "-"} KB
                            </TableCell>
                            <TableCell>
                              <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 6, sm: 8, md: 12 }}
                              >
                                <Grid item xs={1} sm={1} md={4.5}></Grid>
                                <Grid item xs={2} sm={2} md={3}>
                                  <Box
                                    onClick={(event) =>
                                      downloadDocuments(
                                        event,
                                        item.id,
                                        item.name_show
                                      )
                                    }
                                    sx={{
                                      backgroundColor: "rgb(224, 230, 234)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <DownloadOutlinedIcon
                                      sx={{ color: "rgb(42, 210, 95)" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={1} sm={1} md={4.5}></Grid>
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
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={(event) => clickOpenModal(event)}
                          >
                            <ArticleIcon sx={{ color: "#1890ff" }} />{" "}
                            {item.name_show ? item.name_show : "-"}
                          </TableCell>
                          <TableCell align="right">
                            {item.size ? item.size : "-"} KB
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 6, sm: 9, md: 12 }}
                            >
                              <Grid item xs={2} sm={1} md={4.5}></Grid>
                              <Grid item xs={2} sm={3} md={3}>
                                <Box
                                  onClick={(event) =>
                                    downloadDocuments(
                                      event,
                                      item.id,
                                      item.name_show
                                    )
                                  }
                                  sx={{
                                    backgroundColor: "rgb(224, 230, 234)",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "3px",
                                    textAlign: "center",
                                  }}
                                >
                                  <DownloadOutlinedIcon
                                    sx={{ color: "rgb(42, 210, 95)" }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={1} md={4.5}></Grid>
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
                      }}
                      color="text.secondary"
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
export default DocumentView;
