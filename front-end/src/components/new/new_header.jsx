import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "solid 1px grey",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ff9900",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "12ch",
      },
    },
  },
}));
const options = ["Full", "Important", "Non important"];

export default function NewHeader(props) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const sendData = () => {
    props.parentCallback();
  };

  const onChangeSearch = (value) => {
    setValue(value);
    props.parentCallback2(value);
  };
  const onChangeSearch2 = (event) => {
    props.parentCallback3(event.target.value);
  };
  const onChangeSearch3 = (event) => {
    props.parentCallback4(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1, mt: 5 }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          paddingLeft: "40px",
          paddingRight: "40px",
          maxWidth: "100%",
          paddingTop: "10px",
          paddingBottom: "10px",
          top: 64,
        }}
      >
        <Toolbar>
          <br />
          <Grid
            container
            spacing={{ xs: 4, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={2} md={2}>
              <Autocomplete
                size="small"
                sx={{
                  maxWidth: "unset",
                  width: "100%",
                }}
                value={value}
                onChange={(event, newValue) => {
                  onChangeSearch(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={options}
                renderInput={(params) => (
                  <TextField {...params} label="Important" />
                )}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <TextField
                id="from"
                label="From"
                variant="outlined"
                size="small"
                type={"date"}
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeSearch2(event)}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <TextField
                id="to"
                label="To"
                variant="outlined"
                size="small"
                type={"date"}
                sx={{ width: "100%" }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => onChangeSearch3(event)}
              />
            </Grid>
            <Grid item xs={4} sm={true} md={2}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
            {props.role == 1 ? (
              <Grid item xs={4} sm={4} md={2}>
                <Button
                  onClick={() => sendData()}
                  sx={{
                    height: 40.5,
                    width: "100%",
                    border: "1px solid #ff9900",
                    backgroundColor: "#FFFF66",
                    color: "#ff9900",
                  }}
                  size="medium"
                  startIcon={<AddIcon sx={{ fontSize: "large" }} />}
                >
                  Create News
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
