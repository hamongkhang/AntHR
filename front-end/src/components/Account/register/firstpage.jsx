import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import register from '../../../css/register.module.css';


const Firstpage = () => {
    const [password, setPassword] = useState('password');
    const [disable, setDisable]=useState(true);
    const [eye, setEye] = useState(true);
    const [stylebnt, setStylebnt]=useState(null);
    const [dataForm,setDataForm]=useState({
        firstName:'',
        lastName:'',
        password:'',
        email:'',
    });
 
    const handleChange=(e, number)=>{
        console.log(number);
        const {name, value} =e.target;
        setDataForm({...dataForm,[name]:value});
        if( e.target.value !==''&& dataForm.password !==''  && dataForm.lastName !==''  
        && dataForm.email !=='' && number==1){
            checkResult();
        }
        if( e.target.value !==''&& dataForm.firstName !==''  && dataForm.password !==''  
        && dataForm.email !=='' && number==2){
            checkResult();
        }
        if( e.target.value !==''&& dataForm.firstName !==''  && dataForm.lastName !==''  
        && dataForm.password !=='' && number==3){
            checkResult();
        }
        if( e.target.value !==''&& dataForm.firstName !==''  && dataForm.lastName !==''  
        && dataForm.email !=='' && number==4){
            checkResult();
        }   
        if(e.target.value==''){
            setDisable(true);
            setStylebnt(null)
        }
    }

    const checkResult=()=>{
        setDisable(false);
        setStylebnt({
            cursor:'pointer',
            backgroundColor:'#ffffcc',
            color:'#ff9900',
          });
    }

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

    return (
        <>       
            <section className={register.frame__register}>
            <form  method='post' action=''>
                <div className={register.register__header}>
                    <a href='#'>
                        <button type='button' className={register.login__google}>
                            <i className={`fab fa-google ${register.login__google_btn}`}>&nbsp; {''}
                                Sign up with Google
                            </i>
                        </button>
                    </a>
                    <p className={register.register__header_p}>Or</p>
                  
                    <div className={register.register__form}>
                        <div className={`${register.wrapper__form_input1} ${register.wrapper__form}`}>
                            <input type='text' name='firstName' placeholder='First Name' value={dataForm.firstName} 
                            onChange={(e)=>{{handleChange(e,1)}}}/>
                        </div>
                        <div className={`${register.wrapper__form_input2} ${register.wrapper__form}`}>
                            <input type='text' name='lastName' placeholder='Last Name' value={'btn1'}
                            value={dataForm.lastName} onChange={(e)=>{{handleChange(e,2)}}}/>
                        </div>
                        <div className={`${register.wrapper__form_input3} ${register.wrapper__form}`}>
                            <input type='email' name='email' placeholder='Work Email' value={'btn1'}
                            value={dataForm.email} onChange={(e)=>{{handleChange(e,3)}}}/>
                        </div>
                        <div className={`${register.wrapper__form_input4} ${register.wrapper__form}`}>
                            <input type={password} name='password' placeholder='Password' 
                            value={dataForm.password} onChange={(e)=>{{handleChange(e,4)}}}/>
                            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"} ${register.icon_eye}`}></i>
                        </div>
                    </div>
                </div>
                <p className={register.navigate__signin}>Already have an account?{' '}<Link to='/sign-in'><span style={{ color: '#ff9900', cursor: 'pointer'}}>Sign in</span></Link></p>
                <Link to='/second-page'><button type='button' disabled={disable} style={stylebnt} className={`${register.register__continue_btn}`}>Continue</button></Link>
                </form>
            </section>
        </>
    );
}

export default Firstpage;

