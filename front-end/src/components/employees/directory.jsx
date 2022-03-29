import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from "@mui/material";

const Directory = (props) => {
    const $token = localStorage.getItem('access_token');
    const [directories, setDirectories] = useState([]);
    const [userDirectory, setUserDirectory] = useState([]);
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getDirectory = () => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/employee/getAllEmployee', {
            method: "GET",
            headers: { "Authorization": `Bearer ` + $token }
        })
            .then(response => response.json())
            .then(data => {
                setUserDirectory(data.data[0].reverse());
                setDirectories(data.data[1].reverse());
                setLoading(false)
            });
    }
    const employeeDetail = (item) => {
        navigate(`/home/employees/detail/${item.id}`)
    }
    useEffect(() => {
        if ($token) {
            getDirectory();
        } else {
            navigate('/home');
        }
    }, [render])
    return (
        <>
            <Backdrop
                sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                sx={{
                    maxWidth: "100%",
                    border: "solid 1px #cfd8dc",
                    height: '100%',
                    padding: "20px",
                }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 9, md: 12 }}
                >
                    {
                        directories.length ?
                            directories.map((item, index) => {
                                return (
                                    <Grid item xs={2} sm={3} md={3}>
                                        <Box onClick={() => employeeDetail(item)}
                                            sx={{
                                                backgroundColor: "white",
                                                boxShadow: 'rgb(95 125 149 / 7%) 0px 4px 13px 0px',
                                                border: "1px solid rgb(235, 240, 244)",
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: "100%",
                                                borderRadius: '5px',
                                                padding: "24px",
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <img
                                                style={{
                                                    height: "70px",
                                                    width: "70px",
                                                    objectFit: 'cover',
                                                    borderRadius: "100%",
                                                    marginBottom: "20px"
                                                }}
                                                src={item.avatar
                                                    ?
                                                    (item.avatar.search('https://') != -1)
                                                        ?
                                                        item.avatar
                                                        :
                                                        process.env.REACT_APP_FILE + '/avatar/' + item.avatar
                                                    :
                                                    process.env.REACT_APP_FILE + '/avatar/avatar.png'
                                                }>
                                            </img>
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "rgb(35, 54, 78)"
                                                }}
                                                variant="h6"
                                            >
                                                {item.last_name ? item.last_name : "-"} {item.first_name ? item.first_name : "-"}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineheight: "20px",
                                                    color: "rgb(95, 125, 149)",
                                                    marginBottom: "15px"
                                                }}
                                            >
                                                Finance Manager
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineheight: "20px",
                                                    color: "rgb(95, 125, 149)"
                                                }}
                                            >
                                                <LocalPhoneOutlinedIcon sx={{ marginRight: "5px" }} />
                                                <a href={"tel:" + item.phone} style={{ color: "inherit", textDecoration: "none", fontSize: "16px" }} >{item.phone ? item.phone : "-"}</a>
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineheight: "20px",
                                                    color: "rgb(95, 125, 149)",
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    marginBottom: "10px"
                                                }}
                                            >
                                                <a href={"mailto:" + item.email} style={{ color: "inherit", textDecoration: "none", fontSize: "14px" }}>{item.email ? item.email : "-"}</a>
                                            </Typography>
                                            <hr style={{ color: "grey" }}></hr>
                                            <Typography
                                                sx={{
                                                    color: "rgb(35, 54, 78)",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    lineheight: "20px",
                                                    color: "rgb(95, 125, 149)",
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                Line Manager Mộng Khang Hà
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )
                            }
                            ) : null
                    }
                </Grid>
            </Box>
        </>
    );
}

export default Directory;