import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MiniTabs from './MiniTabs';
import LeftBoxInfor from './LeftBoxInfor';
import PersonalInfor from './PersonalInfor';
import Address from './Address';
import BankInfor from './BankInfor';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UserProfile = () => {
  const [tab, setTab] = React.useState('overview');
  const [employee, setEmployee] = React.useState(
    {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
        
        postal_code:'',
        city:'',
        country:'',
        state:'',

        name:'',
        user_name:'',
        user_number:''
    }
)
const [errors, setErrors] = React.useState({
    first_name: [],
    last_name: [],
    phone: [],
    email: [],
    birthday: [],
    
    postal_code:[],
    city:[],
    country:[],
    state:[],

    name:[],
    user_name:[],
    user_number:[]
})
  const handleChange = (event, newPath) => {
    setTab(newPath);
  };
  const getInforEmployee = () =>{
  
  }
  const updatePersonal = () =>{
    console.log('person');
    console.log(employee);
  }
  const updateAddress = () =>{
    console.log('address');
    console.log(employee);
  }
  const updateBank = () =>{
    console.log('bank');
    console.log(employee);
  }
  return (
    <Box>
      <Box sx={{ display: { xs: 'block', md: 'grid' } }} gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 3">
          <LeftBoxInfor Item={Item}></LeftBoxInfor>
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
                updatePersonal={updatePersonal}
                />
                <Address Item={Item} 
                employee={employee}
                setEmployee={setEmployee}
                errors={errors}
                setErrors={setErrors}
                updateAddress={updateAddress}
                />
                <BankInfor Item={Item} 
                employee={employee}
                setEmployee={setEmployee}
                errors={errors}
                setErrors={setErrors}
                updateBank={updateBank}
                />
              </>} />
            <Route path="two" element={<Item sx={{ mt: 2 }}>two</Item>} />
          </Routes>
        </Box>
      </Box>
    </Box >
  );
}
export default UserProfile;