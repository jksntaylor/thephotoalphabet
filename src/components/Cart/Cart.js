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
        console.log(id);
        axios.delete(`/cart/${id}`).then(response => {
            console.log(response);
            this.setState({
                cart: response.data
            })
            this.getCart();
        })
    }

    componentDidMount() {
        this.getCart();
    }

    render() {
        let i = 0;
        let orders = this.state.cart.map(item => {
            i++;
            return (
                <div key={item.cartID} className='orderContainer'>
                    <Order key={i} pictureIDs={item.pictureIDs}/>
                    <button onClick={() => {this.deleteFromCart(+item.cartID)}}>delete</button>
                </div>
            )
        })

        return (
            <div className='cartContainer'>
                <div className='cartNavContainer'>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                    <Link to='/auth'><h5><i className="fas fa-user fa-2x"></i></h5></Link>
                </div>
                <div className='cartOrdersContainer'>
                    {this.state.cart.length !== 0 ? orders : <h2>No Orders in Cart</h2>}
                </div>
                <div className='checkoutContainer'>
                    <h4>Items in Cart: {this.state.cart.length}</h4>
                    <Link to='/checkout'><i class="fas fa-credit-card fa-2x"></i></Link>
                </div>
            </div>
        )
    }
}

export default Cart;