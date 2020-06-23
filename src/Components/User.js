import React, {Component} from 'react';
import propTypes from 'prop-types';
import '../css/users.css'
import axios from 'axios'
import {apiUrl} from '../config.js'

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      recipientId: '',
      email: '',
      userId: '',
      phoneNumber: '',
    };
  }

  /*When the user slects a contact to communicate with we want to send
  a post request to start a new conversation. The response will contain
  a converationId*/
  selectUser = () => {
    axios.post(apiUrl + '/conversation',{
      users: [
        {user_id: this.props.userId},
        {user_id: this.props.recipientId}
      ]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        this.props.setHomeState({
          conversationId: response.data.conversation_id
        });
      })
      .catch((error) => {
      console.error(error);
      this.setState({
        message: 'Failed to select user.',
      })
    })
  }

  render() {
    const username = this.props.username;
    const email = this.props.email;
    const phoneNumber = this.props.phoneNumber;

    return(
      <button
        className='userBtn'
        onClick={this.selectUser}>
        {username}
        <div className='dispEmail'>{email}</div>
        <div className='dispEmail'>{phoneNumber}</div>
      </button>
    );
  }
}

User.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
}

export default User;
