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
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleTextInput(event) {
    this.setState({theContent: event.target.value});
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();

    const data = event.dataTransfer.files;
    console.log(data);

    let allFiles = ""
    for (let i=0; i<data.length; ++i) {
      allFiles += `\n\n ${data[i].name}`;
    }

    const ori = this.state.theContent;
    this.setState({theContent: `${ori} ${allFiles}`});
  }

  generateEditor() {
    return (<div>
      <h3>Drag and Drop Image into this textarea</h3>
      <textarea 
        onChange={this.handleTextInput} 
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        style={{width : '100%'}} 
        rows="10"
        value={this.state.theContent}>
      </textarea>
      </div>)
  }

  generateMarkdown() {
    return <ReactMarkdown>{this.state.theContent}</ReactMarkdown>
  }

  // function drag(event) {
  //   event.dataTransfer.setData("text", this.event.target.src);
  // }

  // function drop(event) {
  //   event.preventDefault();
  //   let data = event.dataTransfer.files;
  //   for (file of data) {
  //     document.getElementById("display").innerText = document.getElementById("display").value + "  " + file.name;
  //   }
  // }

  // function allow(event) {
  //   event.preventDefault();
  // }

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
