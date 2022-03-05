import React from 'react'
import { Box, TextField, Button } from '@mui/material'
const BankInforForm = (props) => {
    const { employee, errors, setEmployee, updateBank, handleChange } = props
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
                error={errors.name.length > 0 ? true : false}
                id="name"
                label="Name"
                name='name'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }}
                value={employee.name} />

            <TextField
                error={errors.user_name.length > 0 ? true : false}
                id="user_name"
                label="User name"
                name='user_name'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, user_name: e.target.value }) }}
                value={employee.user_name} />
            <TextField
                error={errors.user_number.length > 0 ? true : false}
                id="user_number"
                label="User Number"
                name='user_number'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, user_number: e.target.value }) }}
                value={employee.user_number} />
            <Box sx={{ display: 'flex', ml: 1 }}>
                <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={updateBank}>Save</Button>
                <Button variant='outlined' sx={{ ml: 1, borderColor: 'gray', backgroundColor: 'grey', color: 'gray', '&:hover': { borderColor: 'gray' } }} onClick={handleChange}>cancel</Button>
            </Box>
        </Box>
    )
}

export default BankInforForm