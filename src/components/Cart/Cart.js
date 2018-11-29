import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Order from '../Order/Order';
import axios from 'axios';
import './cart.css';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: []
        }
    }

    getCart = () => {
        axios.get('/cart').then(response => {
            this.setState({
                cart: response.data
            })
            console.log(this.state.cart);
        })
    }

    deleteFromCart = (id) => {
        axios.delete(`/cart/${id}`).then(response => {
            this.setState({
                cart: response
            })
        })
    }

    componentDidMount() {
        this.getCart();
    }

    render() {
        
        let orders = this.state.cart.map(item => {
            return (
                <Order pictureIDs={item.pictureIDs}/>
            )
        })

        return (
            <div>
                <Link to='/make'><h5>Make More</h5></Link>
                <Link to='/auth'><h5>Log In</h5></Link>
                {this.state.cart.length !== 0 ? orders : <h2>No Orders in Cart</h2>}
                <Link to='/checkout'>Checkout</Link>
            </div>
        )
    }
}

export default Cart;