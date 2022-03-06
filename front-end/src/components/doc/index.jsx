import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Table, Col, Row } from "react-bootstrap";
import { FiShare2 } from "react-icons/fi";
import { BsThreeDots, BsDownload } from "react-icons/bs";
import { BiSearch, BiCloudUpload } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

const Doc = (props) => {
  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>
            <p>
              Folder&nbsp;» Khang <FiShare2 className="nar_icon"></FiShare2>
            </p>
          </Navbar.Brand>
          <Button variant="info" active style={{ float: "right" }}>
            <BsThreeDots className="dot_icon"></BsThreeDots>
          </Button>
        </Container>
      </Navbar>
      <Container>
        <div style={{ border: "1px solid #EEEEEE", margin: "30px" }}>
          <div className="search-upgrade">
            <div className="search">
              <BiSearch className="biSearch"></BiSearch>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search by name"
              />
            </div>
            <div className="doc_btn">
              <Button variant="danger">
                <BsDownload></BsDownload>{" "}Download{" "}
              </Button>
              <Button variant="warning">
                <BiCloudUpload></BiCloudUpload> Upload{" "}
                <FiChevronDown></FiChevronDown>
              </Button>
            </div>
          </div>
          <div style={{ border: "1px solid #EEEEEE", padding: "10px"}}>
            <Row>
              <Col>Name</Col>
              <Col  md="auto"style={{ textAlign: "center" }}>Size</Col>
              <Col  xs lg="2"></Col>
            </Row>
            <Row>
              <Col style={{paddingTop:"5px"}}>
               You need upload file doc
              </Col>
              <Col md="auto" style={{paddingRight:"2px", paddingTop:"5px"}}>
                183 KB
              </Col>
              <Col xs lg="2" style={{paddingLeft:"40px"}} >
                <Button variant="light" style={{padding:"2px 6px 2px 6px"}}>
                  <BsDownload></BsDownload>
                </Button>{" "}
                <Button variant="light"  style={{padding:"2px 6px 2px 6px"}}>
                  <BsThreeDots></BsThreeDots>
                </Button>
              </Col>
            </Row>
            <Row style={{marginTop:"20px",  borderTop: "1px solid #EEEEEE"}}>
              <Col style={{paddingTop:"20px", paddingBottom:"10px"}}>1 result</Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Doc;
