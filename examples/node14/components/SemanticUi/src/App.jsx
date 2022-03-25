import React from 'react';
import { Button } from 'semantic-ui-react'

class Welcome extends React.Component {
  render() {
    return <div>
        <h1>Hello, {this.props.name}</h1>
        <Button>Click Here</Button>
      </div>;
  }
}

export default Welcome;
