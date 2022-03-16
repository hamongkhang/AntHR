import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import LeftBoxInfor from './LeftBoxInfor';
import PersonalInfor from './PersonalInfor';
import Address from './Address';
import BankInfor from './BankInfor';
import { useParams } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const EmployeeDetail = (props) => {
    const [employee, setEmployee] = useState(
        {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          birthday: '',
          gender: '',
    
          postal_code: '',
          city: '',
          country: '',
          state: '',
    
          name: '',
          user_name: '',
          user_number: ''
        }
      )
    const params = useParams();
    const $token = localStorage.getItem('access_token');
    const getInforEmployee = () => {
        const requestOptions = {
          method: 'GET',
          headers: { "Authorization": `Bearer ` + $token }
        };
        fetch(process.env.REACT_APP_API + `/employee/getOneEmployee/${params.id}`, requestOptions)
          .then((res) => res.json())
          .then((json) => {
            if (json.error) {
            }
            else {
              if (json.user[0] != null) {
                  console.log(json.user[0]);
                let e = {
                  avatar:'',
                  first_name: '',last_name: '',phone: '',email: '',birthday: '',gender: '',
                  postal_code: '',city: '',country: '',state: '',
                  name: '',user_name: '',user_number: ''
                }
                e.avatar = json.user[0].avatar
                e.first_name = json.user[0].first_name
                e.last_name = json.user[0].last_name
                e.phone = json.user[0].phone
                e.email = json.user[0].email
                e.birthday = new Date(json.user[0].birthday).toLocaleDateString('fr-CA')
                e.gender = json.user[0].gender
                if (json.user[1] != null) {
                  e.postal_code = json.user[1].postal_code
                  e.city = json.user[1].city
                  e.country = json.user[1].country
                  e.state = json.user[1].state
                }
                setEmployee(e)
              }
            }
          });
      }
    useEffect(()=>{
        console.log(params.id);
        getInforEmployee()
    },[])
    return (
        <Box>
            <Box sx={{ display: { xs: 'block', md: 'grid' } }} gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 3">
                    <LeftBoxInfor
                        Item={Item}
                        avatar={employee.avatar}
                        firstname={employee.first_name}
                        lastname={employee.last_name}
                        phone={employee.phone}
                        email={employee.email}
                    />
                </Box>
                <Box gridColumn="span 9" gap={2}>

                    <>
                        <PersonalInfor Item={Item}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                        <Address Item={Item}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                        <BankInfor Item={Item}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                    </>

                </Box>
            </Box>
        </Box >
    );
}
export default EmployeeDetail;