import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {
  Divider,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button, Stack, Popover } from "@mui/material";
import { withStyles } from "@material-ui/styles";

const HandleOption = (props) => {
  const [paidTime, setPaidTime] = useState(true);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open1, setOpen] = useState(false);

  const handleClose2 = () => setOpen(false);

  const handleChange = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaidTime = () => {
    setPaidTime(!paidTime);
    setTitle("Edit Paid Time");
    setAnchorEl(null);
    setOpen(true);
  };
  const handleOverTime = () => {
    setPaidTime(!paidTime);
    setTitle("Edit Overtime");
    setAnchorEl(null);
    setOpen(true);
  };
  return (
    <>
      <IconButton
        aria-describedby={id}
        variant="contained"
        style={styles.option_dropbtn}
        onClick={handleChange}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popover
        sx={{ mt: 0.5 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          onClick={handlePaidTime}
          style={styles.option_dropdown_content_li}
          className={props.classes.hover_li}
        >
          <Typography>
            <DriveFileRenameOutlineOutlinedIcon />
            &nbsp; Edit Paid Time
          </Typography>
        </Box>

        <Box
          onClick={handleOverTime}
          style={styles.option_dropdown_content_li}
          className={props.classes.hover_li}
        >
          <Typography>
            <DriveFileRenameOutlineOutlinedIcon />
            &nbsp; Edit OverTime
          </Typography>
        </Box>
      </Popover>

      <Modal
        open={open1}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={props.classes.modal_block}>
          <Box className={props.classes.modal_body}>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  className={props.classes.modal_head_text}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                className={props.classes.modal_close_icon}
                onClick={handleClose2}
              >
                <CloseIcon />
              </Grid>
            </Grid>
            <Divider />

            <Box className={props.classes.modal_date}>
              <TextField
                sx={{ mr: 2 }}
                disabled
                id="outlined-disabled"
                label="Date"
                value={props.date}
              />

              <TextField
                id="outlined-basic"
                type="time"
                label=" "
                value="03-22-2020"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                variant="outlined"
              />
            </Box>

            <TextareaAutosize
              className={props.classes.modal_textarea}
              aria-label="minimum height"
              minRows={3}
              maxRows={3}
              name="note"
              placeholder="Note"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                sx={{ color: "#ffff", width: "16.5%" }}
                onClick={handleClose2}
              >
                Save
              </Button>
              <Button variant="contained" onClick={handleClose2} color="error">
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const styles = {
  modal_textarea: {
    width: "100%",
    border: "1px solid rgb(227 235 241)",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "5px",
  },

  modal_date: {
    paddingTop: "20px",
    paddingBottom: "25px",
  },
  modal_close_icon: {
    color: "#dedcd9",
    cursor: "pointer",
    textAlign: "right",
    paddingTop: "5px",
  },

  modal_head_text: {
    fontSize: "25px",
    fontWeight: 600,
  },
  modal_body: {
    padding: "30px",
  },

  modal_block: {
    position: "relative",
    width: "38%",
    height: "auto",
    display: "block",
    margin: "8% auto",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },

  option_dropbtn: {
    backgroundColor: "#989a9e",
    color: "white",
    padding: "5px",
    fontSize: "8px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    zIndex: 2,
  },

  option_dropdown_content_li: {
    color: "black",
    padding: "10px 12px",
    textDecoration: "none",
    cursor: "pointer",
  },
  hover_li: {
    "&:hover": {
      backgroundColor: "#dedfe0",
    },
  },
};

export default withStyles(styles)(HandleOption);
