import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: {
        name: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        save: false
      },
      orders: [],
      totalPrice: 0
    }
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handleShippingChange = this.handleShippingChange.bind(this)
  }

  handleShippingChange(name, val) {
    this.setState({shipping: {...this.state.shipping, [name]: val}})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders.length!==this.props.orders.length) {
      this.setState({orders: this.props.orders, totalPrice: this.props.totalPrice})
    }
  }

  handleSaveChange() {
    this.setState({
      save: !this.state.save
    })
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_KJzSf9w3SSqFsagSRoecHHsu">
        <div className="checkoutCardContainer">
          <h1>Checkout</h1>
          <div>
            <h2>Shipping</h2>
            <h6>US Only</h6>
            <div>
              <span>Save Address for Future Use?</span><input type='checkbox' onChange={this.handleSaveChange}/>
              <input placeholder='Name' onChange={e => this.handleShippingChange('name', e.target.value)} value={this.state.shipping.name}/>
              <input placeholder='Address' onChange={e => this.handleShippingChange('address', e.target.value)} value={this.state.shipping.address}/>
              <input placeholder='Address 2' onChange={e => this.handleShippingChange('address2', e.target.value)} value={this.state.shipping.address2}/>
              <input placeholder='City' onChange={e => this.handleShippingChange('city', e.target.value)} value={this.state.shipping.city}/>
              <input placeholder='State' onChange={e => this.handleShippingChange('state', e.target.value)} value={this.state.shipping.state}/>
              <input placeholder='Zip' onChange={e => this.handleShippingChange('zip', e.target.value)} value={this.state.shipping.zip}/>
            </div>
          </div>
          <div>
            <h2>Payment</h2>
          <Elements>
            <CheckoutForm orders={this.state.orders} totalPrice={this.state.totalPrice} shipping={this.state.shipping}/>
          </Elements>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;
//checkout with have children components for each order in the cart