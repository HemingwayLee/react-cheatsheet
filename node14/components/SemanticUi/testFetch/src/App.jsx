import React from 'react';
import { Button } from 'semantic-ui-react'

class Welcome extends React.Component {
  handleClick(e) {
    fetch('/api', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <Button primary onClick={this.handleClick}>Call a backend function</Button>
      </div>
    );
  }
}

export default Welcome;

