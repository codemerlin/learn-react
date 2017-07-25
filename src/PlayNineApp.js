import React, { Component } from 'react';

const Stars = props => {

 let stars = [];
 for (let i = 0; i < props.numberOfStars; i++) {
  stars.push(<i key={i} className="fa fa-star"></i>);
 }

 return (
  <div className="col-5">
   {stars}
  </div>
 );
}

const Button = props => {
 let button;
 switch (props.answerIsCorrect) {
  case true:
   button = <button className="btn btn-success" onClick={props.acceptAnswer} >
    <i className="fa fa-check"></i>
   </button>
   break;
  case false:
   button = <button className="btn btn-danger">
    <i className="fa fa-times"></i>
   </button>
   break;
  default:
   button = <button className="btn"
    disabled={props.selectedNumbers.length === 0}
    onClick={props.checkAnswer} >=</button>
   break;
 }
 return (
  <div className="col-2">
   {button}
   <br />
   <br />
   <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redraws === 0} >
    <i className="fa fa-refresh"></i> {props.redraws}
   </button>
  </div>
 );
}
const Answer = props => {
 return (
  <div className="col-5" >
   {props.selectedNumbers.map((num, i) =>
    <span key={i}
     className="gameNumber"
     onClick={() => props.unselectNumber(num)}>{num}</span>)}
  </div>
 );
}

const Numbers = (props) => {

 const numberClassName = (num) => {
  const gameNumber = "gameNumber";
  if (props.selectedNumbers.indexOf(num) >= 0) {
   return gameNumber + " selected";
  }
  if (props.usedNumbers.indexOf(num) >= 0) {
   return gameNumber + " used";
  }
  return gameNumber;
 }

 return (<div className="card text-center">
  <div>
   {Numbers.list.map((num, i) =>
    <span key={i} className={numberClassName(num)}
     onClick={() => props.selectNumber(num)}
    >
     {num}
    </span>)}
  </div>
 </div>)
}

Numbers.list = (() => {
 const arrayONumbers = [...Array(10).keys()];
 arrayONumbers.shift();
 return arrayONumbers;
})();

const DoneFrame = (props) => {
 return (
  <div className="text-center" >
   <h2>{props.doneStatus}</h2>
   <button className="btn btn-secondary" onClick={props.playAgain}>
    Play Again
    </button>
  </div>
 )
}

class Game extends Component {

 static randomNumber = () => 1 + Math.floor(Math.random() * 9);
 static initialState = () => ({
  selectedNumbers: [],
  usedNumbers: [],
  randomNumberOfStars: Game.randomNumber(),
  answerIsCorrect: null,
  redraws: 5,
  doneStatus: ''
 });

 state = Game.initialState();

 selectNumber = (selectedNumber) => {
  if (this.state.selectedNumbers.indexOf(selectedNumber) >= 0) {
   return;
  }
  this.setState(prevState => ({
   answerIsCorrect: null,
   selectedNumbers: prevState.selectedNumbers.concat(selectedNumber)
  }));
 };

 unselectNumber = (clickedNumber) => {
  this.setState(prevState => ({
   answerIsCorrect: null,
   selectedNumbers: prevState.selectedNumbers.filter(num => num !== clickedNumber)
  }))
 }

 checkAnswer = () => {
  this.setState(prevState => ({
   answerIsCorrect: prevState.randomNumberOfStars ===
   prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
  }));
 }

 acceptAnswer = () => {
  this.setState(prevState => ({
   usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
   selectedNumbers: [],
   answerIsCorrect: null,
   randomNumberOfStars: Game.randomNumber()
  }), this.updateDoneStatus);
 }

 redraw = () => {
  this.setState(prevState => ({
   selectedNumbers: [],
   answerIsCorrect: null,
   randomNumberOfStars: Game.randomNumber(),
   redraws: prevState.redraws - 1
  }), this.updateDoneStatus);
 }

 possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
   arr.pop();
   return this.possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount; i++) {
   var combinationSum = 0;
   for (var j = 0; j < listSize; j++) {
    if (i & (1 << j)) { combinationSum += arr[j]; }
   }
   if (n === combinationSum) { return true; }
  }
  return false;
 };

 possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
  const possibleNumbers = Numbers.list.filter(number => usedNumbers.indexOf(number) === -1);

  return  this.possibleCombinationSum(possibleNumbers, randomNumberOfStars);
 }


 updateDoneStatus = () => {
  this.setState(prevState => {
   if (prevState.usedNumbers.length === 9) {
    return { doneStatus: 'Done. Nice! ' };
   }
   if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
    return { doneStatus: 'Game Over!' };
   }
  })
 }

 playAgain = () => this.setState(Game.initialState());

 render() {

  const {
   selectedNumbers,
   randomNumberOfStars,
   answerIsCorrect,
   usedNumbers,
   redraws,
   doneStatus } = this.state;

  return (
   <div className="container">
    <h3>Play Nine</h3>
    <hr />
    <div className="row" >
     <Stars numberOfStars={randomNumberOfStars} />
     <Button selectedNumbers={selectedNumbers}
      checkAnswer={this.checkAnswer}
      answerIsCorrect={answerIsCorrect}
      acceptAnswer={this.acceptAnswer}
      redraw={this.redraw}
      redraws={redraws} />

     <Answer selectedNumbers={selectedNumbers}
      unselectNumber={this.unselectNumber} />
    </div>
    <br />
    {doneStatus ?
     <DoneFrame doneStatus={doneStatus} playAgain={this.playAgain} /> :
     <Numbers selectedNumbers={selectedNumbers}
      selectNumber={this.selectNumber}
      usedNumbers={usedNumbers} />
    }
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