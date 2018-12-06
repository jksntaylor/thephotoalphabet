import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Order from '../Order/Order';
import axios from 'axios';
import './cart.css';
import Checkout from '../Checkout/Checkout';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            checkout: 0,
            price: 0
        }
    }

    getCart = () => {
        axios.get('/cart').then(response => {
            this.setState({
                cart: response.data
            })
            console.log(this.state.cart);
            let cartPrice = this.state.cart.reduce((acc, elem) => {
                return acc += elem.price
            }, 0);
            this.setState({price: cartPrice})
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
                    <div className='orderPriceContainer'>
                    <h3 className='orderPrice'>${item.price}</h3>
                    <button onClick={() => {this.deleteFromCart(+item.cartID)}}>delete</button>
                    </div>
                </div>
            )
        })

        if (this.state.checkout===1) {
            var checkout =  <div className='checkoutContainer checkoutEnter'>
                                <div className='checkoutNav'>
                                    <h4>{this.state.cart.length} Items</h4>
                                    <h4>${this.state.price}.00</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout orders={this.state.cart} totalPrice={this.state.price}/>
                            </div>
        } else if (this.state.checkout===2) {
            checkout =  <div className='checkoutContainer checkoutLeave'>
                                <div className='checkoutNav'>
                                    <h4>{this.state.cart.length} Items</h4>
                                    <h4>${this.state.price}.00</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout orders={this.state.cart} totalPrice={this.state.price}/>
                            </div>
        } else {
            checkout =  <div className='checkoutContainer'>
                                <div className='checkoutNav'>
                                    <h4>{this.state.cart.length} Items</h4>
                                    <h4>${this.state.price}.00</h4>
                                    <i className="fas fa-credit-card fa-2x" onClick={this.toggleCheckout}></i>
                                </div>
                                <Checkout orders={this.state.cart} totalPrice={this.state.price}/>
                            </div>
        }

        if (this.props.isLoggedIn) {
        var cart = <div className='cartContainer'>
                    <div className='cartNavContainer'>
                        <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                        <Link to='/auth'><h5><i className="fas fa-user fa-2x"></i></h5></Link>
                    </div>
                    <div className='cartOrdersContainer'>
                        {this.state.cart.length !== 0 ? orders : <h2>No Orders in Cart</h2>}
                    </div>
                    {checkout} 
                </div>
        } else {
         cart = <div className='cartContainer'>
                    <div className='cartNavContainer'>
                        <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                        <Link to='/auth'><h5><i className="fas fa-user fa-2x"></i></h5></Link>
                    </div>
                    <div className='cartGuestContainer'>
                        <h1>Please sign in to access Cart and Checkout</h1>
                    </div>
                </div>
        }

        return (
            <div>
                {cart}
            </div>
        )

    }
}

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Cart);