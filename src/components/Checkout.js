import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import {connect} from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: {
        name: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
      orders: [],
      totalPrice: 0
    }
    // this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handleShippingChange = this.handleShippingChange.bind(this)
  }

  handleShippingChange(name, val) {
    this.setState({shipping: {...this.state.shipping, [name]: val}})
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getUserAddress();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders.length!==this.props.orders.length) {
      this.setState({orders: this.props.orders})
    }
  }

  nullToString = (val) => {
    if (val===null) {
      return val = ''
    }
    return val;
  }

  getUserAddress = () => {
    axios.get('/user/address').then(res => {
      let {name, email, address, address2, city, state, zip} = res.data
      name = this.nullToString(name);
      email = this.nullToString(email);
      address = this.nullToString(address);
      address2 = this.nullToString(address2);
      city = this.nullToString(city);
      state = this.nullToString(state);
      zip = this.nullToString(zip);
      this.setState({
        shipping: {...this.state.shipping,
          name: name,
          email: email, 
          address: address,
          address2: address2,
          city: city,
          state: state,
          zip: zip
        }
      })
    }).catch(() => {
      console.log('error')
    })
  }

  // handleSaveChange() {
  //   this.setState({
  //     save: !this.state.save
  //   })
  // }

  render() {
    return (
      <StripeProvider apiKey="pk_test_KJzSf9w3SSqFsagSRoecHHsu">
        <div className="checkoutCardContainer">
          {this.props.isLoggedIn ? <h1>Checkout</h1> : <h1>Guest Checkout</h1>}
          <div className='checkoutCardContainer2'>
            <div className='shippingContainer'>
              <h2>Shipping</h2>
              <h6>US Only</h6>
              <div className='shippingForm'>
                {/* <span>Save Address for Future Use?</span><input type='checkbox' onChange={this.handleSaveChange}/> */}
                <input placeholder='Name' onChange={e => this.handleShippingChange('name', e.target.value)} value={this.state.shipping.name}/>
                <input placeholder='Email' onChange={e => this.handleShippingChange('email', e.target.value)} value={this.state.shipping.email}/>
                <input placeholder='Address' onChange={e => this.handleShippingChange('address', e.target.value)} value={this.state.shipping.address}/>
                <input placeholder='Address 2' onChange={e => this.handleShippingChange('address2', e.target.value)} value={this.state.shipping.address2}/>
                <input placeholder='City' onChange={e => this.handleShippingChange('city', e.target.value)} value={this.state.shipping.city}/>
                <input placeholder='State' onChange={e => this.handleShippingChange('state', e.target.value)} value={this.state.shipping.state}/>
                <input placeholder='Zip' onChange={e => this.handleShippingChange('zip', e.target.value)} value={this.state.shipping.zip}/>
              </div>
            </div>
            <div className='paymentContainer'>
              <h2>Payment</h2>
            <Elements>
              <CheckoutForm orders={this.state.orders} totalPrice={this.props.totalPrice} shipping={this.state.shipping}/>
            </Elements>
            </div>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(Checkout);
//checkout with have children components for each order in the cart