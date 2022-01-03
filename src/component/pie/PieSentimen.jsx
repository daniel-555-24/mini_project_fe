import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';



export default function PieSentimen(props) {

    // const [series, setSeries] = React.useState([]);
    const [options, setOptions] = React.useState({
        chart: {
          width: 380,
          type: 'pie',
          stacked: true,
          zoom: {
            enabled: false
          },
        //   toolbar: {
        //     show: false,
        // },
        },
        dataLabels: {
          // enabled: true,
          style: {
              colors: ['black']
          },
          // offsetX: 30
        },
        title: {
          text: 'Sentimen',
          margin : 20,
          align: 'left',
          style: {
            fontSize:  '16px',
            fontWeight:  'bold',
          },
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#D2DC2E', '#E0E0E0','#BE0712' ]
          }, 
          position: 'bottom',
        },
        tooltip: {
          fillSeriesColor: false,
          theme: 'dark',
          marker: {
            show: false,
          },
        },
        // stroke: {
        //   colors: ['#666']
        // },
        fill: {
          colors: ['#D2DC2E', '#E0E0E0','#BE0712' ]
        },
        labels: ['Positif', 'Netral', 'Negatif'],
      });

    return(
      <>
        {/* {console.log(props)} */}
        <Chart 
            component={Paper} 
            options={options} 
            series={[props.positif, props.netral, props.negatif]} 
            // series={[25, 50, 25]} 
            type="pie" 
            width={500} 
            height={375}
            />
      </>
    )
}