import React, { Component } from 'react';
import './css/App.css';
import Home from './Components/Home'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div>
          <Home/>
        </div>
      </div>
    );
  }
}

export default App;
