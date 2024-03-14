import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Box, styled, TextField, Button, Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import { AuthentiCateSignUp } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';

// Style 
const Component = styled(Box)`
    height: 82vh;
    width: 60vh;
    padding: 0;
    padding-top: 0;
`;
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 30% !important;
    height: 81.2%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;
const Wrapper = styled(Box)`
    padding: 10px 25px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const accountIntialization = {
    login: {
        view: 'login',
    },
    signup: {
        view: 'signup',
    }
}

const signUpIntializeValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

export default function LoginDailog({ open, setOpen }) {

    const [account, setToggleAccount] = useState(accountIntialization.login);
    const [signup, setSignup] = useState(signUpIntializeValues);

    const { setAccount } = useContext(DataContext);
    const handleClose = () => {
        setOpen(false);
        setToggleAccount(accountIntialization.login)
    }


    const toggleSignUp = () => {
        setToggleAccount(accountIntialization.signup)
    }

    const onInputChange = (e) => {
        // console.log(e.target.value);
        setSignup({ ...signup, [e.target.name]: e.target.value })
        console.log(signup);
    }

    const signUpUser = async () => {
        // 43 3
        try {
            let responce = await AuthentiCateSignUp(signup);
            console.log("Responce : ", responce)
            if (!responce) {
                return;
            }
            handleClose();
            setAccount(signup.firstname);
        } catch (error) {
            console.log("Sign is not possible No response from backend")
        }
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    {/* <Image>
                        <Typography variant='h5'>Login</Typography>
                        <Typography style={{ marginTop: 20 }}>Get access to your Orders , Wishlist and Recommenation</Typography>
                    </Image> */}
                    {
                        account.view === 'login' ?
                            <Wrapper>
                                <TextField variant='standard' label='Enter Email/Phone Number...'></TextField>
                                <TextField variant='standard' label='Enter Password...'></TextField>
                                <Text>By countinuing , you agree to Filpkart's Terms of Use and Privacy Policy</Text>
                                <LoginButton>Login</LoginButton>
                                <Typography style={{ textAlign: 'center' }}>OR</Typography>
                                <RequestOTP>Request OTP</RequestOTP>
                                <CreateAccount onClick={() => toggleSignUp()}>New to Flipkart ? Create new Account</CreateAccount>
                            </Wrapper>
                            :
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' required></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname'></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label='Enter Username' required></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label='Enter Email' type='email' required></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter Password' type='password' required></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' type='tel' required></TextField>
                                <LoginButton onClick={() => signUpUser()}>Continue</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog >
    )
}
