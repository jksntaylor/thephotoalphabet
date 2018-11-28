import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Order from '../Order/Order';

class Cart extends Component {
    render() {
        return (
            <div>
                Cart
                <Order />
                <Link to='/checkout'>Checkout</Link>
            </div>
        )
    }
}

export default Cart;