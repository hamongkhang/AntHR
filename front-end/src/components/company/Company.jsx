import React, { useState, useEffect } from 'react'
import { Paper, Box, Button, TextField, Typography, Grid, Avatar, Backdrop } from '@mui/material'
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

toast.configure();

const sxTypo = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mx: 3
}

const Company = () => {
    const [company, setCompany] = useState({
        id: null,
        name: null,
        size: null,
        domain: null,
        website: null,
        contact_email: null,
        contact_phone: null,
        over_view: null,
        logo: null
    });
    const [errors, setErrors] = useState({
        name: [],
        size: [],
        domain: [],
        website: [],
        contact_email: [],
        contact_phone: [],
        over_view: [],
        logo: []
    })
    const [loading, setLoading] = useState(false)
    const [onSave, setOnSave] = useState(true)
    const $token = localStorage.getItem('access_token');
    const getCompany = () => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + "/company/getCompany", {
            method: "GET",
            headers: { "Authorization": `Bearer ` + $token }
        })
            .then(response => response.json())
            .then(data => {
                if (data.company) {
                    setCompany(data.company)
                    setLoading(false)
                }
            });
    }
    const updateCompany = (e) => {
        setLoading(true)
        e.preventDefault();
        let c = {
            name: company.name=='null'||company.name==''?'':company.name,
            size: company.size=='null'||company.size==''?'':company.size,
            domain: company.domain=='null'||company.domain==''?'':company.domain,
            website: company.website=='null'||company.website==''?'':company.website,
            contact_email:  company.contact_email=='null'||company.contact_email==''?'':company.contact_email,
            contact_phone: company.contact_phone=='null'||company.contact_phone==''?'':company.contact_phone,
            over_view:company.over_view=='null'||company.over_view==''?'':company.over_view
        }
        console.log(c);

        const _formData = new FormData();
        _formData.append('name',c.name );
        _formData.append('size',c.size );
        _formData.append('domain',c.domain );
        _formData.append('website',c.website );
        _formData.append('contact_email',c.contact_email);
        _formData.append('contact_phone',c.contact_phone );
        _formData.append('over_view',c.over_view );
        console.log(_formData);
        fetch(process.env.REACT_APP_API + "/company/updateCompany/" + company.id, {
            method: "POST",
            headers: { "Authorization": `Bearer ` + $token },
            body: _formData
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    toast.success(`Update successfully`, {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setOnSave(true)
                    getCompany()
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    toast.error(`error`, {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    }
    const updateLogo = (e) => {
        setLoading(true)
        if ($token) {
            const _formData = new FormData();
            _formData.append('logo', e.target.files[0]);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            };
            fetch(
                `${process.env.REACT_APP_API}/company/changeLogo/${company.id}`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (!json.error) {
                        setLoading(false)
                        toast.success(`Update logo successfully`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        getCompany() 
                    }
                    else {  
                        setLoading(false)     
                        toast.error(`error`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        } else {
            setLoading(false)
            toast.warn(`No image selected`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    useEffect(() => {
        getCompany()
    }, []);
    return (
        <>
            <Backdrop
                sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper sx={{ p: 3, '& .MuiTextField-root': { m: 1, width: { md: '50%', xs: '90%' } } }}>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Company name
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.name.length > 0 ? true : false}
                            helperText={errors.name.length > 0 ? errors.name[0] : ''}
                            hiddenLabel
                            name='name'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.name==null?'-':company.name}
                            onChange={(e) => { setCompany({ ...company, name: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Domain
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.domain.length > 0 ? true : false}
                            helperText={errors.domain.length > 0 ? errors.domain[0] : ''}
                            hiddenLabel
                            name='domain'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.domain==null?'-':company.domain}
                            onChange={(e) => { setCompany({ ...company, domain: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Company size
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.size.length > 0 ? true : false}
                            helperText={errors.size.length > 0 ? errors.size[0] : ''}
                            hiddenLabel
                            name='size'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.size==null?'-':company.size}
                            onChange={(e) => { setCompany({ ...company, size: e.target.value }) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Website
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.website.length > 0 ? true : false}
                            helperText={errors.website.length > 0 ? errors.website[0] : ''}
                            hiddenLabel
                            name='website'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.website==null?'-':company.website}
                            onChange={(e) => { setCompany({ ...company, website: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Email
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.contact_email.length > 0 ? true : false}
                            helperText={errors.contact_email.length > 0 ? errors.contact_email[0] : ''}
                            hiddenLabel
                            name='email'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.contact_email==null?'-':company.contact_email}
                            onChange={(e) => { setCompany({ ...company, contact_email: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.contact_phone.length > 0 ? true : false}
                            helperText={errors.contact_phone.length > 0 ? errors.contact_phone[0] : ''}
                            hiddenLabel
                            name='phone'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.contact_phone==null?'-':company.contact_phone}
                            onChange={(e) => { setCompany({ ...company, contact_phone: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Over view
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <TextField
                            error={errors.over_view.length > 0 ? true : false}
                            helperText={errors.over_view.length > 0 ? errors.over_view[0] : ''}
                            hiddenLabel
                            name='over_view'
                            variant="standard"
                            size='small'
                            margin="dense"
                            value={company.over_view==null?'-':company.over_view}
                            onChange={(e) => { setCompany({ ...company, over_view: e.target.value }); setOnSave(false) }}
                        />
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Grid container columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={1} md={2} sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={sxTypo}>
                            Logo
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={6} sx={{}}>
                        <label htmlFor="upload-logo">
                            <input id="upload-logo" type="file" name='logo'
                                onChange={(event) => updateLogo(event)}
                                hidden />
                            <Button component='span'>
                                <Avatar src={`${process.env.REACT_APP_FILE}/logo/${company.logo}`}
                                    sx={{ height: 130, width: 130, border: 1, borderColor: 'ThreeDLightShadow' }}
                                    variant='square' />
                            </Button>
                        </label>
                    </Grid>
                    <Grid item md={4} />
                </Grid>
                <Box sx={{ display: 'flex', ml: 1, mt: 3 }}>
                    <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} disabled={onSave} onClick={updateCompany}>Save</Button>
                    <Button variant='outlined' sx={{ ml: 1, borderColor: 'gray', backgroundColor: 'grey', color: 'gray', '&:hover': { borderColor: 'gray' } }} >cancel</Button>
                </Box>
            </Paper>
        </>
    )
}

export default Company