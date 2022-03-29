import React from 'react';
import { Button } from 'semantic-ui-react'

class Welcome extends React.Component {
  // it does not work
  handleClick(e) {
    console.log("AAAA");
  };

  passMeParameter(p) {
    console.log(p);
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <Button primary onClick={this.handleClick}>Call a function</Button>
        <Button secondary onClick={() => {
          console.log("BBBB");
        }}>Call an inline function</Button>
        <Button primary onClick={() => this.passMeParameter("CCCCC")}>Pass parameters into a function</Button>
      </div>
    );
  }
}

export default Welcome;

