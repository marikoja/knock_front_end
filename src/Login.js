import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
class Login extends Component{

  constructor() {
      super();

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

      if (this.valid()) {
        this.props.addCardCallback(this.state);
        this.clearForm();
      }
    }

  render() {
    return (
      <form>

        <label htmlFor="text"> Username:
          <input
          name="text"/>
        </label>

        <label htmlFor="text"> Password:
          <input
          name="text"/>
        </label>

        <input type="submit" value="Submit" />

      </form>
    );
  }
}

export default Login;
