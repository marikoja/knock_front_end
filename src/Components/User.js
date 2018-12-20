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
      userId: ''
    };
  }

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

    return(
      <button
        className='userBtn'
        onClick={this.selectUser}>
        {username}
        <div className='dispEmail'>{email}</div>
      </button>
    );
  }
}

User.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
}

export default User;
