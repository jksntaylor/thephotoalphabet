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
    }
    this.submit = this.submit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders.length!==this.props.orders.length) {
      this.setState({orders: this.props.orders})
    }
  }



  async submit() {
      
      let token = await this.props.stripe.createToken({name: 'Name'})
      console.log(token);
      let id = token.token.id
      let totalPrice = this.props.totalPrice;
      axios.post('/charge', {id, totalPrice}).then(() => {
          console.log('Purchase Completed');
          this.setState({paid: true});
          this.state.orders.map(order => {
            let {price, pictureIDs} = order
            let shipping = this.props.shipping
            console.log('SHIPPING CHECKOUTFORM', shipping, '///')
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
      }).catch(() => {
        this.setState({error: true})
      })

  }



  render() {
    if (this.state.paid && this.state.processed) {
        return (<h1>Purchase Complete</h1>)
    }

    if (this.state.error) {
      return (<h3>There was an error completing your purchase, please refresh the browser</h3>)
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