import React from 'react'
import { Box, TextField, Button } from '@mui/material'
const AddressForm = (props) => {
    const { employee, errors, setEmployee, updateAddress, handleChange } = props
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
                error={errors.country.length > 0 ? true : false}
                helperText={errors.country.length > 0? errors.country[0]:''}
                id="country"
                label="Country"
                name='country'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, country: e.target.value }) }}
                value={employee.country} />

            <TextField
                error={errors.city.length > 0 ? true : false}
                helperText={errors.city.length > 0? errors.city[0]:''}
                id="city"
                label="City"
                name='city'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, city: e.target.value }) }}
                value={employee.city} />
            <TextField
                error={errors.state.length > 0 ? true : false}
                helperText={errors.state.length > 0? errors.state[0]:''}
                id="state"
                label="State"
                name='state'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, state: e.target.value }) }}
                value={employee.state} />
            <TextField
                error={errors.postal_code.length > 0 ? true : false}
                helperText={errors.postal_code.length > 0? errors.postal_code[0]:''}
                id="postal_code"
                label="Postal"
                name='postal_code'
                variant="outlined"
                size='small'
                onChange={(e) => { setEmployee({ ...employee, postal_code: e.target.value }) }}
                value={employee.postal_code} />
            <Box sx={{ display: 'flex', ml: 1 }}>
                <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={updateAddress}>Save</Button>
                <Button variant='outlined' sx={{ ml: 1, borderColor: 'gray', backgroundColor: 'grey', color: 'gray', '&:hover': { borderColor: 'gray' } }} onClick={handleChange}>cancel</Button>
            </Box>
        </Box>
    )
}

export default AddressForm