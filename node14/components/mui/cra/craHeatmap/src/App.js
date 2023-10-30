import React from 'react';
import Button from '@mui/material/Button';
import MyHeatmap from './Heatmap'

class Welcome extends React.Component {
  handleClick(e) {
    alert("Hello mui");
  };
    
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <MyHeatmap></MyHeatmap>
      </div>
    );
  }
}

export default Welcome;



