import React from 'react';
import Button from '@mui/material/Button';
import './punk';

class Welcome extends React.Component {
  handleClick(e) {
    drawAPunk();
  };
    
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <hr />
        <canvas id='punkx20'></canvas>
        <Button variant="outlined" onClick={this.handleClick}>
          handler onclick
        </Button>
      </div>
    );
  }
}

export default Welcome;



