import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {loggedOut} from '../redux/reducer';
import Photo from './Photo';

class User extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
        this.logout= this.logout.bind(this);
    }

    getOrders = () => {
        axios.get('/user/orders').then(response => {
            this.setState({
                orders: response.data
            })
            console.log(this.state.orders);
        })
    }
    
    logout() {
        const {loggedOut} = this.props
        axios.post('/auth/logout').then(loggedOut);
    }

    componentDidMount() {
        this.getOrders();
    }

    render() {
        const orders = this.state.orders.map(order => {
            let {address, address2, city, date, delivered, email, id, name, paid, photoids, price, processed, shipped, state, zip} = order;
            let actualDate = date.slice(0, 10)
            if (paid) {
                var paidIcon = <i className="fas fa-check fa-2x"></i>
            } else {
                paidIcon = <i className="fas fa-times fa-2x"></i>
            }
            if (processed) {
                var processedIcon = <i className="fas fa-check fa-2x"></i>
            } else {
                processedIcon = <i className="fas fa-times fa-2x"></i>
            }
            if (shipped) {
                var shippedIcon = <i className="fas fa-check fa-2x"></i>
            } else {
                shippedIcon = <i className="fas fa-times fa-2x"></i>
            }
            if (delivered) {
                var deliveredIcon = <i className="fas fa-check fa-2x"></i>
            } else {
                deliveredIcon = <i className="fas fa-times fa-2x"></i>
            }
            const photos = photoids.map((obj, index) => {
                let ids = JSON.parse(obj);
                let letter = ids.letter;
                let count = ids.count;
                return (
                        <Photo count={count} letter={letter} key={`${letter}${count}${index}`}/>
                )
            })
            return (
                <div className='userOrderContainer'key={id}>
                    <div className='userPhotosContainer'>
                        {photos}
                    </div>
                    <div className='userOrderInfoContainer'>
                        <h2 className='userOrderName'>{name} || {email}</h2>
                        <h2 className='userOrderAddress'>{address} {address2}, {city} {state} {zip}</h2>
                        <h2 className='userOrderDate'>${price} || {actualDate} </h2>
                        <div className='userOrderBooleanContainer'>
                            <div className='userOrderBoolean'>
                                <h3>Paid</h3>
                                {paidIcon}
                            </div>
                            <div className='userOrderBoolean'>
                                <h3>Processed</h3>
                                {processedIcon}
                            </div>
                            <div className='userOrderBoolean'>
                                <h3>Shipped</h3>
                                {shippedIcon}
                            </div>
                            <div className='userOrderBoolean'>
                                <h3>Delivered</h3>
                                {deliveredIcon}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='userContainer'>
                <div className='userAuth'>
                    <h1>Welcome, {this.props.user.name}!</h1>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <div className='userOrdersContainer'>
                    <h3>Current Orders</h3>
                    {orders}
                </div>
            </div>
        )
    }  
}

let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {loggedOut})(User);