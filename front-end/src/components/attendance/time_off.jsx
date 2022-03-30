import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import StaticTimePicker from "@mui/lab/StaticTimePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TimeOff = (props) => {
  // const [openAdd, setOpenAdd] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [checked, setChecked] = React.useState(0);
  const $token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const [render, setRender] = useState(false);
  // const [search, setSearch] = useState(false);
  // const [searchGift, setSearchGift] = useState([]);
  // const [file, setFile] = useState(null);
  // const [presents, setPresents] = useState([]);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [timeOff, setTimeOff] = useState([]);

  const [selectTimeFrom, setSelectTimeFrom] = React.useState(null);
  const [selectTimeTo, setSelectTimeTo] = React.useState(null);
  const [selectDate, setSelectDate] = React.useState([null, null]);
  const id = localStorage.getItem("id");
  const [openModalPraise, setOpenModalPraise] = useState(false);
  const [note, setNote] = React.useState("");
  const [userSelect, setUserSelect] = useState("");
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
  const getTimeOff = () => {
    fetch(process.env.REACT_APP_API + "/time/getTimeOff", {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeOff(data.data.reverse());
      });
  };
  const onAddTimeOff = (e) => {
    const _formData = new FormData();
    _formData.append("user_id", userSelect);
    _formData.append("date_from", selectDate[0].toDateString());
    _formData.append("date_to", selectDate[1].toDateString());
    if (selectTimeFrom) {
      _formData.append("time_from", selectTimeFrom.toTimeString());
    } else {
      _formData.append("time_from", selectTimeFrom);
    }
    if (selectTimeTo) {
      _formData.append("time_to", selectTimeTo.toTimeString());
    } else {
      _formData.append("time_to", selectTimeTo);
    }
    _formData.append("note", note);
    const requestOptions = {
      method: "POST",
      body: _formData,
      headers: { Authorization: `Bearer ` + $token },
    };
    fetch(
      process.env.REACT_APP_API + "/time/createTimeOffAdmin",
      requestOptions
    )
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
  const clickChangeCommit = (id) => {
    const _formData = new FormData();
    _formData.append("id", id);
    fetch(process.env.REACT_APP_API + "/time/changeStatus/" + id, {
      method: "GET",
      headers: { Authorization: `Bearer ` + $token },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Confirm Failed.", {
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
          toast.success("Confirm successfully.", {
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
  useEffect(() => {
    if ($token) {
      getEmployees();
      getTimeOff();
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
                onClick={(event) => onChangeSelectAllEmployee(event)}
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "rgb(35, 54, 78)",
            display: "flex",
            alignItems: "center",
          }}
          variant="h6"
        >
          Time off
        </Typography>

        <Button
          type="submit"
          onClick={(event) => clickOpenModalPraise(event)}
          sx={{
            height: 40.5,
            border: "1px solid #ff9900",
            backgroundColor: "#FFFF66",
            color: "#ff9900",
          }}
          size="medium"
        >
          {!(name === "") ? name : "Select Employees *"}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateRangePicker
              displayStaticWrapperAs="desktop"
              value={selectDate}
              onChange={(newValue) => {
                setSelectDate(newValue);
              }}
              calendars={1}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </Grid>

        {selectDate[1] &&
        selectDate[0] &&
        !(selectDate[1].getDate() == selectDate[0].getDate()) ? null : (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={6} md={4} lg={4}>
              <StaticTimePicker
                label="From"
                sx={{ height: "135px" }}
                displayStaticWrapperAs="mobile"
                value={selectTimeFrom}
                onChange={(newValue) => {
                  setSelectTimeFrom(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <StaticTimePicker
                sx={{ height: "135px" }}
                label="To"
                displayStaticWrapperAs="mobile"
                value={selectTimeTo}
                onChange={(newValue) => {
                  setSelectTimeTo(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        )}
      </Grid>

      <TextareaAutosize
        minRows={3}
        maxRows={3}
        name="note"
        placeholder="Note *"
        id="note"
        variant="outlined"
        type={"text"}
        style={{
          width: "100%",
          border: "1px solid #ff9900",
          borderRadius: "5px",
          paddingTop: "5px",
          paddingLeft: "10px",
          marginTop: "20px",
        }}
        onChange={(event) => setNote(event.target.value)}
      />

      <span className="errorNotify">{error.note ? error.note : null}</span>
      <Button
        type="submit"
        onClick={(event) => onAddTimeOff(event)}
        sx={{
          mt: 2,
          height: 40.5,
          border: "1px solid #ff9900",
          backgroundColor: "#FFFF66",
          color: "#ff9900",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
        size="medium"
      >
        Publish
      </Button>
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
                Employee
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Date Start
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Date End
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Time Start
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Time Start
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Note
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(101, 114, 131)",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeOff.length
              ? timeOff.map((item, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        {item.user_id != 0
                          ? employees.map((itemUser, index) => {
                              if (itemUser.user_id == item.user_id) {
                                return (
                                  itemUser.last_name +
                                  " " +
                                  itemUser.first_name +
                                  " ( " +
                                  itemUser.email +
                                  " ) "
                                );
                              }
                            })
                          : "All employess"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {item.date_from
                          ? new Intl.DateTimeFormat("de-DE", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(new Date(item.date_from))
                          : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {item.date_to
                          ? new Intl.DateTimeFormat("de-DE", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(new Date(item.date_to))
                          : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {item.time_from ? item.time_from : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {item.time_to ? item.time_to : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {item.note ? item.note : "-"}
                      </TableCell>
                      <TableCell>
                        {item.status == 0 ? (
                          <Button
                            onClick={() => clickChangeCommit(item.id)}
                            variant="contained"
                            color="error"
                            size="medium"
                          >
                            Confirm
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            size="medium"
                          >
                            Confirmed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeOff;
