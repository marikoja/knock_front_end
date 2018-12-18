import React, {Component} from 'react';
import propTypes from 'prop-types';

class User extends Component {

  render() {
    const username = this.props.username;
    const email = this.props.email;

    return(
      <article >
        <button className='entry-name'>Send message to: {username}</button>
      </article>
    );
  }
}

User.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
}

export default User;
