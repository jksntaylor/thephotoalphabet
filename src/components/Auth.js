import React from 'react';
import Login from './Login';
import User from './User';
import Admin from './Admin';
import {connect} from 'react-redux';

function Auth (props) {
    return props.isAdmin ? <Admin/> : props.isLoggedIn ? <User/> : <Login/>
}

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps)(Auth);