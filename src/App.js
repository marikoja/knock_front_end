import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home'

class App extends Component {
  render() {
    return (
      <Router className="App">
        <article>
          <Home/>
        </article>
      </Router>
    );
  }
}

export default App;