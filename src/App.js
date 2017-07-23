import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstLesson from './FirstLesson';
import GitHubApp from './GitHubApp'


class App extends Component {
  render() {
    return (
      <div>
        <FirstLesson />
        <GitHubApp />
      </div>
    );
  }
}

export default App;
