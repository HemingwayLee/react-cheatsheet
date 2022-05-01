import React from 'react';
import { Tab } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      theContent: "# Try me  \n* Test1  \n* Test2"
    };
    this.generateMarkdown = this.generateMarkdown.bind(this);
    this.generateEditor = this.generateEditor.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleTextInput(event) {
    this.setState({theContent: event.target.value});
  }

  generateEditor() {
    return (<div>
      <h3>Drag and Drop Image</h3>
      <textarea 
        onChange={this.handleTextInput} 
        style={{width : '100%'}} 
        rows="10"
        value={this.state.theContent}>
      </textarea>
      </div>)
  }

  generateMarkdown() {
    return <ReactMarkdown>{this.state.theContent}</ReactMarkdown>
  }

  render() {
    const panes = [
      {
        menuItem: 'Edit', render: () => {
          return this.generateEditor();
        }
      },
      { 
        menuItem: 'Result', render: () => {
          return this.generateMarkdown();
        }
      },
    ];

    return <div>
        <h1>Hello, {this.props.name}</h1>
        <hr />
        <Tab panes={panes} />
      </div>;
  }
}

export default Welcome;
