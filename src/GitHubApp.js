import React, { Component } from 'react';
// import './GitHubApp.css'

const Card = (props) => {
 return (
  <div style={{ margin: '1em' }}>
   <img src={props.avatar_url} width="75" alt="user avatar" />
   <div className="info" style={{ display: 'inline-block', marginLeft: 10 }}>
    <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
     {props.name}
    </div>
    <div>
     {props.company}
    </div>
   </div>
  </div>
 );
}


const CardList = (props) => {
 return (
  <div>
   {props.cards.map(card => <Card  key={card.id} {...card} />)}
  </div>
 );
}

class Form extends Component {

 state = { userName: '' }

 handleSubmit = (event) => {
  event.preventDefault();
  fetch(`https://api.github.com/users/${this.state.userName}`)
   .then(resp => resp.json())
   .then(jsonResp => {
    console.log(jsonResp);
    this.props.onSubmit(jsonResp);
    this.setState({ userName: '' });
   });
  console.log('Event : Form Submit', this.state.userName);
 }

 render() {
  return (
   <form onSubmit={this.handleSubmit}>
    <input type="text"
     value={this.state.userName}
     onChange={(event) => this.setState({ userName: event.target.value })}

     placeholder="Github username" required />
    <button type="submit">Add card</button>
   </form>
  );
 }
}

class GitHubApp extends Component {
 state = {
  cards: [
   // {
   //  name: "Mohit Thakral",
   //  avatar_url: "https://avatars2.githubusercontent.com/u/919686?v=4",
   //  company: null
   // },
   // {
   //  name: "Paul O'Shannessy",
   //  avatar_url: "https://avatars2.githubusercontent.com/u/8445?v=3",
   //  company: "Facebook"
   // },
   // {
   //  name: "Ben Alpert",
   //  avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=3",
   //  company: "Facebook"
   // }
  ]
 }

 addNewCard = (cardInfo) => {
  this.setState(prevState => ({
   cards: prevState.cards.concat(cardInfo)
  }));
  console.log(cardInfo);
 }

 render() {
  return (
   <div>
    <Form onSubmit={this.addNewCard} />
    <CardList cards={this.state.cards} />
   </div>
  );
 }
}

export default GitHubApp;