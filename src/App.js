import React, { Component } from 'react';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {user: {}}
  }

  updateUser = user => {
    this.setState({user})
  }

  render() {
    return (
        <Home user={this.state.user} updateUser={this.updateUser} />
    );
  }
}

export default App;
