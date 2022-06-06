import React from 'react';
import Chart from 'chart.js';

class App extends React.Component {
  render() {
    var ctx = document.createElement('canvas');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        
        // The order of dataset matters
        datasets: [{
          type: 'line',
          label: 'Closing',
          data: [65, 0, 40, 70, 16, 55, 40],
          fill: false,
          lineTension: 0,
          borderColor: 'black',
          pointBackgroundColor: 'black'
        }, {
          type: 'line',
          label: 'Max',
          data: [100, 30, 83, 121, 66, 105, 80],
          backgroundColor: 'salmon',
          fill: '-1',
          lineTension: 0,  //straight line
          borderColor: 'red',
          pointBackgroundColor: 'red'
        }, {
          type: 'line',
          label: 'Min',
          backgroundColor: "lightblue",
          data: [-65, -20, -80, -21, -56, -85, -40],
          fill: '-1',
          lineTension: 0,
          borderColor: 'blue',
          pointBackgroundColor: 'blue'
        }]
      },
      options: {
        'onClick': function (evt, item) {
            console.log ('event is: ', evt);
            console.log('item is: ', item);
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