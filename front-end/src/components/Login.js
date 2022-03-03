import React, { Component} from "react";
import { Form, Button } from "react-bootstrap";
export default class Login extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="mt-5 " id="loginState">
          <Form className="formLogin">
            <h3>Login to your account</h3>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>Email Adress*</Form.Label>
              <Form.Control type="email" placeholder="Email Address" />
            </Form.Group>
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
          </Form>
          <center className="mt-3">
            Don't have an account?
            <a href="" style={{ color: "#2ad25f", textDecoration: "none" }}>
              {" "}
              Sign Up
            </a>
          </center>
        </div>
      </div>
    );
  }
}
