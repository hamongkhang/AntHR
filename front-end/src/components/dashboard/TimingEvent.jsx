import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import moment from "moment";

const StyledTableCell = styled(TableCell)({
    border: 'solid 1px rgb(227, 235, 241)',
    backgroundColor: 'rgb(249, 250, 251)',
    maxHeight: '1rem',
    fontSize: '18px',
    minWidth: '10px'
})
const StyleTableCellBody = styled(TableCell)({
    border: 'solid 1px rgb(227, 235, 241)',
    backgroundColor: 'rgb(249, 250, 251)',
    fontSize: '15px',
    height: '100px'
})
const Event = (props) => {
    return (
        props.birthdays.length > 0 ? props.birthdays.map((b, index) => {
            if (b.day == props.day) {
                return (
                    <Box key={index} sx={{ height: '50px', width: '50px', position: 'relative' }}>
                        <Avatar src={`${process.env.REACT_APP_FILE}/avatar/${b.avatar}`}></Avatar>
                        <CakeIcon sx={{ color: 'orange', position: 'absolute', bottom: '5px', right: '5px', textShadow: 'initial' }} />
                    </Box>
                )
            }
        })
            : <Box sx={{ height: '50px', width: '50px', position: 'relative' }}></Box>
    )
}
const TimingEvent = () => {
    const date = new Date();
    const datestring = `${date.getDay()}`;
    const [birthdays, setBirthdays] = React.useState([])
    const [dateOfWeek, setDateOfWeek] = React.useState({
        mon:'', tue: '', wed:'', thu:'', fri:'', sat:'', sun:''
    })
    const avatar = localStorage.getItem('avatar');
    const $token = localStorage.getItem('access_token');
    const getEmployees = () => {
        fetch(process.env.REACT_APP_API + "/employee/getAllEmployee", {
            method: "GET",
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                checkBirthDay(data.data[1]);
            });
    };
    const checkBirthDay = (arr) => {
        let arrayBirthdays = [];
        let monday = new moment().day(0);
        let sunday = new moment().day(7);
        arr.map((a) => {
            let birthday = new moment(a.birthday).year(monday.year());
            if (birthday >= monday && birthday <= sunday) {
                let b = {
                    avatar: a.avatar,
                    day: birthday.day()
                }
                arrayBirthdays.push(b)
            }
        })
        setBirthdays(arrayBirthdays);
    }
    const findDateOfWeek = () =>{
        let date ={
            mon: new moment().day(1).date(),
            tue: new moment().day(2).date(),
            wed: new moment().day(3).date(),
            thu: new moment().day(4).date(),
            fri: new moment().day(5).date(),
            sat: new moment().day(6).date(),
            sun: new moment().day(7).date(),
        }
        setDateOfWeek(date)
    }
    React.useEffect(() => {
        getEmployees();
        findDateOfWeek()
    }, [])
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '1' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>Mon {dateOfWeek.mon}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '2' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>Tue {dateOfWeek.tue}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '3' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>Wed {dateOfWeek.wed}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '4' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['4'].includes(datestring) ? 'table-cell' : 'none' } }}>Thu {dateOfWeek.thu}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '5' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['4', '5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>Fri {dateOfWeek.fri}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '6' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['4', '5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>Sat {dateOfWeek.sat}</StyledTableCell>
                        <StyledTableCell align="center"
                            sx={{ color: datestring == '0' ? 'orange' : 'black', display: { md: 'table-cell', xs: ['5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>Sun {dateOfWeek.sun}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={1} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={2} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['1', '2', '3'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={3} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['4'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={4} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['4', '5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={5} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['4', '5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={6} birthdays={birthdays} />
                        </StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{ display: { md: 'table-cell', xs: ['5', '6', '0'].includes(datestring) ? 'table-cell' : 'none' } }}>
                            <Event day={0} birthdays={birthdays} />
                        </StyleTableCellBody>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default TimingEvent