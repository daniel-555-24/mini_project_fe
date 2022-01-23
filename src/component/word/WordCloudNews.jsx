import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { Grid } from "@material-ui/core";
import BarWordCloudNews from '../bar/BarWordCloudNews';


const fill =  ['#075050', '#107E78', '#148E87', '#1CB3AB'];
  
const schemeCategory10ScaleOrdinal = scaleOrdinal(fill);


export default function WordCloudCompNews(props) {

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
            <BarWordCloudNews text={textArr} value={valArr}/>
        )
    }

    return (
        <div >
            {/* {console.log(props.data)} */}
            <Grid container justifyContent="left">
                    <Grid item sm={7} style={{ marginTop : 10}}>
                        <Grid style={{ fontWeight : 'bold', marginLeft : 20, marginTop : 5, fontSize : 16}}>
                            <span> Word Cloud </span>
                        </Grid>
                        <Grid style={{ marginTop : 40}}>
                            <WordCloud 
                                data={props.data}
                                width={200}
                                height={80}  
                                font="Poppins"
                                // fontStyle="italic"
                                fontWeight="bold"
                                fontSize={(word) => Math.log2(word.value) * 1.3}
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