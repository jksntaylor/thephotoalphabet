import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      save: false
    }
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handleShippingChange = this.handleShippingChange.bind(this);
  }

  handleShippingChange(name, val) {
    this.setState({[name]: val})
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
              <input placeholder='Name' onChange={e => this.handleShippingChange('name', e.target.value)} value={this.state.name}/>
              <input placeholder='Address' onChange={e => this.handleShippingChange('address', e.target.value)} value={this.state.address}/>
              <input placeholder='Address 2' onChange={e => this.handleShippingChange('address2', e.target.value)} value={this.state.address2}/>
              <input placeholder='City' onChange={e => this.handleShippingChange('city', e.target.value)} value={this.state.city}/>
              <input placeholder='State' onChange={e => this.handleShippingChange('state', e.target.value)} value={this.state.state}/>
              <input placeholder='Zip' onChange={e => this.handleShippingChange('zip', e.target.value)} value={this.state.zip}/>
              <span>Save Address for Future Use?</span><input type='checkbox' onChange={this.handleSaveChange}/>
            </div>
          </div>
          <div>
            <h2>Payment</h2>
          <Elements>
            <CheckoutForm />
          </Elements>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
//checkout with have children components for each order in the cart