import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from "@mui/material";
import React from "react";
const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours}h : ${getMinutes}m : ${getSeconds}s`
}

const Timer = (props) => {
    const [open, setOpen] = React.useState(false);
    const { firstIn, lastOut, setFirstIn, setLastOut } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [timer, setTimer] = React.useState(0)
    const [isActive, setIsActive] = React.useState(false)
    const [isPaused, setIsPaused] = React.useState(false)
    const countRef = React.useRef(null)

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
        if (firstIn == '') {
            let clockin = new Date(),
                date = clockin.getHours() + 'h ' + (clockin.getMinutes()) + 'm ' + clockin.getSeconds() + 's';
            setFirstIn(date)
        }
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)
        setIsActive(false)
        handleClose()
        let clockout = new Date(),
            date = clockout.getHours() + 'h ' + (clockout.getMinutes()) + 'm ' + clockout.getSeconds() + 's';
        setLastOut(date)
    }

    const handleResume = () => {
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }
    return (

        <>
            {
                !isActive && !isPaused ?
                    <Button variant="contained" onClick={handleStart} 
                    sx={{ mt: 3, width: '100%' }}>
                        <Typography variant="body2" sx={{ fontSize: '24px', fontWeight: 500, color: 'white', textTransform: 'lowercase' }}>
                            {formatTime(timer)}
                        </Typography>
                    </Button>
                    :
                    <Button variant="contained" onClick={handleClickOpen} 
                    sx={{ mt: 3, width: '100%', backgroundColor: '#EC7063', color: 'white', '&:hover': { backgroundColor: '#E74C3C' }}}>
                        <Typography variant="body2" sx={{ fontSize: '24px', fontWeight: 500, color: 'white', textTransform: 'lowercase' }}>
                            {formatTime(timer)}
                        </Typography>
                    </Button>
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Clock out
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your total working time: {formatTime(timer)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#EC7063', color: 'white', '&:hover': { backgroundColor: '#E74C3C' } }}
                        onClick={handlePause}>
                        Clock out
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#AEB6BF ', color: 'white', '&:hover': { backgroundColor: '#808B96' } }}
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        //   <div className="app">
        //     <h3>React Stopwatch</h3>
        //     <div className='stopwatch-card'>
        //       <div className='buttons'>
        //         {
        //           !isActive && !isPaused ?
        //             <button onClick={handleStart}>Start</button>
        //             : (
        //               isPaused ? <button onClick={handlePause}>Pause</button> :
        //                 <button onClick={handleResume}>Resume</button>
        //             )
        //         }
        //         <button onClick={handleReset} disabled={!isActive}>Reset</button>
        //       </div>
        //     </div>
        //   </div>
    );
}

export default Timer;