import React from 'react';
import { Tab, Button } from 'semantic-ui-react'

class Welcome extends React.Component {
  handleClick() {
    fetch('/api/path/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }

  handleClick2() {
    fetch('/api/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }

  handleTab1() {
    return (
      <div>
        <Tab.Pane>Tab 1 Content From a function</Tab.Pane>
        <Button secondary onClick={this.handleClick}>Call backend</Button>
        <Button secondary onClick={this.handleClick2}>Call backend 2</Button>
      </div>
    )
  }

  render() {
    const panes = [
      {
        menuItem: 'Tab 1', render: () => {
          return this.handleTab1();
        }
      },
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ];

    return <div>
        <h1>Hello, {this.props.name}</h1>
        <hr />
        <Tab panes={panes} />
      </div>;
  }
}

export default Welcome;
