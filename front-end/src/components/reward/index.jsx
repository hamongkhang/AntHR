import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Backdrop } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageIcon from "@mui/icons-material/Image";
import InputBase from "@mui/material/InputBase";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

const Commendation = (props) => {
  const $token = localStorage.getItem("access_token");
  const id = localStorage.getItem("id");
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const [myScore, setMyScore] = useState([]);
  const [praise, setPraise] = useState({
    image: "",
    recipient: "",
    message: "",
    score: "",
    present: "",
    cheer: "",
  });
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    image: null,
    recipient: null,
    message: null,
    score: null,
    present: null,
    cheer: null,
  });
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [openModalPraise, setOpenModalPraise] = useState(false);
  const [loading, setLoading] = useState({
    load1: true,
    load2: true
  })
  const clickOpenModalPraise = () => {
    setOpenModalPraise(!openModalPraise);
  };
  const onChangeSelectEmployee = (event, id, first_name, last_name) => {
    setPraise({ ...praise, ["recipient"]: id });
    setName(last_name + " " + first_name);
    setOpenModalPraise(!openModalPraise);
  };
  const getEmployees = () => {
    setLoading({ ...loading, load1: true })
    fetch(process.env.REACT_APP_API + "/employee/getAllEmployee", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data[0].reverse());
        setEmployees(data.data[1].reverse());
        setLoading({ ...loading, load1: false })

      });
  };
  const getPoints = () => {
    setLoading({ ...loading, load2: true })
    fetch(process.env.REACT_APP_API + "/score/getOneScore", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setMyScore(data.data);
        setLoading({ ...loading, load2: false })

      });
  };
  const getImage = (event) => {
    document.getElementById("imageUpload").click();
  };
  const onChangeAddPraises = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    if (_type === "file") {
      setPraise({ ...praise, ["image"]: event.target.files[0] });
    } else {
      setPraise({ ...praise, [_name]: _value });
    }
  };
  const handleChange = (event) => {
    setPraise({ ...praise, ["score"]: event.target.value });
  };
  const onChangeCheer = (event, mess) => {
    setPraise({ ...praise, ["cheer"]: mess });
    if (mess === "Great Inspirational Leadership,Growth Mindset") {
      setShowCheer(1);
    } else if (
      mess === "Expressing and contributing yourself,Challenging development"
    ) {
      setShowCheer(2);
    } else if (
      mess === "Helping people grow together,Excellent communication"
    ) {
      setShowCheer(3);
    }
    console.log(showCheer);
  };
  const [showCheer, setShowCheer] = useState(0);
  const onAddPraises = (e) => {
    setLoading({load1:true, load2:true})
    const _formData = new FormData();
    _formData.append("image", praise.image);
    _formData.append("recipient", praise.recipient);
    _formData.append("message", praise.message);
    _formData.append("score", praise.score);
    _formData.append("present", praise.present);
    _formData.append("cheer", praise.cheer);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/praise/createPraise", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "Score not found!!!") {
            setLoading({load1:false, load2:false})
            toast.error(`Your score is still not enough`, {
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
            setLoading({load1:false, load2:false})
            setError(json.error);
          }
        } else {
          toast.success(`Congratulations, Successfully !!!`, {
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
          setLoading({load1:false, load2:false})
        }
      });
  };
  useEffect(() => {
    if ($token) {
      getPoints();
      getEmployees();
    } else {
      navigate("/home");
    }
    console.log(loading);
  }, [render]);
  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        maxWidth: "100%",
        height: "100vh",
        borderRadius: "5px",
        padding: "24px",
      }}
    >
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading.load1&&loading.load2}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openModalPraise}
        onClose={() => clickOpenModalPraise()}
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
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid #ff9900",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
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
                Employees List
              </Typography>
            </Grid>
            <Grid item xs={4} sm={8} md={6}></Grid>
            <Grid item xs={4} sm={8} md={2}>
              <Button
                type="submit"
                onClick={() => clickOpenModalPraise()}
                sx={{
                  color: "#ffff",
                }}
                size="medium"
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </Grid>
            {employees.length
              ? employees.map((item, index) => {
                if (item.user_id != id) {
                  return (
                    <>
                      <Grid item xs={2} sm={2} md={3}>
                        <Button
                          type="submit"
                          onClick={(event) =>
                            onChangeSelectEmployee(
                              event,
                              item.user_id,
                              item.first_name,
                              item.last_name
                            )
                          }
                          sx={{
                            height: 40.5,
                            width: "100%",
                            border: "1px solid #ff9900",
                            backgroundColor: "#FFFF66",
                            color: "#ff9900",
                          }}
                          size="medium"
                        >
                          {"Select"}
                        </Button>
                      </Grid>
                      <Grid item xs={2} sm={6} md={9}>
                        <Typography
                          sx={{
                            color: "rgb(35, 54, 78)",
                            fontSize: "16px",
                          }}
                        >
                          {item.last_name} {item.first_name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgb(35, 54, 78)",
                            fontSize: "12px",
                          }}
                        >
                          {item.email ? item.email : " - "} |{" "}
                          {item.phone ? item.phone : " - "}
                        </Typography>
                      </Grid>
                    </>
                  );
                }
              })
              : null}
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#ff9900",
              mb: 1,
            }}
            variant="h4"
          >
            Internal reward portal
          </Typography>
          <Typography
            sx={{
              color: "rgb(35, 54, 78)",
              marginBottom: "30px",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Appreciate the positive contributions of your colleagues here!
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sm={8}
          md={12}
          sx={{
            display: "flex",
          }}
        >
          <img
            style={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "100%",
              marginLeft: "auto",
            }}
            src={
              localStorage.getItem("avatar") === "null"
                ? process.env.REACT_APP_FILE + "/avatar/avatar.png"
                : localStorage.getItem("avatar").search("https://") != -1
                  ? localStorage.getItem("avatar")
                  : process.env.REACT_APP_FILE +
                  "/avatar/" +
                  localStorage.getItem("avatar")
            }
          ></img>
          &ensp;&ensp;
          <Typography
            sx={{
              color: "rgb(35, 54, 78)",
              fontWeight: "bold",
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "auto",
            }}
            variant="h5"
          >
            Hello, {last_name} {first_name}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 9, md: 12 }}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <Grid item xs={4} sm={3} md={4}>
            <Box
              sx={{
                backgroundColor: "#dcedc8",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h6"
              >
                Recognition Points Redeemed
              </Typography>
              <Typography
                sx={{
                  color: "#4caf50",
                  fontWeight: "bold",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h3"
              >
                {myScore.gift ? myScore.gift : 0} points
              </Typography>
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h7"
              >
                Please reward your colleagues or exchange gifts.
              </Typography>
              <br></br>
              <Typography
                sx={{
                  color: "#ef5350",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h7"
              >
                Expiration Date: 31/12/2030
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sm={3} md={4}>
            <Box
              sx={{
                backgroundColor: "#b2ebf2",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h6"
              >
                Recognition Coins
              </Typography>
              <Typography
                sx={{
                  color: "#03a9f4",
                  fontWeight: "bold",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h3"
              >
                {myScore.score ? myScore.score : 0} points
              </Typography>
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h7"
              >
                Get special offers and rewards packages, including discount
                codes and travel packages.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sm={3} md={4}>
            <Box
              sx={{
                backgroundColor: "#ffe0b2",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h6"
              >
                Recognition Points Spent
              </Typography>
              <Typography
                sx={{
                  color: "#f4511e",
                  fontWeight: "bold",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h3"
              >
                {myScore.score_spent ? myScore.score_spent : 0} points
              </Typography>
              <Typography
                sx={{
                  color: "rgb(35, 54, 78)",
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                  mb: 1,
                }}
                variant="h7"
              >
                This is the score you have awarded to your friends after
                positive contributions.
              </Typography>
              <br></br>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
          }}
        >
          <Grid item xs={0} sm={1} md={2}></Grid>
          <Grid item xs={4} sm={8} md={8}>
            <Typography
              sx={{
                color: "rgb(35, 54, 78)",
                fontWeight: "bold",
                mb: 2,
                marginTop: "40px",
              }}
              variant="h5"
            >
              You want to reward?
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                textAlign: "center",
                borderRadius: "3px",
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingRight: "20px",
                paddingLeft: "20px",
                border: "solid 2px #5c6bc0",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                <Grid item xs={4} sm={2} md={2}>
                  <img
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                    src={
                      localStorage.getItem("avatar") === "null"
                        ? process.env.REACT_APP_FILE + "/avatar/avatar.png"
                        : localStorage.getItem("avatar").search("https://") !=
                          -1
                          ? localStorage.getItem("avatar")
                          : process.env.REACT_APP_FILE +
                          "/avatar/" +
                          localStorage.getItem("avatar")
                    }
                  ></img>
                </Grid>
                <Grid item xs={4} sm={3} md={5}>
                  <Button
                    type="submit"
                    onClick={(event) => clickOpenModalPraise(event)}
                    sx={{
                      marginTop: "6px",
                      height: 40.5,
                      width: "100%",
                      border: "1px solid #ff9900",
                      backgroundColor: "#FFFF66",
                      color: "#ff9900",
                    }}
                    size="medium"
                  >
                    {!(name === "") ? name : "Recipient *"}
                  </Button>
                  <span className="errorNotify">
                    {error.recipient ? error.recipient : null}
                  </span>
                </Grid>
                <Grid item xs={4} sm={3} md={5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Scores
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={age}
                      label="Age"
                      name="score"
                      sx={{
                        marginTop: "5px",
                        height: "40px",
                        padding: "8.5px 14px",
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>10 points</MenuItem>
                      <MenuItem value={20}>20 points</MenuItem>
                      <MenuItem value={50}>50 points</MenuItem>
                      <MenuItem value={100}>100 points</MenuItem>
                      <MenuItem value={200}>200 points</MenuItem>
                      <MenuItem value={500}>500 points</MenuItem>
                      <MenuItem value={1000}>1000 points</MenuItem>
                      <MenuItem value={5000}>5000 points</MenuItem>
                      <MenuItem value={10000}>10000 points</MenuItem>
                    </Select>
                  </FormControl>
                  <span className="errorNotify">
                    {error.score ? error.score : null}
                  </span>
                </Grid>
                <Grid item xs={4} sm={2} md={2}></Grid>
                <Grid item xs={4} sm={3} md={5}>
                  <InputBase
                    type="file"
                    id="imageUpload"
                    name="image"
                    onChange={(event) => onChangeAddPraises(event)}
                    sx={{
                      display: "none",
                    }}
                  />
                  <Button
                    type="submit"
                    onClick={(event) => getImage(event)}
                    sx={{
                      height: 40.5,
                      width: "100%",
                      border: "1px solid #ff9900",
                      backgroundColor: "#FFFF66",
                      color: "#ff9900",
                    }}
                    size="medium"
                  >
                    <ImageIcon />
                    &nbsp; Image
                  </Button>
                  <span className="errorNotify">
                    {error.image ? error.image : null}
                  </span>
                </Grid>
                <Grid item xs={4} sm={3} md={5}>
                  <TextField
                    id="present"
                    name="present"
                    label="Present *"
                    variant="outlined"
                    size="small"
                    type={"text"}
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => onChangeAddPraises(event)}
                  />
                  <span className="errorNotify">
                    {error.present ? error.present : null}
                  </span>
                </Grid>
                <Grid item xs={4} sm={2} md={2}></Grid>
                <Grid item xs={4} sm={6} md={10}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Message"
                    name="message"
                    onChange={(event) => onChangeAddPraises(event)}
                    style={{
                      width: "100%",
                      border: "1px solid rgb(200, 200, 200)",
                      borderRadius: "5px",
                      paddingTop: "5px",
                      paddingLeft: "10px",
                    }}
                  />
                  <span className="errorNotify">
                    {error.message ? error.message : null}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={0} sm={1} md={2}></Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
          }}
        >
          <Grid item xs={0} sm={1} md={2}></Grid>
          <Grid item xs={4} sm={8} md={8}>
            <Typography
              sx={{
                color: "rgb(35, 54, 78)",
                fontWeight: "bold",
                mb: 2,
                marginTop: "40px",
              }}
              variant="h5"
            >
              Why did you choose this person?
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                textAlign: "center",
                borderRadius: "3px",
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingRight: "20px",
                paddingLeft: "20px",
                marginBottom: "40px",
                border: "solid 2px #5c6bc0",
                display: "flex",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                <Grid item xs={4} sm={8} md={4}>
                  <Box
                    sx={{
                      borderRadius: "2px",
                      boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                      border: "1px solid #5c6bc0",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      backgroundColor: showCheer === 1 ? "#FFFF66" : "none",
                    }}
                    id="hoverClass"
                    onClick={(event) =>
                      onChangeCheer(
                        event,
                        "Great Inspirational Leadership,Growth Mindset"
                      )
                    }
                  >
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      Clarity
                    </Typography>
                    <hr style={{ marginTop: "0px" }}></hr>
                    <img
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_6.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Great Inspirational Leadership
                    </Typography>
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        marginLeft: "10px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_3.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Growth Mindset
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={4}>
                  <Box
                    id="hoverClass"
                    sx={{
                      borderRadius: "2px",
                      boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                      border: "1px solid #5c6bc0",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      backgroundColor: showCheer === 2 ? "#FFFF66" : "none",
                    }}
                    onClick={(event) =>
                      onChangeCheer(
                        event,
                        "Expressing and contributing yourself,Challenging development"
                      )
                    }
                  >
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      Courage
                    </Typography>
                    <hr style={{ marginTop: "0px" }}></hr>
                    <img
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_1.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Expressing and contributing yourself
                    </Typography>
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        marginLeft: "10px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_2.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Challenging development
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={4}>
                  <Box
                    sx={{
                      borderRadius: "2px",
                      boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                      border: "1px solid #5c6bc0",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      backgroundColor: showCheer === 3 ? "#FFFF66" : "none",
                    }}
                    id="hoverClass"
                    onClick={(event) =>
                      onChangeCheer(
                        event,
                        "Helping people grow together,Excellent communication"
                      )
                    }
                  >
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      Humanity
                    </Typography>
                    <hr style={{ marginTop: "0px" }}></hr>
                    <img
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_4.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Helping people grow together
                    </Typography>
                    <img
                      style={{
                        height: "60px",
                        width: "60px",
                        marginLeft: "10px",
                      }}
                      src={process.env.REACT_APP_FILE + "/reward/leader_5.png"}
                    ></img>
                    <Typography
                      sx={{
                        color: "rgb(35, 54, 78)",
                      }}
                    >
                      Excellent communication
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <Typography
                    sx={{
                      color: "rgb(35, 54, 78)",
                    }}
                  >
                    Your compliments will be approved by the admin and made
                    visible to everyone
                  </Typography>
                  <span className="errorNotify">
                    {error.cheer ? error.cheer : null}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={0} sm={1} md={2}></Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={2} md={4}></Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button
              type="submit"
              onClick={(event) => onAddPraises(event)}
              sx={{
                height: 40.5,
                width: "100%",
                border: "1px solid #ff9900",
                backgroundColor: "#FFFF66",
                color: "#ff9900",
                marginBottom: "40px",
              }}
              size="medium"
            >
              Publish
            </Button>
          </Grid>
          <Grid item xs={4} sm={2} md={4}></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Commendation;
