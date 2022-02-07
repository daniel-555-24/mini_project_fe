import React from 'react';
import Chart from 'react-apexcharts'

class BarWordCloud extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          
          series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany'
              ],
            }
          },
        
        
        };
      }
      render() {
        return (
                <Chart 
                  series={ [{
                    data: this.props.value
                    // data: [44, 55, 41, 70, 80]
                  }]} 

                  options={{
                    chart: {
                      type: 'bar',
                      height: 340,
                      toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                      bar: {
                        // barHeight: '100%',
                        borderRadius: 20,
                        distributed: false,
                        horizontal: true,
                        dataLabels: {
                          position: 'bottom'
                        },
                      }
                    },
                    dataLabels: {
                      enabled: true
                    },
      
                    colors: ['#8DFD44'],
                    // colors: ['#075050', '#107E78', '#148E87', '#1CB3AB', '#C8EDEB'],
                    dataLabels: {
                      enabled: true,
                      enabledOnSeries: undefined,
                      formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] 
                      },
                      textAnchor: 'start',
                      distributed: false,
                      offsetX: 0,
                      offsetY: 0,
                      style: {
                          fontSize: '20px',
                          fontFamily: 'Poppins',
                          fontWeight: 'bold',
                          colors: ['black'],
                      },
                    
                    },
                    stroke: {
                      width: 2,
                      colors: ['#fff']
                    },
                    xaxis: {
                      labels: {
                        show: false
                      },
                      categories:  
                      this.props.text
                      // ['vaksin', 'vaksinasi', 'positif', 'pasien', 'baik'],
                    },
                    yaxis: {
                      labels: {
                        show: false
                      }
                    },
                    legend: {
                      show: false
                    },
                    // title: {
                    //     text: 'Custom DataLabels',
                    //     align: 'center',
                    //     floating: true
                    // },
                    // subtitle: {
                    //     text: 'Category Names as DataLabels inside bars',
                    //     align: 'center',
                    // },
                    tooltip: {
                      theme: 'dark',
                      x: {
                        show: false
                      },
                      y: {
                        title: {
                          formatter: function () {
                            return ''
                          }
                        }
                      },
                      // enabled: false,
                      // enabledOnSeries: undefined,
                      // marker: {
                      //   show: false,
                      // }
                    }
                  }} 
                  type="bar"
                  height={340} 
                  />
        )
      }
  }

  export default BarWordCloud;