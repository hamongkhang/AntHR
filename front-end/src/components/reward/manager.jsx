import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, Stack, Backdrop } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';

const Manager = (props) => {
  const $token = localStorage.getItem("access_token");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [render, setRender] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [loading, setLoading] = useState({ load1: true, load2: true });
  const navigate = useNavigate();
  const getOrders = () => {
    setLoading({ ...loading, load1: true });
    fetch(process.env.REACT_APP_API + "/cart_present/getAllCartPresent", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.data.reverse());
        setLoading({ ...loading, load1: false });

      });
  };
  const getOrders2 = () => {
    setLoading({ ...loading, load2: true });
    fetch(process.env.REACT_APP_API + "/cart_present/getAllCartPresent", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading({ ...loading, load2: false });
        setOrders2(data.data);
      });
  };
  const onPublishCart = (event, id) => {
    setLoading({ load1: true, load2: true })
    fetch(process.env.REACT_APP_API + "/cart_present/changeStatusAdmin/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.error == "Not enough points !!!") {
            setLoading({ load1: false, load2: false })
            toast.error("Employee has an inadequate score.", {
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
            setLoading({ load1: false, load2: false })
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
          }
        } else {
          setRender(!render);
          setLoading({ load1: false, load2: false })
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
  const onConfirmEmployee = (event, id) => {
    setLoading({ load1: true, load2: true })
    fetch(
      process.env.REACT_APP_API + "/cart_present/changeStatusClient/" + id,
      {
        method: "GET",
        headers: { Authorization: `Bearer ` + $token },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading({ load1: false, load2: false })
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
          setLoading({ load1: false, load2: false })
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
  const onBlockCart = (event, id) => {
    Swal.fire({
      title: "Delete this order?",
      text: "Do you want to permanently delete this order?",
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

  const onBlock = (id) => {
    setLoading({ load1: true, load2: true })
    fetch(
      process.env.REACT_APP_API + "/cart_present/destroyCartPresent/" + id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ` + $token },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading({ load1: false, load2: false })
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
          setLoading({ load1: false, load2: false })
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
  console.log(orders);
  useEffect(() => {
    if ($token) {
      getOrders();
      getOrders2();
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
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={ loading.load1 &&  loading.load2}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 10, md: 12 }}
      >
        {role == 1 ? (
          <Grid
            item
            xs={4}
            sm={5}
            md={4}
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
            {orders2.length
              ? orders2.map((item, index) => {
                if (item.status == 0) {
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
                          {item.avatar ? (
                            item.avatar.search("https://") !== -1 ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "100%",
                                  float: "right",
                                  border: "2px solid #2196f3",
                                }}
                                src={item.avatar}
                              ></img>
                            ) : (
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
                                  item.avatar
                                }
                              ></img>
                            )
                          ) : (
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
                          )}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {item.last_name + " " + item.first_name}{" "}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã đổi phần thưởng
                            </span>{" "}
                            {item.present_name}
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
                        <Grid item xs={4} sm={8} md={12}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.present_image
                            }
                          ></img>
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
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {item.present_score
                                      ? item.present_score
                                      : null}{" "}
                                    Points
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={8} md={12}>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "italic",
                                    fontSize: "12px",
                                  }}
                                >
                                  Please confirm the employee's redemption
                                  information
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={2} sm={4} md={12}>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                          >
                            <Button
                              type="submit"
                              onClick={(event) =>
                                onPublishCart(event, item.id)
                              }
                              sx={{
                                color: "#ffff",
                              }}
                              size="medium"
                              variant="contained"
                            >
                              Publish
                            </Button>

                            <Button
                              type="submit"
                              onClick={(event) => onBlockCart(event, item.id)}
                              sx={{
                                width: "21%",
                              }}
                              size="medium"
                              variant="contained"
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
          sm={5}
          md={4}
          display={{ xs: "none", md: "block", sm: "block" }}
        />
        {role == 1 ? (
          <Grid
            item
            xs={4}
            sm={5}
            md={4}
            sx={{ position: "fix", paddingBottom: "40px" }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#FF9800",
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
                <LocalShippingOutlinedIcon /> Delivering
              </Typography>
            </Box>
            {orders.length
              ? orders.map((item, index) => {
                if (item.status == 1) {
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
                          {item.avatar ? (
                            item.avatar.search("https://") !== -1 ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "100%",
                                  float: "right",
                                  border: "2px solid #2196f3",
                                }}
                                src={item.avatar}
                              ></img>
                            ) : (
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
                                  item.avatar
                                }
                              ></img>
                            )
                          ) : (
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
                          )}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {item.last_name + " " + item.first_name}{" "}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã đổi phần thưởng
                            </span>{" "}
                            {item.present_name}
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
                        <Grid item xs={4} sm={8} md={12}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.present_image
                            }
                          ></img>
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
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {item.present_score
                                      ? item.present_score
                                      : null}{" "}
                                    Points
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={8} md={12}>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "italic",
                                    fontSize: "12px",
                                  }}
                                >
                                  Please wait for the staff to confirm receipt
                                  of the goods
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        {role == 1 ? (
                          <Grid item xs={4} sm={8} md={12}>
                            <Button
                              type="submit"
                              disabled={true}
                              sx={{
                                height: 40.5,
                                width: "100%",
                                backgroundColor: "#ff9900",
                              }}
                              size="medium"
                            >
                              <Typography sx={{ color: "#ffff" }}>
                                {" "}
                                Gifts are being delivered to staff
                              </Typography>
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item xs={4} sm={8} md={12}>
                            <Button
                              type="submit"
                              onClick={(event) =>
                                onConfirmEmployee(event, item.id)
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
                              Confirm receipt
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  );
                }
              })
              : null}
          </Grid>
        ) : (
          <Grid
            item
            xs={4}
            sm={5}
            md={4}
            sx={{ position: "fix", paddingBottom: "40px" }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#FF9800",
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
                <LocalShippingOutlinedIcon /> Delivering
              </Typography>
            </Box>
            {orders.length
              ? orders.map((item, index) => {
                if (item.status == 1 && item.user_id == id) {
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
                          {item.avatar ? (
                            item.avatar.search("https://") !== -1 ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "100%",
                                  float: "right",
                                  border: "2px solid #2196f3",
                                }}
                                src={item.avatar}
                              ></img>
                            ) : (
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
                                  item.avatar
                                }
                              ></img>
                            )
                          ) : (
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
                          )}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {item.last_name + " " + item.first_name}{" "}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã đổi phần thưởng
                            </span>{" "}
                            {item.present_name}
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
                        <Grid item xs={4} sm={8} md={12}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.present_image
                            }
                          ></img>
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
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {item.present_score
                                      ? item.present_score
                                      : null}{" "}
                                    Points
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={8} md={12}>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "italic",
                                    fontSize: "12px",
                                  }}
                                >
                                  Please wait for the staff to confirm receipt
                                  of the goods
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        {role == 1 ? (
                          <Grid item xs={4} sm={8} md={12}>
                            <Button
                              type="submit"
                              disabled={true}
                              sx={{
                                height: 40.5,
                                width: "100%",
                                border: "1px solid #ff9900",
                                backgroundColor: "#FFFF66",
                                color: "##ff9900",
                              }}
                              size="medium"
                            >
                              Gifts are being delivered to staff
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item xs={4} sm={8} md={12}>
                            <Stack direction="row" justifyContent="end">
                              <Button
                                type="submit"
                                onClick={(event) =>
                                  onConfirmEmployee(event, item.id)
                                }
                                sx={{
                                  color: "#ffff",
                                }}
                                variant="contained"
                                size="medium"
                              >
                                Confirm receipt
                              </Button>
                            </Stack>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  );
                }
              })
              : null}
          </Grid>
        )}
        {role == 1 ? (
          <Grid
            item
            xs={4}
            sm={5}
            md={4}
            className="scrollReward"
            display={{
              xs: "none",
              md: "block",
              sm: "block",
              position: "fixed",
              overflowY: "auto",
              height: "800px",
              paddingBottom: "800px",
              right: "40px",
            }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#2979ff",
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
                <HistoryOutlinedIcon /> History
              </Typography>
            </Box>
            {orders.length
              ? orders.map((item, index) => {
                if (item.status == 2) {
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
                          {item.avatar ? (
                            item.avatar.search("https://") !== -1 ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "100%",
                                  float: "right",
                                  border: "2px solid #2196f3",
                                }}
                                src={item.avatar}
                              ></img>
                            ) : (
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
                                  item.avatar
                                }
                              ></img>
                            )
                          ) : (
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
                          )}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {item.last_name + " " + item.first_name}{" "}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã đổi phần thưởng
                            </span>{" "}
                            {item.present_name}
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
                        <Grid item xs={4} sm={8} md={12}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.present_image
                            }
                          ></img>
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
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {item.present_score
                                      ? item.present_score
                                      : null}{" "}
                                    Points
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={8} md={12}>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "italic",
                                    fontSize: "12px",
                                  }}
                                >
                                  You can delete to clear up storage
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="end"
                          >
                            <Button
                              type="submit"
                              onClick={(event) => onBlockCart(event, item.id)}
                              size="medium"
                              variant="contained"
                              color="error"
                            >
                              Delete
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
        ) : (
          <Grid
            item
            xs={4}
            sm={5}
            md={4}
            className="scrollReward"
            display={{
              xs: "none",
              md: "block",
              sm: "block",
              position: "fixed",
              overflowY: "auto",
              height: "800px",
              paddingBottom: "800px",
              right: "40px",
            }}
          >
            <Box
              sx={{
                boxShadow: "rgb(95 125 149 / 20%) 0px 4px 13px 0px",
                border: "1.5px solid #e0e0e0",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#2979ff",
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
                <HistoryOutlinedIcon /> History
              </Typography>
            </Box>
            {orders.length
              ? orders.map((item, index) => {
                if (item.status == 2 && item.user_id == id) {
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
                          {item.avatar ? (
                            item.avatar.search("https://") !== -1 ? (
                              <img
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "100%",
                                  float: "right",
                                  border: "2px solid #2196f3",
                                }}
                                src={item.avatar}
                              ></img>
                            ) : (
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
                                  item.avatar
                                }
                              ></img>
                            )
                          ) : (
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
                          )}
                        </Grid>
                        <Grid item xs={3} sm={5} md={9}>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {item.last_name + " " + item.first_name}{" "}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                              }}
                            >
                              đã đổi phần thưởng
                            </span>{" "}
                            {item.present_name}
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
                        <Grid item xs={4} sm={8} md={12}>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.present_image
                            }
                          ></img>
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
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {item.present_score
                                      ? item.present_score
                                      : null}{" "}
                                    Points
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={2} sm={8} md={12}>
                                <Typography
                                  sx={{
                                    color: "rgb(35, 54, 78)",
                                    fontWeight: "italic",
                                    fontSize: "12px",
                                  }}
                                >
                                  You can delete to clear up storage
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sm={8} md={12}>
                          <Stack direction="row" justifyContent="end">
                            <Button
                              type="submit"
                              onClick={(event) => onBlockCart(event, item.id)}
                              size="medium"
                              variant="contained"
                              color="error"
                            >
                              Delete
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
        )}
      </Grid>
    </Box>
  );
};

export default Manager;
