import React, {Component} from 'react';
import User from './User';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount = () => {
    // console.log('Component did mount was called');

    const url = 'http://204.11.60.79:5000/user';

    axios.get(url)
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
      return (
        // TODO onClick will route to conversttion page with specified user
        <button>
          <User
            username={user.user_name}
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
