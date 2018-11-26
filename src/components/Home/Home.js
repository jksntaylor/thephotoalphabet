import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Handwriting from '../Handwriting/Handwriting'
import '../../handwriting.css'

class Home extends Component {
    render() {

        return (
            <div>
                <Handwriting />
                <Link to='/make'><button>Get Started</button></Link>
            </div>
        )
    }
}

export default Home