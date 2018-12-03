import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Handwriting from '../Handwriting/Handwriting'
import '../../handwriting.css';
import './home.css'

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <div className='home-handwriting-container'>
                    <Handwriting />
                </div>
                <div className='home-button-container'>
                    <Link to='/make' className='home-button-anchor'><button className='home-button'>GET STARTED</button></Link>
                    <div className='home-button-underline'/>
                </div>
            </div>
        )
    }
}

export default Home