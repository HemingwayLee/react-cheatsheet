import React from 'react';
import { Button } from 'semantic-ui-react'
import Hotkeys from 'react-hot-keys'

class Welcome extends React.Component {
  clickMe() {
    alert("Here");
  }

  render() {
    return <div>
        <h1>Hello, {this.props.name}</h1>
        <Hotkeys
          keyName='command+u'
          onKeyDown={this.clickMe}
        >
          <Button primary onClick={this.clickMe}>Click Here (cmd + u)</Button>
        </Hotkeys>
      </div>;
  }
}

export default Welcome;
