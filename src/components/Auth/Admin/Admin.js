import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {loggedOut} from '../../../redux/reducer';

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
            this.setState({
                orders: response.data
            })
        })
        console.log(this.state.orders);
    }
    
    logout() {
        const {loggedOut} = this.props
        axios.post('/auth/logout').then(loggedOut);
    }

    componentDidMount() {
        this.getOrders();
    }

    render() {
        console.log(this.props.user);
        return (
            <div>
                 <div className='navContainer'>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                    <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                </div>
                <h1>Welcome, {this.props.user.name}!</h1>
                <button onClick={this.logout}>Logout</button>
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