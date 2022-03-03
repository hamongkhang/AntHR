import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Row } from "react-bootstrap";

import user from "../../images/user.png";

import Directory from "./directory";
import Manager from "./manager";

class NavEmployee extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar className="employeeNav">
            <Container fluid>
              <Navbar.Brand>
                {" "}
                <img src={user} className="employeeIcon mb-1" /> EmPloyees
              </Navbar.Brand>
              <Navbar.Toggle />
              <Nav className="navMenu">
                <Nav.Link
                  href="#man"
                  className="nav-link nav-link-grow-up mt-1"
                  style={{ padding: "0" }}
                >
                  MANAGER EMPLOYEES
                </Nav.Link>
                <Nav.Link
                  href="#di"
                  className="nav-link nav-link-grow-up mt-1"
                  style={{ padding: "0" }}
                >
                  DIRECTORY
                </Nav.Link>
                <Nav.Link
                  href="#org"
                  className="nav-link nav-link-grow-up mt-1"
                  style={{ padding: "0" }}
                >
                  ORG CHART
                </Nav.Link>
              </Nav>
              <Button
                style={{
                  backgroundColor: "#FF00CC",
                  border: "#FF00CC",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                className="btnEmployee"
              >
                UPGRADE PLAN
              </Button>
            </Container>
          </Navbar>
        </Row>

        {/* <Directory /> */}
        <Manager />
      </div>
    );
  }
}

export default NavEmployee;
