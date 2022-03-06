import React, {useState,useEffect} from "react";
import {Navbar,Container,Button,Row,Col,Table,Modal,Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import dots from "../../images/dots.png";
import download from "../../images/download.png";
import seacrh from "../../images/magnifying-glass.png";
import setting from "../../images/setting.png";
import man from "../../images/man.png";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';



const options1 = [
  {
    label1: "All Job Titles",
  },
];
const options2 = [
  {
    label2: "All Departments",
  },
];
const options3 = [
  {
    label3: "All Offices",
  },
];
const options4 = [
  {
    label4: "Onboarding, Probationary,(+3)",
  },
];
const options5 = [
  {
    label5: "All Work Schedules",
  },
];

const Employee=()=>{
  const [show,setShow]=useState(false);
  const $token=localStorage.getItem('access_token');
  const [employees, setEmployees]= useState([]);
  const [users, setUsers]= useState([]);
  const [render, setRender] = useState(false);

  const changeStatus = (id) => {
  fetch("http://localhost:8000/api/account/blockAccount/"+id, {
      method: "GET",
      headers: {"Authorization": `Bearer `+$token}
    })
  .then(response => response.json())
  .then(data =>  {
      if(data.error){
          toast.error('Change status failed.', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
          });

      }
      else{
          setRender(!render)
          toast.success('Change status successfully.', {
           position: "bottom-right",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored"
       });
      }
  });
  };
  const handleModal=()=>{
    setShow(!show);
  }
  const navigate = useNavigate();
  const getEmployees = () =>{
    fetch(process.env.REACT_APP_API+'/employee/getAllEmployee', {
        method: "GET",
        headers: {"Authorization": `Bearer `+$token}
      })
    .then(response => response.json())
    .then(data =>  {
          setUsers(data.data[0].reverse());
          setEmployees(data.data[1].reverse());
    });
}
const [error, setError] = useState({
  first_name:null,
  last_name:null,
  email:null
});
const [addEmployee, setAddEmployee] = useState({
  first_name:'',
  last_name:'',
  email:'',
});
const aonChangeaddEmployee = (event) => {
  let _name = event.target.name;
  let _type = event.target.type;
  let _value = event.target.value;
  setAddEmployee({...addEmployee,[_name]:_value});
};
const onAddEmployee = (e) => {
  const _formData = new FormData();
  _formData.append('first_name', addEmployee.first_name);
  _formData.append('last_name', addEmployee.last_name);
  _formData.append('email', addEmployee.email);
  const requestOptions = {
      method: 'POST',
      body: _formData,
      headers: {"Authorization": `Bearer `+$token}
  };
  fetch(process.env.REACT_APP_API+'/employee/createEmployee', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if(json.error){
          if (json.error === 'account login is not admin') {
            toast.error(`You are not admin!!!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError('');
        }else{
            setError(json.error);
        }
        }else{
          toast.success(`Create employee successfully !!!`, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });       
            setError('');
            setShow(!show);
            setRender(!render)
          }
      });
};
const deleteEmployee=(event,id,first,last)=>{
  Swal.fire({
      title: 'Delete "'+last+' '+first+'" Employee?',
      text: "Do you want to permanently delete this employee?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cance',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
          onDelete(id);
      }
    })
}
const onDelete = (id) =>{
  fetch(process.env.REACT_APP_API+'/employee/destroyEmployee/'+id, {
      method: "DELETE",
      headers: {"Authorization": `Bearer `+$token}
    })
  .then(response => response.json())
  .then(data =>  {
     if(data.error){
          toast.error('Delete Failed.', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
          });
     }
     else{
          setRender(!render)
          toast.success('Deleted successfully.', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
          });
     }
  });
}
const   ExportUser = (event) =>{
       window.location.href = process.env.REACT_APP_API+"/employee/exportEmployee";            
}
  useEffect(() => {
    if($token){
      getEmployees();
    }else{
       navigate('/home');
    }
}, [render])
    return (
      <div maxWidth="100%" style={{ backgroundColor: '#eceff1', height: '100vh'}}>
        <Modal
          size="lg"
          show={show}
          onHide={() =>handleModal() }
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
                    name="first_name"
                    placeholder="First Name"
                    onChange={(event) => aonChangeaddEmployee(event)}
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
                    name="last_name"
                    onChange={(event) => aonChangeaddEmployee(event)}
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
                    onChange={(event) => aonChangeaddEmployee(event)}
                    name="email"
                    placeholder="Email"
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
            onClick={(event)=>onAddEmployee(event)}
              style={{
                backgroundColor: "#FFFF66",
                borderColor: "#ff9900",
                color: "#ff9900",
                fontSize: "14px",
              }}
            >
              Create
            </Button>
            <Button
              onClick={() =>handleModal()}
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
              <Col
                  style={{fontSize:"large", fontWeight:"bold"}}>All current employees.
              </Col>
              <Col xs lg="auto">
                <Button
                onClick={(event)=>ExportUser(event)}
                 style={{
                  backgroundColor: "#CCCCCC",
                  borderColor: "#CCCCCC",
                  color: "black",
                  fontSize: "14px"
                }}
                >
                  <img style={{
                marginTop:"-4px"
                }} src={download} className="employeeIcon" /> Download csv
                </Button>
                {"  "}
                <Button
                  onClick={() =>handleModal()}
                  style={{
                    backgroundColor: "#FFFF66",
                    borderColor: "#ff9900",
                    color: "#ff9900",
                    fontSize: "14px",

                  }}
                >
                  {" "}
                  <i class="fa fa-plus"  aria-hidden="true"></i> New Profile
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
        <Row style={{ backgroundColor: "#eceff1", height:"100%" }}>
          <Col className="mt-3">
            <Container fluid>
              <div className=" bobyEmployee " style={{ paddingRight: "20px",paddingLeft: "20px", backgroundColor:"white" }}>
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
                    placeholder="Search by name"
                    className="employeeSearch"
                  />
                </div>
                <div className="table" style={{ paddingRight: "20px", backgroundColor:"white" }}>
                  <Table responsive="sm" className="tableEmployee">
                    <thead>
                      <tr>
                        <th>
                          Employee Name
                        </th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Account</th>
                        <th>Join Date</th>
                        <th>
                          <img
                            src={setting}
                            className="employeeIcon searchIcon"
                          />{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      employees.length?
                        employees.map((item,index)=>{
                          return(
                            <tr>
                              <td>
                                {item.avatar
                                  ?
                                    <img src={process.env.REACT_APP_FILE+'/avatar/'+item.avatar} className="employeeAvt" />
                                  :
                                    <img src={process.env.REACT_APP_FILE+'/avatar/man.png'} className="employeeAvt" />
                                }
                               {item.last_name+' '+item.first_name}
                              </td>
                              <td>{item.email?item.email:"-"}</td>
                              <td>{item.phone?item.phone:"-"}</td>
                              <td> 
                                {item.birthday?new Intl.DateTimeFormat('de-DE',{year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(item.birthday)):"-"}
                              </td>
                              <td>{item.gender?item.gender:"-"}</td>
                              <td>
                                <label class="switch">
                                {
                                    users.length
                                    ?
                                      users.map((itemUser,index)=>{
                                        if(itemUser.id===item.user_id){
                                          if(itemUser.status==="active"){
                                            return (
                                              <Switch
                                              onChange={()=>changeStatus(item.user_id)}
                                              defaultChecked={true}  
                                              inputProps={{
                                                'aria-labelledby': 'switch-list-label-wifi',
                                              }}
                                            />
                                            );
                                          }else{
                                            return (
                                              <Switch
                                              onChange={()=>changeStatus(item.user_id)}
                                              defaultChecked={false}  
                                              inputProps={{
                                                'aria-labelledby': 'switch-list-label-wifi',
                                              }}
                                            />
                                            );
                                          }
                                        }
                                      })
                                    :null
                                  }
                                </label>
                              </td>
                        <td>
                        {new Intl.DateTimeFormat('de-DE',{year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(item.created_at))}
                        </td>
                        <td>
                          {" "}
                          <div class="dropdown">
                            <span>
                              <img  style={{marginLeft: "6px"}} src={dots} className="employeeIcon" />
                            </span>
                            <div class="dropdown-content">
                              <Button
                                className="btnEmployee"
                                onClick={(event)=>deleteEmployee(event,item.id,item.first_name,item.last_name)}
                                style={{
                                  backgroundColor: "#FFFF66",
                                  border: "solid 1px #ff9900",
                                  color: "#ff9900",
                                  fontSize: "12px",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </td>
                            </tr>
                        )
                      }):null
                    }
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

export default Employee;