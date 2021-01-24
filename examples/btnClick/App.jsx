import React from 'react';

class App extends React.Component {
  alertMe(e) {
    alert("Hello, " + e.target.innerText);
  }

  changeMyColor(e) {
    e.target.style.backgroundColor = '#FF0000';
  }

  render() {
    return (
      <div>
        <button onClick={e => this.alertMe(e)}>Click Me to alert</button>
        <p onClick={e => this.changeMyColor(e)}>I am p tag, Click Me and Change my color</p>
      </div>
    );
  }
}

export default App;
