import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import googleLogo from "../../images/googleLogo.png";
import eye_open from "../../images/eye_open.png";
import eye_close from "../../images/eye_close.png";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Login = (props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
      if(!isPasswordShown){
          setIsPasswordShown(true);
      }else{
        setIsPasswordShown(false);
      }
    };

    const [showLogin, setShowLogin] = useState(true);
    const [errorForm1, setErrorForm1] = useState({
      domain:null,
    });
    const [errorForm2, setErrorForm2] = useState({
      email:null,
      password:null,
    });
    const [domain, setDomain] = useState({
      domain:''
    });
    const [user, setUser] = useState({
      email:'',
      password:''
    });
    const match = useRouteMatch();
    const history = useHistory();
    const addDomain = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setDomain({
            ...domain,
            [field]: value,
        });
    };

    const addUser = (event) => {
      const target = event.target;
      const field = target.name;
      const value = target.value;
      setUser({
          ...user,
          [field]: value,
      });
    };

    const checkDomain = (e) => {
      e.preventDefault();
          const _formData = new FormData();
          _formData.append('domain', domain.domain);
          const requestOptions = {
              method: 'POST',
              body: _formData,
          };
          fetch(process.env.REACT_APP_API+'/user/checkDomain', requestOptions)
              .then((res) => res.json())
              .then((json) => {
                  if (json.error) {
                    if(json.error=="No one have domain"){
                      toast.error(`Domain does not exist !!!`, {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
                      setErrorForm1("");
                    }else{
                      setErrorForm1(json.error);
                    }
                  } else {
                      toast.success(`Successfully !!!`, {
                          position: 'top-center',
                          autoClose: 500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
                      if(!showLogin){
                        setShowLogin(true);
                      }else{
                        setShowLogin(false);
                   }
                }
              });
  };


    // const loginGoogle = (event) => {
    //     const requestOptions = {
    //         method: 'GET',
    //     };
    //     fetch('http://127.0.0.1:8000/api/auth/redirect/google', requestOptions)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             window.location.href = json.link;
    //         });
    // };
    // const loginFacebook = (event) => {
    //     const requestOptions = {
    //         method: 'GET',
    //     };
    //     fetch('http://127.0.0.1:8000/api/auth/facebook', requestOptions)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             window.location.href = json.link;
    //         });
    // };

    const onLogin = (e) => {
            e.preventDefault();
            const _formData = new FormData();
            _formData.append('email', user.email);
            _formData.append('password', user.password);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch(process.env.REACT_APP_API+'/user/login', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                  if(json.error){
                    if (json.error === 'Unauthorized') {
                      toast.error(`Login information is incorrect !!!`, {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
                      setErrorForm2('');
                  } else if (json.error === 'Blocked') {
                      toast.warn(`Your account has been blocked !!!`, {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
                      setErrorForm2("");
                  }else{
                      setErrorForm2(json.error);
                  }
                  }else{
                    localStorage.setItem('access_token', json.access_token);
                    localStorage.setItem('first_name',json.name.first_name);
                    localStorage.setItem('last_name',json.name.last_name);
                    localStorage.setItem('avatar', json.name.avatar);
                    toast.success(`Logged in successfully !!!`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                     history.push('/');
                  }
                });
    };
    useEffect(() => {
      if (localStorage.getItem('access_token')) {
          history.push('/user-profile');
      }
  }, []);
    return(
  showLogin ? 
    <div className="container mt-5" >
        <div className="mt-5 " id="loginState">
          <Form className="formLogin">
            <h3>Login to your account</h3>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Domain Company*</Form.Label>
              <Form.Control name="domain" onChange={(event) => addDomain(event)} type="text" placeholder="Domain Company" required />
              <span className="errorNotify">{errorForm1.domain?errorForm1.domain[0]:""}</span>
            </Form.Group>
            <Button
            type={'submit'}
              onClick={(event) => checkDomain(event)}
              className={"btnLogin"}
              style={{
                backgroundColor: "#FFFF66",
                border: "1px solid #ff9900",
                color:"#ff9900",
                fontWeight:"bold"
              }}
            >
              Continue
            </Button>
          </Form>
          <center className="mt-3">
            Don't have an account?
            <a href="/register" style={{ color: "#ff9900", textDecoration: "none" }}>
              {" "}
              Sign Up
            </a>
          </center>
        </div>
      </div>
:
    <div className="container">
        <Form id="memberLoginForm">
          <h3>Member Login</h3>
          <p>Good day!</p>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" onChange={(event) => addUser(event)} type="email" placeholder="Email Address" />
            <span className="errorNotify">{errorForm2.email?errorForm2.email[0]:""}</span>
          </Form.Group>
          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              name="password" onChange={(event) => addUser(event)}
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
            />
            <img
              src={isPasswordShown ? eye_open : eye_close}
              id="eye_open"
              style={{ float: "right" }}
              onClick={() => togglePasswordVisibility()}
            />
            <span className="errorNotify">{errorForm2.password?errorForm2.password[0]:""}</span>
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Col md="auto">
              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </Col>
            <Col sm="auto">
              <a  style={{
              color:"#ff9900",
            }} href="/forgot-password">Forgot password?</a>
            </Col>
          </Row>
          <Button
            type="submit"
            className={"btnLogin"}
            onClick={(event) => onLogin(event)}
            style={{
              backgroundColor: "#FFFF66",
              border: "1px solid #ff9900",
              color:"#ff9900",
              fontWeight:"bold"
            }}
          >
            Continue
          </Button>
          <center className="mt-3 mb-2">OR</center>
          <Button
            type="submit"
            className="btnLogin "
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #CCCCCC",
              color: "black",
            }}
          >
            <img
              src={googleLogo}
              className="mb-1"
              alt="googleLogo"
              style={{ with: "15px", height: "15px" }}
            />{" "}
            Login with Google
          </Button>
        </Form>
      </div>
    );
}
export default Login;