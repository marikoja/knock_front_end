import React, {Component} from 'react';
import propTypes from 'prop-types';

class User extends Component {
  render() {
    const userName = this.props.user;
    const email = this.props.email;

    return(
      <article >
        <button className='entry-name'>Send message to: {userName}</button>
      </article>
    );
  }
}

User.propTypes = {
  userName: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
}

export default User;
