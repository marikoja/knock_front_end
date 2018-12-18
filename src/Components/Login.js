import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{

  constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',

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
            console.log(response);
            this.setState({
              message: `Login successful for ${this.state.username}`
            });
            this.props.setHomeState({
              sessionId: response.data[0].session_id,
              token: response.data[0].token
            })
          })
          .catch((error) => {
          console.log(error.message);
          this.setState({
            message: error.message,
          })
        })
      }
    }



  render() {
    return (
      <form onSubmit={this.onFormSubmit}>

        <label htmlFor='text'> Username:
          <input
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.onFieldChange}
          />
        </label>

        <label htmlFor='text'> Password:
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.onFieldChange}
          />
        </label>

        <input type='submit' value='Submit' />

      </form>
    );
  }
}

export default Login;
