import React, {Component} from 'react';
import axios from 'axios';
import '../css/form.css'

class Login extends Component{

  constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
        message: ''
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
      return this.state.username.length > 0 &&
             this.state.password.length > 0
    }

    clearForm = () => {
      this.setState({
        username: '',
        password: '',
      });
    }

    onFormSubmit = (event) => {
      event.preventDefault();
      this.setState({
        message: ''
      })

      const url = 'http://204.11.60.79:5000/auth';

      if (this.valid()) {
        axios.post(url,{
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
