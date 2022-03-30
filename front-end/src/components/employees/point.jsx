import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ApprovalIcon from "@mui/icons-material/Approval";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Backdrop } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import CircularProgress from '@mui/material/CircularProgress';

const Point = (props) => {
  const $token = localStorage.getItem("access_token");
  const [userPoints, setUserPoints] = useState([]);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [searchPoints, setSearchPoints] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({ score: null });
  const [score, setScore] = useState({ score: "" });
  const [loading, setLoading] = useState(false)
  const clickOpenModal = () => {
    setOpenModal(!openModal);
  };
  const getDirectory = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/employee/getUserPoints", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserPoints(data.data.reverse());
        setLoading(false)
      });
  };
  const onChangeSearch = (e) => {
    if (e.target.value != "") {
      setSearch(true);
    } else {
      setSearch(false);
    }
    var a = [];
    for (var i = 0; i < userPoints.length; i++) {
      if (
        userPoints[i].first_name.indexOf(e.target.value) != -1 ||
        userPoints[i].last_name.indexOf(e.target.value) != -1
      ) {
        a.push(userPoints[i]);
      } else {
        setSearchPoints([]);
      }
    }
    setSearchPoints(a);
  };
  const onChangeAddScore = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    setScore({ ...score, [_name]: _value });
  };
  const onClickAddScore = (e) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("score", score.score);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/score/createScore", requestOptions)
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
          toast.success(`Create score successfully !!!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          setScore({ score: "" });
          setOpenModal(!openModal);
          setRender(!render);
          setLoading(false)
        }
      });
  };
  useEffect(() => {
    if ($token) {
      getDirectory();
    } else {
      navigate("/home");
    }
  }, [render]);
  return (
    <>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          maxWidth: "100%",
          height: "100%",
          border: "1px solid rgb(227, 235, 241)",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
      >
        <Modal
          open={openModal}
          onClose={() => clickOpenModal()}
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
                  Set Points
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <TextField
                  helperText={error.score ? error.score[0] : null}
                  error={error.score ? true : false}
                  id="score"
                  name="score"
                  label="Score *"
                  variant="outlined"
                  size="small"
                  type={"number"}
                  sx={{ marginTop: "5px", width: "100%" }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => onChangeAddScore(event)}
                />
              </Grid>
              <Grid item xs={4} sm={8} md={6}>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    onClick={(event) => onClickAddScore(event)}
                    variant="contained"
                    size="medium"
                    sx={{ color: "#ffff" }}
                  >
                    Publish
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => clickOpenModal()}
                    size="medium"
                    variant="contained"
                    color="error"
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
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={(event) => clickOpenModal(event)}
                    sx={{
                      backgroundColor: "#ffff66",
                      color: " #ff9900",
                      border: "1px solid #ff9900",
                    }}
                    size="medium"
                  >
                    <AddIcon /> Set Points
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
                        Employees
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "rgb(101, 114, 131)",
                        }}
                      >
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                          sx={{ alignItems: "center" }}
                        >
                          <Grid item xs={4} sm={8} md={6}>
                            <Box
                              sx={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                color: "rgb(101, 114, 131)",
                              }}
                            >
                              Points
                            </Box>
                          </Grid>
                          <Grid item xs={4} sm={8} md={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                float: "right",
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: "#388e3c",
                                  borderRadius: "2px",
                                  height: "10px",
                                  marginRight: "5px",
                                  width: "10px",
                                }}
                              ></Box>
                              <Box sx={{ fontSize: "10px" }}>
                                Redemption Points
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                float: "right",
                                marginRight: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: "#f44336",
                                  borderRadius: "2px",
                                  height: "10px",
                                  marginRight: "5px",
                                  width: "10px",
                                }}
                              ></Box>
                              <Box sx={{ fontSize: "10px" }}>Spent Points</Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                float: "right",
                                marginRight: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: "#1976d2",
                                  borderRadius: "2px",
                                  height: "10px",
                                  marginRight: "5px",
                                  width: "10px",
                                }}
                              ></Box>
                              <Box sx={{ fontSize: "10px" }}>
                                Recognition Points
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!search ? (
                      userPoints.length ? (
                        userPoints.map((item, index) => {
                          if (item.role != 1) {
                            return (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left" sx={{ width: "250px" }}>
                                  <Box sx={{ display: "flex" }}>
                                    <img
                                      style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "cover",
                                        borderRadius: "100%",
                                        marginRight: "10px",
                                      }}
                                      src={
                                        item.avatar
                                          ? item.avatar.search("https://") != -1
                                            ? item.avatar
                                            : process.env.REACT_APP_FILE +
                                            "/avatar/" +
                                            item.avatar
                                          : process.env.REACT_APP_FILE +
                                          "/avatar/avatar.png"
                                      }
                                    ></img>
                                    <Box
                                      sx={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "rgb(105, 129, 148)",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {item.last_name ? item.last_name : " - "}{" "}
                                        {item.first_name
                                          ? item.first_name
                                          : " - "}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "rgb(105, 129, 148)",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {item.email ? item.email : " - "} |{" "}
                                        {item.phone ? item.phone : " - "}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ color: "rgb(105, 129, 148)" }}
                                >
                                  <Box sx={{ display: "flex" }}>
                                    <Box
                                      sx={{
                                        backgroundColor: "#1976d2",
                                        borderRadius: "2px",
                                        marginBottom: "10px",
                                        height: "20px",
                                        marginRight: "10px",
                                        width: item.score
                                          ? item.score / 5
                                          : "1px",
                                      }}
                                    ></Box>
                                    <Box>
                                      {item.score
                                        ? item.score + " points"
                                        : "0 point"}
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: "flex" }}>
                                    <Box
                                      sx={{
                                        backgroundColor: "#f44336",
                                        borderRadius: "2px",
                                        marginBottom: "10px",
                                        height: "20px",
                                        marginRight: "10px",
                                        width: item.score_spent
                                          ? item.score_spent / 5
                                          : "1px",
                                      }}
                                    ></Box>
                                    <Box>
                                      {item.score_spent
                                        ? item.score_spent + " points"
                                        : "0 point"}
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: "flex" }}>
                                    <Box
                                      sx={{
                                        backgroundColor: "#388e3c",
                                        borderRadius: "2px",
                                        height: "20px",
                                        marginRight: "10px",
                                        width: item.gift ? item.gift / 5 : "1px",
                                      }}
                                    ></Box>
                                    <Box>
                                      {item.gift
                                        ? item.gift + " points"
                                        : "0 point"}
                                    </Box>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
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
                      )
                    ) : searchPoints.length ? (
                      searchPoints.map((item, index) => {
                        if (item.role != 1) {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                              }}
                            >
                              <TableCell align="left" sx={{ width: "250px" }}>
                                <Box sx={{ display: "flex" }}>
                                  <img
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                      objectFit: "cover",
                                      borderRadius: "100%",
                                      marginRight: "10px",
                                    }}
                                    src={
                                      item.avatar
                                        ? item.avatar.search("https://") != -1
                                          ? item.avatar
                                          : process.env.REACT_APP_FILE +
                                          "/avatar/" +
                                          item.avatar
                                        : process.env.REACT_APP_FILE +
                                        "/avatar/avatar.png"
                                    }
                                  ></img>
                                  <Box
                                    sx={{
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: "rgb(105, 129, 148)",
                                        fontSize: "18px",
                                      }}
                                    >
                                      {item.last_name ? item.last_name : " - "}{" "}
                                      {item.first_name ? item.first_name : " - "}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "rgb(105, 129, 148)",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.email ? item.email : " - "} |{" "}
                                      {item.phone ? item.phone : " - "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{ color: "rgb(105, 129, 148)" }}
                              >
                                <Box sx={{ display: "flex" }}>
                                  <Box
                                    sx={{
                                      backgroundColor: "#1976d2",
                                      borderRadius: "2px",
                                      marginBottom: "10px",
                                      height: "20px",
                                      marginRight: "10px",
                                      width: item.score ? item.score / 5 : "1px",
                                    }}
                                  ></Box>
                                  <Box>
                                    {item.score
                                      ? item.score + " points"
                                      : "0 point"}
                                  </Box>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                  <Box
                                    sx={{
                                      backgroundColor: "#f44336",
                                      borderRadius: "2px",
                                      marginBottom: "10px",
                                      height: "20px",
                                      marginRight: "10px",
                                      width: item.score_spent
                                        ? item.score_spent / 5
                                        : "1px",
                                    }}
                                  ></Box>
                                  <Box>
                                    {item.score_spent
                                      ? item.score_spent + " points"
                                      : "0 point"}
                                  </Box>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                  <Box
                                    sx={{
                                      backgroundColor: "#388e3c",
                                      borderRadius: "2px",
                                      height: "20px",
                                      marginRight: "10px",
                                      width: item.gift ? item.gift / 5 : "1px",
                                    }}
                                  ></Box>
                                  <Box>
                                    {item.gift
                                      ? item.gift + " points"
                                      : "0 point"}
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        } else {
                          return null;
                        }
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
    </>
  );
};

export default Point;
