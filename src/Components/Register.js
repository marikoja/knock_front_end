import React, {Component} from 'react';
class Register extends Component{

  constructor() {
      super();

      this.state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
             this.state.password.length > 0 &&
             this.state.email.includes('@') &&
             (this.state.password === this.state.confirmPassword);
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

      if (this.valid()) {
        this.props.addCardCallback(this.state);
        this.clearForm();
        // TODO route to users/start conversation page
      }
    }

  render() {
    return (
      <form>
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
              type='text'
              value={this.state.password}
              onChange={this.onFieldChange}
            />
        </div>

        <div>
          <label htmlFor='text'> Confirm Password:</label>
            <input
              name='confirmPassword'
              type='text'
              value={this.state.confirmPassword}
              onChange={this.onFieldChange}
            />
        </div>
        // TODO Disable submit button until valid inputs for all fields
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Register;
