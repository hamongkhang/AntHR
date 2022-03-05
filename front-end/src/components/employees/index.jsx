import React, { Component } from "react";
import {
  Navbar,
  Container,
  Button,
  Row,
  Col,
  Table,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import dots from "../../images/dots.png";
import download from "../../images/download.png";
import seacrh from "../../images/magnifying-glass.png";
import setting from "../../images/setting.png";
import man from "../../images/man.png";

const options1 = [
  {
    label1: "All Job Titles",
    value1: "All Job Titles",
  },
];
const options2 = [
  {
    label2: "All Departments",
    value2: "All Departments",
  },
];
const options3 = [
  {
    label3: "All Offices",
    value3: "All Offices",
  },
];
const options4 = [
  {
    label4: "Onboarding, Probationary,(+3)",
    value4: "Onboarding, Probationary,(+3)",
  },
];
const options5 = [
  {
    label5: "All Work Schedules",
    value5: "All Work Schedules",
  },
];

class Employee extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={() => {
            this.handleModal();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGroupFname"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGroupLname"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGroupEmail"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formGroupEmail"
                >
                  <Form.Control type="date" style={{ fontSize: "14px" }} />
                  <input
                    type="checkbox"
                    value="sentEmail"
                    className="mt-4"
                  />{" "}
                  <label>Sent email invitation</label>
                </Form.Group>
                <Form.Group as={Col}></Form.Group>
                <Form.Group as={Col}></Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                backgroundColor: "#ffffcc",
                borderColor: "#ff9900",
                color: "#ff9900",
                fontSize: "14px",
              }}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                this.handleModal();
              }}
              style={{
                backgroundColor: "#CCCCCC",
                borderColor: "#CCCCCC",
                color: "#000000",
                fontSize: "14px",
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Navbar>
            <Container fluid>
              <Col>
                <select>
                  <option value="default-view" selected>
                    Default View
                  </option>
                  <option value="dark-view">Dark View</option>
                  <option value="light-view">Light View</option>
                </select>
                <p>
                  <i>All curent employees.</i>
                </p>
              </Col>
              <Col xs lg="auto">
                <Button
                  style={{
                    backgroundColor: "	#CCCCCC",
                    borderColor: "	#CCCCCC",
                    color: "	#000000",
                    fontSize: "14px",
                  }}
                >
                  <img src={download} className="employeeIcon" /> Download csv
                </Button>
                {"  "}
                <Button
                  onClick={() => {
                    this.handleModal();
                  }}
                  style={{
                    backgroundColor: "#ffffcc",
                    borderColor: "#ff9900",
                    color: "#ff9900",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  <i class="fa fa-plus" aria-hidden="true"></i> New Profile
                </Button>
                {"  "}
                <Button
                  style={{
                    backgroundColor: "#CCCCCC",
                    borderColor: "#CCCCCC",
                    fontSize: "14px",
                  }}
                >
                  <img src={dots} className="employeeIcon" />
                </Button>
              </Col>
            </Container>
          </Navbar>
        </Row>
        <Row style={{ backgroundColor: "#EEEEEE" }}>
          <Col className="mt-3">
            <Container fluid>
              <div className=" bobyEmployee ">
                <div className="headEmployee">
                  <select className="employeeOption">
                    {options1.map((option) => (
                      <option value={option.value1}>{option.label1}</option>
                    ))}
                  </select>{" "}
                  <select className="employeeOption">
                    {options2.map((option) => (
                      <option value={option.value2}>{option.label2}</option>
                    ))}
                  </select>{" "}
                  <select className="employeeOption">
                    {options3.map((option) => (
                      <option value={option.value3}>{option.label3}</option>
                    ))}
                  </select>{" "}
                  <select className="employeeOption">
                    {options4.map((option) => (
                      <option value={option.value4}>{option.label4}</option>
                    ))}
                  </select>{" "}
                  <select className="employeeOption">
                    {options5.map((option) => (
                      <option value={option.value5}>{option.label5}</option>
                    ))}
                  </select>{" "}
                  <img src={seacrh} className="employeeIcon searchIcon" />{" "}
                  <input
                    type="text"
                    placeholder="Search"
                    className="employeeSearch"
                  />
                </div>
                <div className="table" style={{ paddingRight: "20px" }}>
                  <Table responsive="sm" className="tableEmployee">
                    <thead>
                      <tr>
                        <th>
                          Employee Name <i class="fas fa-arrow-up"></i>
                          <i class="fas fa-arrow-down"></i>
                        </th>
                        <th>Job Title</th>
                        <th>Line Manager</th>
                        <th>Department</th>
                        <th>Office</th>
                        <th>Employee Status</th>
                        <th>Account</th>
                        <th>
                          <img
                            src={setting}
                            className="employeeIcon searchIcon"
                          />{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          <img src={man} className="employeeAvt" /> Angelina
                          Jolie
                        </td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>
                          <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                          </label>
                        </td>
                        <td>Table cell</td>
                        <td>
                          {" "}
                          <div class="dropdown">
                            <span>
                              <img src={dots} className="employeeIcon" />
                            </span>
                            <div class="dropdown-content">
                              <Button
                                className="btnEmployee"
                                style={{
                                  backgroundColor: "#ffffcc",
                                  borderColor: "#ffffcc",
                                  color: "#ff9900",
                                  fontSize: "12px",
                                  marginLeft: "-10px",
                                }}
                              >
                                {/* <i class="fas fa-sign-out-alt"></i> */}
                                Offboarding
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <img src={man} className="employeeAvt" /> Angelina
                          Jolie
                        </td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>
                          <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                          </label>
                        </td>
                        <td>Table cell</td>
                        <td>
                          {" "}
                          <div class="dropdown">
                            <span>
                              <img src={dots} className="employeeIcon" />
                            </span>
                            <div class="dropdown-content">
                              <Button
                                className="btnEmployee"
                                style={{
                                  backgroundColor: "#ffffcc",
                                  borderColor: "#ffffcc",
                                  color: "#ff9900",
                                  fontSize: "12px",
                                  marginLeft: "-10px",
                                }}
                              >
                                Offboarding
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Employee;