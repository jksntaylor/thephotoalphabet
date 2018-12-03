import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loggedOut} from '../../../redux/reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.name
            
        }
        this.logout = this.logout.bind(this);
    }

    getOrders() {
        axios.get(`/user/${this.state.email}/orders`)
    }

    logout() {
        const {loggedOut} = this.props
        axios.post('/auth/logout').then(loggedOut);
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <div className='navContainer'>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                    <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                </div>
                <h1>Welcome, {this.state.name}!</h1>
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

export default connect(mapStateToProps, {loggedOut})(User);