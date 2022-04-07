import React from 'react';
import Button from '@mui/material/Button';

class Welcome extends React.Component {
  handleClick(e) {
    alert("AAAA");
  };
    
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <Button variant="contained" color="primary" onClick={() => {
          alert('clicked');
        }}>
          inline onclick
        </Button>
        <Button variant="outlined" onClick={this.handleClick}>
          handler onclick
        </Button>
      </div>
    );
  }
}

export default Welcome;

