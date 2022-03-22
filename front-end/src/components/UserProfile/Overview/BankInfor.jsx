import { Box, Grid, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BankInforForm from './BankInforForm'
const BankInfor = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, errors, setEmployee, setErrors, updateBank } = props
    const handleChange = () => {
        setOpenForm(!openForm)
    }
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <AccountBalanceIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Bank Information</Typography>
                </Box>
                {
                    openForm ?
                        ''
                        :
                        <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={handleChange}>edit</Button>
                }
            </Box>
            {
                openForm ?
                    <BankInforForm
                        employee={employee}
                        errors={errors}
                        setEmployee={setEmployee}
                        setErrors={setErrors}
                        updateBank={updateBank}
                        handleChange={handleChange}>
                    </BankInforForm>
                    :
                    <Box>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Bank's name</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                            </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>User name</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Bank number</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Item>

    )
}

export default BankInfor