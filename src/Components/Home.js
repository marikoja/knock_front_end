import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Conversation from './Conversation';
import Users from './Users';

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

   setHomeState = (changes) => {
     console.log(changes);
     this.setState(changes);

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

  render() {

    if ((this.state.token !== null) && (this.state.sessionId !== null)) {
      if (this.state.conversationId !== null) {
        return (
          <div className='Main'>
            <Conversation/>
          </div>
        );
      } else {
        return (
          <div className='Main'>
            <Users/>
          </div>
        );
      }
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
            <Register/>
          </div>

        )
      } else {
        throw new Error('Unexpected page');
      }
    }

  }
}

export default Home;
