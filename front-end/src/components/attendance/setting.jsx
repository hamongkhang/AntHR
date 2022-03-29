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
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

const Setting = (props) => {
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
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectTimeFrom, setSelectTimeFrom] = React.useState(null)
  const [selectTimeTo, setSelectTimeTo] = React.useState(null)
  const [selectDate, setSelectDate] = React.useState([null,null])
  const id = localStorage.getItem("id");
  const [openModalPraise, setOpenModalPraise] = useState(false);
  const [note, setNote] = React.useState('')
  const [userSelect, setUserSelect] = useState('');
  const onChangeSelectEmployee = (event, id, first_name, last_name) => {
    setUserSelect(id);
    setName(last_name + " " + first_name);
    setOpenModalPraise(!openModalPraise);
  };
  const onChangeSelectAllEmployee = (event) => {
      setUserSelect(0);
      setName("All Employees");
      setOpenModalPraise(!openModalPraise);
    };

    const [error, setError] = useState({});
  const clickOpenModalPraise = () => {
    setOpenModalPraise(!openModalPraise);
  };
  const getEmployees = () => {
    fetch(process.env.REACT_APP_API + "/employee/getAllEmployee", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data[0].reverse());
        setEmployees(data.data[1].reverse());
      });
  };
  const onAddTimeOff = (e) => {
    const _formData = new FormData();
    _formData.append("user_id", userSelect);
    _formData.append("date_from", selectDate[0]);
    _formData.append("date_to", selectDate[1]);
    _formData.append("time_from", selectTimeFrom);
    _formData.append("time_to", selectTimeTo);
    _formData.append("note", note);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(process.env.REACT_APP_API + "/time/createTimeOffAdmin", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
            toast.error(`Please enter enough information`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setError(json.error);
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
        }
      });
  };
  useEffect(() => {
    if ($token) {
      getEmployees();
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
              <Grid item xs={2} sm={2} md={12}>
                          <Button
                            type="submit"
                            onClick={(event) =>
                              onChangeSelectAllEmployee(event)
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
                            {"Select All Employees"}
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
      <Typography
        sx={{
          fontWeight: "bold",
          color: "rgb(35, 54, 78)",
        }}
        variant="h6"
      >
        Time off
      </Typography>
      <Box sx={{
        justifyContent: "center"
      }}>
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
          {!(name === "") ? name : "Select Employees *"}
        </Button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={selectDate}
            onChange={(newValue) => {
              setSelectDate(newValue);
            }}
            calendars={2}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </Box>
{
  (selectDate[1]&&selectDate[0]&&!(selectDate[1].getDate()==selectDate[0].getDate()))
  ?
  null
 :
 <LocalizationProvider dateAdapter={AdapterDateFns}>
 <Typography
   sx={{
     fontWeight: "bold",
     color: "rgb(35, 54, 78)",
   }}
   variant="h6"
 >
   From
 </Typography>
 <StaticTimePicker
   displayStaticWrapperAs="mobile"
   value={selectTimeFrom}
   onChange={(newValue) => {
     setSelectTimeFrom(newValue);
   }}
   renderInput={(params) => <TextField {...params} />}
 />
 <Typography
   sx={{
     fontWeight: "bold",
     color: "rgb(35, 54, 78)",
   }}
   variant="h6"
 >
   To
 </Typography>
 <StaticTimePicker
   displayStaticWrapperAs="mobile"
   value={selectTimeTo}
   onChange={(newValue) => {
     setSelectTimeTo(newValue);
   }}
   renderInput={(params) => <TextField {...params} />}
 />
</LocalizationProvider>
}
     
      <TextField
                    id="note"
                    name="note"
                    label="Note *"
                    variant="outlined"
                    size="small"
                    type={"text"}
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => setNote(event.target.value)}
                  />
                   <span className="errorNotify">
                    {error.note ? error.note : null}
                  </span>
      <Button
              type="submit"
              onClick={(event) => onAddTimeOff(event)}
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
    </Box>
  );
};

export default Setting;
