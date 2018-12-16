import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {loggedOut} from '../../../redux/reducer';
import InputPhoto from '../../InputPhoto/InputPhoto';
import './admin.css'

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
        this.logout= this.logout.bind(this);
    }

    getOrders = () => {
        axios.get('/admin/orders').then(response => {
            console.log(response);
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
            let {address, address2, city, date, delivered, email, id, name, paid, photoids, price, processed, shipped, state, userid, zip} = order;
            let {guestname, guestemail, guestaddress, guestaddress2, guestcity, gueststate, guestzip} = order;
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
                        <InputPhoto count={count} letter={letter} key={`${letter}${count}${index}`}/>
                )
            })
            if (userid) {
                var fullInfo = <div>
                                <h2 className='adminOrderName'>{name} || {email}</h2>
                                <h2 className='adminOrderAddress'>{address} {address2}, {city} {state} {zip}</h2>
                                <h2 className='adminOrderDate'>${price} || {actualDate} </h2>
                               </div>
            } else {
                fullInfo = <div>
                            <h2 className='adminOrderName'>{guestname} || {guestemail}</h2>
                            <h2 className='adminOrderAddress'>{guestaddress} {guestaddress2}, {guestcity} {gueststate} {guestzip}</h2>
                            <h2 className='adminOrderDate'>${price} || {actualDate} </h2>
                           </div>
            }

            return (
                <div className='adminOrderContainer'key={id}>
                    <div className='adminPhotosContainer'>
                        {photos}
                    </div>
                    <div className='adminOrderInfoContainer'>
                        {fullInfo}
                        <div className='adminOrderBooleanContainer'>
                            <div className='adminOrderBoolean'>
                                <h3>Paid</h3>
                                {paidIcon}
                            </div>
                            <div className='adminOrderBoolean'>
                                <h3>Processed</h3>
                                {processedIcon}
                            </div>
                            <div className='adminOrderBoolean'>
                                <h3>Shipped</h3>
                                {shippedIcon}
                            </div>
                            <div className='adminOrderBoolean'>
                                <h3>Delivered</h3>
                                {deliveredIcon}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='adminContainer'>
                    <div className='navContainer'>
                    <Link to='/'><i className='fas fa-home fa-2x'></i></Link>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                    <Link to='/auth'><i className="fas fa-user fa-3x"></i></Link>
                    <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                </div>
                <div className='adminAuth'>
                    <h1>Welcome, {this.props.user.name}!</h1>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <div className='adminOrdersContainer'>
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

export default connect(mapStateToProps, {loggedOut})(Admin);