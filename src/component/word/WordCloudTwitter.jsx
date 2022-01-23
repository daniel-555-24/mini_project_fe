import React from 'react';
import WordCloud from 'react-d3-cloud';
import {Form} from 'react-bootstrap';
import { scaleOrdinal } from 'd3-scale';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import BarWordCloud from '../bar/BarWordCloudTwitter';


const fill =  ['#075050', '#107E78', '#148E87', '#1CB3AB'];
  
const schemeCategory10ScaleOrdinal = scaleOrdinal(fill);
const useStyles = makeStyles((theme) => ({
    seleColor:{
      backgroundColor:"#24204E",
      color:"white",
      border: "1px solid #312F62",
      borderRadius:"5px",
    }
  }));

export default function WordCloudTwitter(props) {

    const classes = useStyles();
    const renderForBarWordCloud = () => {
        
        let textArr = [];
        let valArr = [];

        if(props.data.length > 0){
            let ab = props.data.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
         
            for(var i=0; i < 5; i++){
                textArr.push(ab[i].text)
                valArr.push(ab[i].value)
            }

        }

        return(
            <BarWordCloud text={textArr} value={valArr}/>
        )
    }

    return (
        <div >
            <Grid container justifyContent="left">
                    <Grid item sm={7} style={{ marginTop : 10}}>
                        <Grid style={{ fontWeight : 'bold', marginLeft : 20, marginTop : 5, fontSize : 16}}>
                            <span> Word Cloud </span>
                            <br/>
                            <br/>
                            <Form.Select className={classes.seleColor} size="md" onChange={e => props.onChange(e.target.value)}>
                            <option value="5">Key Word : 5</option>
                            <option value="7">Key Word : 7</option>
                            <option value="20">Key Word : 20</option>
                        </Form.Select>
                        </Grid>
                        <Grid style={{ marginTop : 40}}>
                            <WordCloud 
                                data={props.data}
                                width={200}
                                height={80}  
                                font="Poppins"
                                fontWeight="bold"
                                fontSize={(word) => Math.log2(word.value) * 1.8}
                                spiral="archimedean"
                                rotate={0}
                                padding={2}
                                fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
                                // random={0}
                                // onWordClick={(word) => {
                                // console.log(`onWordClick: ${word}`);
                                // }}
                                // onWordMouseOver={(word) => {
                                // console.log(`onWordMouseOver: ${word}`);
                                // }}
                                // onWordMouseOut={(word) => {
                                // console.log(`onWordMouseOut: ${word}`);
                                // }}
                                />
                        </Grid>
                    </Grid>
                    <Grid  item sm={5} style={{ marginTop : 10}}>
                        {renderForBarWordCloud()}
                    </Grid>
                </Grid>
        </div>
    )
}