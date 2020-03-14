import React from 'react';

class App extends React.Component {
  alertMe(e) {
    e.preventDefault()
    alert("Hello, " + e.target.innerText);
  }

  changeMyColor(e) {
    e.target.style.backgroundColor = '#FF0000';
  }

  render() {
    return (
      <div>
        <button onClick={e => this.alertMe(e)}>Click Me</button>
        <p onClick={e => this.changeMyColor(e)}>Click Me and Change my color</p>
      </div>
    );
  }
}

export default App;