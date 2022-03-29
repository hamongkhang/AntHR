import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import eye_open from "../../images/eye_open.png";
import eye_close from "../../images/eye_close.png";
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


toast.configure();

const ForgotPassword = (props) => {
  const navigate = useNavigate()
  const [isPasswordShown1, setIsPasswordShown1] = useState(false);
  const togglePasswordVisibility1 = () => {
    if (!isPasswordShown1) {
      setIsPasswordShown1(true);
    } else {
      setIsPasswordShown1(false);
    }
  };
  const [isPasswordShown2, setIsPasswordShown2] = useState(false);
  const togglePasswordVisibility2 = () => {
    if (!isPasswordShown2) {
      setIsPasswordShown2(true);
    } else {
      setIsPasswordShown2(false);
    }
  };
  const [isCode, setIsCode] = useState(false);
  const [errorForm1, setErrorForm1] = useState({
    email: null,
  });
  const [errorForm2, setErrorForm2] = useState({
    code: null,
    new_password: null,
    new_password_confirmed: null
  });
  const [forgot, setForgot] = useState({
    email: ''
  });
  const [confirm, setConfirm] = useState({
    code: '',
    new_password: '',
    new_password_confirmed: ''
  });
  const [loading, setLoading] = useState(false)
  const addForgot = (event) => {
    const target = event.target;
    const field = target.name;
    const value = target.value;
    setForgot({
      ...forgot,
      [field]: value,
    });
  };

  const addPassword = (event) => {
    const target = event.target;
    const field = target.name;
    const value = target.value;
    setConfirm({
      ...confirm,
      [field]: value,
    });
  };

  const getCodeForgot = (e) => {
    setLoading(true)
    e.preventDefault();
    const _formData = new FormData();
    _formData.append('email', forgot.email);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch(process.env.REACT_APP_API + '/user/getCodeForgotPassword', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "blocked") {
            setLoading(false)
            toast.error(`Your account has been blocked !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setErrorForm1("");
          } else if (json.error == "No email") {
            setLoading(false)
            toast.error(`Email does not exist !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setErrorForm1("");
          }
          else {
            setLoading(false)
            setErrorForm1(json.error);
          }
        } else {
          setLoading(false)
          toast.success(`Successfully !!!`, {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setErrorForm1("");
          setIsCode(true);
        }
      });
  };

  const getCodeResend = (e) => {
    setLoading(true)
    e.preventDefault();
    const _formData = new FormData();
    _formData.append('email', forgot.email);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch(process.env.REACT_APP_API + '/user/getCodeForgotPassword', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error == "blocked") {
            setLoading(false)
            toast.error(`Your account has been blocked !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (json.error == "No email") {
            setLoading(false)
            toast.error(`Email does not exist !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          setLoading(false)
          toast.success(`Successfully !!!`, {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };




  const onForgotPassword = (e) => {
    setLoading(true)
    e.preventDefault();
    const _formData = new FormData();
    _formData.append('code', confirm.code);
    _formData.append('new_password', confirm.new_password);
    _formData.append('new_password_confirmed', confirm.new_password_confirmed);
    const requestOptions = {
      method: 'POST',
      body: _formData,
    };
    fetch(process.env.REACT_APP_API + '/user/changePasswordForgot', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error === 'No one have code') {
            setLoading(false)
            toast.error(`Code you entered is incorrect !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setErrorForm2('');
          } else {
            setLoading(false)
            setErrorForm2(json.error);
          }
        } else {
          setLoading(false)
          toast.success(`Change password in successfully !!!`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/login');
        }
      });
  };
  return (
    <div className="container">
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Form id="memberLoginForm">
        <h3>Forgot Password</h3>
        <p>Good day!</p>
        <Form.Group className="mt-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control name="email"
            onChange={(event) => addForgot(event)}
            type="email" placeholder="Email Address"
          />
          <span className="errorNotify">{errorForm1.email ? errorForm1.email[0] : ""}</span>
        </Form.Group>
        {
          isCode ?
            <>
              <Row className="mb-3 mt-3">
                <Col sm="auto">
                  <a style={{
                    color: "#ff9900",
                  }}
                    href=""
                    onClick={(event) => getCodeResend(event)}
                  >Resend code</a>
                </Col>
              </Row>
              <Form.Group className="mt-3" controlId="formBasicEmail">
                <Form.Label>Code</Form.Label>
                <Form.Control name="code"
                  onChange={(event) => addPassword(event)}
                  type="text" placeholder="Code"
                />
                <span className="errorNotify">{errorForm2.code ? errorForm2.code[0] : ""}</span>
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>New password</Form.Label>

                <Form.Control
                  name="new_password"
                  onChange={(event) => addPassword(event)}
                  type={isPasswordShown1 ? "text" : "password"}
                  placeholder="New password"
                />
                <img
                  src={isPasswordShown1 ? eye_open : eye_close}
                  id="eye_open"
                  style={{ float: "right" }}
                  onClick={() => togglePasswordVisibility1()}
                />
                <span className="errorNotify">{errorForm2.new_password ? errorForm2.new_password[0] : ""}</span>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  name="new_password_confirmed"
                  onChange={(event) => addPassword(event)}
                  type={isPasswordShown2 ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <img
                  src={isPasswordShown2 ? eye_open : eye_close}
                  id="eye_open"
                  style={{ float: "right" }}
                  onClick={() => togglePasswordVisibility2()}
                />
                <span className="errorNotify">{errorForm2.new_password_confirmed ? errorForm2.new_password_confirmed[0] : ""}</span>
              </Form.Group>
            </>
            :
            null
        }
        <Row className="mb-3 mt-3">
        </Row>
        {
          isCode ?
            <Button
              type="submit"
              className={"btnLogin"}
              onClick={(event) => onForgotPassword(event)}
              style={{
                backgroundColor: "#FFFF66",
                border: "1px solid #ff9900",
                color: "#ff9900",
                fontWeight: "bold"
              }}
            >
              Submit
            </Button>
            :
            <Button
              type="submit"
              className={"btnLogin"}
              onClick={(event) => getCodeForgot(event)}
              style={{
                backgroundColor: "#FFFF66",
                border: "1px solid #ff9900",
                color: "#ff9900",
                fontWeight: "bold"
              }}
            >
              Continue
            </Button>
        }
      </Form>
    </div>
  );
}
export default ForgotPassword;