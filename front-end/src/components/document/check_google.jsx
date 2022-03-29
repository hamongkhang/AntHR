import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import { Button, Backdrop } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Modal from '@mui/material/Modal';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';

toast.configure();

const CheckGoogleDrive = (props) => {
    const $token = localStorage.getItem('access_token');
    const [file, setFile] = useState([]);
    const value = queryString.parse(window.location.search);
    const access_token_google_drive = value.access_token_drive;
    const [loading, setLoading] = useState(false)
    localStorage.setItem('access_token_google_drive', access_token_google_drive);
    const getData = () => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/google-drive/getGoogleDrive/' + access_token_google_drive, {
            method: "GET",
            headers: { "Authorization": `Bearer ` + $token }
        })
            .then(response => response.json())
            .then(data => {
                setFile(data.data.files);
                localStorage.setItem('data_google_drive', data.data);
                setLoading(false)
            });
    }
    const cancel = (event) => {
        window.location.href = "http://localhost:3000/home/documents/view/" + localStorage.getItem('folder_id');
    }
    const [uploadFileShow, setUploadFileShow] = useState(true);
    const clickUploadFileShowShow = (event) => {
        setUploadFileShow(!uploadFileShow);
    }
    const uploadGoogleDrive = (event, id) => {
        event.preventDefault();
        window.location.href = process.env.REACT_APP_API + '/google-drive/' + access_token_google_drive + '/' + id + '/' + localStorage.getItem('folder_id') + '/uploadGoogleDrive';
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                open={uploadFileShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "60%",
                        height: "70%",
                        bgcolor: 'background.paper',
                        border: '2px solid #ff9900',
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
                        <Grid item xs={4} sm={6} md={8}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: "rgb(35, 54, 78)"
                                }}
                                variant="h6"
                            >
                                My Google Drive
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2} md={4}>
                            <Button
                                type="submit"
                                onClick={(event) => cancel(event)}
                                sx={{
                                    height: 40.5,
                                    width: "100%",
                                    border: "1px solid #ff9900",
                                    backgroundColor: "#e0e0e0",
                                    color: "#ff9900"
                                }}
                                size='medium'
                            >
                                Cancel
                            </Button>
                        </Grid>
                        {
                            file.length ?
                                file.map((item, index) => {
                                    return (
                                        <Grid item xs={4} sm={8} md={12}>
                                            <Grid
                                                container
                                                spacing={{ xs: 2, md: 3 }}
                                                columns={{ xs: 4, sm: 8, md: 12 }}
                                            >
                                                <Grid item xs={1} sm={1} md={1}></Grid>
                                                <Grid item xs={4} sm={8} md={3}>
                                                    <Button
                                                        type="submit"
                                                        onClick={(event) => uploadGoogleDrive(event, item.id)}
                                                        sx={{
                                                            height: 40.5,
                                                            width: "100%",
                                                            border: "1px solid #ff9900",
                                                            backgroundColor: "#FFFF66",
                                                            color: "#ff9900"
                                                        }}
                                                        size='medium'
                                                    >
                                                        <UploadFileIcon />&nbsp; Upload
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={8} md={7}>
                                                    <Typography
                                                        sx={{
                                                            color: "rgb(35, 54, 78)",
                                                            fontSize: "16px",
                                                            marginTop: "8px"
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1} sm={1} md={1}></Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                }
                                ) : null}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}
export default CheckGoogleDrive;