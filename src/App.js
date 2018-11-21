import './App.css';
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Input from './components/Input/Input';
import Menu from './components/Menu/Menu';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import User from './components/User/User';
import Admin from './components/Admin/Admin';

class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/make' component={Input}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/auth' component={Login}/>
          <Route path='/user' component={User}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
      </div>
    );
  }
}

export default App;
