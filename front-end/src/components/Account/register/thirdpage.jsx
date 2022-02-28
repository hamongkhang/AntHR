import  React,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styleThird from '../../../css/register.module.css';



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

export default function Thirdpage() {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [stylebnt, setStylebnt]=useState(null);
    const [disable, setDisable]=useState(true);
    const [check1, setCheck]=useState();

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    const handleChange = (e) => {
        setName(e.target.value);
        console.log(e.target.value);
        if(e.target.value !=='' && role !==''){
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        } 
    };

    function getStyles(index, name, theme) {
        return {
            fontWeight:
                name.indexOf(index) === -1
                    ? theme.typography.fontWeightLight
                    : theme.typography.fontWeightBold,
        };
    }

    const styles={
        backgroundColor:'#d5f7e0',
        border: '1px solid #22b348',
    }
    
    const handleRole=(value)=>{
        setRole(value);
        if(name !=='' && value !==''){
            console.log(value);
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        }
    }


    return (
        <section className={styleThird.frame__register}>
            <div className={styleThird.register__header}>
                <p className={styleThird.second__register_p}>What is your<span style={{ fontWeight: 'bold' }}>{' '}industry</span>?</p>
                <Box sx={{ minWidth: 120, marginTop: 3}}>
                    <FormControl fullWidth variant="outlined" color="success">
                        <InputLabel id="demo-multiple-name-label" >name</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="florida-select"
                            value={name}
                            sx={{
                                borderRadius:5,
                          }}
                            label="name"
                            onChange={handleChange}
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
                </Box>
                <p className={styleThird.second__role_p}>What is your<span style={{ fontWeight: 'bold' }}>{' '}role</span>?</p>
                <div className={styleThird.wrapper__role}>
                    <div className={styleThird.wrapper__role1}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='CEO'
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn1');}} 
                        style={check1==='btn1' ? styles : null}>CEO / Owner / Founder</button>
                    </div>

                    <div className={styleThird.wrapper__role2}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='HR Manager' 
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn2')}} 
                        style={check1 === 'btn2' ? styles : null }>HR Manager</button>
                    </div>

                    <div className={styleThird.wrapper__role3}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='HR Staff'
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn3')}} 
                        style={check1 === 'btn3' ? styles : null}>HR Staff</button>
                    </div>
                    <div className={styleThird.wrapper__role4}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Tech Manager'
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn4')}} 
                        style={check1 === 'btn4' ? styles : null}>IT / Tech Manager</button>
                    </div>

                    <div className={styleThird.wrapper__role5}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Tech Staff'
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn5')}} 
                        style={check1 === 'btn5' ? styles : null}>IT / Tech Staff</button>
                    </div>

                    <div className={styleThird.wrapper__role6}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Others'
                        onClick={(event)=>{handleRole(event.target.value); setCheck('btn6')}} 
                        style={check1 === 'btn6' ? styles : null}> Others </button>
                    </div>
                </div>
                <Link to='/#'><button type='button' disabled={disable} style={stylebnt} className={styleThird.company__continue_btn}>Continue</button></Link>
            </div>   
        </section>
    );
}

