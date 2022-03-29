import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Avatar, Typography, Backdrop } from '@mui/material';
import LeftBoxInfor from './LeftBoxInfor';
import PersonalInfor from './PersonalInfor';
import Address from './Address';
import BankInfor from './BankInfor';
import { useParams } from 'react-router-dom';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const $token = localStorage.getItem('access_token');
  const getInforEmployee = () => {
    setLoading(true)
    const requestOptions = {
      method: 'GET',
      headers: { "Authorization": `Bearer ` + $token }
    };
    fetch(process.env.REACT_APP_API + `/employee/getOneEmployee/${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setLoading(false)
        }
        else {
          if (json.user[0] != null) {
            let e = {
              avatar: '',
              first_name: '', last_name: '', phone: '', email: '', birthday: '', gender: '',
              postal_code: '', city: '', country: '', state: '',
              name: '', user_name: '', user_number: ''
            }
            e.avatar = json.user[0].avatar
            e.first_name = json.user[0].first_name
            e.last_name = json.user[0].last_name
            e.phone = json.user[0].phone
            e.email = json.user[0].email
            e.birthday = json.user[0].birthday !=null ? new Date(json.user[0].birthday).toLocaleDateString('fr-CA') : json.user[0].birthday
            e.gender = json.user[0].gender
            if (json.user[1] != null) {
              e.postal_code = json.user[1].postal_code
              e.city = json.user[1].city
              e.country = json.user[1].country
              e.state = json.user[1].state
            }
            setEmployee(e)
            setLoading(false)
          }
        }
      });
  }
  useEffect(() => {
    console.log(params.id);
    getInforEmployee()
  }, [])
  return (
    <Box>
      <Backdrop
        sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            <Paper sx={{ mt: 2, p: 1 }}>
              <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                  <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                    <PlagiarismOutlinedIcon fontSize='small' sx={{ color: 'white' }} />
                  </Avatar>
                  <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Contracts</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mt: 5, mb: 2, display: 'flex' }} justifyContent='center'>
                  <Avatar sx={{ width: 100, height: 100, backgroundColor: 'grey' }}>
                    <PlagiarismOutlinedIcon fontSize='large' sx={{ color: 'white', width: 60, height: 60 }} />
                  </Avatar>
                </Box>
                <Box sx={{ mb: 5, display: 'flex' }} justifyContent='center'>
                  <Typography variant='h5' sx={{ color: 'gray' }}>No documents yet</Typography>
                </Box>
              </Box>
            </Paper>
            <Paper sx={{ mt: 2, p: 1 }}>
              <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                  <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                    <PlagiarismOutlinedIcon fontSize='small' sx={{ color: 'white' }} />
                  </Avatar>
                  <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Personal Documents</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mt: 5, mb: 2, display: 'flex' }} justifyContent='center'>
                  <Avatar sx={{ width: 100, height: 100, backgroundColor: 'grey' }}>
                    <PlagiarismOutlinedIcon fontSize='large' sx={{ color: 'white', width: 60, height: 60 }} />
                  </Avatar>
                </Box>
                <Box sx={{ mb: 5, display: 'flex' }} justifyContent='center'>
                  <Typography variant='h5' sx={{ color: 'gray' }}>No documents yet</Typography>
                </Box>
              </Box>
            </Paper>
          </>

        </Box>
      </Box>
    </Box >
  );
}
export default EmployeeDetail;