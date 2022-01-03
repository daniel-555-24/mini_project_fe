import React from 'react';
import Chart from 'react-apexcharts'

class BarWordCloudNews extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {}
      }
      render() {
        return (
                <Chart 
                  series={ [{
                    data: 
                    this.props.value
                    //  [107, 60, 50, 45, 41]
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
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                          position: 'bottom'
                        },
                      }
                    },
                    colors: ['#075050'],
                    // colors: ['#075050', '#107E78', '#148E87', '#1CB3AB', '#C8EDEB'],
                    dataLabels: {
                      enabled: true,
                      textAnchor: 'start',
                      style: {
                        colors: ['#fff']
                      },
                      formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] 
                        // + ":  " + val
                      },
                      offsetX: 0,
                      dropShadow: {
                        enabled: true
                      }
                    },
                    stroke: {
                      width: 1,
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

  export default BarWordCloudNews;