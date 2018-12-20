import React, {Component} from 'react';
import axios from 'axios';
import '../css/form.css'
import {apiUrl} from '../config.js'

class Login extends Component{
  constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
        message: ''
      };
    }

    /* when the user enters values into the form we want to setState
   to the value they type */
    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      const updateState = {};
      updateState[fieldName] = fieldValue;
      this.setState(updateState);
    }

    // As a basic validation we to check the username and password is not zero
    valid = () => {
      return this.state.username.length > 0 &&
             this.state.password.length > 0
    }

    /* When users click submit we want to send an axios post request to our
    databse to check that they are a valid user. The responose will contain
    a sessionId, tokenId and userId */
    onFormSubmit = (event) => {
      event.preventDefault();
      this.setState({
        message: ''
      })

      if (this.valid()) {
        axios.post(apiUrl + '/auth',{
          user_name: this.state.username,
          password: this.state.password
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => {
            this.setState({
              message: `Login successful for ${this.state.username}`
            });
            this.props.setHomeState({
              sessionId: response.data[0].session_id,
              token: response.data[0].token,
              userId: response.data[0].user_id
            })
          })
          .catch((error) => {
          console.log(error.message);
          this.setState({
            message: 'Login failed',
          })
        })
      }
    }

  render() {
    return (
      <div className='form'>
        <form onSubmit={this.onFormSubmit}>
          <div className='formField'>
            <label htmlFor='text'> Username:</label>
            <input
              name='username'
              type='text'
              value={this.state.username}
              onChange={this.onFieldChange}
            />
          </div>

          <div className='formField'>
            <label htmlFor='text'> Password:</label>
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onFieldChange}
            />
          </div>

          <input type='submit' value='Submit' className='formSubmit'/>
          <div className='error'>{this.state.message}</div>
        </form>
      </div>
    );
  }
}

export default Login;
