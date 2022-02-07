// import React from 'react';
// import Chart from 'react-apexcharts'


// class LineTwitter extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {};

//   }
          
//   getMonthName(){
//     const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//     ];

//     const d = new Date();

//     let month = monthNames[d.getMonth()];

//     return month;
//   }

//   render() {
//     return (
      
//       <Chart 
//         options={{
//           chart: {
//             height: 340,
//             type: 'line',
//             zoom: {
//               enabled: false
//             },
//             toolbar: {
//               show: false,
//           },
//           },
//           colors: ['#D2DC2E', '#E0E0E0','#BE0712'],
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             // width: [5, 7, 5],
//             // curve: 'smooth',
//             // dashArray: [0, 8, 5],
//             show: true,
//             curve: 'smooth',
//             lineCap: 'butt',
//             width: 4,
//             dashArray: 0,  
//           },
//           title: {
//             text: 'Twitter Overtime',
//             align: 'left',
//             margin : 20,
//             style: {
//               fontSize:  '16px',
//               fontWeight:  'bold',
//             },
//           },
//           // legend: {
//           //   tooltipHoverFormatter: function(val, opts) {
//           //     return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
//           //   }
//           // },
//           markers: {
//             size: 0,
//             hover: {
//               sizeOffset: 6
//             }
//           },
//           xaxis: {
//             categories:
//             // day / tanggal
//             //  [1, 2, 3, 4,5, 6 , 7], 
//             this.props.date,
//             tooltip: {
//               enabled: false
//             },
//             title: {
//               text: this.getMonthName()
//             },
//           },
//           yaxis: {
//             // title: {
//             //   text: 'Tweet'
//             // },
//             // min: 5,
//             // max: 40,
//             tooltip: {
//               enabled: false
//             }
//           },
//           legend: {
//             show: false,
//             onItemClick: {
//               toggleDataSeries: false,
//             },
//             onItemHover: {
//               highlightDataSeries: false,
//             },
//           },
//           // tooltip: {
//           //   enabled: false,
//           //   enabledOnSeries: undefined,
//           //   marker: {
//           //     show: false,
//           //   }
//           // },
//           grid: {
//             show: false,   
//             // borderColor: '#f1f1f1',
//             // row: {
//             //   colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//             //   opacity: 0.5,
//             // },
//           }
//         }} 
//         series={[
//            //positif
//            {
//              name : 'Positif',
//             data: 
//             this.props.positif,
//             // [45, 52, 38, 24, 33, 26, 21]
//           },
//           //netral
//           {
//             name : 'Netral',
//             data:
//              this.props.netral
//             // [35, 41, 62, 42, 13, 18, 29]
//           },
//           //negatif
//           {
//             name : 'Negatif',
//             data: 
//             this.props.negatif
//             // [87, 57, 74, 99, 75, 38, 62]
//           }
//         ]} 
//         type="line" 
//         height={340}
//         />
        
//     );
//   }
// }

// export default LineTwitter;



import React from 'react';
import Chart from 'react-apexcharts'


class LineTwitter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series:[{
         name : 'Positif',
         color: '#86FB43',
         data: this.props.positif,
       },
       {
         name : 'Netral',
         color: '#BBC3C8',
         data: this.props.netral

       },
       {
         name : 'Negatif',
         color: '#E9345E',
         data: this.props.negatif
    }], 
      options: {
        style: {
          fontSize:"20px"
        },
        chart: {
          height: 350,
          type: 'area',
        },
        title: {
          text: 'Twitter Overtime',
          align: 'left',
          margin : 20,
          style: {
            fontSize:  '20px',
            fontWeight:  'bold',
            color:'#B1AFCD',
            fontFamily: 'Poppins'
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories:
          this.props.date,
          tooltip: {
            enabled: false
          },
          labels: {
            style: {
                fontSize: '20px',
                colors:'#B1AFCD'
            }
       },
        },
        yaxis: {
          labels: {
            style: {
                fontSize: '20px',
                colors:'#B1AFCD'
            }
       }
      },
      legend: {
        show: true,
        position: "top",
        show: true,
        fontSize: '20px',
        fontFamily: 'Poppins',
        customLegendItems: [],
        offsetX: 70,
        offsetY: -60,
        labels: {
            style:{
              margin:"10px"
            },
            colors: "white"
      },
      },
    }
    
    
    };
  }
          
  getMonthName(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();

    let month = monthNames[d.getMonth()];

    return month;
  }

  render() {
    return (
        <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="area" height={360}
        />
        </div>
      );
     }
}

export default LineTwitter;
