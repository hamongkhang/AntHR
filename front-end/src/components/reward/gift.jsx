import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { Stack, Backdrop } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';

const Gift = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [checked, setChecked] = React.useState(0);
  const $token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchGift, setSearchGift] = useState([]);
  const [file, setFile] = useState(null);
  const [presents, setPresents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [giftAdd, setGiftAdd] = useState({
    category_id: "",
    name: "",
    image: "",
    score: "",
    price: "",
    description: "",
  });
  const [giftEdit, setGiftEdit] = useState({});
  const [error, setError] = useState({
    category_id: null,
    name: null,
    image: null,
    score: null,
    price: null,
    description: null,
  });
  const handleChangeSelect = (event) => {
    setGiftAdd({ ...giftAdd, ["category_id"]: event.target.value });
    console.log(giftAdd);
  };
  const handleChangeSelectEdit = (event) => {
    setGiftEdit({ ...giftEdit, ["category_id"]: event.target.value });
  };
  const handleChangeChecked = (event, mess) => {
    var a = [];
    if (mess == 0) {
      setChecked(0);
      setSearch(false);
    } else if (mess == 1) {
      setChecked(1);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 1) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    } else if (mess == 2) {
      setChecked(2);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 3) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    } else {
      setChecked(3);
      setSearch(true);
      for (var i = 0; i < presents.length; i++) {
        if (presents[i].category_id == 2) {
          a.push(presents[i]);
        } else {
          setSearchGift([]);
        }
      }
    }
    setSearchGift(a);
  };
  const clickOpenAdd = () => {
    setOpenAdd(!openAdd);
    setError("");
  };
  const clickOpenEdit = (event, id) => {
    setOpenEdit(!openEdit);
    setError("");
    for (var i = 0; i < presents.length; i++) {
      if (presents[i].id === id) {
        setGiftEdit(presents[i]);
      }
    }
  };
  const onChangeEditGift = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    if (_type === "file") {
      setGiftEdit({ ...giftEdit, ["image"]: event.target.files[0] });
      setFile(event.target.files[0]);
      console.log(file);
    } else {
      setGiftEdit({ ...giftEdit, [_name]: _value });
    }
  };
  const onChangeAddGift = (event) => {
    let _name = event.target.name;
    let _type = event.target.type;
    let _value = event.target.value;
    if (_type === "file") {
      setGiftAdd({ ...giftAdd, ["image"]: event.target.files[0] });
    } else {
      setGiftAdd({ ...giftAdd, [_name]: _value });
    }
  };
  const onAddGift = (e) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("category_id", giftAdd.category_id);
    _formData.append("name", giftAdd.name);
    _formData.append("image", giftAdd.image);
    _formData.append("score", giftAdd.score);
    _formData.append("price", giftAdd.price);
    _formData.append("description", giftAdd.description);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/present/createPresent", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
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
            setLoading(false)
          } else {
            setError(json.error);
            setLoading(false)
          }
        } else {
          setRender(!render);
          toast.success(`Create gift successfully !!!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          setGiftAdd({
            category_id: "",
            name: "",
            image: "",
            score: "",
            price: "",
            description: "",
          });
          setOpenAdd(!openAdd);
          setLoading(false)
        }
      });
  };
  const onEditGift = (e) => {
    setLoading(true)
    const _formData = new FormData();
    _formData.append("category_id", giftEdit.category_id);
    _formData.append("name", giftEdit.name);
    _formData.append("image", giftEdit.image);
    _formData.append("score", giftEdit.score);
    _formData.append("price", giftEdit.price);
    _formData.append("description", giftEdit.description);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(
      process.env.REACT_APP_API + "/present/updatePresent/" + giftEdit.id,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === "You are not admin!!!") {
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
            setLoading(false)     
          } else {
            setError(json.error);
            setLoading(false)
          }
        } else {
          setRender(!render);
          toast.success(`Update gift successfully !!!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError("");
          setGiftAdd({
            category_id: "",
            name: "",
            image: "",
            score: "",
            price: "",
            description: "",
          });
          setOpenEdit(!openEdit);
          setLoading(false)
        }
      });
  };
  const getPresents = () => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/present/getAllPresent", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setPresents(data.data.reverse());
        setLoading(false)
      });
  };
  const onClickDeleteGift = (event, id) => {
    Swal.fire({
      title: "Delete this gift?",
      text: "Do you want to permanently delete this gift?",
      icon: "warning",
      marginTop: "200px",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteGift(id);
      }
    });
  };
  const onDeleteGift = (id) => {
    setLoading(true)
    
    setLoading(false)(process.env.REACT_APP_API + "/present/destroyPresent/" + id, {
      method: "DELETE",
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
          setRender(!render);
          setLoading(false)
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
  const onChangeStatus = (event, id) => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/present/changeStatus/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Change status Failed.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false)
        } else {
          setRender(!render);
          setLoading(false)
          toast.success("Change status successfully.", {
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
  const clickExchangeGift = (event, id) => {
    setLoading(true)
    fetch(process.env.REACT_APP_API + "/present/exchangePresent/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "Service not supported !!!") {
            toast.error("This gift is currently sold out !!!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setLoading(false)
          } else if (data.error === "Not enough score !!!") {
            toast.error("Not enough score !!!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setLoading(false)
          } else {
            toast.error("Exchange failed !!!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setLoading(false)
          }
        } else {
          setRender(!render);
          setLoading(false)
          toast.success("Exchange successfully.", {
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
  const getFileEdit = (event) => {
    document.getElementById("fileEdit").click();
  };
  useEffect(() => {
    if ($token) {
      getPresents();
      // getEmployees();
    } else {
      navigate("/home");
    }
  }, [render]);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        padding: "20px",
      }}
    >
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
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
            height: "75%",
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
                Create Gifts
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={6}>
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
                onChange={(event) => onChangeAddGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gift Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  sx={{
                    marginTop: "5px",
                    height: "40px",
                    padding: "8.5px 14px",
                  }}
                  onChange={(event) => handleChangeSelect(event)}
                >
                  <MenuItem value={1}>Food</MenuItem>
                  <MenuItem value={2}>Voucher</MenuItem>
                  <MenuItem value={3}>Artifacts</MenuItem>
                </Select>
              </FormControl>
              <span className="errorNotify">
                {error.category_id ? error.category_id[0] : null}
              </span>
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <TextField
                helperText={error.price ? error.price[0] : null}
                error={error.price ? true : false}
                id="price"
                name="price"
                label="Price *"
                variant="outlined"
                size="small"
                type={"number"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeAddGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
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
                onChange={(event) => onChangeAddGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TextField
                id="file"
                type="file"
                name="file"
                label="Image"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeAddGift(event)}
              />
              <span className="errorNotify">
                {error.image ? error.image[0] : null}
              </span>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextField
                helperText={error.description ? error.description[0] : null}
                error={error.description ? true : false}
                id="description"
                name="description"
                label="Description *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeAddGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  onClick={(event) => onAddGift(event)}
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
                  color="error"
                  size="medium"
                  variant="contained"
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
            height: "80%",
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
                Edit Gifts
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={6}>
              <TextField
                helperText={error.name ? error.name[0] : null}
                error={error.name ? true : false}
                id="name"
                name="name"
                value={giftEdit.name}
                label="Name *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gift Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={giftEdit.category_id}
                  sx={{
                    marginTop: "5px",
                    height: "40px",
                    padding: "8.5px 14px",
                  }}
                  onChange={(event) => handleChangeSelectEdit(event)}
                >
                  <MenuItem value={1}>Food</MenuItem>
                  <MenuItem value={2}>Voucher</MenuItem>
                  <MenuItem value={3}>Artifacts</MenuItem>
                </Select>
              </FormControl>
              <span className="errorNotify">
                {error.category_id ? error.category_id[0] : null}
              </span>
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <TextField
                helperText={error.price ? error.price[0] : null}
                error={error.price ? true : false}
                id="price"
                name="price"
                label="Price *"
                value={giftEdit.price}
                variant="outlined"
                size="small"
                type={"number"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <TextField
                helperText={error.score ? error.score[0] : null}
                error={error.score ? true : false}
                id="score"
                name="score"
                value={giftEdit.score}
                label="Score *"
                variant="outlined"
                size="small"
                type={"number"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TextField
                id="fileEdit"
                type="file"
                name="file"
                sx={{ display: "none" }}
                label="Image"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditGift(event)}
              />
              <img
                onClick={(event) => getFileEdit(event)}
                style={{
                  height: "100px",
                  width: "100%",
                  marginBottom: "20px",
                  border: "1px solid grey",
                }}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : process.env.REACT_APP_FILE +
                    "/present/image/" +
                    giftEdit.image
                }
              ></img>
              <span className="errorNotify">
                {error.image ? error.image[0] : null}
              </span>
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <TextField
                helperText={error.description ? error.description[0] : null}
                error={error.description ? true : false}
                id="description"
                name="description"
                value={giftEdit.description}
                label="Description *"
                variant="outlined"
                size="small"
                type={"text"}
                sx={{ marginTop: "5px", width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeEditGift(event)}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={4}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  onClick={(event) => onEditGift(event)}
                  variant="contained"
                  size="medium"
                  sx={{ color: "#ffff" }}
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
        columns={{ xs: 4, sm: 9, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Box
            sx={{
              padding: "10px",
              marginRight: "10px",
              marginBottom: "10px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid
                item
                xs={1}
                sm={8}
                md={12}
                display={{ xs: "none", md: "block", sm: "none" }}
              >
                {role == 1 ? (
                  <Box
                    sx={{
                      boxShadow: "rgb(95 125 149 / 40%) 0px 4px 13px 0px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "100%",
                      width: "60px",
                      height: "60px",
                      backgroundColor: "rgb(42, 210, 95)",
                      float: "right",
                    }}
                  >
                    <IconButton
                      onClick={() => clickOpenAdd()}
                      aria-label="delete"
                    >
                      <AddCircleOutlineOutlinedIcon
                        sx={{ fontSize: 40, color: "white" }}
                      />
                    </IconButton>
                  </Box>
                ) : null}
              </Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={4}
                display={{ xs: "none", md: "block", sm: "none" }}
              ></Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={1}
                sx={{ marginTop: "-40px" }}
                onClick={(event) => handleChangeChecked(event, 0)}
              >
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    marginBottom: "5px",
                    border:
                      checked == 0 ? "2px solid #ffea00" : "2px solid #e65100",
                    backgroundColor:
                      checked == 0 ? "rgb(42, 210, 95)" : "#ffb74d",
                  }}
                  src={process.env.REACT_APP_FILE + "/reward/gold.png"}
                ></img>
                <Typography
                  sx={{
                    color: "rgb(35, 54, 78)",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  All gifts
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={1}
                sx={{ marginTop: "-40px" }}
                onClick={(event) => handleChangeChecked(event, 1)}
              >
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    marginBottom: "5px",
                    border:
                      checked == 1 ? "2px solid #ffea00" : "2px solid #e65100",
                    backgroundColor:
                      checked == 1 ? "rgb(42, 210, 95)" : "#ffb74d",
                  }}
                  src={process.env.REACT_APP_FILE + "/reward/food.png"}
                ></img>
                <Typography
                  sx={{
                    color: "rgb(35, 54, 78)",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Food
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={1}
                sx={{ marginTop: "-40px" }}
                onClick={(event) => handleChangeChecked(event, 2)}
              >
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    marginBottom: "5px",
                    border:
                      checked == 2 ? "2px solid #ffea00" : "2px solid #e65100",
                    backgroundColor:
                      checked == 2 ? "rgb(42, 210, 95)" : "#ffb74d",
                  }}
                  src={process.env.REACT_APP_FILE + "/reward/gift.png"}
                ></img>
                <Typography
                  sx={{
                    color: "rgb(35, 54, 78)",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Artifacts
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={1}
                sx={{ marginTop: "-40px" }}
                onClick={(event) => handleChangeChecked(event, 3)}
              >
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    marginBottom: "5px",
                    border:
                      checked == 3 ? "2px solid #ffea00" : "2px solid #e65100",
                    backgroundColor:
                      checked == 3 ? "rgb(42, 210, 95)" : "#ffb74d",
                  }}
                  src={process.env.REACT_APP_FILE + "/reward/vourcher.png"}
                ></img>
                <Typography
                  sx={{
                    color: "rgb(35, 54, 78)",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Voucher
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={2}
                md={4}
                display={{ xs: "none", md: "block", sm: "none" }}
              ></Grid>
            </Grid>
          </Box>
          <Grid item xs={4} sm={8} md={12}>
            <Box
              sx={{
                padding: "10px",
                marginRight: "10px",
                marginBottom: "10px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 9, md: 12 }}
              >
                {!search ? (
                  presents.length ? (
                    presents.map((item, index) => {
                      return (
                        <Grid item xs={4} sm={3} md={3}>
                          <Box
                            sx={{
                              backgroundColor: "white",
                              boxShadow:
                                "rgb(95 125 149 / 7%) 0px 4px 13px 0px",
                              border: "1px solid rgb(235, 240, 244)",
                              alignItems: "center",
                              textAlign: "center",
                              width: "100%",
                              borderRadius: "5px",
                              padding: "24px",
                            }}
                          >
                            {item.status == 1 ? null : (
                              <Box
                                sx={{
                                  position: "absolute",
                                  backgroundColor: "red",
                                  borderRadius: "15px",
                                  padding: "5px",
                                  marginTop: "5px",
                                  marginLeft: "5px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "white",
                                    fontSize: "12px",
                                  }}
                                >
                                  Sold out
                                </Typography>
                              </Box>
                            )}
                            <img
                              style={{
                                height: "180px",
                                width: "100%",
                                marginBottom: "20px",
                              }}
                              src={
                                process.env.REACT_APP_FILE +
                                "/present/image/" +
                                item.image
                              }
                            ></img>
                            {role == 1 ? (
                              item.status == 1 ? (
                                <Switch
                                  defaultChecked={true}
                                  onChange={(event) =>
                                    onChangeStatus(event, item.id)
                                  }
                                  inputProps={{ "aria-label": "controlled" }}
                                  sx={{
                                    float: "left",
                                  }}
                                />
                              ) : (
                                <Switch
                                  defaultChecked={false}
                                  onChange={(event) =>
                                    onChangeStatus(event, item.id)
                                  }
                                  inputProps={{ "aria-label": "controlled" }}
                                  sx={{
                                    float: "left",
                                  }}
                                />
                              )
                            ) : null}
                            <br></br>
                            <br></br>
                            <br></br>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "rgb(35, 54, 78)",
                              }}
                              variant="h6"
                            >
                              {item.name ? item.name : null}
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineheight: "20px",
                                color: "rgb(95, 125, 149)",
                              }}
                            >
                              {item.price ? item.price : " - "} đồng
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                fontSize: "24px",
                                lineheight: "20px",
                                color: "red",
                              }}
                            >
                              {item.score ? item.score : " - "} points
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgb(35, 54, 78)",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineheight: "20px",
                                color: "rgb(95, 125, 149)",
                              }}
                            >
                              {item.description ? item.description : " - "}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ mt: 2, justifyContent: "center" }}
                            >
                              {role == 1 ? (
                                <Button
                                  type="submit"
                                  onClick={(event) =>
                                    clickOpenEdit(event, item.id)
                                  }
                                  sx={{
                                    width: "33%",
                                    color: "#ffff",
                                  }}
                                  variant="contained"
                                  size="medium"
                                >
                                  Edit
                                </Button>
                              ) : (
                                <Grid container justifyContent="flex-end">
                                  <Button
                                    type="submit"
                                    onClick={(event) =>
                                      clickExchangeGift(event, item.id)
                                    }
                                    sx={{
                                      color: "#ffff",
                                    }}
                                    variant="contained"
                                    size="medium"
                                  >
                                    Exchange
                                  </Button>
                                </Grid>
                                // <Grid con
                              )}
                              {role == 1 ? (
                                <Button
                                  type="submit"
                                  onClick={(event) =>
                                    onClickDeleteGift(event, item.id)
                                  }
                                  variant="contained"
                                  color="error"
                                  size="medium"
                                >
                                  Delete
                                </Button>
                              ) : null}
                            </Stack>
                          </Box>
                        </Grid>
                      );
                    })
                  ) : null
                ) : searchGift.length ? (
                  searchGift.map((item, index) => {
                    return (
                      <Grid item xs={4} sm={3} md={3}>
                        <Box
                          sx={{
                            backgroundColor: "white",
                            boxShadow: "rgb(95 125 149 / 7%) 0px 4px 13px 0px",
                            border: "1px solid rgb(235, 240, 244)",
                            alignItems: "center",
                            textAlign: "center",
                            width: "100%",
                            borderRadius: "5px",
                            padding: "24px",
                          }}
                        >
                          {item.status == 1 ? null : (
                            <Box
                              sx={{
                                position: "absolute",
                                backgroundColor: "red",
                                borderRadius: "15px",
                                padding: "5px",
                                marginTop: "5px",
                                marginLeft: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(35, 54, 78)",
                                  fontSize: "12px",
                                }}
                              >
                                Sold out
                              </Typography>
                            </Box>
                          )}
                          <img
                            style={{
                              height: "180px",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                            src={
                              process.env.REACT_APP_FILE +
                              "/present/image/" +
                              item.image
                            }
                          ></img>

                          {role == 1 ? (
                            item.status == 1 ? (
                              <Switch
                                defaultChecked={true}
                                onChange={(event) =>
                                  onChangeStatus(event, item.id)
                                }
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{
                                  float: "left",
                                }}
                              />
                            ) : (
                              <Switch
                                defaultChecked={false}
                                onChange={(event) =>
                                  onChangeStatus(event, item.id)
                                }
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{
                                  float: "left",
                                }}
                              />
                            )
                          ) : null}
                          <br></br>
                          <br></br>
                          <br></br>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "rgb(35, 54, 78)",
                            }}
                            variant="h6"
                          >
                            {item.name ? item.name : null}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineheight: "20px",
                              color: "rgb(95, 125, 149)",
                            }}
                          >
                            {item.price ? item.price : " - "} đồng
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "24px",
                              lineheight: "20px",
                              color: "red",
                            }}
                          >
                            {item.score ? item.score : " - "} points
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(35, 54, 78)",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineheight: "20px",
                              color: "rgb(95, 125, 149)",
                            }}
                          >
                            {item.description ? item.description : " - "}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 2, justifyContent: "center" }}
                          >
                            {role == 1 ? (
                              <Button
                                type="submit"
                                onClick={(event) =>
                                  clickOpenEdit(event, item.id)
                                }
                                sx={{
                                  width: "33%",
                                  color: "#ffff",
                                }}
                                variant="contained"
                                size="medium"
                              >
                                Edit
                              </Button>
                            ) : (
                              <Grid container justifyContent="flex-end">
                                <Button
                                  type="submit"
                                  onClick={(event) =>
                                    clickExchangeGift(event, item.id)
                                  }
                                  sx={{
                                    color: "#ffff",
                                  }}
                                  variant="contained"
                                  size="medium"
                                >
                                  Exchange
                                </Button>
                              </Grid>
                            )}
                            {role == 1 ? (
                              <Button
                                type="submit"
                                onClick={(event) =>
                                  onClickDeleteGift(event, item.id)
                                }
                                variant="contained"
                                color="error"
                                size="medium"
                              >
                                Delete
                              </Button>
                            ) : null}
                          </Stack>
                        </Box>
                      </Grid>
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
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Gift;
