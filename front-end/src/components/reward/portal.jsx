import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ApprovalIcon from "@mui/icons-material/Approval";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Stack, Backdrop } from "@mui/material";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CircularProgress from '@mui/material/CircularProgress';

const Portal = (props) => {
  const $token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const id_user = localStorage.getItem("id");
  const [showComment, setShowComment] = useState(false);
  const [render, setRender] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [praise, setPraise] = useState([]);
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState([]);
  const [praise1, setPraise1] = useState([]);
  const navigate = useNavigate();
  const [addComment, setAddComment] = useState({
    praise_id: "",
    messeger: "",
  });
  const [loading, setLoading] = useState({
    load1: true, load2: true, load3: true, load4: true, load5: true
  })
  const sumLike = (id) => {
    var sum = 0;
    for (var i = 0; i < like.lengh; i++) {
      if (like[i].praise_id === id) {
        sum = sum + 1;
      }
    }
    return sum;
  };
  const sumComment = (id) => {
    var sum = 0;
    for (var i = 0; i < comment.length; i++) {
      if (comment[i].praise_id === id) {
        sum = sum + 1;
      }
    }
    return sum;
  };
  const checkLike = (id) => {
    for (var i = 0; i < like.length; i++) {
      if (like[i].user_id == id_user && like[i].praise_id == id) {
        return true;
      }
    }
    return false;
  };
  const onChangeAddComment = (event) => {
    setAddComment({ ...addComment, ["messeger"]: event.target.value });
  };
  const onClickAddComment = (event, id) => {
    setAddComment({ ...addComment, ["praise_id"]: id });
    setShowComment(!showComment);
  };
  const clickShowComment = () => {
    setShowComment(!showComment);
  };
  const onChangeAddLike = (e, id) => {
    const _formData = new FormData();
    _formData.append("praise_id", id);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/praise/createLike", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
        } else {
          setRender(!render);
        }
      });
  };
  const onAddComment = (e) => {
    const _formData = new FormData();
    _formData.append("praise_id", addComment.praise_id);
    _formData.append("messeger", addComment.messeger);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/praise/createComment", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
        } else {
          setRender(!render);
        }
      });
  };
  const getEmployees = () => {
    setLoading({ ...loading, load1: true })
    fetch(process.env.REACT_APP_API + "/employee/getAllEmployee", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.data[1].reverse());
        setLoading({ ...loading, load1: false })

      });
  };
  const getLike = () => {
    setLoading({ ...loading, load2: true })
    fetch(process.env.REACT_APP_API + "/praise/getAllLike", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading({ ...loading, load2: false })

        setLike(data.data.reverse());
      });
  };
  const getComment = () => {
    setLoading({ ...loading, load3: true })
    fetch(process.env.REACT_APP_API + "/praise/getAllComment", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setComment(data.data);
        setLoading({ ...loading, load3: false })
      });
  };
  const getPraise = () => {
    setLoading({ ...loading, load4: true })
    fetch(process.env.REACT_APP_API + "/praise/getAllPraise", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading({ ...loading, load4: false })
        setPraise(data.data.reverse());
      });
  };
  const getPraise2 = () => {
    setLoading({ ...loading, load5: true })
    fetch(process.env.REACT_APP_API + "/praise/getAllPraise", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setPraise1(data.data);
        setLoading({ ...loading, load5: false })
      });
  };
  const onPublicPraise = (event, id) => {
    setLoading({load1:true,load2:true,load3:true,load4:true,load5:true})
    fetch(process.env.REACT_APP_API + "/praise/changeStatus/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading({load1:false,load2:false,load3:false,load4:false,load5:false})
          toast.error("Public Failed.", {
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
          setRender(!render);
          setLoading({load1:false,load2:false,load3:false,load4:false,load5:false})
          toast.success("Public successfully.", {
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
  const onBlockPraise = (event, id) => {
    Swal.fire({
      title: "Delete this news?",
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
        onBlock(id);
        setLoading({load1:false,load2:false,load3:false,load4:false,load5:false})
      }
    });
  };
  const onBlock = (id) => {
    setLoading({load1:true,load2:true,load3:true,load4:true,load5:true})
    fetch(process.env.REACT_APP_API + "/praise/destroyPraise/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading({load1:false,load2:false,load3:false,load4:false,load5:false})
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
          setRender(!render);
          setLoading({load1:false,load2:false,load3:false,load4:false,load5:false})
          toast.success("Delete successfully.", {
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
  const onClickBlockHistory = (event, id) => {
    Swal.fire({
      title: "Delete this news?",
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
        onBlock(id);
      }
    });
  };
  useEffect(() => {
    if ($token) {
      getEmployees();
      getPraise();
      getLike();
      getComment();
      getPraise2();
    } else {
      navigate("/home");
    }
  }, [render]);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100vh",
        borderRadius: "5px",
      }}
    >
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading.load1 && loading.load2 && loading.load3 && loading.load4 && loading.load5}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={showComment}
        onClose={() => clickShowComment()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "90%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={8} md={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(35, 54, 78)",
                  }}
                  variant="h6"
                >
                  Comment List
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={6}></Grid>
              <Grid item xs={4} sm={8} md={2}>
                <Button
                  type="submit"
                  onClick={() => clickShowComment()}
                  sx={{
                    height: 40.5,
                    width: "100%",
                    border: "1px solid #ff9900",
                    backgroundColor: "rgb(204, 204, 204)",
                    color: "#ff9900",
                  }}
                  size="medium"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "75%",
              overflowY: "auto",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            {comment.length
              ? comment.map((itemComment, index) => {
                if (itemComment.praise_id == addComment.praise_id) {
                  return (
                    <Grid
                      item
                      xs={4}
                      sm={8}
                      md={12}
                      sx={{ marginBottom: "10px" }}
                    >
                      <Box>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                          sx={{ marginTop: "20px" }}
                        >
                          <Grid item xs={2} sm={3} md={2}>
                            {employees.map((itemEmployee, index) => {
                              if (
                                itemComment.user_id == itemEmployee.user_id
                              ) {
                                if (itemEmployee.avatar) {
                                  if (
                                    itemEmployee.avatar.search("https://") !==
                                    -1
                                  ) {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                        }}
                                        src={itemEmployee.avatar}
                                      ></img>
                                    );
                                  } else {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                        }}
                                        src={
                                          process.env.REACT_APP_FILE +
                                          "/avatar/" +
                                          itemEmployee.avatar
                                        }
                                      ></img>
                                    );
                                  }
                                } else {
                                  return (
                                    <img
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        float: "right",
                                      }}
                                      src={
                                        process.env.REACT_APP_FILE +
                                        "/avatar/avatar.png"
                                      }
                                    ></img>
                                  );
                                }
                              } else {
                                return null;
                              }
                            })}
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={5}
                            md={10}
                            sx={{ paddingRight: "40px" }}
                          >
                            <Box
                              sx={{
                                boxShadow:
                                  "rgb(95 125 149 / 15%) 0px 1px 3px 0px",
                                borderRadius: "5px",
                                backgroundColor: "#eeeeee",
                                border: "1px solid #e0e0e0",
                                padding: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "600px",
                                  fontSize: "14px",
                                  color: "rgb(79, 94, 113)",
                                  lineHeight: "24px",
                                }}
                              >
                                {itemComment.messeger}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  );
                }
              })
              : null}
          </Box>
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={8} md={9}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  placeholder="Message"
                  onChange={(event) => onChangeAddComment(event)}
                  style={{
                    width: "100%",
                    border: "1px solid rgb(200, 200, 200)",
                    borderRadius: "5px",
                    paddingTop: "5px",
                    paddingLeft: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={8} md={3}>
                <Button
                  onClick={(event) => onAddComment(event)}
                  sx={{
                    height: 47,
                    width: "100%",
                    border: "1px solid #ff9900",
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                    padding: "10px",
                  }}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12 }}
      >
        {role == 1 ? (
          <Grid
            item
            xs={4}
            sm={3}
            md={3}
            className="scrollReward"
            display={{
              xs: "none",
              md: "block",
              sm: "block",
              position: "fixed",
              overflowY: "auto",
              height: "800px",
              paddingBottom: "800px",
            }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#4caf50",
                marginBottom: "10px",
                textAlign: "center",
                marginRight: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <ApprovalIcon /> Waiting for approval
              </Typography>
            </Box>
            {praise1.length
              ? praise1.map((item, index) => {
                if (item.status === 0) {
                  return (
                    <Box
                      sx={{
                        boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                        border: "1.5px solid #e0e0e0",
                        borderRadius: "10px",
                        padding: "10px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        marginBottom: "10px",
                      }}
                    >
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={1}
                          sm={2}
                          md={3}
                          display={{ xs: "none", md: "block", sm: "block" }}
                        >
                          {employees.length
                            ? employees.map((itemUser, index) => {
                              if (itemUser.user_id === item.author) {
                                if (itemUser.avatar) {
                                  if (
                                    itemUser.avatar.search("https://") !==
                                    -1
                                  ) {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                          border: "2px solid #2196f3",
                                        }}
                                        src={itemUser.avatar}
                                      ></img>
                                    );
                                  } else {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                          border: "2px solid #2196f3",
                                        }}
                                        src={
                                          process.env.REACT_APP_FILE +
                                          "/avatar/" +
                                          itemUser.avatar
                                        }
                                      ></img>
                                    );
                                  }
                                } else {
                                  return (
                                    <img
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                      }}
                                      src={
                                        process.env.REACT_APP_FILE +
                                        "/avatar/avatar.png"
                                      }
                                    ></img>
                                  );
                                }
                              } else {
                                return null;
                              }
                            })
                            : null}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {employees.length
                              ? employees.map((itemUser, index) => {
                                if (itemUser.user_id === item.author) {
                                  return (
                                    itemUser.last_name +
                                    " " +
                                    itemUser.first_name +
                                    " "
                                  );
                                } else {
                                  return null;
                                }
                              })
                              : null}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã khen thưởng
                            </span>
                            {employees.length
                              ? employees.map((itemUser, index) => {
                                if (itemUser.user_id === item.recipient) {
                                  return (
                                    " " +
                                    itemUser.last_name +
                                    " " +
                                    itemUser.first_name
                                  );
                                } else {
                                  return null;
                                }
                              })
                              : null}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontSize: "10px",
                            }}
                          >
                            {moment(item.updated_at).fromNow()}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={8}
                          md={12}
                          sx={{ textAlign: "center" }}
                        >
                          <Typography
                            sx={{
                              color: "#76ff03",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            + {item.score ? item.score : null} Points
                          </Typography>
                          <Typography
                            sx={{
                              color: "#76ff03",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            + {item.present ? item.present : null}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.message}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Box
                            sx={{
                              alignItems: "center",
                            }}
                          >
                            <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                              <Grid item xs={2} sm={8} md={12}>
                                <Box
                                  sx={{
                                    display: "flex",
                                  }}
                                >
                                  <img
                                    style={{
                                      height: "30px",
                                      width: "40px",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={
                                      process.env.REACT_APP_FILE +
                                      "/reward/value.png"
                                    }
                                  ></img>
                                  <Typography
                                    sx={{
                                      color: "rgb(35, 54, 78)",
                                      fontWeight: "bold",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {item.cheer}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 2 }}
                            justifyContent="center"
                          >
                            <Button
                              type="submit"
                              onClick={(event) =>
                                onPublicPraise(event, item.id)
                              }
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
                              onClick={(event) =>
                                onBlockPraise(event, item.id)
                              }
                              sx={{
                                width: "29%",
                              }}
                              variant="contained"
                              size="medium"
                              color="error"
                            >
                              Block
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                }
              })
              : null}
          </Grid>
        ) : null}
        <Grid
          item
          xs={4}
          sm={3}
          md={3}
          display={{ xs: "none", md: "block", sm: "block" }}
        />
        <Grid item xs={4} sm={3} md={6} sx={{ position: "relative" }}>
          {praise.length
            ? praise.map((item, index) => {
              if (item.status === 1) {
                return (
                  <Box
                    sx={{
                      boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                      border: "1.5px solid #e0e0e0",
                      borderRadius: "10px",
                      padding: "10px",
                      backgroundColor: "white",
                      marginBottom: "15px",
                    }}
                  >
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={1}
                        sm={2}
                        md={2}
                        display={{ xs: "none", md: "block", sm: "block" }}
                      >
                        {employees.length
                          ? employees.map((itemUser, index) => {
                            if (itemUser.user_id === item.author) {
                              if (itemUser.avatar) {
                                if (
                                  itemUser.avatar.search("https://") !== -1
                                ) {
                                  return (
                                    <img
                                      style={{
                                        height: "60px",
                                        width: "60px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                      }}
                                      src={itemUser.avatar}
                                    ></img>
                                  );
                                } else {
                                  return (
                                    <img
                                      style={{
                                        height: "60px",
                                        width: "60px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                      }}
                                      src={
                                        process.env.REACT_APP_FILE +
                                        "/avatar/" +
                                        itemUser.avatar
                                      }
                                    ></img>
                                  );
                                }
                              } else {
                                return (
                                  <img
                                    style={{
                                      height: "60px",
                                      width: "60px",
                                      objectFit: "cover",
                                      borderRadius: "100%",
                                      float: "right",
                                      border: "2px solid #2196f3",
                                    }}
                                    src={
                                      process.env.REACT_APP_FILE +
                                      "/avatar/avatar.png"
                                    }
                                  ></img>
                                );
                              }
                            } else {
                              return null;
                            }
                          })
                          : null}
                      </Grid>
                      <Grid item xs={3} sm={5} md={9}>
                        <Typography
                          sx={{
                            color: "rgb(35, 54, 78)",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {employees.length
                            ? employees.map((itemUser, index) => {
                              if (itemUser.user_id === item.author) {
                                return (
                                  itemUser.last_name +
                                  " " +
                                  itemUser.first_name +
                                  " "
                                );
                              } else {
                                return null;
                              }
                            })
                            : null}
                          <span
                            style={{ fontSize: "16px", fontWeight: "normal" }}
                          >
                            đã khen thưởng
                          </span>
                          {employees.length
                            ? employees.map((itemUser, index) => {
                              if (itemUser.user_id === item.recipient) {
                                return (
                                  " " +
                                  itemUser.last_name +
                                  " " +
                                  itemUser.first_name
                                );
                              } else {
                                return null;
                              }
                            })
                            : null}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgb(35, 54, 78)",
                            fontSize: "12px",
                          }}
                        >
                          {moment(item.updated_at).fromNow()}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1}>
                        <MoreVertIcon />
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <Box
                          sx={{
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Grid item xs={4} sm={8} md={1}></Grid>
                            <Grid item xs={4} sm={8} md={4}>
                              {employees.length
                                ? employees.map((itemUser, index) => {
                                  if (itemUser.user_id === item.author) {
                                    if (itemUser.avatar) {
                                      if (
                                        itemUser.avatar.search(
                                          "https://"
                                        ) !== -1
                                      ) {
                                        return (
                                          <img
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              objectFit: "cover",
                                              borderRadius: "100%",
                                              border: "2px solid #ff5722",
                                            }}
                                            src={itemUser.avatar}
                                          ></img>
                                        );
                                      } else {
                                        return (
                                          <img
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              objectFit: "cover",
                                              borderRadius: "100%",
                                              border: "2px solid #ff5722",
                                            }}
                                            src={
                                              process.env.REACT_APP_FILE +
                                              "/avatar/" +
                                              itemUser.avatar
                                            }
                                          ></img>
                                        );
                                      }
                                    } else {
                                      return (
                                        <img
                                          style={{
                                            height: "100px",
                                            width: "100px",
                                            objectFit: "cover",
                                            borderRadius: "100%",
                                            border: "2px solid #ff5722",
                                          }}
                                          src={
                                            process.env.REACT_APP_FILE +
                                            "/avatar/avatar.png"
                                          }
                                        ></img>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                })
                                : null}
                              <Typography
                                sx={{
                                  color: "rgb(35, 54, 78)",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  marginTop: "10px",
                                }}
                              >
                                {employees.length
                                  ? employees.map((itemUser, index) => {
                                    if (itemUser.user_id === item.author) {
                                      return (
                                        itemUser.last_name +
                                        " " +
                                        itemUser.first_name +
                                        " "
                                      );
                                    } else {
                                      return null;
                                    }
                                  })
                                  : null}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "rgb(35, 54, 78)",
                                  fontSize: "14px",
                                }}
                              >
                                Executive Cum Legal Assistant Consultant
                                Employee
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={2}>
                              <img
                                style={{
                                  height: "100%",
                                  width: "100%",
                                }}
                                // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                src={
                                  process.env.REACT_APP_FILE +
                                  "/reward/gold.png"
                                }
                              ></img>
                            </Grid>
                            <Grid item xs={4} sm={8} md={4}>
                              {employees.length
                                ? employees.map((itemUser, index) => {
                                  if (itemUser.user_id === item.recipient) {
                                    if (itemUser.avatar) {
                                      if (
                                        itemUser.avatar.search(
                                          "https://"
                                        ) !== -1
                                      ) {
                                        return (
                                          <img
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              objectFit: "cover",
                                              borderRadius: "100%",
                                              border: "2px solid #ff5722",
                                            }}
                                            src={itemUser.avatar}
                                          ></img>
                                        );
                                      } else {
                                        return (
                                          <img
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              objectFit: "cover",
                                              borderRadius: "100%",
                                              border: "2px solid #ff5722",
                                            }}
                                            src={
                                              process.env.REACT_APP_FILE +
                                              "/avatar/" +
                                              itemUser.avatar
                                            }
                                          ></img>
                                        );
                                      }
                                    } else {
                                      return (
                                        <img
                                          style={{
                                            height: "100px",
                                            width: "100px",
                                            objectFit: "cover",
                                            borderRadius: "100%",
                                            border: "2px solid #00e676",
                                          }}
                                          src={
                                            process.env.REACT_APP_FILE +
                                            "/avatar/avatar.png"
                                          }
                                        ></img>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                })
                                : null}
                              <Typography
                                sx={{
                                  color: "rgb(35, 54, 78)",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  marginTop: "10px",
                                }}
                              >
                                {employees.length
                                  ? employees.map((itemUser, index) => {
                                    if (
                                      itemUser.user_id === item.recipient
                                    ) {
                                      return (
                                        " " +
                                        itemUser.last_name +
                                        " " +
                                        itemUser.first_name
                                      );
                                    } else {
                                      return null;
                                    }
                                  })
                                  : null}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "rgb(35, 54, 78)",
                                  fontSize: "14px",
                                }}
                              >
                                Manager Programme Development(Partnership
                                Global)
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={1}></Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sm={8}
                        md={12}
                        sx={{ alignItems: "center", textAlign: "center" }}
                      >
                        <Typography
                          sx={{
                            color: "#76ff03",
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          + {item.score} Points
                        </Typography>
                        <Typography
                          sx={{
                            color: "#76ff03",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          + {item.present ? item.present : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <Box
                          sx={{
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                          >
                            <Grid item xs={2} sm={2} md={3}>
                              <Box
                                sx={{
                                  borderRadius: "5px",
                                  backgroundColor: "#a7ffeb",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Achievements
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={2} sm={6} md={9}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  style={{
                                    height: "40px",
                                    width: "50px",
                                  }}
                                  // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                  src={
                                    process.env.REACT_APP_FILE +
                                    "/reward/value.png"
                                  }
                                ></img>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  }}
                                >
                                  {item.cheer}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={8} md={12}>
                        <Box sx={{ display: "flex" }}>
                          {checkLike(item.id) ? (
                            <ThumbUpOutlinedIcon
                              id="icon_like"
                              sx={{ marginRight: "10px", color: "blue" }}
                            />
                          ) : (
                            <ThumbUpOutlinedIcon
                              onClick={(event) =>
                                onChangeAddLike(event, item.id)
                              }
                              id="icon_like"
                              sx={{ marginRight: "10px" }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "rgb(35, 54, 78)",
                            }}
                          >
                            {sumLike(item.id) != 0 ? sumLike(item.id) : null}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <ChatBubbleOutlineOutlinedIcon
                            onClick={(event) =>
                              onClickAddComment(event, item.id)
                            }
                            id="icon_comment"
                            sx={{ marginRight: "10px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "rgb(35, 54, 78)",
                            }}
                          >
                            {sumComment(item.id) != 0
                              ? sumComment(item.id)
                              : null}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                );
              }
            })
            : null}
        </Grid>
        {role == 1 ? (
          <Grid
            item
            xs={4}
            sm={3}
            md={3}
            className="scrollReward2"
            display={{
              xs: "none",
              md: "block",
              sm: "block",
              overflowY: "auto",
              height: "800px",
              paddingBottom: "800px",
              position: "fixed",
              right: "30px",
            }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#ff9800",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <HistoryIcon /> History
              </Typography>
            </Box>
            {praise.length
              ? praise.map((item, index) => {
                if (item.author == id_user) {
                  return (
                    <Box
                      sx={{
                        boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                        border: "1.5px solid #e0e0e0",
                        borderRadius: "10px",
                        padding: "10px",
                        backgroundColor: "white",
                        marginBottom: "10px",
                      }}
                    >
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={1}
                          sm={2}
                          md={3}
                          display={{ xs: "none", md: "block", sm: "block" }}
                        >
                          {employees.length
                            ? employees.map((itemUser, index) => {
                              if (itemUser.user_id === item.author) {
                                if (itemUser.avatar) {
                                  if (
                                    itemUser.avatar.search("https://") !==
                                    -1
                                  ) {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                          border: "2px solid #2196f3",
                                        }}
                                        src={itemUser.avatar}
                                      ></img>
                                    );
                                  } else {
                                    return (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          objectFit: "cover",
                                          borderRadius: "100%",
                                          float: "right",
                                          border: "2px solid #2196f3",
                                        }}
                                        src={
                                          process.env.REACT_APP_FILE +
                                          "/avatar/" +
                                          itemUser.avatar
                                        }
                                      ></img>
                                    );
                                  }
                                } else {
                                  return (
                                    <img
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        float: "right",
                                        border: "2px solid #2196f3",
                                      }}
                                      src={
                                        process.env.REACT_APP_FILE +
                                        "/avatar/avatar.png"
                                      }
                                    ></img>
                                  );
                                }
                              } else {
                                return null;
                              }
                            })
                            : null}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {employees.length
                              ? employees.map((itemUser, index) => {
                                if (itemUser.user_id === item.author) {
                                  return (
                                    itemUser.last_name +
                                    " " +
                                    itemUser.first_name +
                                    " "
                                  );
                                } else {
                                  return null;
                                }
                              })
                              : null}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã khen thưởng
                            </span>
                            {employees.length
                              ? employees.map((itemUser, index) => {
                                if (itemUser.user_id === item.recipient) {
                                  return (
                                    " " +
                                    itemUser.last_name +
                                    " " +
                                    itemUser.first_name
                                  );
                                } else {
                                  return null;
                                }
                              })
                              : null}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontSize: "10px",
                            }}
                          >
                            {moment(item.updated_at).fromNow()}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={8}
                          md={12}
                          sx={{ textAlign: "center" }}
                        >
                          <Typography
                            sx={{
                              color: "#76ff03",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            + {item.score ? item.score : null} Points
                          </Typography>
                          <Typography
                            sx={{
                              color: "#76ff03",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            + {item.present ? item.present : null}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.message}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Box
                            sx={{
                              alignItems: "center",
                            }}
                          >
                            <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                              <Grid item xs={2} sm={8} md={12}>
                                <Box
                                  sx={{
                                    display: "flex",
                                  }}
                                >
                                  <img
                                    style={{
                                      height: "30px",
                                      width: "40px",
                                    }}
                                    // src={item.avatar?process.env.REACT_APP_FILE+'/avatar/'+item.avatar:process.env.REACT_APP_FILE+'/avatar/avatar.png'}>
                                    src={
                                      process.env.REACT_APP_FILE +
                                      "/reward/value.png"
                                    }
                                  ></img>
                                  <Typography
                                    sx={{
                                      color: "rgb(35, 54, 78)",
                                      fontWeight: "bold",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {item.cheer}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Stack direction="row" justifyContent="end">
                            <Button
                              type="submit"
                              onClick={(event) =>
                                onClickBlockHistory(event, item.id)
                              }
                              sx={{
                                width: "29%",
                              }}
                              variant="contained"
                              color="error"
                              size="medium"
                            >
                              Block
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                }
              })
              : null}
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default Portal;
