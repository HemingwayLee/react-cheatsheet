import React from 'react';

class App extends React.Component {
  alertMe(e) {
    alert("Hello, " + e.target.innerText);
  }

  changeMyColor(e) {
    e.target.style.backgroundColor = '#FF0000';
  }

  preventMe(e) {
    e.preventDefault();
    alert("Hello, " + e.target.innerText);
  }

  render() {
    return (
      <div>
        <button onClick={e => this.alertMe(e)}>Click Me to alert</button>
        <p onClick={e => this.changeMyColor(e)}>I am p tag, Click Me and Change my color</p>
        <a href="http://www.google.com.tw" onClick={e => this.preventMe(e)}>I am a tag, click Me, I will not go to google</a>
      </div>
    );
  }
}

export default App;
