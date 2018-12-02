import './App.css';
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Input from './components/Input/Input';
// import Menu from './components/Menu/Menu';
import Checkout from './components/Checkout/Checkout';
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
      <div>
        {/* <Menu/> */}
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/make' render={(props) => <Input {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/cart' render={(props) => <Cart {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/checkout' render={(props) => <Checkout {...props} user={this.state.user} updateUser={this.updateUser} /> } />
          <Route path='/auth' render={(props) => <Auth {...props} user={this.state.user} updateUser={this.updateUser} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
