import React from 'react';
import { Table } from 'react-bootstrap';
import Chip from "@material-ui/core/Chip";
import './tablenews.css';
import duniatempo from '../../images/duniatempo.png';
import indonews from '../../images/indonews.png';
import jpn from '../../images/jpn.jpg';
import kumparan from '../../images/kumparan.png';
import liputan from '../../images/Liputan6.png';
import viva from '../../images/viva.png';
import merdeka from '../../images/merdeka.jpg';
import tribun from '../../images/tribunnews.jpg';
import okezone from '../../images/okezone.jpg';
import kontan from '../../images/kontan.png';
import idntimes from '../../images/idntimes.jpg';
import republika from '../../images/republika.jpg';
import detik from '../../images/detik.png';
import tirto from '../../images/tirto.png';
import axios from 'axios';
import { url_news } from '../../helper/ServiceUrlAPI';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Col, Container, Form, Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    paperTableNews: {
      height: 250,
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflow: 'auto'
    }
  }));

export default function TableNews(props){

    const classes = useStyles();
    const [listData, setListData] = React.useState([]);


    React.useEffect(()=> {
        getDataOfNews();
    }, [])

     function getDataOfNews () {
         axios.get(url_news + '/get-data-news')
        .then((res) => {
        setListData(res.data.value);
        })
        .catch(err => console.log(err));
    };

    function getDateFormat(value){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    
        let g = new Date(value)
    
        let day = g.getDate();
        let month = monthNames[g.getMonth()];
        let year = g.getFullYear()

        let result = day + ' ' +  month + ' ' + year;
        
        return result;
}


  const renderElementImageNews = () => {

     return listData.map((value) =>{

            return (
                <tr>
                <td>
                    {value._source.postingdate.slice(0,10)}
                </td>
                <td>
                    {
                        value._source.source === 'dunia.tempo.co' ||  value._source.source === 'nasional.tempo.co'  ||  value._source.source === 'tekno.tempo.co' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={duniatempo}/>
                        : value._source.source === 'www.jpnn.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={jpn}/>
                        : value._source.source === 'www.viva.co.id' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={viva}/>
                        : value._source.source === 'www.liputan6.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={liputan}/>
                        : value._source.source === 'kumparan.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={kumparan}/>
                        : value._source.source === 'international.sindonews.com' || value._source.source === 'lifestyle.sindonews.com' 
                        || value._source.source === 'nasional.sindonews.com' || value._source.source === 'daerah.sindonews.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={indonews}/>
                        : value._source.source === 'www.tribunnews.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={tribun}/>
                        : value._source.source === 'www.merdeka.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={merdeka}/>
                        : value._source.source === 'okezone.com' || value._source.source === 'nasional.okezone.com' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={okezone}/>
                        : value._source.source === 'kontan.co.id' || value._source.source === 'newssetup.kontan.co.id' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={kontan}/>
                        : value._source.source === 'www.idntimes.com'  || value._source.source === 'lampung.idntimes.com'?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={idntimes}/>
                        : value._source.source === 'www.republika.co.id' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={republika}/>
                        : value._source.source === 'www.detik.com' || value._source.source === 'health.detik.com'?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={detik}/>
                        : value._source.source === 'tirto.id' ?
                            <img style={{ width : '100px', justifyItems : 'center'}} src={tirto}/>
                        :    null 
                    }
                    
                </td>
                <td onClick={()=> window.open(value._source.url, '_blank').focus()}>{value._source.title}</td>
                <td>
                    {
                        value._source.insight.sentiment === 'positive' ? 
                            <Chip
                                style={{
                                borderColor: "#D2DC2E",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 11,
                                borderRadius: 20,
                                backgroundColor : '#D2DC2E'
                                }}
                                variant="outlined"
                                color="primary"
                                label="Positif"
                            /> 
                        : value._source.insight.sentiment === 'Neutral' ||  value._source.insight.sentiment === 'Ambivalent' ? 
                            <Chip
                                style={{
                                borderColor: "#E0E0E0",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 11,
                                borderRadius: 20,
                                backgroundColor : '#E0E0E0'
                                }}
                                variant="outlined"
                                color="primary"
                                label="Netral"
                            /> 
                        : value._source.insight.sentiment === 'negative' ? 
                            <Chip
                                style={{
                                borderColor: "#BE0712",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 11,
                                borderRadius: 20,
                                backgroundColor : '#BE0712'
                                }}
                                variant="outlined"
                                color="primary"
                                label="Negatif"
                            /> 
                        : null
                    }
                </td>
                </tr>           
            )
    })
  }

  function percentage(partialValue, totalValue) {
    const result = Math.round((partialValue / totalValue) * 100)
    return result;
 } ;

  const renderSentimen = () => {

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

    let total = arrayPositif + arrayNegatif + arrayNetral;
     
    return(
        <Row xs="auto">
            <Col>
                <Row xs="auto">
                    <Col>
                        <i className="fas fa-plus-square fa-4x" style={{ color : '#D2DC2E'}}/>
                    </Col>
                    <Col>
                        <span style={{   fontSize : 45, fontWeight : 'bold'}}>{arrayPositif !== 0 ? percentage(arrayPositif, total) :  null}%</span>
                    </Col>
                    <Col>
                        <Row xs="auto">
                            <span style={{ verticalAlign : 'top', fontSize : 15, color : '#9E9E9E', fontWeight : 'bold'}}>Positive</span>
                        </Row>
                    <Row xs="auto">
                        <span style={{ fontSize : 25, fontWeight : 'bold'}}>{arrayPositif}</span>
                    </Row>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row xs="auto">
                    <Col>
                        <i class="fas fa-dot-circle fa-4x" style={{ color : '#E0E0E0'}}/>
                    </Col>
                    <Col>
                        <span style={{ fontSize : 45, fontWeight : 'bold'}}>{arrayNetral !== 0 ? percentage(arrayNetral, total) : null}%</span>
                    </Col>
                    <Col>
                        <Row xs="auto">
                            <span style={{verticalAlign : 'top', fontSize : 15, color : '#9E9E9E', fontWeight : 'bold'}}>Netral</span>
                        </Row>
                        <Row xs="auto">
                            <span style={{   fontSize : 25, fontWeight : 'bold'}}>{arrayNetral}</span>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row xs="auto">
                    <Col>
                        <i class="fas fa-minus-square fa-4x" style={{ color : '#BE0712'}}/>
                    </Col>
                    <Col>
                        <span style={{   fontSize : 45, fontWeight : 'bold'}}>{arrayNegatif !== 0 ? percentage(arrayNegatif, total) : null}%</span>
                    </Col>
                    <Col>
                        <Row xs="auto">
                            <span style={{ verticalAlign : 'top', fontSize : 15, color : '#9E9E9E', fontWeight : 'bold'}}>Negatif</span>
                        </Row>
                        <Row xs="auto">
                            <span style={{   fontSize : 25, fontWeight : 'bold'}}>{arrayNegatif}</span>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

  }


    return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <Paper className={classes.paperTableNews}>
                    <Table size="md" bordered hover style={{ width : '100%', marginTop : 20}}>
                        <thead>
                            <tr>
                            <th  style={{ width : '200px', backgroundColor : '#F4F6C4', textAlign : 'center'}}>Tanggal</th>
                            <th  style={{ width : '200px', backgroundColor : '#F4F6C4', textAlign : 'center'}}>Portal Berita</th>
                            <th  style={{ width : '1000px', backgroundColor : '#F4F6C4', textAlign : 'center'}}>Headline</th>
                            <th  style={{ width : '200px', backgroundColor : '#F4F6C4', textAlign : 'center'}}>Sentiment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderElementImageNews()}
                        </tbody>
                    </Table>
                </Paper>
            </div>
            <Container style={{ marginRight : 400, marginTop : 20, paddingBottom : 20}}>
                <h5>Sentimen</h5>
                {renderSentimen()}
            </Container> 
        </>
    )
}