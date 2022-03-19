import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const StyledTableCell = styled(TableCell)({
    border:'solid 1px rgb(227, 235, 241)',
    backgroundColor:'rgb(249, 250, 251)',
    maxHeight: '1rem',
    fontSize: '18px',
    minWidth: '10px'
})
const StyleTableCellBody = styled(TableCell)({
    border:'solid 1px rgb(227, 235, 241)',
    backgroundColor:'rgb(249, 250, 251)',
    fontSize: '15px',
    height: '100px'
})

const TimingEvent = () => {
    const date = new Date();
    const datestring = `${date.getDay()}`;
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='1'?'orange':'black',display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}>Mon</StyledTableCell>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='2'?'orange':'black',display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}>Tue</StyledTableCell>
                        <StyledTableCell align="center"
                        sx={{color:datestring =='3'?'orange':'black',display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}>Wed</StyledTableCell>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='4'?'orange':'black',display:{md:'table-cell', xs:['4'].includes(datestring)?'table-cell':'none'}}}>Thu</StyledTableCell>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='5'?'orange':'black',display:{md:'table-cell', xs:['4','5','6','0'].includes(datestring)?'table-cell':'none'}}}>Fri</StyledTableCell>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='6'?'orange':'black',display:{md:'table-cell', xs:['4','5','6','0'].includes(datestring)?'table-cell':'none'}}}>Sat</StyledTableCell>
                        <StyledTableCell align="center" 
                        sx={{color:datestring =='0'?'orange':'black',display:{md:'table-cell', xs:['5','6','0'].includes(datestring)?'table-cell':'none'}}}>Sun</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['1','2','3'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['4'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['4','5','6','0'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['4','5','6','0'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                        <StyleTableCellBody align="center" sx={{display:{md:'table-cell', xs:['5','6','0'].includes(datestring)?'table-cell':'none'}}}></StyleTableCellBody>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default TimingEvent