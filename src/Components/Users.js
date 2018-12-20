import React, {Component} from 'react';
import User from './User';
import axios from 'axios';
import '../css/users.css'
import {apiUrl} from '../config.js'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  // When the page loads we want to send our request for the list of users
  componentDidMount = () => {
    axios.get(apiUrl + '/user')
      .then( (response) => {
        this.setState({ users: response.data });
    })
      .catch( (error) => {
        this.setState({ error: error.message });
    });
  }

  render() {
    const users = this.state.users;
    const userComponents = users.map((user) => {
      // We do not want to show our own user name on list of possible recipents.
      if (this.props.userId !== user.user_id) {
        return (
          <User
            key={user.user_id}
            username={user.user_name}
            recipientId={user.user_id}
            email={user.email}
            userId={this.props.userId}
            setHomeState={this.props.setHomeState}
          />
        );
      }
    });

    return (
      <div className=''>
        <div className='banner'>Select a contact to start or continue a conversation</div>
        <div className='userList'>
          {userComponents}
        </div>
      </div>
    )
  }
}

export default Users;
