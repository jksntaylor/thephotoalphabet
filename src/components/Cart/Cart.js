import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Order from '../Order/Order';
import axios from 'axios';
import './cart.css';
import Checkout from '../Checkout/Checkout';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            checkout: 0
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

    toggleCheckout = () => {
        if (this.state.checkout===0) {
            this.setState({checkout: 1})
        } else if (this.state.checkout===1) {
            this.setState({checkout: 2})
        } else {
            this.setState({checkout: 1})
        }
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

        if (this.state.checkout===1) {
            var checkout =  <div className='checkoutContainer checkoutEnter'>
                                <div className='checkoutNav'>
                                    <h4>Items in Cart: {this.state.cart.length}</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout />
                            </div>
        } else if (this.state.checkout===2) {
            checkout =  <div className='checkoutContainer checkoutLeave'>
                                <div className='checkoutNav'>
                                    <h4>Items in Cart: {this.state.cart.length}</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout />
                            </div>
        } else {
            checkout =  <div className='checkoutContainer'>
                                <div className='checkoutNav'>
                                    <h4>Items in Cart: {this.state.cart.length}</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout />
                            </div>
        }

        return (
            <div className='cartContainer'>
                <div className='cartNavContainer'>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                    <Link to='/auth'><h5><i className="fas fa-user fa-2x"></i></h5></Link>
                </div>
                <div className='cartOrdersContainer'>
                    {this.state.cart.length !== 0 ? orders : <h2>No Orders in Cart</h2>}
                </div>
                {checkout} 
            </div>
        )
    }
}

export default Cart;