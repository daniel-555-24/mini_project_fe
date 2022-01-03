import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import * as d3 from "d3";
import { Card, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import LineTwitter from '../component/line/LineChartTwitter';
import kemkes from '../images/logo_kemenkes baru.jpg';
import axios from 'axios';
import { url_twitter, url_twitter_local } from "../helper/ServiceUrlAPI";
import geojson from '../geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import PieSentimen from '../component/pie/PieSentimen'
import PieGender from '../component/pie/PieGender';
import WordCloudTwitter from '../component/word/WordCloudTwitter';
import TableHeader from '../component/table/TableHeader';
import TableNetral from '../component/table/TableNetral';
import TablePositif from '../component/table/TablePositif';
import TableNegatif from '../component/table/TableNegatif';
import BarSummary from '../component/bar/BarSummary';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    toolbar: {
      background : 'white',
    },
    menuButton: {
      marginLeft: 'auto',
    },
    logo : {
      // width : 100,
      height : 100
    },
    rootPositif: {
      border: "4px solid #D2DC2E",
      marginRight: 'auto',
      marginLeft : 'auto',
      borderRadius : '20px'
    },
    rootNegatif: {
      border: "4px solid #BE0712",
      marginRight: 'auto',
      marginLeft : 'auto',
      borderRadius : '20px'
    },
    rootNetral: {
      border: "4px solid #E0E0E0",
      marginRight: 'auto',
      marginLeft : 'auto',
      borderRadius : '20px',
    },

    rootCard: {
      marginRight: 'auto',
      marginLeft : 'auto',
      borderRadius : '20px',
      paddingBottom :  10
    },
    paperTable: {
      height: 250,
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      overflowY: 'auto',
    },
    textField: {
      width: '100%',
      marginLeft: '10px',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
    square1 : {
      width : '15px',
      height : '15px',
      backgroundColor : "#075050",
      margin : '5px',

    },
    square2 : {
      width : '15px',
      height : '15px',
      backgroundColor : "#107e78",
      margin : '5px'

    },
    square3 : {
      width : '15px',
      height : '15px',
      backgroundColor : "#1CB3AB",
      margin : '5px'

    },
    square4 : {
      width : '15px',
      height : '15px',
      backgroundColor : "#C2C2C2",
      margin : '5px'

    }
  }));

const width = 1050;
const height = 345;
const projection = geoMercator().fitExtent(
  [[0, 0], [width * 0.9, height * 0.9]],
  geojson
);
const path = geoPath().projection(projection);

