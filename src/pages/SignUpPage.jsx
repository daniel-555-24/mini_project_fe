
import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css";
import logo from '../images/venation.png'
import Grid from '@mui/material/Grid';
import "@fontsource/poppins";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import form from '../Assets/Login.png'
// import {
//     Link,
// } from "react-router-dom"


export default function Signup(props) {
    const [username,setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    function signup() {
        // axios.defaults.withCredentials = true
        Axios.post('login', {
            username,
            email,
            password
        })
            .then(function (response) {
                console.log(response.data, "<<<<<<<<TOKEN")
                // localStorage.token = `Token ${response.data.key}`
                localStorage.token = response.data
                localStorage.email = response.data.email
                localStorage.setItem("email", JSON.stringify(email));
                props.history.push('/')
                window.location.reload();
            })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    if (localStorage.token) {
        return (
            <h1>You Already Logged In</h1>
        )
    }
    return (
        <div className="container-fluid homepage-bgimage">
            <div class="field" style={{ textAlign: "center"}}>
                    <img src={logo}  style={{marginTop:"8%"}} alt="logo"/>
             </div>
             <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <div class="loginBox" >
        <div className="card-content" style={{width:"500px",height:"500px"}}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <div class="login-title" style={{ textAlign: "center" }}>
                                 <h1 style={{color: "white", fontWeight:"bolder", fontSize:"36px" , marginTop:"0px"}}>Create Your Account</h1>
                             </div>
                             <br />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </Box>
  </Container>
        </div>

    )
}