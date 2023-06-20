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

export default function SignUpPage() {

  let navigate = useNavigate()
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
const [cerror, setCError] =useState(false)
const [nerror, setNError] =useState(false)
const [eerror, setEError] =useState(false)

const [success, setSuccess] = useState(false)


  

  
  const Signup = async () =>{
    console.log("submit")
    if(contact !== "" && name !== "" &&  email !== ""){
      setCError(false)
      setNError(false)
      setEError(false)
      try{
        const res = await post("user/register", {contact:contact, name:name, email:email})
        if (res.data.error === false) {
          setTimeout(toast.success(res.data.info), 10000)
          setSuccess(true)
          
        }
        else{
          toast.error(res.data.info)
    
    
        }
      }catch(err){
        toast.error(err.response.data.info)
      }
    
    }
    if(contact === ""){
      setCError(true)
      toast.error("please enter contact")

    }
    if(name === ""){
      setNError(true)
      toast.error("please enter name")

    }
    if(email === ""){
      setEError(true)
      toast.error("please enter email")

    }

    if(contact !== ""){
      setCError(false)

    }
    if(name !== ""){
      setNError(false)

    }
    if(email !== ""){
      setEError(false)

    }


  }

  const handleBack = ()=>{
          navigate('/')

  }

  return (
    <Box className="login-main">
      <Card className='login-card'>
      
        <h1 className='back-office-para'>Test Task SignUp</h1>
        {success === false ?
        <Box>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField id="outlined-basic" label="Contact" variant="outlined" fullWidth size='small' type='text' error={cerror} required onChange={(e)=>{setContact(e.target.value)}} inputProps={{pattern:"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"}} />
              
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12} my={2}>
              <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth size='small' type='text' error={nerror} required onChange={(e)=>{setName(e.target.value)}} />
              
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size='small' type='email' error={eerror} required onChange={(e)=>{setEmail(e.target.value)}} inputProps={{pattern:" /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/."}}/>
              
            </Grid>
          </Grid>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
           
         
          </Box>
          <Box sx={{ display: "flex", mt: "25px" }}>
            <button type='submit' className='login-btn' onClick={Signup}>Submit</button>
          </Box>
        </Box>
:<Box>
  <h1 className='back-office-para'>Please Check your email for password and login to continue</h1>
   <Box sx={{ display: "flex", mt: "25px" }}>
            <button  className='login-btn' onClick={handleBack}>Go to Sign in</button>
          </Box>
  </Box>}
      </Card>
    </Box>
  );
}
