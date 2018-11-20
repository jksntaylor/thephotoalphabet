import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div className='menu-wrapper'>
                <ul>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/make'><li>Make Your Own</li></Link>
                    <Link to='/cart'><li>Cart</li></Link>
                    <Link to='/checkout'><li>Checkout</li></Link>
                    <Link to='/auth'><li>Login</li></Link>
                    <Link to='/user'><li>Account</li></Link>
                    <Link to='/admin'><li>Admin</li></Link>
                </ul>
            </div>
        )
    }
}

export default Menu;