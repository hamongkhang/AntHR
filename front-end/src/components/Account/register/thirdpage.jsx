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
    const [relo, setRole] = useState('');
    const [stylebnt, setStylebnt]=useState(null);
    const [disable, setDisable]=useState(true);

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
     
        if(relo !==''){
            setDisable(false);
            setStylebnt({
                cursor:'pointer',
                backgroundColor:'#ffffcc',
                color:'#ff9900',
              });
        }
        if(e.target.value==''){
            setStylebnt(null)
        }   
    };

    const handleChange2 = (e) => {
        setRole(e.target.value)
        
    }

    function getStyles(index, name, theme) {
        return {
            fontWeight:
                name.indexOf(index) === -1
                    ? theme.typography.fontWeightLight
                    : theme.typography.fontWeightBold,
        };
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
                        <button type="button" name="size" className={styleThird.size__company_btn} value='CEO' onClick={handleChange2}>CEO / Owner / Founder</button>
                    </div>
                    <div className={styleThird.wrapper__role2}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='HR Manager' onClick={handleChange2}>HR Manager</button>
                    </div>
                    <div className={styleThird.wrapper__role3}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='HR Staff' onClick={handleChange2}>HR Staff</button>
                    </div>
                    <div className={styleThird.wrapper__role4}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Tech Manager' onClick={handleChange2}>IT / Tech Manager</button>
                    </div>
                    <div className={styleThird.wrapper__role5}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Tech Staff' onClick={handleChange2}>IT / Tech Staff</button>
                    </div>
                    <div className={styleThird.wrapper__role6}>
                        <button type="button" name="size" className={styleThird.size__company_btn} value='Others' onClick={handleChange2}> Others </button>
                    </div>
                </div>
                <Link to='/#'><button type='button' disabled={disable} style={stylebnt} className={styleThird.company__continue_btn}>Continue</button></Link>
            </div>   
        </section>
    );
}

