import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    const user = {
      firstName: 'Yun-Wei',
      lastName: 'Lee'
    };

    function name(user) {
      return user.firstName + " " + user.lastName;
    }

    return (
      <div>
        <h1 id="myid" ref="bar">{name(user)}</h1>
        {
          // it will be null
          console.log(document.getElementById("myid"))
        }
        {
          //index.js:9089 Warning: App is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.
          // it will be null
          console.log(ReactDOM.findDOMNode(this.refs.bar))
        }
      </div>
    );
  }
}

export default App;