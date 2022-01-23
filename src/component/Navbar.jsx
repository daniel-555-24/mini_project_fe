import React from 'react';
import logo from '../images/venation-med.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownSharp';
import selectedDashboard from '../pages/TwitterPage'


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    toolbar: {
      background : '#201D47',
      paddingLeft : '3%',
      paddingTop : '2%'
    },
    menuButton: {
      marginLeft: 'auto',
    },
    logo : {
      height : 65,
    }
  }));

  export default function Navbar(){
    const classes = useStyles();
    const [valueFropdownTopik, setValueDropdownTopik] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

return(
    <div className={classes.toolbar}>
          <nav classname="navbar" role="navigation" aria-label="main navigation">
              <div className='navbar-brand' style={{ justify: "center"}}>
                <img src={logo} alt="logo" className={classes.logo}/>
                  <h2 style={{ marginLeft : '45px'}}><strong class="gradient-text">Dashboard Analisis</strong><br/>
                    <h3 style={{color:'#5B5A99'}}>{valueFropdownTopik !== "" ? valueFropdownTopik : "Semua Topik"} </h3>        
                  </h2>
                      <div className="navbar-end" style={{marginTop:"-30px"}}>
                          <div className="navbar-item">
                              <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                              >
                                <text style={{color:"#B1AFCD",fontSize:"16px",marginRight:"10px"}}>
                                        <img src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" alt="profil" style={{ margin: "auto", marginRight: "5px" }} />
                                        &nbsp;&nbsp;&nbsp;
                                        {localStorage.email.substring(1, localStorage.email.lastIndexOf("@"))}
                                        <ArrowDropDownIcon/>
                                </text>
                              </Button>
                              <Menu
                                id="fade-menu"
                                MenuListProps={{
                                  'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                              >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={(e) => {
                                                e.preventDefault()
                                                localStorage.clear()
                                                window.location.reload();
                                            }}>Logout</MenuItem>
                              </Menu>
                          </div>
                      </div>
              </div>
            </nav>
          </div>
)
                                        }

