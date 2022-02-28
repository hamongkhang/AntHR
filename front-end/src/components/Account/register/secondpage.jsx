import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styleSecond from '../../../css/register.module.css';

const Secondpage = () => {

    const [companyName, setCompaneName] = useState('');
    const [companyName2, setCompaneName2] = useState('');
    const [stylebnt, setStylebnt]=useState(null);
    const [disable, setDisable]=useState(true);
    const [size, setSize] = useState(0);

    const handleChange = (e) => {
        setCompaneName(e.target.value);
        console.log(e.target.value);
        if(e.target.value !=='' && size !==0){
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        }
        if(e.target.value==''){
            setStylebnt(null);
        }
        setCompaneName2(e.target.value);
    }

    const handleChange2 = (e) => {
        setCompaneName2(e.target.value);

        if(companyName !=='' && size !==0){
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        }
        if(e.target.value==''){
            setStylebnt(null);
        }
    }

    const styles={
        backgroundColor:'#d5f7e0',
        border: '1px solid #22b348',
    }

    const handleSize = (number) => {
        setSize(number);
        if(companyName!=='' && number !==0){
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        }
    }


    return (
        <>
            <section className={styleSecond.frame__register}>
                <div className={styleSecond.register__header}>
                    <p className={styleSecond.second__register_p}>Type <span style={{ fontWeight: 'bold' }}>name</span> of your company</p>
                    <form method="post" action='' className={styleSecond.wrapper__form_company}>
                        <div className={`${styleSecond.form_company} ${styleSecond.wrapper__form_page2}`}>
                            <input type='text' name='companyname' value={companyName} placeholder="Company Name"
                                onChange={handleChange} required />
                        </div>
                        <div className={`${styleSecond.form_domain} ${styleSecond.wrapper__form_page2}`}>
                            <input type='text' name='domain' value={companyName2} placeholder="Company Domain Name" required onChange={handleChange2} />
                        </div>
                        <div className={styleSecond.form_domain_com}>
                            <p>.grovehr.com</p>
                        </div>
                    </form>
                    <p className={styleSecond.create__url_p}>(*) We will creat an unique company URL for you to log into Grove HR</p>
                    <div className={styleSecond.size__company}>
                        <div className={styleSecond.size__company_p}>
                            <p>What is the <span style={{ fontWeight: 'bold' }}>size{' '}</span>of your company?</p>
                        </div>
                        <div className={styleSecond.wrapper__size_company}>
                            <div className={styleSecond.wrapper__size_campany1}>
                                <button type="button" name="size" className={styleSecond.size__company_btn}
                                onClick={(e)=>handleSize(10)} style={size===10 ? styles: null}>1 - 10</button>
                            </div>
                            <div className={styleSecond.wrapper__size_campany2}>
                                <button type="button" name="size" className={styleSecond.size__company_btn}
                                 onClick={(e)=>handleSize(50)} style={size===50 ? styles: null}>11 - 50</button>
                            </div>
                            <div className={styleSecond.wrapper__size_campany3}>
                                <button type="button" name="size" className={styleSecond.size__company_btn} value={100}
                               onClick={()=>handleSize(100)} style={size===100 ? styles: null}>51 - 100</button>
                            </div>
                            <div className={styleSecond.wrapper__size_campany4}>
                                <button type="button" name="size" className={styleSecond.size__company_btn} value={200} 
                                onClick={()=>handleSize(200)} style={size===200 ? styles: null}>101 - 200</button>
                            </div>

                            <div className={styleSecond.wrapper__size_campany5}>
                                <button type="button" name="size" className={styleSecond.size__company_btn} value={500} 
                                onClick={()=>handleSize(500)} style={size===500 ? styles: null}>201 - 500</button>
                            </div>

                            <div className={styleSecond.wrapper__size_campany6}>
                                <button type="button" name="size" className={styleSecond.size__company_btn} value={501} 
                                 onClick={()=>handleSize(501)} style={size===501 ? styles: null}> 500+ </button>
                            </div>
                        </div>
                        <Link to='/third-page'><button type='button' disabled={disable} style={stylebnt} className={styleSecond.company__continue_btn}>Continue</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Secondpage;