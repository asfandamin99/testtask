import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Box, Card, Grid, TextField } from '@mui/material';

import { post } from '../helper/api';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

// ----------------------------------------------------------------------



const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

  let navigate = useNavigate()
  const [contact, setContact] = useState('');
  const [pass, setPass] = useState('');

 

  

  const login = async () =>{
    try{
    const res = await post("user/login", {contact:contact, password:pass})
    if (res.data.info === "Successfully Logged in") {
      sessionStorage.setItem('token', JSON.stringify(res.data.token))
      toast.success(res.data.info)
      navigate('dashboard/app')
      
    }
    else{
      sessionStorage.setItem('token', JSON.stringify(res.data.token))
      // toast.info(res.data.info)
      toast.success("Successfully Logged in")

      navigate('dashboard/app')

    }
  }catch(err){
    toast.error(err.response.data.info)
  }
  }

  const handleSignup = ()=>{
    navigate('/signup')
  }

  return (
    <Box className="login-main">
      <Card className='login-card'>
      
        <h1 className='back-office-para'>Ropstam Test Task Login</h1>
        <Box>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField id="outlined-basic" label="Contact" variant="outlined" fullWidth size='small' type='text' onChange={(e)=>{setContact(e.target.value)}}/>
              
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: "1px" }}>
            <Grid item md={12} sm={12} xs={12}>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth size='small' type='password' onChange={(e)=>{setPass(e.target.value)}}/>
             
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
           
         
          </Box>
          <Box sx={{ display: "flex", mt: "25px" }}>
            <button className='login-btn' onClick={login}>Login</button>
          </Box>
          <Box sx={{ display: "flex", mt: "25px" }}>
            <Button variant='contained' color='success' sx={{color:"white" , minWidth:"18.5vw", fontFamily:"Montserrat", }} onClick={handleSignup}>Sign Up </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
