import React from 'react';
import { AppBar, Toolbar, Box, styled, TextField, Button, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


// Style 
const Component = styled(Box)`
    height: 80vh;
    width: 90vh;
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

export default function LoginDailog({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onClick={() => handleClose()} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant='h5'>Login</Typography>
                        <Typography style={{ marginTop: 20 }}>Get access to your Orders , Wishlist and Recommenation</Typography>
                    </Image>
                    <Wrapper>
                        <TextField variant='standard' label='Enter Email/Phone Number...'></TextField>
                        <TextField variant='standard' label='Enter Password...'></TextField>
                        <Text>By countinuing , you agree to Filpkart's Terms of Use and Privacy Policy</Text>
                        <LoginButton>Login</LoginButton>
                        <Typography style={{ textAlign: 'center' }}>OR</Typography>
                        <RequestOTP>Request OTP</RequestOTP>
                        <CreateAccount>New to Flipkart ? Create new Account</CreateAccount>
                    </Wrapper>
                </Box>
            </Component>
        </Dialog>
    )
}
