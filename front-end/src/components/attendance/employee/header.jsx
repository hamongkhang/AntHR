import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Paper, InputBase, Stack, Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    "& .MuiSelect-select": {
      padding: "10px",
    },
  },
}));

const HeaderEmployee = () => {
  const classes = useStyles();

  const [date, setDate] = useState(10);
  const [status, setStatus] = useState(10);
  const [location, setLocation] = useState(10);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box sx={{ mt: 3, mr: 3, ml: 3, mb: 2, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={2} md={2} lg={2}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <Select
                  className={classes.tabRoot}
                  labelId="demo-simple-select-label"
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
            <Grid item xs={3} sm={1} md={1} lg={1}>
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
            <Grid item xs={3} sm={1} md={1} lg={1}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <Select
                  className={classes.tabRoot}
                  labelId="demo-simple-select-label"
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
            <Grid item xs={3} sm={2} md={2} lg={2}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ffb300",
                  boxShadow: 0,
                }}
              >
                <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
                  <SearchIcon sx={{ color: "primary.main" }} />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </Paper>
            </Grid>

            <Grid item xs={0} sm={0} md={2} lg={2.5} />

            <Grid item xs={4} sm={4} md={4} lg={3.5}>
              <Stack direction="row" spacing={1.8} sx={{ width: "100%" }}>
                <Button variant="contained">
                  <FileDownloadOutlinedIcon sx={{ color: "white" }} />
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Revert
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "background.primary",
                    textTransform: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Reject
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "background.primary",
                    textTransform: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Approve
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "background.primary",
                    textTransform: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Confirm
                  </Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default HeaderEmployee;
