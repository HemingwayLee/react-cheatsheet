import React from 'react';
import Button from '@mui/material/Button';

d3.select("body").append("span").text("Hello, world!");

export default function Welcome(props) {
  const handleClick = () => {
    alert("Hello mui");
  };
    
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <Button variant="contained" color="primary" onClick={() => {
        alert('clicked mui');
      }}>
        inline onclick
      </Button>
      <Button variant="outlined" onClick={handleClick}>
        handler onclick
      </Button>
    </div>
  );
}

