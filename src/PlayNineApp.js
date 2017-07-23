import React, { Component } from 'react';

const Stars = props => {
 return (
  <div className="col-5">
   <i className="fa fa-star"></i>
   <i className="fa fa-star"></i>
   <i className="fa fa-star"></i>
   <i className="fa fa-star"></i>
  </div>
 );
}

const Button = props => {
 return (
  <div className="col-2">
   <button>=</button>
  </div>
 );
}
const Answer = props => {
 return (
  <div className="col-5" >
   Answer
  </div>
 );
}
class Game extends Component {
 render() {
  return (
   <div className="container">
    <h3>Play Nine</h3>
    <hr />
    <div className="row" >
     <Stars />
     <Button />
     <Answer />
    </div>
   </div>
  )
 }
}

class PlayNineApp extends Component {
 render() {
  return (
   <div>
    <Game />
   </div>
  )
 }
}

export default PlayNineApp;