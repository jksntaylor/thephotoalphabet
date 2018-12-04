import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class App extends Component {

  render() {
    return (
      <StripeProvider apiKey="pk_test_KJzSf9w3SSqFsagSRoecHHsu">
        <div className="checkoutCardContainer">
          <h1>Checkout</h1>
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