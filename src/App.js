import React, { Component } from 'react';
import Router from './Router';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="ui text container">
      	  <Router />
      	</div>
      </div>
    );
  }
}

export default App;
