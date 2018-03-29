import React, { Component } from 'react';
import Form from './Form';
import words from './words.json';

class App extends Component {
  constructor() {
    super();
    this.state = JSON.parse(localStorage.getItem('state')) || {};
  }
  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }
  render() {
    return (
      <div>
        {!this.state.list && <Form
          onSubmit={this.handleSubmitNames}
        >
          <div>Enter Names:</div>
          <div><textarea
            rows={10}
            name="names"
          /></div>
          <button type="submit">Start!</button>
        </Form>}
        {this.state.list && (
          <div>
            <Form onSubmit={this.getWordByName} resetOnSubmit={true}>
              Your Name:<input name="name" /><button type="submit" name="btnName" value="getWord">Get Word</button><label>Get New Word:<input type="checkbox" name="newWord" /></label>
            </Form>
            <div>
              <button onClick={this.reset}>Reset Game</button>
            </div>
          </div>
        )}
      </div>
    );
  }
  handleSubmitNames = ({ names: namesStr }) => {
    const names = namesStr.split('\n').map(a => a.trim());
    const list = generateList(names);
    this.setState({ list, associatedWords: Array(list.length) });
  };
  getWordByName = ({ name, newWord }) => {
    const nameI = this.state.list.indexOf(name);
    if (nameI !== -1) {
      const nextNameIndex = nameI === this.state.list.length - 1 ? 0 : nameI + 1;
      const nextName = this.state.list[nextNameIndex];
      const word = this.state.associatedWords[nameI] && !newWord ? this.state.associatedWords[nameI] : words[Math.floor(Math.random() * words.length)];
      this.setState({ associatedWords: { ...this.state.associatedWords, [nameI]: word } });
      alert(`${word}:${nextName}`);
    }
  };
  reset = () => {
    this.setState({
      list: null,
      associatedWords: null,
    });
  }
}

export default App;

function generateList(names) {
  const newNames = [];
  while (names.length) {
    const rand = Math.floor(Math.random() * names.length);
    const name = names[rand];
    newNames.push(name);
    names = names.filter(n => n !== name);
  }
  return newNames;
}