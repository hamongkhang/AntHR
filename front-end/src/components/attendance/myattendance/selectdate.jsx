import React, { useEffect, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    "& .MuiSelect-select": {
      padding: "10px",
    },
  },
}));

const SelectDate = () => {
  const classes = useStyles();

  const [date, setDate] = useState(10);
  const [status, setStatus] = useState(10);
  const [location, setLocation] = useState(10);
  const [record, setRecord] = useState(10);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 4, pl: 3.5, width: "90%" }}>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <Select
              className={classes.tabRoot}
              id="outlined"
              label=" "
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={1.5} md={1.5} sm={2.5} xs={3}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <Select
              className={classes.tabRoot}
              labelId="demo-simple-select-label"
              id="outlined"
              label=" "
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={1.5} md={1.5} sm={2.5} xs={3}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <Select
              className={classes.tabRoot}
              id="outlined"
              label=" "
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={1.5} md={1.5} sm={2.5} xs={3}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <Select
              className={classes.tabRoot}
              id="outlined"
              label=" "
              value={record}
              onChange={(e) => {
                setRecord(e.target.value);
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectDate;
