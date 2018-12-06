import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paid: false,
      processed: false,
      error: false,
      orders: [],
      totalPrice: 0,
      shipping: {}
    }
    this.submit = this.submit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders.length!==this.props.orders.length) {
      this.setState({orders: this.props.orders, totalPrice: this.props.totalPrice, shipping: this.props.shipping})
    }
  }

  async submit() {
      this.state.orders.map(order => {
        let {price, pictureIDs} = order
        let shipping = this.state.shipping
        this.setState({totalPrice: this.state.totalPrice += price})
        
        axios.post('/order', {price, pictureIDs, shipping}).then(() => {
          console.log('Order Processed');
          this.setState({processed: true})
        }).catch(() => {
          this.setState({error: true});
          return;
        })
        return ('Order Processed');
      })
      let token = await this.props.stripe.createToken({name: 'Name'})
      console.log(token);
      let id = token.token.id
      let price = this.state.totalPrice;
      axios.post('/charge', {id, price}).then(() => {
          console.log('Purchase Completed');
          this.setState({paid: true})
      }).catch(() => {
        this.setState({error: true})
      })

  }

  render() {
    if (this.state.paid && this.state.processed) {
        return (<h1>Purchase Complete</h1>)
    }

    if (this.state.error) {
      return (<h1>There was an error completing your purchase</h1>)
    }

    return (
      <div className="checkout">
        <CardElement />
        <p>This site does not save payment details, we apologize for the inconvenience</p>
        <button onClick={this.submit}>Complete</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);