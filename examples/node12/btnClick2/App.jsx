import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "This is default content"
    }
  }

  updateContent(e) {
    e.preventDefault();
    this.setState({ message: "This is updated content!!"});
  }

  render() {
    return (
      <div>
        <div>{ this.state.message }</div>
        <div>
          <button onClick={e => this.updateContent(e)}>I will update content</button>
        </div>
      </div>
    );
  }
}

export default App;