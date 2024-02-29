import { useState } from 'react'
import './App.css';
import { Box } from '@mui/material';

// Components
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

function App() {
  return (
    <div>
      <Header></Header>
      <Box style={{ marginTop: 54 }}>
        <Home></Home>
      </Box>
    </div >
  )
}

export default App
