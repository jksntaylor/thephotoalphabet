import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this);
  }

  async submit() {
      let token = await this.props.stripe.createToken({name: 'Name'})
      console.log(token);
      let id = token.token.id
      axios.post('/charge', {id}).then(() => {
          console.log('Purchase Completed');
          this.setState({complete: true})
      })
  }

  render() {
    if (this.state.complete) {
        return (<h1>Purchase Complete</h1>)
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