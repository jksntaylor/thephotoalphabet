import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false}
    this.submit = this.submit.bind(this);
  }

//   async submit() {
//     let {token} = await this.props.stripe.createToken({name: "Name"});
//     let response = await axios.post("/charge", {
//       method: "POST",
//       headers: {"Content-Type": "text/plain"},
//       body: token.id
//     });
  
//     if (response.ok) {
//         console.log("Purchase Complete!");
//         this.setState({complete: true})
//     }
//   }
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
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);