import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Route exact path="/" component={HomePage} />
          </div>
          <footer>
            <span className="copy-right-text">KnowChain, Copyright 2018</span>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
