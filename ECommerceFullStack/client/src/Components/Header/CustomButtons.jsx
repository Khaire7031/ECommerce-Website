import React, { useState, useContext, useSyncExternalStore } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

// Components
import LoginDailog from '../Login/LoginDailog';
import { DataContext } from '../../context/DataProvider.jsx';


const Wrapper = styled(Box)`
    display: flex;
    margin: '0 3% 0 auto';
    & > button , & > p , & > div{
        margin-right: 40px;
        fontSize: 16px;
        align-items : center;
    }
`


const Container = styled(Box)`
    display: flex;
`

const LoginButton = styled(Button)`
    color : 32874f0;
    background : #fff;
    text-transform: none;
    font-weight: 600;
    border-radius: 2;
    padding: 5px 40px;
    height: 32px;
    boxShadow: none;
`



export default function CustomButtons() {

    const [open, setOpen] = useState(false);
    const { account } = useContext(DataContext);
    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? <Typography>account</Typography> :
                    <LoginButton varient='contained' onClick={() => openDialog()}>Login</LoginButton>
            }
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            <Container>
                <ShoppingCart></ShoppingCart>
                <Typography>Cart</Typography>
            </Container>
            <LoginDailog open={open} setOpen={setOpen}></LoginDailog>
        </Wrapper>
    )
}
