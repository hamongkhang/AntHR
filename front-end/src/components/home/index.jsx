import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Home from '../home/home';
import Login from '../login';
import ForgotPassword from "../forgot_password";
import Register from "../register";

const HomePages = (props) => {
    const { changeRender } = props;
    const [reRender, setReRender] = useState(false); 

    const [checkLoggedIn, setCheckLoggedIn] = useState(false);

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
         <Home setReRender={setReRender} checkLoggedIn={checkLoggedIn} />
            <div>
                <Route path="/register" exact component={Register} />
                <Route
                    path="/login"
                    exact
                    render={(props) => (
                        <Login
                            changeRender={changeRender}
                            setReRender={setReRender}
                            checkLoggedIn={checkLoggedIn}
                            {...props}
                        />
                    )}
                />
                <Route path="/forgot-password" exact component={ForgotPassword} />
               {/*  <Route path="/xac-nhan-ma" exact component={CodeVerification} />
                <Route
                    path="/xac-nhan-ma-quen-mat-khau"
                    exact
                    component={CodeVerificationForgot}
                />
                <Route
                    path="/dat-lai-mat-khau"
                    exact
                    component={ResetPassword}
                /> */}
                <Route
                    path="/"
                    exact
                    component={() => <Home changeRender={changeRender} />}
                />
            </div> 
        </>
    );
};

export default HomePages;