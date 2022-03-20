import React from 'react';
import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
const Dependents = (props) => {
    const { Item, first_name, last_name } = props
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <SupervisorAccountIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Contracts</Typography>
                </Box>
                <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }}>upload</Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ mt: 5, mb: 2, display: 'flex' }} justifyContent='center'>
                    <Avatar sx={{ width: 100, height: 100, backgroundColor: 'grey' }}>
                        <AssignmentIndOutlinedIcon fontSize='large' sx={{ color: 'white', width: 60, height: 60 }} />
                    </Avatar>
                </Box>
                <Box sx={{ mb: 5, display: 'flex' }} justifyContent='center'>
                    <Typography sx={{ fontSize:'15px', color: 'gray' }}>Add {last_name} {first_name}’s dependents info</Typography>
                </Box>
            </Box>
        </Item>
    )
}

export default Dependents