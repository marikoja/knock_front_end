import React, {Component} from 'react';
import axios from 'axios';
import '../css/form.css'

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

    onFieldChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      const updateState = {};
      updateState[fieldName] = fieldValue;
      this.setState(updateState);
    }

    valid = () => {
      if (this.state.username.length === 0) {
        alert('Username cannot be blank.')
        this.setState({
          validReg: false
        })
      } else if (this.state.password.length === 0 ) {
        alert('Password cannot be blank.')
        this.setState({
          validReg: false
        })
      } else if (!this.state.email.includes('@') ) {
        alert('Invalid email.');
        this.setState({
          validReg: false
        })
      } else if ((this.state.password !== this.state.confirmPassword)) {
        alert("Passwords don't match");
        this.setState({
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
      this.valid();
      const url = 'http://204.11.60.79:5000/user'

      if (this.state.validReg) {
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
          <input type='submit' value='Submit' disable={!(this.state.validReg)} className='formSubmit'/>
        </form>
      </div>
    );
  }
}

export default Register;
