import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../home/home';
import Login from '../login';
import ForgotPassword from "../forgot_password";
import Register from "../register";
import ActiveAccount from "../account";

const HomePages = (props) => {
    const { changeRender } = props;
    const [reRender, setReRender] = useState(false);

    const [checkLoggedIn, setCheckLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleCheckLoggedIn = () => {
        if (localStorage.getItem('access_token')) {
            let token = localStorage.getItem('access_token');
            if (token) {
                setCheckLoggedIn(true);
            } else {
                setCheckLoggedIn(false);
            }
        } else {
            setCheckLoggedIn(false);
        }
    };
    useEffect(() => {
        handleCheckLoggedIn();
    }, [reRender]);

    return (
        <>
            <div>
              <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={<Login
                            changeRender={changeRender}
                            setReRender={setReRender}
                            checkLoggedIn={checkLoggedIn}
                            {...props}
                        />
                        }
                    />
                    <Route path="/forgot-password" element={<ForgotPassword/>} />
                    <Route path="/active_account" element={<ActiveAccount />} />
                    <Route
                        path="/home/*"
                        element={<Home changeRender={changeRender} setReRender={setReRender} checkLoggedIn={checkLoggedIn} />}
                    />
                </Routes>
            </div> 
        </>
    );
};

export default HomePages;