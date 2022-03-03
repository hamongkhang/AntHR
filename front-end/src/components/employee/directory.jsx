import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import seacrh from "../../images/magnifying-glass.png";

class Directory extends Component {
  render() {
    return (
      <div>
        <Row style={{ padding: "20px" }}>
          <div>
            <Container fluid>
              <Col>
                <select className="employeeOption">
                  <option value="All Offices">All Offices</option>
                </select>{" "}
                <select className="employeeOption">
                  <option value="All Departments">All Departments</option>
                </select>{" "}
                <img src={seacrh} className="employeeIcon searchIcon" />{" "}
                <input
                  type="text"
                  placeholder="Search"
                  className="employeeSearch"
                />
              </Col>
            </Container>
          </div>
        </Row>
        <Row>
          <Col style={{ backgroundColor: "#EEEEEE" }}>
            <Container className="cardEmployees">
              <Col className="colCards ">
                <img src="https://i.pinimg.com/564x/05/ed/11/05ed1128fe3a8784ad68900d310654d6.jpg"></img>
                <h6>name</h6>
                <p>Finance Manager</p>
                <p>
                  <i class="fas fa-phone-alt"></i> 04758457454
                </p>
                <p>abc@gmail.com</p>
                <hr></hr>
                Line Manager Hà Mộng Khang
              </Col>
              <Col className="colCards ">
                <img src="https://i.pinimg.com/564x/05/ed/11/05ed1128fe3a8784ad68900d310654d6.jpg"></img>
                <h6>name</h6>
                <p>Finance Manager</p>
                <p>
                  <i class="fas fa-phone-alt"></i> 04758457454
                </p>
                <p>abc@gmail.com</p>
                <hr></hr>
                Line Manager Hà Mộng Khang
              </Col>
              <Col className="colCards ">
                <img src="https://i.pinimg.com/564x/05/ed/11/05ed1128fe3a8784ad68900d310654d6.jpg"></img>
                <h6>name</h6>
                <p>Finance Manager</p>
                <p>
                  <i class="fas fa-phone-alt"></i> 04758457454
                </p>
                <p>abc@gmail.com</p>
                <hr></hr>
                Line Manager Hà Mộng Khang
              </Col>
              <Col className="colCards ">
                <img src="https://i.pinimg.com/564x/05/ed/11/05ed1128fe3a8784ad68900d310654d6.jpg"></img>
                <h6>name</h6>
                <p>Finance Manager</p>
                <p>
                  <i class="fas fa-phone-alt"></i> 04758457454
                </p>
                <p>abc@gmail.com</p>
                <hr></hr>
                Line Manager Hà Mộng Khang
              </Col>
              <Col className="colCards ">
                <img src="https://i.pinimg.com/564x/05/ed/11/05ed1128fe3a8784ad68900d310654d6.jpg"></img>
                <h6>name</h6>
                <p>Finance Manager</p>
                <p>
                  <i class="fas fa-phone-alt"></i> 04758457454
                </p>
                <p>abc@gmail.com</p>
                <hr></hr>
                Line Manager Hà Mộng Khang
              </Col>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Directory;
