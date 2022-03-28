import React, { useState, useEffect } from 'react'
import QRCode from "qrcode";
import { Box } from "@mui/material";

const QRcode = (props) => {
    const {text} = props;
    const [logo, setLogo] = useState("");
    const id = localStorage.getItem('id')
    useEffect(() => {
        QRCode.toDataURL(`${id}_${text}`).then((data) => {
            setLogo(data);
        });
    }, []);

    return (
        <>
            <Box
                component="img"
                sx={{
                    height: 400,
                    width: 400,
                    maxHeight: { xs: 200, md: 400 },
                    maxWidth: { xs: 200, md: 400 },
                }}
                alt="QR Code"
                src={logo}
            ></Box>
        </>
    );
}

export default QRcode