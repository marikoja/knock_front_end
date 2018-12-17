import React, {Component} from 'react';
import User from './User'

class Users extends Component {
  render() {

    const users = this.props.users;
    const userComponents = users.map((user) => {
      return (
        // TODO onClick will route to conversttion page with specified user
        <button>
          <User
          key={user.username}
          email={user.email}
          />
        </button>
      );
    });

    return (
      <article className=''>
        <div>Select a contact to start a conversation</div>
        <div>
          {userComponents}
        </div>
      </article>
    )
  }
}

export default Users;
