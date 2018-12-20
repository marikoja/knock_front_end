import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';
import Conversation from './Conversation';
import Users from './Users';
import '../css/Home.css';

// Home is the handler for the entire app
class Home extends Component{
  constructor(props) {
      super(props);

      this.state = {
         page: 'home',
         loggedIn: false,
         userName: null,
         userId: null,
         sessionId: null,
         token: null,
         conversationId: null
      }
  }

  // setHomeState passes changes throughout nested
  // components back to Home
   setHomeState = (changes) => {
     this.setState(changes);
   }

   // notifyHome
   notifyHome = (message) => {
     if (message === 'Registered') {
       this.setState({
         page: 'login'
       });
     } else {
       throw new Error ('Received unexpected notification.');
     }
   }

   openHome = () => {
     this.setState({
       page: 'home'
     })
   }

   openLogin = () => {
     this.setState({
       page: 'login'
     });
   }

   openRegister = () => {
     this.setState({
       page: 'register'
     });
   }

   logout = () => {
     this.setState({
       page: 'home',
       loggedIn: false,
       userName: null,
       userId: null,
       sessionId: null,
       token: null,
       conversationId: null
     });
   }

  render() {

    // if the user is logged in (both session_id and token have a value)
    if ((this.state.token !== null) && (this.state.sessionId !== null)) {

      // if the conversation_id is not set, then we want to display the
      // recipient list page
      if (this.state.conversationId !== null) {
        return (
            <div className='Main'>
              <button className='HomeButton' onClick={this.logout}>LOGOUT</button>
              <Conversation userId={this.state.userId} sessionId={this.state.sessionId} token={this.state.token} conversationId={this.state.conversationId}/>
            </div>
        );

      // otherwise, the user is logged in and a conversation_id is set, so
      // we dislay the conversation page
      } else {
        return (
          <div className='Main'>
            <button className='HomeButton' onClick={this.logout}>LOGOUT</button>
            <Users userId={this.state.userId} sessionId={this.state.sessionId} token={this.state.token} setHomeState={this.setHomeState}/>
          </div>
        );
      }

    // else the user is not logged in, so we're either displaying the home page,
    // login page, or the registration page
    } else {
      if (this.state.page === 'home') {
        return (
          <div className='Main'>
            <div className='NavBtnContainer'>
              <button className='HomeButton' onClick={this.openLogin}>LOGIN</button>
              <button className='HomeButton' onClick={this.openRegister}>REGISTER</button>
            </div>
          </div>
        );
      } else if (this.state.page === 'login') {
        return (
          <div className='Main'>
            <button className='HomeButton' onClick={this.openHome}>HOME</button>
            <Login setHomeState = {this.setHomeState}/>
          </div>
        )
      } else if (this.state.page === 'register') {
        return (
          <div className='Main'>
            <button className='HomeButton' onClick={this.openHome}>HOME</button>
            <Register notifyHome = {this.notifyHome}/>
          </div>

        )
      } else {
        throw new Error('Unexpected page');
      }
    }

  }
}

export default Home;
