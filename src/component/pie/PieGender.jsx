import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';



export default function PieGender(props) {

    // const [series, setSeries] = React.useState([65, 25, 10]);
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
                colors: ['#333']
            },
            // offsetX: 30
          },
          legend: {
            show: true,
            markers: {
              fillColors: ['#005A8D', '#FF96AD','#E0E0E0' ]
            },
            position: 'bottom',
          },
          title: {
            text: 'Jenis Kelamin',
            margin : 20,
            align: 'left',
            style: {
              fontSize:  '16px',
              fontWeight:  'bold',
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
            colors: ['#005A8D', '#FF96AD','#E0E0E0' ]
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
            type="pie" 
            width={500} 
            height={375} 
            />
    )
}