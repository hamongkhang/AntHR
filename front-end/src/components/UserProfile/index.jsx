import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Backdrop } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MiniTabs from './MiniTabs';
import LeftBoxInfor from './LeftBoxInfor';
import PersonalInfor from './Overview/PersonalInfor';
import Address from './Overview/Address';
import BankInfor from './Overview/BankInfor';
import Account from './Account';
import { toast } from 'react-toastify';
import Payroll from './Payroll';
import Document from './Documents';
import QREmployee from './QRcode';
import Dependents from './Dependents';
import CircularProgress from '@mui/material/CircularProgress';

toast.configure();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UserProfile = () => {
  const [tab, setTab] = useState('overview');
  const [reRender, setRerender] = useState(false)
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
  const [errors, setErrors] = useState({
    first_name: [],
    last_name: [],
    phone: [],
    email: [],
    birthday: [],

    postal_code: [],
    city: [],
    country: [],
    state: [],

    name: [],
    user_name: [],
    user_number: []
  })
  const $token = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true)
  const handleChange = (event, newPath) => {
    setTab(newPath);
  };
  const getUser = (e) => {
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: { "Authorization": `Bearer ` + $token }
    };
    fetch(process.env.REACT_APP_API + '/user/profile', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        getInforEmployee(json.id)
        setLoading(false)
      });
  }
  const getInforEmployee = (id) => {
    
    const requestOptions = {
      method: 'GET',
      headers: { "Authorization": `Bearer ` + $token }
    };
    fetch(process.env.REACT_APP_API + `/employee/getOneEmployee/${id}`, requestOptions)
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
            e.birthday = json.user[0].birthday != null ? new Date(json.user[0].birthday).toLocaleDateString('fr-CA') : json.user[0].birthday
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

  const updateBank = () => {
  }

  useEffect(() => {
    getUser()
  }, [reRender])
  return (
    <Box>
      <Backdrop sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={loading}>
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
            setRerender={setRerender}
            setLoading={setLoading} />
        </Box>
        <Box gridColumn="span 9" gap={2}>
          <Item sx={{ mt: { xs: 3, md: 0 } }}>
            <MiniTabs value={tab} handleChange={handleChange} />
          </Item>
          <Routes>
            <Route index path="overview" element={
              <>
                <PersonalInfor Item={Item}
                  employee={employee}
                  setEmployee={setEmployee}
                  errors={errors}
                  setErrors={setErrors}
                />
                <Address Item={Item}
                  employee={employee}
                  setEmployee={setEmployee}
                  errors={errors}
                  setErrors={setErrors}
                />
                <BankInfor Item={Item}
                  employee={employee}
                  setEmployee={setEmployee}
                  errors={errors}
                  setErrors={setErrors}
                  updateBank={updateBank}
                />
              </>} />
            <Route path="account" element={<Account Item={Item} email={employee.email} />} />
            <Route path="dependents" element={<Dependents Item={Item} first_name={employee.first_name} last_name={employee.last_name} />} />
            <Route path="documents" element={<Document Item={Item} />} />
            <Route path="payroll" element={<Payroll first_name={employee.first_name} last_name={employee.last_name} />} />
            <Route path="qrcode" element={<QREmployee />} />
          </Routes>
        </Box>
      </Box>
    </Box >
  );
}
export default UserProfile;