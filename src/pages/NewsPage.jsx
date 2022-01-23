import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Card, Grid } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { url_news } from "../helper/ServiceUrlAPI";
import WordCloudCompNews from '../component/word/WordCloudNews';
import LineNews from '../component/line/LineNews';
import TableNews from '../component/table/TableNews';
import logo from '../images/venation-med.png'
import '../App.css'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownSharp';

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
      // width : 100,
      height : 65
    },
    rootTableNews: {
      backgroundColor: "#E0E0E0",
      margin: '15px',
      borderRadius : '10px'
    },
    textField: {
      width: '100%',
      marginLeft: '10px',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
  rootCard: {
    // backgroundColor: "#E0E0E0",
    // border: "4px solid #E0E0E0",
    marginRight: 'auto',
    marginLeft : 'auto',
    borderRadius : '20px',
    paddingBottom :  10
  },
  }));


export default function TwitterPage() {
    const classes = useStyles();
    const [listData, setListData] = React.useState([]);
    const history = useHistory();
    const [value, setValue] = React.useState("");
    const [negatifArr, setnegatifArr] = React.useState([]);
    const [positifArr, setpositifArr] = React.useState([]);
    const [netralArr, setnetralArr] = React.useState([]);
    const [tanggal, settanggal] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  React.useEffect(()=> {
    getDataOfNews();
    countLineTwitter();
  }, [])


  async function getDataOfNews (){
    await axios.get(url_news + '/get-data-news')
    .then((res) => {
      // console.log(res.data.value);
      setListData(res.data.value);
    })
    .catch(err => console.log(err));
  };

  async function countLineTwitter (){

    let sentimentNegatif = [];
    let sentimentPositif = [];
    let sentimentNetral = [];
    let tanggal = []

    
    for(var i = 7; i > 0; i--){

      var d = new Date();
      d.setDate(d.getDate() - i);
      tanggal.push(d.getDate());
      let bodyParam = {};
      bodyParam['day'] = i;
    
       await axios.post(url_news + '/get-data-news-v2', bodyParam)
      .then((res) => {
        sentimentNegatif.push(res.data.value.negatif)
        sentimentPositif.push(res.data.value.positif)
        sentimentNetral.push(res.data.value.netral)
      })
      .catch(err => console.log(err));

  
    }
    setnegatifArr(sentimentNegatif)
    setpositifArr(sentimentPositif)
    setnetralArr(sentimentNetral)
    settanggal(tanggal)
  }

  const renderWordNews = () => {
    let array = [];
    var arrayText = [];
    var arrayValue = []; 
    var dataGabunganTextValue = [];
    let result = [];
     
      listData.map((value) => {

        for(var i = 0; i < value._source.insight.keywords.length; i++){
          array.push(value._source.insight.keywords[i])
        };

      });

      let b = array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          arrayText.push(key);  
          arrayValue.push(b[key])
        }
      };
         
      for(var i = 0; i < arrayText.length; i++) {
        
        var objectData = {}; 
      
        objectData['text'] = arrayText[i];
        objectData['value'] = arrayValue[i];
        dataGabunganTextValue.push(objectData);  
      };

      if(dataGabunganTextValue.length > 0){
        let ab = dataGabunganTextValue.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

        // top 10
        for(var i=0; i < 11; i++){
          let objTop10 = {};
          objTop10['text'] = ab[i].text;
          objTop10['value'] = ab[i].value;
          result.push(objTop10)
        }
      }

      return (
          <WordCloudCompNews
              data={result}
          />
      )
  };

  


  if(value === "twitter") history.push('/')

    return(
      <React.Fragment>
        <div className="main" style={{backgroundColor:"#201D47"}}>
        <CssBaseline /> 
        <div className={classes.toolbar}>
          <nav classname="navbar" role="navigation" aria-label="main navigation">
              <div className='navbar-brand' style={{ justify: "center"}}>
                <img src={logo} alt="logo" className={classes.logo}/>
                  <h2 style={{ marginLeft : '45px'}}><strong class="gradient-text">Dashboard Analisis</strong><br/>
                    <h3> </h3>        
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
        <Grid container style={{ marginTop : 20, paddingLeft : 60}} spacing={5}>
            <Grid item sm={2}>
              <Form.Select value={value} onChange={(e)=> setValue(e.target.value)} size="md">
                  <option>News</option>
                  <option value="twitter">Twitter</option>
              </Form.Select>
            </Grid>
        </Grid>

        {/* Line 1  */}

            <Grid container justifyContent="center" spacing={1} style={{ marginTop : 50, paddingLeft : 48, paddingRight : 48}}>
                <Grid item sm={12} className={classes.rootTableNews}>
                    <Card justifyContent="center">
                      <h4 style={{ marginLeft : 50, marginTop : 10, paddingTop : 20}}> News</h4>
                          <TableNews/>                                              
                    </Card>
                </Grid>
            </Grid>
        {/* </Card> */}

        {/* Line 2 */}
  
        <Grid container justifyContent="center" style={{ marginTop : 50,  paddingLeft : 48, paddingRight : 48}} spacing={4}>
          <Grid item sm={6}>
            <Card className={classes.rootCard}>
                {
                  <LineNews
                    date={tanggal}
                    negatif={negatifArr}
                    positif={positifArr}
                    netral={netralArr}
                />
                }
            </Card>
          </Grid>
          <Grid item sm={6}>
           <Card className={classes.rootCard} style={{ height :  365}}>
              {renderWordNews()}
            </Card>
          </Grid>
        </Grid> 
        </div>  
      </React.Fragment>
    )
}