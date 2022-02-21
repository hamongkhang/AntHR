import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import googleLogo from "../img/googleLogo.png";
import eye_open from "../img/eye_open.png";
import eye_close from "../img/eye_close.png";

export default class Login2 extends Component {
  state = {
    isPasswordShown: false,
  };
  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  render() {
    const { isPasswordShown } = this.state;
    return (
      <div className="container" style={{ paddingTop: "110px" }}>
        <Form id="memberLoginForm">
          <h3>Member Login</h3>
          <p>Good evening!</p>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control type="email" placeholder="Email Address" />
          </Form.Group>
          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
            />
            <img
              src={isPasswordShown ? eye_open : eye_close}
              id="eye_open"
              style={{ float: "right" }}
              onClick={this.togglePasswordVisibility}
            />
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Col md="auto">
              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </Col>
            <Col sm="auto">
              <a href="">Forgot password?</a>
            </Col>
          </Row>
          <Button
            type="submit"
            className={"btnLogin"}
            style={{
              backgroundColor: "#2ad25f",
              border: "1px solid #2ad25f",
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
}
