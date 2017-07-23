import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import FirstLesson from './FirstLesson';
// import GitHubApp from './GitHubApp';
import PlayNineApp from './PlayNineApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <FirstLesson /> */}
         {/* <GitHubApp />  */}
         <hr />
         <PlayNineApp />
      </div>
    );
  }
}

export default App;
