// function gets called upon page load

function load_chart() {

  // The timestamp of the current time
  var timestampNow = new Date().getTime();
  // The timestamp one hour from now
  var timestampOneDayLater = new Date(timestampNow + (3600 * 1000 * 24 )).getTime();

  // A point click event that uses the Renderer to draw a label next to the point
  // On subsequent clicks, move the existing label instead of creating a new one.
/*  Highcharts.addEvent(Highcharts.Point, 'click', function () {
    if (this.series.options.className.indexOf('popup-on-click') !== -1) {
      const chart = this.series.chart;
      //const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
      //const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

      const anchorX = this.plotX + this.series.xAxis.pos;
      const anchorY = this.plotY + this.series.yAxis.pos;
      const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
      const x = align === 'left' ? anchorX + 10 : anchorX - 10;
      const y = anchorY - 30;
      if (!chart.sticky) {
        chart.sticky = chart.renderer
          .label(text, x, y, 'callout',  anchorX, anchorY)
          .attr({
            align,
            fill: 'rgba(0, 0, 0, 0.75)',
            padding: 10,
            zIndex: 7 // Above series, below tooltip
          })
          .css({
            color: 'white'
          })
          .on('click', function () {
            chart.sticky = chart.sticky.destroy();
          })
          .add();
      } else {
        chart.sticky
          .attr({ align, text })
          .animate({ anchorX, anchorY, x, y }, { duration: 250 });
      }
    }
  });*/


  // Bar chart example
  /*  const chart = Highcharts.chart('container', {

      chart: {
        scrollablePlotArea: {
          minWidth: 700
        }
      },

      chart: {
                  type: 'bar'
      },

      title: {
        text: 'Daily sessions at www.highcharts.com'
      },

      subtitle: {
        text: 'Source: Google Analytics'
      },

      xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
          align: 'left',
          x: 3,
          y: -3
        }
      },

      yAxis: [{ // left y axis
        title: {
          text: null
        },
        labels: {
          align: 'left',
          x: 3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
          text: null
        },
        labels: {
          align: 'right',
          x: -3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }],

      series: [{
                  name: 'Jane',
                  data: [1, 0, 4]
              }, {
                  name: 'John',
                  data: [5, 7, 3]
              }],

      legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
      },

      tooltip: {
        shared: true,
        crosshairs: true
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
          className: 'popup-on-click',
          marker: {
            lineWidth: 1
          }
        }
      },

      series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
          radius: 4
        }
      }, {
        name: 'New users'
      }]
    });
  */
  /*  const chart = Highcharts.chart('container', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Fruit Consumption'
              },
              xAxis: {
                  categories: ['Apples', 'Bananas', 'Oranges']
              },
              yAxis: {
                  title: {
                      text: 'Fruit eaten'
                  }
              },
              series: [{
                  name: 'Jane',
                  data: [1, 0, 4]
              }, {
                  name: 'John',
                  data: [5, 7, 3]
              }]
          });

  */


  // Line chart example
  /*Highcharts.chart('container', {

    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  });*/


  // Multi-Line Line chart example

  // Draw the chart
  Highcharts.chart('container', {
    // Set the title
    title: {
      text: 'Example Line Chart'
    },
    // Set the subtitle
    subtitle: {
      text: 'Source: spinningmixer.com'
    },
    // Set up the y axis
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    // Set up the x axis
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%b/%e/%Y', this.value);
        }
      },
      format: '{value:%d.%m.%Y %A} 00:00',
      tickInterval: 24 * 3600 * 1000,
      startOnTick: true,
      endOnTick: true
    },
    // Set up the legend
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    // Define plot options
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: timestampNow
      }
    },
    // Load the data
    series: 
    [
      {
        name: "Data 1",
        data: 
          [
            [timestampNow, 1],
            [timestampOneDayLater, 2]
          ]
      },
      {
        name: "Data 2",
        data: 
          [
            [timestampNow, 3],
            [timestampOneDayLater, 4]
          ]
      }
    ],
    // Boilerplate HigherChart template stuff
/*    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }*/
  });
  // end line chart example

}
