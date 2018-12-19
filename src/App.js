import React, { Component } from 'react';
import '../src/css/App.css';
import Home from './components/Home'

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
