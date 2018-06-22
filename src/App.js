import React, { Component } from 'react';
import PayPerViewsContainer from './components/PayPerView/PayPerViewsContainer.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Pay-Per-Views</h1>
        </header>
        < PayPerViewsContainer />
      </div>
    );
  }
}

export default App;
