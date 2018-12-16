import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './Login'
import Register from './Register'

class Home extends Component{
  render() {
    return (
      <Router>
        <article>
          <header className='App-header'>
            <p>
              Email Converstaion App
            </p>
          </header>
          <button type="button" className='Button'>
              <Link to="/login/">
                Login
              </Link>
          </button >
          <button type="button" className='Button'>
            <Link to='/register/'>
              Register
            </Link>
          </button >

          <Route path='/login/' component={Login} />
          <Route path='/register/' component={Register} />
        </article>
      </Router>
    );
  }
}

export default Home;
