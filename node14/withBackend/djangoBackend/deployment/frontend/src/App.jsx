import React from 'react';
import { Tab } from 'semantic-ui-react'

class Welcome extends React.Component {
  handleTab1() {
    return <Tab.Pane>Tab 1 Content From a function</Tab.Pane>
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
