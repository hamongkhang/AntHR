import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from "../../css/register.module.css";
import styleSecond from '../../css/register.module.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styleThird from '../../css/register.module.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

toast.configure();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            marginTop: 5,
        },
    },
};
const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(1);
    const [password, setPassword] = useState('password');
    const [eye, setEye] = useState(true);
    const Eye = () => {
        if (password == "password") {
            setPassword("text");
            setEye(false);
        }
        else {
            setPassword("password");
            setEye(true);
        }
    }
    const theme = useTheme();
    const [name, setName] = useState('');
    const names = [
        'AI and Machine Learning',
        'Accounting / legal outingsourcing services',
        'Aerospace and Defense',
        'Agribusiness',
        'Apparel manufacturing',
        'Automation tools',
        'Automotive',
        'Bank or Insurance services',
        'Banking',
        'Chemicals',
        'Cloud Backup Services',
        'Crypto',
        'Consulting',
        'Consumer Products',
        'Data Analytics',
        'Data Backup and Restoration',
        'Edtech',
        'Education',
        'Engineering, Construction and Operations',
        'Entertinment Services',
        'Fashion',
        'Firewall Services',
        'Fitness Tech',
        'Real Rstate and Tental and Leasing',
        'Retail',
        'Software Outsourcing',
        'Sports and Entertainments',
        'Supply Chain Tech',
        'Telecommunication',
        'Training Service',
    ];
    function getStyles(index, name, theme) {
        return {
            fontWeight:
                name.indexOf(index) === -1
                    ? theme.typography.fontWeightLight
                    : theme.typography.fontWeightBold,
        };
    }

    const [errorForm1, setErrorForm1] = useState({
        first_name: null,
        last_name: null,
        email: null,
        password: null
    });
    const [errorForm2, setErrorForm2] = useState({
        company_name: null,
        domain: null,
        size: null,
    });
    const [errorForm4, setErrorForm4] = useState({
        code: null,
    });
    const [errorForm3, setErrorForm3] = useState({
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        company_name: null,
        domain: null,
        size: null,
        over_view: null,
        role: null,
    });
    const [registerForm, setRegisterForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        company_name: '',
        domain: '',
        size: '',
        over_view: '',
        role: '',
    });
    const [code, setCode] = useState({
        code: '',
    });
    const [openLoading, setOpenLoading] = useState(false)
    const addRegister = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setRegisterForm({
            ...registerForm,
            [field]: value,
        });
    };
    const addCode = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setCode({
            ...code,
            [field]: value,
        });
    };
    const checkForm1 = (e) => {
        const _formData = new FormData();
        _formData.append('first_name', registerForm.first_name);
        _formData.append('last_name', registerForm.last_name);
        _formData.append('email', registerForm.email);
        _formData.append('password', registerForm.password);
        const requestOptions = {
            method: 'POST',
            body: _formData,
        };
        fetch(process.env.REACT_APP_API + '/user/checkForm1', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setErrorForm1(json.error);
                } else {
                    setForm(2);
                }
            });
    };
    const checkForm2 = (e) => {
        const _formData = new FormData();
        _formData.append('company_name', registerForm.company_name);
        _formData.append('domain', registerForm.company_name);
        _formData.append('size', registerForm.size);
        const requestOptions = {
            method: 'POST',
            body: _formData,
        };
        fetch(process.env.REACT_APP_API + '/user/checkForm2', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setErrorForm2(json.error);
                } else {
                    setForm(3);
                }
            });
    };
    const onRegister = (e) => {
        setOpenLoading(true);
        const _formData = new FormData();
        _formData.append('first_name', registerForm.first_name);
        _formData.append('last_name', registerForm.last_name);
        _formData.append('email', registerForm.email);
        _formData.append('password', registerForm.password);
        _formData.append('company_name', registerForm.company_name);
        _formData.append('domain', registerForm.company_name);
        _formData.append('size', registerForm.size);
        _formData.append('over_view', registerForm.over_view);
        _formData.append('role', 1);
        const requestOptions = {
            method: 'POST',
            body: _formData,
        };
        fetch(process.env.REACT_APP_API + '/user/getCode', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setOpenLoading(false);
                if (json.error) {
                    setErrorForm3(json.error);
                } else {
                    toast.success(`Please check code your email !!!`, {
                        position: 'top-center',
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setForm(4);
                }
            });
    };
    const onSubmit = (e) => {
        const _formData = new FormData();
        _formData.append('code', code.code);
        const requestOptions = {
            method: 'POST',
            body: _formData,
        };
        fetch(process.env.REACT_APP_API + '/user/register', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    if (json.error === 'No one have code') {
                        toast.error(`The code you entered is incorrect !!!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setErrorForm4("");
                    } else {
                        setErrorForm4(json.error);
                    }
                } else {
                    toast.success(`Register in successfully !!!`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/login');
                }
            });
    };
    return (
        <>
            <Backdrop
                sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {form == 1 ?
                <section className={register.frame__register}>
                    <form method='post' action=''>
                        <div className={register.register__header}>
                            <a href='#'>
                                <button type='button' className={register.login__google}>
                                    <i className={`fab fa-google ${register.login__google_btn}`}>&nbsp; {''}
                                        Sign up with Google
                                    </i>
                                </button>
                            </a>
                            <p className={register.register__header_p}>Or</p>
                            <span className="errorNotify">{errorForm1.first_name ? errorForm1.first_name[0] : ""}</span>{errorForm1.first_name ? <br></br> : ""}
                            <span className="errorNotify">{errorForm1.last_name ? errorForm1.last_name[0] : ""}</span>{errorForm1.last_name ? <br></br> : ""}
                            <span className="errorNotify">{errorForm1.email ? errorForm1.email[0] : ""}</span>{errorForm1.email ? <br></br> : ""}
                            <span className="errorNotify">{errorForm1.password ? errorForm1.password[0] : ""}</span>
                            <div className={register.register__form}>
                                <div className={`${register.wrapper__form_input1} ${register.wrapper__form}`}>
                                    <input type='text' name='first_name' onChange={(event) => addRegister(event)} placeholder='First Name' />

                                </div>
                                <div className={`${register.wrapper__form_input2} ${register.wrapper__form}`}>
                                    <input type='text' name='last_name' onChange={(event) => addRegister(event)} placeholder='Last Name' />
                                </div>
                                <div className={`${register.wrapper__form_input3} ${register.wrapper__form}`}>
                                    <input type='email' name='email' onChange={(event) => addRegister(event)} placeholder='Work Email'
                                    />
                                </div>
                                <div className={`${register.wrapper__form_input4}`}>
                                    <div className={`${register.wrapper__form_input4_1}`}>
                                        <div className={`${register.wrapper__form} ${register.wrapper__form_input5}`} >
                                            <input type={password} onChange={(event) => addRegister(event)} name='password' placeholder='Password'
                                            />
                                        </div>
                                        <div className={register.wrapper__form_icon}>
                                            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"} ${register.icon_eye}`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className={register.navigate__signin}>Already have an account?{' '}<Link to='/login'><span style={{ color: '#ff9900', cursor: 'pointer' }}>Sign in</span></Link></p>
                        <button type='button'
                            style={{
                                cursor: 'pointer',
                                backgroundColor: '#FFFF66',
                                color: '#ff9900',
                                border: "1px solid #ff9900"
                            }}
                            className={`${register.register__continue_btn}`} onClick={(event) => checkForm1(event)}>Continue</button>
                    </form>
                </section>
                : form == 2 ?
                    <section className={styleSecond.frame__register}>
                        <div className={styleSecond.register__header}>
                            <p className={styleSecond.second__register_p}>Type <span style={{ fontWeight: 'bold' }}>name</span> of your company</p>
                            <span className="errorNotify">{errorForm2.company_name ? errorForm2.company_name[0] : ""}</span>
                            <form method="post" action='' className={styleSecond.wrapper__form_company}>
                                <div className={`${styleSecond.form_company} ${styleSecond.wrapper__form_page2}`}>
                                    <input type='text' name='company_name' placeholder="Company Name" onChange={(event) => addRegister(event)}
                                        required />
                                </div>
                                <div className={`${styleSecond.form_domain} ${styleSecond.wrapper__form_page2}`}>
                                    <input type='text' value={registerForm.company_name ? registerForm.company_name : ''} placeholder="Company Domain Name" required onChange={(event) => addRegister(event)} disabled />
                                </div>
                                <div className={styleSecond.form_domain_com}>
                                    <p>.ant.com</p>
                                </div>
                            </form>
                            <p className={styleSecond.create__url_p}>(*) We will creat an unique company URL for you to log into Ant HR</p>
                            <div className={styleSecond.size__company}>
                                <div className={styleSecond.size__company_p}>
                                    <p>What is the <span style={{ fontWeight: 'bold' }}>size{' '}</span>of your company?</p>
                                </div>
                                <span className="errorNotify">{errorForm2.size ? errorForm2.size[0] : ""}</span>
                                <div className={styleSecond.wrapper__size_company}>
                                    <div className={styleSecond.wrapper__size_campany1}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={10}>1 - 10</button>
                                    </div>
                                    <div className={styleSecond.wrapper__size_campany2}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={50}>11 - 50</button>
                                    </div>
                                    <div className={styleSecond.wrapper__size_campany3}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={100}>51 - 100</button>
                                    </div>
                                    <div className={styleSecond.wrapper__size_campany4}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={200}>101 - 200</button>
                                    </div>
                                    <div className={styleSecond.wrapper__size_campany5}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={500}>201 - 500</button>
                                    </div>
                                    <div className={styleSecond.wrapper__size_campany6}>
                                        <button type="button" name="size" className={styleSecond.size__company_btn} onClick={(event) => addRegister(event)} value={501}> 500+ </button>
                                    </div>
                                </div>
                                <button type='button'
                                    onClick={(event) => checkForm2(event)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: '#FFFF66',
                                        color: '#ff9900',
                                        border: "1px solid #ff9900"
                                    }} className={styleSecond.company__continue_btn}>Continue</button>
                            </div>
                        </div>
                    </section>
                    : form == 3 ?
                        <section className={styleThird.frame__register}>
                            <div className={styleThird.register__header}>
                                <p className={styleThird.second__register_p}>What is your<span style={{ fontWeight: 'bold' }}>{' '}industry</span>?</p>
                                <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                    <FormControl fullWidth variant="outlined" color="success">
                                        <InputLabel id="demo-multiple-name-label" >name</InputLabel>
                                        <Select
                                            onChange={(event) => addRegister(event)}
                                            name="over_view"
                                            labelId="demo-multiple-name-label"
                                            id="florida-select"
                                            sx={{
                                                borderRadius: 5,
                                            }}
                                            label="name"

                                            MenuProps={MenuProps}
                                        >
                                            {names.map((index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={index}
                                                    style={getStyles(index, name, theme)}
                                                >
                                                    {index}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <span className="errorNotify">{errorForm3.over_view ? errorForm3.over_view[0] : ""}</span>
                                </Box>
                                <p className={styleThird.second__role_p}>What is your<span style={{ fontWeight: 'bold' }}>{' '}role</span>?</p>
                                <div className={styleThird.wrapper__role}>
                                    <div className={styleThird.wrapper__role1}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='CEO' >CEO / Owner / Founder</button>
                                    </div>
                                    <div className={styleThird.wrapper__role2}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='HR Manager' >HR Manager</button>
                                    </div>
                                    <div className={styleThird.wrapper__role3}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='HR Staff' >HR Staff</button>
                                    </div>
                                    <div className={styleThird.wrapper__role4}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='Tech Manager' >IT / Tech Manager</button>
                                    </div>
                                    <div className={styleThird.wrapper__role5}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='Tech Staff' >IT / Tech Staff</button>
                                    </div>
                                    <div className={styleThird.wrapper__role6}>
                                        <button type="button" name="role" onClick={(event) => addRegister(event)} className={styleThird.size__company_btn} value='Others' > Others </button>
                                    </div>
                                </div>
                                <button type='button' style={{
                                    cursor: 'pointer',
                                    backgroundColor: '#FFFF66',
                                    color: '#ff9900',
                                    border: "1px solid #ff9900"
                                }} onClick={(event) => onRegister(event)} className={styleThird.company__continue_btn}>Continue</button>
                            </div>
                        </section>
                        : form == 4 ?
                            <section className={styleSecond.frame__register}>
                                <div className={styleSecond.register__header}>
                                    <p className={styleSecond.second__register_p}><span style={{ fontWeight: 'bold' }}>Code</span> of your email</p>
                                    <button href="" style={{
                                        fontSize: 'small',
                                        color: '#ff9900',
                                        borderBottomWidth: "5px",
                                        backgroundColor: "white",
                                        borderBottom: "1px solid #ff9900"
                                    }} onClick={(event) => onRegister(event)}>Resend the code</button>
                                    <span className="errorNotify">{errorForm2.company_name ? errorForm2.company_name[0] : ""}</span>
                                    <form method="post" action='' className={styleSecond.wrapper__form_company}>
                                        <input
                                            type='text'
                                            name='code'
                                            placeholder="Enter your code"
                                            onChange={(event) => addCode(event)}
                                            style={{
                                                width: "300%",
                                                backgroundColor: "white",
                                                color: "#black",
                                                borderRadius: "10px",
                                                border: "1px solid #ff9900",
                                                paddingLeft: '10px'
                                            }}
                                            required
                                        />
                                    </form>
                                    <span className="errorNotify">{errorForm4.code ? errorForm4.code[0] : ""}</span>
                                    <p className={styleSecond.create__url_p}>(*) The code you enter must match the antHr code sent your gmail</p>
                                    <div className={styleSecond.size__company}>
                                        <button type='button'
                                            onClick={(event) => onSubmit(event)}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: '#FFFF66',
                                                color: '#ff9900',
                                                border: "1px solid #ff9900"
                                            }} className={styleSecond.company__continue_btn}>Continue</button>
                                    </div>
                                </div>
                            </section>
                            : null
            }
        </>
    );
}
export default Register;