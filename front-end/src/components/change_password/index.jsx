import React, { useState, useEffect } from 'react';
import { Modal,Button,Form,Row,Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


toast.configure();

const ChangePassword = (props) => {
    const[eye1,setEye1]=useState(true);
    const[password1, setPassword1]=useState("password");
    const[eye2,setEye2]=useState(true);
    const[password2, setPassword2]=useState("password");
    const[eye3,setEye3]=useState(true);
    const[password3, setPassword3]=useState("password");
    const Eye1=()=>{
        if(password1=="password"){
            setPassword1("text");
            setEye1(false);
        }else{
            setPassword1("password");
            setEye1(true);
        }
    }
    const Eye2=()=>{
        if(password2=="password"){
            setPassword2("text");
            setEye2(false);
        }
        else{
            setPassword2("password");
            setEye2(true);
        }
    }
    const Eye3=()=>{
        if(password3=="password"){
            setPassword3("text");
            setEye3(false);
        }
        else{
            setPassword3("password");
            setEye3(true);
        }
    }
    const [error, setError] = useState({
        current_password:null,
        new_password:null,
        new_password_confirmed:null,
    });
    const [change, setChange] = useState({
        current_password:'',
        new_password:'',
        new_password_confirmed:''
    });
    const addPassword = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setChange({
            ...change,
            [field]: value,
        });
    };
    const $token=localStorage.getItem('access_token');
    const onChangePassword = (e) => {
        e.preventDefault();
            const _formData = new FormData();
            _formData.append('current_password', change.current_password);
            _formData.append('new_password', change.new_password);
            _formData.append('new_password_confirmed', change.new_password_confirmed);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: {"Authorization": `Bearer `+$token}
            };
            fetch(process.env.REACT_APP_API+'/user/changePassword', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        if(json.error=="Current password is not correct"){
                                toast.error(`Current password is not correct !!!`, {
                                    position: 'top-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setError("");
                        }else{
                                setError(json.error);
                        }
                    } else {
                        toast.success(`User successfully changed password !!!`, {
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
    return(
        <>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{marginTop:"60px"}}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-changepass">
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">Current Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password1} placeholder="Current Password" name="current_password" onChange={(event) => addPassword(event)} />
                      <i onClick={Eye1} className={`fa ${eye1 ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                      <span className="errorNotify">{error.current_password?error.current_password[0]:""}</span>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">New Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password2} placeholder="New Password" name="new_password" onChange={(event) => addPassword(event)} />
                      <i onClick={Eye2} className={`fa ${eye2 ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                      <span className="errorNotify">{error.new_password?error.new_password[0]:""}</span>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">Confirm Password *</Form.Label>
                    <Col sm="9">
                      <Form.Control type={password3}  placeholder="Confirm Password" name="new_password_confirmed" onChange={(event) => addPassword(event)}/>
                      <i onClick={Eye3} className={`fa ${eye3 ? "fa-eye-slash" : "fa-eye"}`} id="eye_modal" style={{float:"right"}}></i>
                      <span className="errorNotify">{error.new_password_confirmed?error.new_password_confirmed[0]:""}</span>
                    </Col>
                  </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} size="tb" active onClick={(event) => onChangePassword(event)}>Change Password</Button>{' '}
                <Button variant="primary" style={{backgroundColor: 'grey', '&:hover': { borderColor: 'gray' }}}  size="tb" active onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
          </Modal> 
          </>
    );
}
export default ChangePassword;






  


   
      
   