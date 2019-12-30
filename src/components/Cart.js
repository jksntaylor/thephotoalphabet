import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Order from './Order';
import Checkout from './Checkout';

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            checkout: 0,
            price: 0
        }
    }
    
    componentDidMount() {this.getCart()}

    getCart = () => {
        axios.get('/cart').then(res => {
            let cartPrice = res.data.reduce((acc, elem) => {return acc += elem.price}, 0);
            this.setState({cart: res.data, price: cartPrice})
        })
    }

    deleteFromCart = (id) => {axios.delete(`/cart/${id}`).then(() => {this.getCart();})}

    render() {
        let orders = this.state.cart.map(item => {
            return (
                <div key={item.cartID} className='orderContainer'>
                    <Order key={item.cartID} pictureIDs={item.pictureIDs}/>
                    <div className='orderPriceContainer'>
                    <h3 className='orderPrice'>${item.price}</h3>
                    <button onClick={() => {this.deleteFromCart(+item.cartID)}}>delete</button>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className='cart'>
                    <div className='orders'>
                        {this.state.cart.length !== 0 ? orders : <h2>No Orders in Cart</h2>}
                    </div>
                    <div className='checkout'>
                        <h4>{this.state.cart.length} Items</h4>
                        <h4>${this.state.price}.00</h4>
                        <i className="fas fa-credit-card fa-2x"></i>
                        <Checkout orders={this.state.cart} totalPrice={this.state.price}/>
                    </div>
                </div>
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