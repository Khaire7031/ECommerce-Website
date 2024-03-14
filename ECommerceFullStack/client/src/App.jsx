import { useState } from 'react'
import './App.css';
import { Box } from '@mui/material';
import DataProvider from './context/DataProvider';

// Components
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

function App() {
  return (
    <DataProvider>
      <Header></Header>
      <Box style={{ marginTop: 54 }}>
        <Home></Home>
      </Box>
    </DataProvider>
  )
}

export default App
