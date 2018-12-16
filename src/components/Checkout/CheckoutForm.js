import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import {connect} from 'react-redux';
import {emptyCart} from '../../redux/reducer';
import {Link} from 'react-router-dom';

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

  emptyCart = () => {
    axios.post('/cart/empty').then(() => {
      console.log('Cart emptied')
    })
  }



  async submit() {
      
      let token = await this.props.stripe.createToken({name: 'Name'})
      let id = token.token.id
      let totalPrice = this.props.totalPrice;
      axios.post('/charge', {id, totalPrice}).then(() => {
          console.log('Purchase Completed');
          this.setState({paid: true});
          this.state.orders.map(order => {
            let {price, pictureIDs} = order
            let shipping = this.props.shipping
            this.setState({totalPrice: this.state.totalPrice += price})
            
            if (this.props.isLoggedIn) {
              axios.post('/order', {price, pictureIDs, shipping}).then(() => {
                console.log('Order Processed');
                this.setState({processed: true})
              }).catch(() => {
                this.setState({error: true});
                return;
              })
            } else {
              axios.post('/guestorder', {price, pictureIDs, shipping}).then(() => {
                console.log('Guest Order Processed');
                this.setState({processed: true})
              }).catch(() => {
                this.setState({error: true});
                return;
              })
            }
            this.emptyCart();
            return ('Order Processed');
          })
      }).catch(() => {
        this.setState({error: true})
      })

  }



  render() {

    if (!this.props.totalPrice) {
      return (
        <h1>There is nothing in the cart</h1>
      )
    }

    if (this.state.paid && this.state.processed) {
        return (
          <div className='purchase-complete'>
            <h1>Purchase Complete</h1>
            <Link to='/make'><button>Continue Shopping</button></Link>
          </div>
        )
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

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}


export default injectStripe(connect(mapStateToProps, {emptyCart})(CheckoutForm));