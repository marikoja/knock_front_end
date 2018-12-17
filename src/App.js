import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './Components/Home'

class App extends Component {
  render() {
    return (
      <Router className='App'>
        <article>
          <Home/>
        </article>
      </Router>
    );
  }
}

export default App;
