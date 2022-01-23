
import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css";
import logo from '../images/venation.png'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import "@fontsource/poppins";
// import form from '../Assets/Login.png'
// import {
//     Link,
// } from "react-router-dom"


export default function Login(props) {
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    function login() {
        // axios.defaults.withCredentials = true
        Axios.post('login', {
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
            <div class="loginBox" style={{ margin: "auto", justifyContent: "center", position: "absolute", top: "31%", left: "34%", height: "420px", width: "500px" }}>
                    <div className="card-content">
                        <div className="content">
                            <form className="form" style={{ marginTop: "-20px" , padding:"30px" }}
                            onSubmit={(e) => {
                                e.preventDefault()
                                login()
                            }}>
                              <div class="login-title" style={{ textAlign: "center" }}>
                                 <h1 style={{color: "white", fontWeight:"bolder", fontSize:"36px" , marginTop:"0px"}}>Login to Your Account</h1>
                             </div>
                             <br/>  

                            <div class="field">
                                <input class="input-username" type="email" placeholder="Username" value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>
                            
                            <div className="field">
                                <input class="input-password" type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                            </div>

                            <div className="field" style={{marginTop:"33%"}}>
                            <Grid item style={{ textAlign: "left" }}>
                                <a style={{color:"#5B5A99", fontSize:"14px"}}>Remember Me </a>
                              </Grid>
                              <Grid item style={{ textAlign: "right" , marginTop:"-6.5%"}}>
                                <a style={{color:"#5B5A99", fontSize:"14px"}}>Forgot Password </a>
                              </Grid>
                            </div>

                            <div className="field" style={{marginTop:"7.5%"}}>
                                <div className="control">
                                    <button style={{color:"white",paddingLeft:"25px", paddingTop:"8px", paddingBottom:"11px",paddingRight:"20px", fontSize:"20px"}} class="button-login">Login to Your Account</button>
                                </div>
                            </div>

                            <div className="field" style={{marginTop:"25%"}}>
                            <Grid item style={{ color:"#5B5A99",fontSize:"14px", textAlign: "center", marginTop:"15px" }}>
                                <a>Not a member yet ? </a>
                                <Link href="/signup" item style={{ color:"white",fontSize:"14px", textAlign: "center", marginTop:"15px" }} >
                                  {" Sign Up"}
                                </Link>
                              </Grid>
                            </div>
                        </form>
                            </div>
                    </div>
             </div>
        </div>

    )
}
