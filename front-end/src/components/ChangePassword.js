import React,{useState} from'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button,Form,Row,Col } from 'react-bootstrap';
import './ChangePass.Modal.css';


function ChangePassword(props) {
  const[eye,setEye]=useState(true);
  const[password, setPassword]=useState("password");

  const Eye=()=>{
    if(password=="password"){
    setPassword("text");
    setEye(false);
  
    }
    else{
    setPassword("password");
    setEye(true);
    }
    }

        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-changepass">
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">Current Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password} placeholder="Current Password" />
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">New Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password} placeholder="New Password" />
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">Confirm Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password} name='password' placeholder="Confirm Password" />
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                    </Col>
                  </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="tb" active onClick={props.onHide}>Change Password</Button>{' '}
                <Button variant="secondary" size="tb" active onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        );
      }
export default ChangePassword;
      
   