export default function TwitterPage(){
    const classes = useStyles();
    const history = useHistory();
    const [listData, setListData] = React.useState([]);
    const [listTable, setListTable] = React.useState([]);
    const [valueFropdownMedia, setValueDropdownMedia] = React.useState("");
    const [valueFropdownTopik, setValueDropdownTopik] = React.useState("");
    const [valueFropdownDaerah, setValueDropdownDaerah] = React.useState("");
    const [keyWord, setKeyword] = React.useState([]);
    const [valueIssue, setValueIssue] = React.useState("");
    const [negatifArr, setnegatifArr] = React.useState([]);
    const [positifArr, setpositifArr] = React.useState([]);
    const [netralArr, setnetralArr] = React.useState([]);
    const [negatifSummary, setnegatifSummary] = React.useState([]);
    const [positifSummary, setpositifSummary] = React.useState([]);
    const [netralSummary, setnetralSummary] = React.useState([]);
    const [tanggal, settanggal] = React.useState([]);
    const [listValueOfMap, setValueOfMap] = React.useState([]);
    const [valueUndefined, setValueUndefined] = React.useState(0);
    const [lastDate, setLastDate] = React.useState("");
    const [valueWord,setValueWord] = React.useState(10);

    React.useEffect(()=> {
      getSourceOfIndex(valueIssue, valueFropdownDaerah);
      getTableDesc(valueIssue, valueFropdownDaerah);
      countLineTwitter();
      getLocationOfMap(valueFropdownDaerah);
      getDataSummary(valueFropdownDaerah);
      getLastDateCrawling();
    }, [])

    async function getSourceOfIndex (topik, daerah) {

        setValueDropdownTopik(topik)
        setValueDropdownDaerah(daerah)
        let bodyParam = {};
        bodyParam["issue"] = topik !== "" ? topik : "";
        bodyParam["region_code"] = daerah !== "" ? daerah : "";
    
        await axios.post(url_twitter + '/get-data-twitter-filter', bodyParam)
        .then((res) => {
          setListData(res.data.value);
          setKeyword(res.data.value[2]._source.query);
          // renderWord();
        })
        .catch(err => console.log(err));
      };
    
       function getTableDesc(topik, daerah) {
    
        setValueDropdownTopik(topik)
        let bodyParam = {};
        bodyParam["issue"] = topik !== "" ? topik : "";
        bodyParam["region_code"] = daerah !== "" ? daerah : "";
    
         axios.post(url_twitter + '/get-table-by-desc', bodyParam)
        .then((res) => {
          setListTable(res.data.value);
        })
        .catch(err => console.log(err));
      };
    
      async function getLocationOfMap (daerah){
    
        let bodyParam = {};
        bodyParam["region_code"] = daerah !== "" ? daerah : "";
    
        await axios.post(url_twitter + '/get-location', bodyParam)
        .then((res) => {
            setValueOfMap(res.data.value);
            getUndefined(res.data.value)
        })
        .catch(err => console.log(err));
      }
    
      async function countLineTwitter (){
    
        let sentimentNegatif = [];
        let sentimentPositif = [];
        let sentimentNetral = [];
        let tanggal = []
        
        
        for(var i = 7; i > 0; i--){
          
          var d = new Date();
          d.setDate(d.getDate() - i);
          // d.getDate() - i;
          tanggal.push(d.getDate());
          let bodyParam = {};
          bodyParam['day'] = i;
        
           await axios.post(url_twitter + '/get-data-twitter-v2', bodyParam)
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

      async function getDataSummary (daerah){
    
        let negatifArray = [];
        let positifArray = [];
        let netralArray = [];
        let topik = ['data covid', 'ppkm_kemendagri', 'protokol kesehatan', 'test covid', 'vaksin']
        
        
        for(var i = 0; i < 5; i++){
          
          let bodyParam = {};
          bodyParam['issue'] = topik[i];
          bodyParam["region_code"] = daerah !== "" ? daerah : "";
        
           await axios.post(url_twitter + '/get-summary-v1', bodyParam)
          .then((res) => {
            if(res.data.value.length > 0){
              for(var j = 0; j < 3; j++){
                if(res.data.value[j].sentiment === 'Neutral'){
                  netralArray.push(res.data.value[j].total)
                }
                if(res.data.value[j].sentiment === 'negative'){
                  negatifArray.push(res.data.value[j].total)
                }
                if(res.data.value[j].sentiment === 'positive'){
                  positifArray.push(res.data.value[j].total)
                }
              }
            }
          })
          .catch(err => console.log(err));
     
        }

        setnegatifSummary(negatifArray)
        setpositifSummary(positifArray)
        setnetralSummary(netralArray)
      }

      async function getLastDateCrawling(){
         await axios.get(url_twitter + '/get-lastdate')
        .then((res) => {
          if(res.data.value !== null){
            setLastDate(res.data.value.crawlingdate)
          }
        })
        .catch(err => console.log(err));
    
    }

    function getDateFormat(value){
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
  
      let g = new Date(value)

      console.log(value)
  
      let day = g.getDate();
      let month = monthNames[g.getMonth()];
      let year = g.getFullYear();
      let hour = g.getHours() - 7;
      let minute = g.getMinutes();
      let second = g.getSeconds();
    
      let date1 = value.slice(0,10);
      let date2 = value.split('T')[1].split('Z')[0];
    
      // let finalM = minute < 10 ? '0' + minute : minute;
  
      // let result = 'Last data updated :  ' + day + ' ' +  month + ' ' + year + '  ' + hour + ':' + finalM;
  
      let result = 'Last data updated :  ' + date1 + ' ' + date2
      
      return result;
}

      function getUndefined (value){
        for (let i = 0; i < value.length; i++) {
            if(value[i].lokasi === "0"){
                setValueUndefined(value[i].total)
            }
        }
      }
    
      const renderMap = () => {
    
        return geojson.features.map(d=>{
    
        
          for (let i = 0; i < listValueOfMap.length; i++) {
    
            if (listValueOfMap[i].lokasi.match(d.properties.iso_3166_2)) {
             
                if(listValueOfMap[i].total > 70){
                    return <path
                    key={d.properties.Name}
                    d={path(d)}
                    fill="#075050"
                    stroke="#0e1724"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    onMouseEnter={(e) => {
                      select(e.target)
                        .attr('fill', '#000')
                    }}
                      onClick={()=>{
                      handleChangeDaerahmap(d.properties.iso_3166_2)
                    }}
                    onMouseOut={(e) => {
                      select(e.target)
                        .attr('fill', '#075050')
                    }}
                  />;
                }
                if(listValueOfMap[i].total > 30 && listValueOfMap[i].total < 70){
                  return <path
                  key={d.properties.Name}
                  d={path(d)}
                  fill="#107e78"
                  stroke="#0e1724"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  onMouseEnter={(e) => {
                    select(e.target)
                      .attr('fill', '#000')
                  }}
                  onClick={()=>{
                    handleChangeDaerahmap(d.properties.iso_3166_2);
                  }}
                  onMouseOut={(e) => {
                    select(e.target)
                      .attr('fill', '#107e78')
                  }}
                />;
              }
              if(listValueOfMap[i].total > 0 && listValueOfMap[i].total < 30){
                return <path
                key={d.properties.Name}
                d={path(d)}
                fill="#1CB3AB"
                stroke="#0e1724"
                strokeWidth="1"
                strokeOpacity="0.5"
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#000')
                }}
                onClick={()=>{
                  handleChangeDaerahmap(d.properties.iso_3166_2);
                  console.log(d.properties.iso_3166_2,"test")
                }}
                onMouseOut={(e) => {
                  select(e.target)
                    .attr('fill', '#1CB3AB')
                }}
              />;
              }
              // if(listValueOfMap[i].total > 10 && listValueOfMap[i].total < 20){
              //   return <path
              //   key={d.properties.Name}
              //   d={path(d)}
              //   fill="#1CB3AB"
              //   stroke="#0e1724"
              //   strokeWidth="1"
              //   strokeOpacity="0.5"
              //   onMouseEnter={(e) => {
              //     select(e.target)
              //       .attr('fill', '#000')
              //   }}
              //   onMouseOut={(e) => {
              //     select(e.target)
              //       .attr('fill', '#1CB3AB')
              //   }}
              // />;
              // }
              // if(listValueOfMap[i].total > 0 && listValueOfMap[i].total < 10){
              //   return <path
              //   key={d.properties.Name}
              //   d={path(d)}
              //   fill="#C8EDEB"
              //   stroke="#0e1724"
              //   strokeWidth="1"
              //   strokeOpacity="0.5"
              //   onMouseEnter={(e) => {
              //     select(e.target)
              //       .attr('fill', '#000')
              //   }}
              //   onMouseOut={(e) => {
              //     select(e.target)
              //       .attr('fill', '#C8EDEB')
              //   }}
              // />;
              // }
             }
            }
            return <path
            key={d.properties.Name}
            d={path(d)}
            fill="#C2C2C2"
            stroke="#0e1724"
            strokeWidth="1"
            strokeOpacity="0.5"
            onClick={()=>{
              handleChangeDaerahmap(d.properties.iso_3166_2);
            }}
            onMouseEnter={(e) => {
              select(e.target)
              .attr('fill', '#000')
             }}
             onMouseOut={(e) => {
               select(e.target)
               .attr('fill', '#C2C2C2')
             }}
             />
          })
      }

      const renderPieSentimen = () => {
    
        let arrayPositif = 0;
        let arrayNegatif = 0;
        let arrayNetral = 0;
    
        
        for (var i = 0; i < listData.length; i++) {
          if (listData[i]._source.insight.sentiment === "Neutral" || listData[i]._source.insight.sentiment === "Ambivalent") { 
            arrayNetral++; 
          }
          if (listData[i]._source.insight.sentiment === "negative") { 
            arrayNegatif++;
          }
          if (listData[i]._source.insight.sentiment === "positive") { 
            arrayPositif++;
          }
      } 
    
        // array.push(arrayPositif, arrayNetral, arrayNegatif);
        return (
          <PieSentimen
            positif={arrayPositif}
            negatif={arrayNegatif}
            netral={arrayNetral}
          />
        );
      }
    
      const renderGenderSentimen = () => {
    
        let laki = 0;
        let perempuan = 0;
        let unknown = 0;
    
        
        for (var i = 0; i < listData.length; i++) {
          if (listData[i]._source.user_gender === "Undefined") { 
            unknown++; 
          }
          if (listData[i]._source.user_gender === "Female") { 
            perempuan++;
          }
          if (listData[i]._source.user_gender === "Male") { 
            laki++;
          }
      } 
    
        // array.push(laki, undefined, perempuan);
        return (
          <PieGender
            laki={laki}
            perempuan={perempuan}
            unknown={unknown}
          />
        );
      }
    
      const renderWord = () => {
        let array = [];
        let arrayText = [];
        let arrayValue = []; 
        let dataGabunganTextValue = [];
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
            for(var i=0; i < valueWord; i++){
              let objTop10 = {};
              objTop10['text'] = ab[i].text;
              objTop10['value'] = ab[i].value;
              result.push(objTop10)
            }
          }
    

          return ( 
            
              <WordCloudTwitter
                  data={result}
                  onChange={value => setValueWord(value)}
              />
              
          )
      };

      // const setWordCloud = () =>{
      //   let value=[]
      //   if (value==="10") {
      //     setValueWord=10
      //   } else if (value === "15") {
      //     setValueWord=15
      //   } else if (value === "5") {
      //     setValueWord=5
      //   }
      // }
    
     
    
      const renderDataTableNetral = () => {
        return listTable.map((value,index) => {
          return(
            <>
            {
              value._source.insight.sentiment === "Neutral" ?
              <TableNetral 
                  key={index}
                  username={value._source.user_screenname}
                  tweet={value._source.body}
                  location={value._source.fixed_location}
                  retweet={value._source.total_attraction}
              />
              :
              null
            }
            </>
          )
        })
      }
    
      const renderDataTablePositif = () => {
        return listTable.map((value,index) => {
          return(
            <>
            {
              value._source.insight.sentiment === "positive" ?
              <TablePositif 
                  key={index}
                  username={value._source.user_screenname}
                  tweet={value._source.body}
                  location={value._source.fixed_location}
                  retweet={value._source.total_attraction}
              />
              :
              null
            }
            </>
          )
        })
      }
    
      const renderDataTableNegatif = () => {
        return listTable.map((value,index) => {
          return(
            <>
            {
              value._source.insight.sentiment === "negative" ?
              <TableNegatif 
                  key={index}
                  username={value._source.user_screenname}
                  tweet={value._source.body}
                  location={value._source.fixed_location}
                  retweet={value._source.total_attraction}
              />
              :
              null
            }
            </>
          )
        })
      }

      // const clickChangedaerah = (e)
    
     
    
      const handleChange = (e) => {
          setValueIssue(e.target.value);
          getSourceOfIndex(e.target.value, valueFropdownDaerah);
          getTableDesc(e.target.value, valueFropdownDaerah);
    
      }
    
      const handleChangeDaerah = (e) => {
        setValueDropdownDaerah(e.target.value);
        getSourceOfIndex(valueIssue, e.target.value);
        getTableDesc(valueIssue, e.target.value);
        getLocationOfMap( e.target.value);
        getDataSummary(e.target.value);
    
    }

    const handleChangeDaerahmap = (e) => {
      setValueDropdownDaerah(e);
      getSourceOfIndex(valueIssue, e);
      getTableDesc(valueIssue, e);
      getLocationOfMap(e);
      getDataSummary(e);
  
  }
    
    
      if(valueFropdownMedia === "news") history.push('/news')


    return(
        <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" title={<img src={kemkes}/>}>
          <Toolbar className={classes.toolbar}>
              <img src={kemkes} alt="logo"  className={classes.logo}/>
              <h2 style={{ color : 'black', marginLeft : '50px'}}><strong>Dashboard Analisis</strong><br/>
              {valueFropdownTopik !== "" ? valueFropdownTopik : "Semua Topik"}         
              </h2>
          </Toolbar>
        </AppBar>

        
  
        <Grid container style={{ marginTop : 120, paddingLeft : 48, paddingRight : 48}} spacing={5}>
            <Grid item sm={2}>
              <Form.Select value={valueFropdownMedia} onChange={(e)=> setValueDropdownMedia(e.target.value)} size="md">
                  <option>Twitter</option>
                  <option value="news">News</option>
              </Form.Select>
            </Grid>
            <Grid item sm={2}>
              <Form.Select  size="md" onChange={handleChange}>
                  <option value="">Semua Topik</option>
                  <option value="data covid">Data Covid</option>
                  <option value="ppkm_kemendagri">PPKM</option>
                  <option value="protokol kesehatan">Protokol Kesehatan</option>
                  <option value="test covid">Test Covid</option>
                  <option value="vaksin">Vaksin</option>
              </Form.Select>
            </Grid>
            <Grid item sm={2}>
              <Form.Select size="md" onChange={handleChangeDaerah}>
                  <option value="">Indonesia</option>
                  <option value="ID-AC">Aceh</option>
                  <option value="ID-SU">Sumatera Utara</option>
                  <option value="ID-SB">Sumatera Barat</option>
                  <option value="ID-SS">Sumatera Selatan</option>
                  <option value="ID-RI">Riau</option>
                  <option value="ID-JA">Jambi</option>
                  <option value="ID-BB">Bangka Belitung</option>
                  <option value="ID-BE">Bengkulu</option>
                  <option value="ID-LA">Lampung</option>
                  <option value="ID-JK">Jakarta</option>
                  <option value="ID-BT">Banten</option>
                  <option value="ID-JB">Jawa Barat</option>
                  <option value="ID-JT">Jawa Tengah</option>
                  <option value="ID-YO">Yogyakarta</option>
                  <option value="ID-JI">Jawa Timur</option>
                  <option value="ID-BA">Bali</option>
                  <option value="ID-NB">Nusa Tenggara Barat</option>
                  <option value="ID-NT">Nusa Tenggara Timur</option>
                  <option value="ID-KB">Kalimantan Barat</option>
                  <option value="ID-KT">Kalimantan Tengah</option>
                  <option value="ID-KS">Kalimantan Selatan</option>
                  <option value="ID-KI">Kalimantan Timur</option>
                  <option value="ID-KU">Kalimantan Utara</option>
                  <option value="ID-GO">Gorontalo</option>
                  <option value="ID-ST">Sulawesi Tengah</option>
                  <option value="ID-SR">Sulawesi Barat</option>
                  <option value="ID-SN">Sulawesi Selatan</option>
                  <option value="ID-SG">Sulawesi Tenggara</option>
                  <option value="ID-MA">Maluku</option>
                  <option value="ID-MU">Maluku Utara</option>
                  <option value="ID-PB">Papua Barat</option>
                  <option value="ID-PA">Papua</option>
              </Form.Select>              
            </Grid>
            <Grid item sm={3}>
              {
                 valueFropdownTopik !== "" ?
                  <Form.Control type="text" placeholder={"Keyword : " + keyWord} readOnly />
                 :
                  <Form.Control type="text" placeholder="Keyword : All" readOnly />
              }
            </Grid>
            <Grid item sm={3} justifyContent="center">
              <Form.Control type="text" placeholder={lastDate !== "" ? getDateFormat(lastDate) : null} readOnly />
              {/* `<i class="far fa-calendar-alt"/>` + */}
            </Grid>
        </Grid>

        {/* Line 1  */}

        <Grid container justify="center" style={{ marginTop : 20, paddingLeft : 48, paddingRight : 48}}  spacing={3}>
          <Grid item xs={12} sm={6}>
              <Card className={classes.rootCard}>
                <span style={{ marginLeft : '10px', fontWeight : 'bold', fontSize : '16px', margin : 20}}>Tweet Activity</span>
                <div style={{height:'290px', paddingBottom : 5,  marginTop : '10px'}}>
                  <svg width="100%" height="100%">
                    <g className="geojson-layer">
                      {renderMap()}
                    </g>
                  </svg>
                </div>
                <Row>
                  <Col xs={2} style={{ marginLeft : '15px'}}>
                    <i className="fas fa-square" style={{color : '#075050', margin : '4px'}}/><span >Ramai : 	&gt; 100</span>    
                  </Col>                 
                  <Col xs={3}>
                    <i className="fas fa-square" style={{color : '#107e78', margin : '4px'}}/><span>Cukup Ramai : &lt; 70</span>    
                  </Col>
                  <Col xs={2}>
                    <i className="fas fa-square" style={{color : '#1CB3AB', margin : '4px'}}/><span>Sepi : &lt; 30</span>    
                  </Col>
                  <Col xs={3}>
                    <i className="fas fa-square" style={{color : '#C2C2C2', margin : '4px'}}/><span>Undefined : {valueUndefined}</span>                     
                  </Col>
                </Row>
              </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card className={classes.rootCard}>
              {/* <h4  style={{ marginLeft : '40px', marginTop : '20px', fontWeight : 'bold'}}>Sentimen</h4> */}
              {renderPieSentimen()}
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card className={classes.rootCard}>
              {/* <h4   style={{ marginLeft : '40px', marginTop : '20px', fontWeight : 'bold'}}>Gender</h4> */}
              {renderGenderSentimen()}
            </Card>
          </Grid>
        </Grid>

        {/* Line 2 */}

        {
              valueFropdownTopik === '' ?
          
              <Grid container justify="center" spacing={3} style={{ marginTop : 50,   paddingLeft : 48, paddingRight : 48}}>
                <Grid item sm={4}>
                  <Card className={classes.rootCard}>
                  {
                        <LineTwitter
                          date={tanggal}
                          negatif={negatifArr}
                          positif={positifArr}
                          netral={netralArr}
                      />
                      }
                  </Card>
                </Grid>
                <Grid item sm={5}>
                  <Card className={classes.rootCard} style={{ height :  365}}>
                    {renderWord()}
                  </Card>
                </Grid>
                <Grid item sm={3}>
                  <Card className={classes.rootCard} style={{ height :  365}}>
                    {
                      <BarSummary
                        negatif={negatifSummary}
                        positif={positifSummary}
                        netral={netralSummary}
                      />
                    }
                  </Card>
                </Grid>
              </Grid>

              :

              <Grid container justify="center" spacing={3} style={{ marginTop : 50,   paddingLeft : 48, paddingRight : 48}}>
                <Grid item sm={5}>
                  <Card className={classes.rootCard}>
                  {
                        <LineTwitter
                          date={tanggal}
                          negatif={negatifArr}
                          positif={positifArr}
                          netral={netralArr}
                      />
                      }
                  </Card>
                </Grid>
                <Grid item sm={7}>
                  <Card className={classes.rootCard} style={{ height :  365}}>
                    {renderWord()}
                  </Card>
                </Grid>
              </Grid>
        
        }
  

         {/* Line 3  */}
  
         <Grid container justify="center" spacing={5} style={{ marginTop : 50,   paddingLeft : 48, paddingRight : 48}}>
          <Grid item md={4} style={{justifyContent : 'space-between', alignContent : 'space-around'}} >
            <Card className={classes.rootPositif}>
              <p style={{ marginLeft : 15, marginTop : 10, fontSize : 16, fontWeight : 'bold'}}> Sentimen Positif</p>
                <Paper className={classes.paperTable}>
                  <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="customized table">
                        <TableHeader/>
                        {renderDataTablePositif()}
                    </Table>
                  </TableContainer>
                </Paper>
            </Card>
          </Grid>
      
          <Grid item md={4} style={{justifyContent : 'space-between', alignContent : 'space-around'}}>
            <Card className={classes.rootNetral}>
              <p style={{ marginLeft : 15, marginTop : 10, fontSize : 16, fontWeight : 'bold'}}> Sentimen Netral</p>
                <Paper className={classes.paperTable}>
                  <TableContainer component={Paper}>
                    <Table sx={{  width: '100%' }} aria-label="customized table">
                        <TableHeader/>
                        {renderDataTableNetral()}
                    </Table>
                  </TableContainer>
                </Paper>
            </Card>
          </Grid>

          <Grid item md={4} style={{justifyContent : 'space-between', alignContent : 'space-around'}} >
            <Card className={classes.rootNegatif}>
              <p style={{ marginLeft : 15, marginTop : 10, fontSize : 16, fontWeight : 'bold'}}> Sentimen Negatif</p>
                <Paper className={classes.paperTable}>
                  <TableContainer component={Paper}>
                    <Table sx={{  width: '100%' }} aria-label="customized table">
                        <TableHeader/>
                        {renderDataTableNegatif()}
                    </Table>
                  </TableContainer>
                </Paper>
            </Card>
          </Grid>
        </Grid>
      
          
      </React.Fragment>
    )
}