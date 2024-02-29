import React from 'react';
import { Fragment } from 'react';
import { Box } from '@mui/material';

// Componenets
import NavBar from './NavBar';
import Banner from './Banner';
import styled from '@emotion/styled';


const Container = styled(Box)`
    padding: 10px;
    background: #f2f2f2;
`
export default function Home() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Container>
                <Banner></Banner>
            </Container>
        </Fragment>
    )
}
