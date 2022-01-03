import React from 'react';
import { AppBar, CssBaseline, Grid, Toolbar } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from "@material-ui/core/styles";
import { Table } from 'react-bootstrap';
import kemkes from '../images/logo_kemenkes baru.jpg';
import './user.css';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { url_profile } from '../helper/ServiceUrlAPI';

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
    //   marginTop: theme.spacing(3),
      overflow: "auto"
    },
    table: {
      minWidth: 500
    },
    toolbar: {
        background : 'white',
    },
    logo : {
    // width : 100,
    height : 100
    },
  }));
  
  const sample = [
    { name: "Data Covid", detail: ["a", "b"] }
  ];

export default function UserProfilePage(){
    const classes = useStyles();
    const history = useHistory();
    const [dataProfile, setDataProfile] = React.useState([]);
    const [username, setUsername] = React.useState("");
    const [userScreenName, setUserScreenName] = React.useState("");
    const [joined, setJoined] = React.useState("");
    const [following, setFollowing] = React.useState("");
    const [follower, setFollower] = React.useState("");
    const [issue, setIssue] = React.useState("");
    const [profileImage, setProfileImage] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [sentiment, setSentiment] = React.useState("");
    const [copyLinkID, setCopyLinkID] = React.useState("");
    const [objectSentimen, setObjectSentimen] = React.useState([]);

    React.useEffect(()=> {
        getProfileUser();
        getProfileUserSentiment();
      }, [])
    
    
       async function getProfileUser (){
    
        let bodyParam = {};
        bodyParam['user_screenname'] = window.location.search.substr(1);
    
        await axios.post(url_profile + '/get-profile', bodyParam)
        .then((res) => {
          console.log(res.data.value);
          setDataProfile(res.data.value);
          setUsername(res.data.value[0]._source.user_name);
          setUserScreenName(res.data.value[0]._source.user_screenname);
          setJoined(res.data.value[0]._source.user_joindate);
          setFollowing(res.data.value[0]._source.user_friends_count);
          setFollower(res.data.value[0]._source.user_followers_count);
          setIssue(res.data.value[0]._source.issue);
          setProfileImage(res.data.value[0]._source.user_profileimage);
          setLocation(res.data.value[0]._source.fixed_location);
          setSentiment(res.data.value[0]._source.insight.sentiment);
          setCopyLinkID(res.data.value[0]._source.id);
        })
        .catch(err => console.log(err));
    
    
        // return await getTwitter;
      };

      async function getProfileUserSentiment (){
    
        let bodyParam = {};
        bodyParam['user_screenname'] = window.location.search.substr(1);
    
        await axios.post(url_profile + '/get-profile-sentiment', bodyParam)
        .then((res) => {
          setObjectSentimen(res.data.value)
        })
        .catch(err => console.log(err));
    
    
        // return await getTwitter;
      };

      const renderSentimenBar = () => {


            if(dataProfile.length > 0){

            if(dataProfile[dataProfile.length - 1]._source.insight.sentiment === 'Neutral'){
                return  <tr>
                            <td colSpan="1" style={{ width : '150px'}}>Positive</td>    
                            <td colSpan="1"><ProgressBar variant="warning" now={100} /></td>            
                        </tr>
            }
            if(dataProfile[dataProfile.length - 1]._source.insight.sentiment === 'Neutral' || dataProfile[dataProfile.length - 1]._source.insight.sentiment ===  'Ambivalent'){
                return  <tr>
                            <td colSpan="1" style={{ width : '150px'}}>Netral</td>  
                            <td colSpan="1"><ProgressBar variant="secondary" now={100} /></td>            
                        </tr>
            }
            if(dataProfile[dataProfile.length - 1]._source.insight.sentiment === 'negative'){
                return  <tr>
                            <td colSpan="1" style={{ width : '150px'}}>Negative</td>  
                            <td colSpan="1"><ProgressBar variant="danger" now={100} /></td>            
                        </tr>
            }
        }
        
      }


      const renderDataProfile = () => {
          return(
            <>
                <Container style={{ marginTop : 200, paddingBottom : 20}}>
                <h5 onClick={()=> history.push('/')}><i class="fas fa-chevron-left" /><span style={{ marginLeft : 15}}>Back</span></h5>
                    <Row xs="auto" style={{ marginTop : 50}}>
                        <Col xs={2}>
                            <img 
                                src={profileImage} 
                                style={{ borderRadius : '50%' , width : '150px'}}
                            />
                        </Col>
                        <Col xs={5} style={{ padding : 'auto'}}>
                            <Row xs="auto">
                                <h1  style={{ fontWeight : 'bold'}}>{username}</h1>
                            </Row>
                            <Row xs="auto">
                                <Col>
                                    <h5  style={{ color : 'grey'}}>@{userScreenName}</h5> 
                                </Col>
                                <Col>
                                    <h5  style={{ color : 'grey'}}><LocationOnIcon/>{location !== "0" ? location : " -"}</h5>
                                </Col>
                            </Row>
                            <Row xs="auto">
                                <h5  style={{ color : 'grey'}}><i className="far fa-calendar"/>   Joined 20 Oktober 2011</h5>
                            </Row>
                            <Row xs="auto">
                                <Col>
                                    <h5><span style={{ fontWeight : 'bold'}}>{following}</span> <span style={{ color : 'grey'}}>Following</span></h5> 
                                </Col>
                                <Col>
                                    <h5><span style={{ fontWeight : 'bold'}}>{follower}</span> <span style={{ color : 'grey'}}>Followers</span></h5> 
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={5}>
                            <Row xs="auto">
                                <Chip
                                    onClick={() => {window.open(copyLinkID, '_blank').focus()}}
                                    style={{
                                    borderColor: "#F4F6C4",
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    borderRadius: 20,
                                    backgroundColor : '#F4F6C4',
                                    }}
                                    variant="outlined"
                                    color="primary"
                                    label="Copy Link"
                                />
                            </Row>
                            <Row xs="auto" style={{ marginTop : 50}}>
                                <h5  style={{ fontWeight : 'bold'}}>Tags</h5>
                            </Row>
                            <Row xs="auto">
                                <Col>
                                    <Chip
                                        style={{
                                        borderColor: "#F4F6C4",
                                        color: "grey",
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        borderRadius: 20,
                                        backgroundColor : '#F4F6C4'
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        label="PPKM"
                                    />
                                </Col>
                                <Col>
                                    <Chip
                                        style={{
                                        borderColor: "#F4F6C4",
                                        color: "grey",
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        borderRadius: 20,
                                        backgroundColor : '#F4F6C4'
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        label="Vaksin"
                                    />
                                </Col>
                                <Col>
                                    <Chip
                                        style={{
                                        borderColor: "#F4F6C4",
                                        color: "grey",
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        borderRadius: 20,
                                        backgroundColor : '#F4F6C4'
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        label="Corona"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container> 
                        
                                          

                <Grid container  justify="center" style={{ marginTop : 50}}>
                    <Grid item xs={12} sm={8}>
                        <h5 style={{ fontWeight : 'bold'}}>Tweet</h5>
                        <Table  bordered hover responsive="md">         
                            <tbody className="tweet_user">
                                <tr>
                                    <td rowspan="12" style={{ width : '150px', verticalAlign : 'middle', fontWeight : 'bold'}}>{issue}</td>  
                                </tr>
                                {
                                    dataProfile.map((value) => (
                                        <tr>
                                            <td colSpan="1" style={{ textAlign : 'left'}}>{value._source.body}</td>            
                                        </tr>

                                    ))
                                }                              
                            </tbody>
                        </Table> 
                    </Grid>
                </Grid>

                <Grid container  justify="center" style={{ marginTop : 30}}>
                    <Grid item xs={12} sm={8}>
                        <h5 style={{ fontWeight : 'bold'}}>Issue participated</h5>
                        <Table  bordered hover responsive="md">         
                            <tbody>
                                <tr>
                                    <td rowspan="12" style={{ width : '150px', verticalAlign : 'middle', fontWeight : 'bold'}}>{issue}</td>  
                                </tr>
                                {
                                    objectSentimen.map((value) => (
                                        
                                        value.sentiment === "positive" ?
                                        
                                        <tr>
                                            <td colSpan="1" style={{ width : '150px'}}>Positive</td>    
                                            <td colSpan="1"><ProgressBar variant="warning" now={value.total * 10} /></td>            
                                        </tr>
                                        : value.sentiment === "Neutral" || value.sentiment === 'Ambivalent'?
                                        <tr>
                                            <td colSpan="1" style={{ width : '150px'}}>Netral</td>  
                                            <td colSpan="1"><ProgressBar variant="secondary" now={value.total * 10} /></td>            
                                        </tr>
                                        : value.sentiment === "negative"?
                                        <tr>
                                            <td colSpan="1" style={{ width : '150px'}}>Negative</td>  
                                            <td colSpan="1"><ProgressBar variant="danger" now={value.total * 10} /></td>            
                                        </tr>
                                        :
                                        null
                                    ))
                                }                                
                            </tbody>
                        </Table> 
                    </Grid>
                </Grid>
            </>
          )
      }

    return (
        <>
            {console.log(objectSentimen)}
            <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" title={<img src={kemkes}/>}>
            <Toolbar className={classes.toolbar}>
                <img src={kemkes} alt="logo"  className={classes.logo}/>
                <h2 style={{ color : 'black', marginLeft : '50px'}}><strong>User Page</strong></h2>
            </Toolbar>
            </AppBar>
            
                {renderDataProfile()}
            </React.Fragment>
        </>
    )
}