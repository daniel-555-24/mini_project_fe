import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';



export default function PieGender(props) {

    // const [series, setSeries] = React.useState([65, 25, 10]);
    const [options, setOptions] = React.useState({
        chart: {
            width: 380,
            type: 'donut',
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
              colors: ['black','black','black'],
              fontSize : '17px',
              fontFamily:'Poppins'
          },
            // offsetX: 30
          },
          legend: {
            show: false,
            markers: {
              fillColors: ['#3190FF', '#EB47B3','#B1AFCD' ]
            },
            position: 'bottom',
          },
          title: {
            text: 'Jenis Kelamin',
            margin : 20,
            align: 'left',
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              color:'#B1AFCD',
              fontFamily:'Poppins'
            },
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
            colors: ['#3190FF', '#EB47B3','#B1AFCD' ]
          },
          labels: ['Laki', 'Perempuan', 'Undefined'],
          // responsive: [{
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200
          //     },
          //     legend: {
          //       position: 'bottom',
          //       show: true,
          //     }
          //   }
          // }]
      });

    return(
        <Chart 
            component={Paper} 
            options={options} 
            series={[props.laki, props.perempuan, props.unknown]} 
            // series={[25, 50, 25]} 
            type="donut" 
            width={600} 
            height={345} 
            />
    )
}