import React from 'react'
import { Box, TextField, Select, MenuItem, InputLabel, Button, FormControl } from '@mui/material'
const PersonalInforForm = (props) => {
    const { employee, errors, setEmployee, updatePersonal, handleChange } = props
    return (
        <Box
            component="form"
            sx={{
                pl: 3, pb: 3,
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                error={errors.first_name.length > 0 ? true : false}
                helperText={errors.first_name.length > 0? errors.first_name[0]:''}
                id="first_name"
                label="First Name"
                name='first_name'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, first_name: e.target.value }) }}
                value={employee.first_name} />

            <TextField
                error={errors.last_name.length > 0 ? true : false}
                helperText={errors.last_name.length > 0 ? errors.last_name[0]:''}
                id="last_name"
                label="Last Name"
                name='last_name'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, last_name: e.target.value }) }}
                value={employee.last_name} />
            <TextField
                error={errors.phone.length > 0 ? true : false}
                helperText={errors.phone.length > 0 ?errors.phone[0]:''}
                id="phone"
                label="Phone Number"
                name='phone'
                variant="outlined"
                size='small'
                type={'number'}
                onChange={(e) => { setEmployee({ ...employee, phone: e.target.value }) }}
                value={employee.phone} />
            <TextField
                error={errors.birthday.length > 0 ? true : false}
                helperText={errors.birthday.length > 0 ?errors.birthday[0]:''}
                id="birthday"
                label="Birthday"
                name='birthday'
                variant="outlined"
                size='small'
                type={'date'}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => { setEmployee({ ...employee, birthday: e.target.value }) }}
                value={employee.birthday} />
            <FormControl sx={{ m: 1, width: '50ch' }} size='small'>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={employee.gender}
                    onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }}
                >
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='male'>Male</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', ml: 1 }}>
                <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={updatePersonal}>Save</Button>
                <Button variant='outlined' sx={{ ml: 1, borderColor: 'gray', backgroundColor: 'grey', color: 'gray', '&:hover': { borderColor: 'gray' } }} onClick={handleChange}>cancel</Button>
            </Box>
        </Box>
    )
}

export default PersonalInforForm