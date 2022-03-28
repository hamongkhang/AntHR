import React from 'react'
import { Box, Typography, Avatar, Button } from '@mui/material';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';

const Document = (props) => {
    const { Item } = props
    return (
        <>
            <Item sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                    <Box sx={{ display: 'inherit' }}>
                        <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                            <PlagiarismOutlinedIcon fontSize='small' sx={{ color: 'white' }} />
                        </Avatar>
                        <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Contracts</Typography>
                    </Box>
                    <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }}>upload</Button>
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
            </Item>
            <Item sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                    <Box sx={{ display: 'inherit' }}>
                        <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                            <PlagiarismOutlinedIcon fontSize='small' sx={{ color: 'white' }} />
                        </Avatar>
                        <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Personal Documents</Typography>
                    </Box>
                    <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }}>upload</Button>
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
            </Item>
        </>
    )
}

export default Document