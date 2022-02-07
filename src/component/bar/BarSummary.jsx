import { color } from "@mui/system";
import React from "react";
import ReactApexChart from "react-apexcharts";

class BarSummary extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
        //   name: 'Marine Sprite',
          //positif
          data: [44, 55, 41, 37]
        }, {
        //   name: 'Striking Calf',
        //netral
          data: [53, 32, 33, 52]
        }, {
        //   name: 'Tank Picture',
        //negatif
          data: [12, 17, 11, 9]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            zoom: {
                enabled: false
              },
              toolbar: {
                show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 20
            },
          },
          colors: ['#AAFD45', '#B2BBC1','#EB3758'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 0,
            colors: ['#fff']
          },
          xaxis: {
            categories:['Data Covid', 'PPKM', 'Protokol Kesehatan', 'Test Covid', 'Vaksin'],
            labels:{
              style:{
                fontSize:'18px',
                fontFamily:'Poppins',
                colors:['white'],
              },
              offsetX: 0,
              offsetY: 8,
            },
            tooltip: {
                enabled: false
              },
          },
          title: {
            text: 'Summary',
            align: 'left',
            margin : 20,
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              fontFamily: 'Poppins',
              color:'#B1AFCD',
            },
          },
          yaxis: {
            labels:{
              style:{
                fontSize:'18px',
                fontFamily:'Poppins',
                colors:['white'],
              },
              offsetX: -10,
              offsetY: 0,
            },
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            // title: {
            //   text: undefined
            // },
          },
          legend: {
            show: false,
            markers: {
              fillColors: ['#D2DC2E', '#E0E0E0','#BE0712' ]
            }, 
            position: 'bottom',
          },
          // tooltip: {
          //   enabled: false
          // },
          grid: {
            show: false,
          },
          fill: {
            opacity: 1
          },
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
    <ReactApexChart 
            options={this.state.options} 
            series={[{
                  name: 'Positif',
                  //positif
                //   data: [44, 55, 41, 37]
                  data : this.props.positif
                }, {
                  name: 'Netral',
                //netral
                //   data: [53, 32, 33, 52]
                    data : this.props.netral
                }, {
                  name: 'Negatif',
                //negatif
                //   data: [12, 17, 11, 9]
                    data : this.props.negatif
                }]} 
            type="bar" height={350} />
</div>
      )}}

export default BarSummary;