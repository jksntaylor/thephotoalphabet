import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class App extends Component {

    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) console.log("Purchase Complete!")
      }

  render() {
    return (
      <StripeProvider apiKey="pk_test_KJzSf9w3SSqFsagSRoecHHsu">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
//checkout with have children components for each order in the cart