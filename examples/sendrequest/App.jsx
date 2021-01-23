import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);  
  }

  componentDidMount() {
    fetch('https://api.github.com/users/HemingwayLee/repos', { 
      // body: JSON.stringify(data), 
      // cache: 'no-cache', 
      // credentials: 'same-origin', 
      // headers: {
      //   'content-type': 'application/json'
      // },
      method: 'GET', 
      // mode: 'cors', 
      // redirect: 'follow', 
      // referrer: 'no-referrer', 
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(myJson) {
      this.setState({data: myJson});
    }.bind(this)).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.data === null) {
      return (<div>Loading</div>);
    } else {
      return (
        <div>
          <div>{this.state.data.length}</div>
          <table>
            <thead>
              <tr>
                <td>Repo Name</td>
                <td>Language</td>
                <td>Stars</td>
                <td>Forks</td>
                <td>Forks Count</td>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map( item => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.language}</td>
                    <td>{item.stargazers_count}</td>
                    <td>{item.forks}</td>
                    <td>{item.forks_count}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
