import React, { Component } from 'react';

class Result extends Component {
 render(props) {
  return (<div> {this.props.counter}
  </div>);
 }
}

class Button extends Component {

 handleClick = () => {
  this.props.onClickFunction(this.props.incrementValue);
 }

 render(props) {
  return (
   <button onClick={this.handleClick}>
    +{this.props.incrementValue}
   </button>);
 }

}

class FirstLesson extends Component {
 state = { counter: 0 };

 incrementCounter = (incrementValue) => {
  this.setState((prevState) => ({
   counter: prevState.counter + incrementValue
  }));
 }

 render() {
  return (
   <div>
    <Button incrementValue={1} onClickFunction={this.incrementCounter} />
    <Button incrementValue={5} onClickFunction={this.incrementCounter} />
    <Button incrementValue={10} onClickFunction={this.incrementCounter} />
    <Button incrementValue={100} onClickFunction={this.incrementCounter} />
    <Result counter={this.state.counter} />
   </div>
  );
 }
}

export default FirstLesson;