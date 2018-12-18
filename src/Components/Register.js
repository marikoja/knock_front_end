import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component{

  constructor(props) {
      super(props);

      this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: '',
        page: ''
      };
    }

    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      const updateState = {};
      updateState[fieldName] = fieldValue;
      this.setState(updateState);
    }

    valid = () => {
      return (this.state.username.length > 0 &&
             this.state.password.length > 0 &&
             this.state.email.includes('@') &&
             (this.state.password === this.state.confirmPassword));
    }

    clearForm = () => {
      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }

    onFormSubmit = (event) => {
      event.preventDefault();
      this.setState({
        message: ''
      })
      const url = 'http://204.11.60.79:5000/user'

      if (this.valid()) {
        axios.post(url,{
          user_name: this.state.username,
          email: this.state.email,
          password: this.state.password
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            this.props.notifyHome('Registered');
          })
          .catch((error) => {
          console.log(error.message);
          this.setState({
            message: 'Registration failed',
          })
        })
      }
    }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <label htmlFor='text'> Username: </label>
            <input
              name='username'
              type='text'
              value={this.state.username}
              onChange={this.onFieldChange}
            />
        </div>

        <div>
          <label htmlFor='text'> Email: </label>
            <input
              name='email'
              type='text'
              value={this.state.email}
              onChange={this.onFieldChange}
            />

        </div>

        <div>
          <label htmlFor='text'> Password:</label>
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onFieldChange}
            />
        </div>

        <div>
          <label htmlFor='text'> Confirm Password:</label>
            <input
              name='confirmPassword'
              type='password'
              value={this.state.confirmPassword}
              onChange={this.onFieldChange}
            />
        </div>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Register;
