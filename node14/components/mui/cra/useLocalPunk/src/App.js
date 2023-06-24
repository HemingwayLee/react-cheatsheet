import React from 'react';
import Button from '@mui/material/Button';

class Welcome extends React.Component {
  handleClick(e) {
    drawAPunk("#punkx20", 3);
  };
    
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <hr />
        <canvas width="0" height="0" id='punkx20'></canvas>
        <Button variant="outlined" onClick={this.handleClick}>
          handler onclick
        </Button>
      </div>
    );
  }
}

export default Welcome;



