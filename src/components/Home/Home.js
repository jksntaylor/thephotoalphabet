import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <div>The Photo Alphabet</div>
                <Link to='/make'><button>Get Started</button></Link>
            </div>
        )
    }
}

export default Home