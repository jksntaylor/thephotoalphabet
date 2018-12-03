import React, {Component} from 'react';
import {connect} from 'react-redux';

class User extends Component {
    render() {
        console.log(this.props.user)
        return (
            <div>User</div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);