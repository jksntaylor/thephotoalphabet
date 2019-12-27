import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser (user) {
    this.setState({user})
  }

  render() {
    return (
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/cart' render={(props) => <Cart {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/auth' render={(props) => <Auth {...props} user={this.state.user} updateUser={this.updateUser} /> } />
        </Switch>
    );
  }
}

export default App;
