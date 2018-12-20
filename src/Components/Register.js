import React, {Component} from 'react';
import axios from 'axios';
import '../css/form.css'
import {apiUrl} from '../config.js'

class Register extends Component{

  constructor(props) {
      super(props);

      this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: '',
        page: '',
        validReg: false
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

    /* When the user is registering we want to set some requirements for the
    information they provide to us. Message will provide a hint to the user if
    they do not meet our requirements*/
    valid = () => {
      if (this.state.username.length === 0) {
        this.setState({
          message: 'Registration failed: username cannot be blank.',
          validReg: false
        })
      } else if (this.state.password.length === 0 ) {
        this.setState({
          message: 'Registration failed: password cannot be blank.',
          validReg: false
        })
      } else if (!this.state.email.includes('@') ) {
        this.setState({
          message: 'Registration failed: invalid email.',
          validReg: false
        })
      } else if ((this.state.password !== this.state.confirmPassword)) {
        this.setState({
          message: 'Registration failed: passwords don\'t match.',
          validReg: false
        })
      } else {
        this.setState({
          validReg: true
        })
      }
      return (
        this.state.validReg
      );
    }



    /* When users click submit we want to send an axios post request
    to add the user to our databse The responose will contain
    a sessionId, tokenId and userId */
    onFormSubmit = (event) => {
      event.preventDefault();
      this.setState({
        message: ''
      })
      this.valid();

      if (this.state.validReg) {
        axios.post(apiUrl + '/user',{
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
            message: 'Registration failed.',
          })
        })
      }
    }

  render() {
    return (
      <div className='form'>
        <form onSubmit={this.onFormSubmit} >
          <div className='formField'>
            <label htmlFor='text'> Username: </label>
            <input
              name='username'
              type='text'
              value={this.state.username}
              onChange={this.onFieldChange}
            />
          </div>

          <div className='formField'>
            <label htmlFor='text'> Email: </label>
            <input
              name='email'
              type='text'
              value={this.state.email}
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
          <div className='formField'>
            <label htmlFor='text'> Confirm Password:</label>
            <input
              name='confirmPassword'
              type='password'
              value={this.state.confirmPassword}
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

export default Register;
