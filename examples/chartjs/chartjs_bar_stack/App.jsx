import React from 'react';
import Chart from 'chart.js';

class App extends React.Component {
  render() {
    var ctx = document.createElement('canvas');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          type: 'line',
          label: 'Dataset 2',
          data: [-65, -10, -80, -81, -56, -85, 40],
          borderColor: 'black',
          fill: false
        }, {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: "red",
          data: [65, 0, 80, 81, 56, 85, 40],
        }, {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: "blue",
          data: [-65, 0, -80, -81, -56, -85, -40]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    }); 
    return (
      <div>
        <div ref={(nodeElement) => {nodeElement.appendChild(ctx)}}/>
      </div>
    );
  }
}

export default App;