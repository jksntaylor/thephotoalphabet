import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import InputPhoto from '../InputPhoto/InputPhoto';
import './input.css';
import Axios from 'axios';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: [],
        }
    }

    

    handleInputChange(value) {
        if (value.length<=10) {
            // this.setState({userInput: value})
            this.setState({
                userInput: value.split('').reduce((acc, letter) => {
                    return [ ...acc, { letter: letter.toUpperCase(), count: 1 }]
                }, [])
            })
        } else {
            alert('10 Letter Limit')
        }
    }

    handleRandomize = () => {
        this.setState({
            userInput: this.state.userInput.map(obj => {
                return { ...obj, count: Math.floor(Math.random() * 3)+1 }
            })
        })
    }

    addToCart = () => {
        Axios.post('/cart', {
            userInput: this.state.userInput
            // userID: this.state.userID
        }).then(response => {
            console.log(response)
            
            this.setState({
            userInput: ''
            })}
        )
        
    }

    render() {
        if (this.state.userInput) {
            var photos = this.state.userInput.map((obj, index) => {
                return (
                    <InputPhoto count={obj.count} letter={obj.letter} key={`${obj.letter}${obj.count}${index}`}/>
                )
            })
            var inputValue = this.state.userInput.reduce((acc, obj) => acc + obj.letter, '')
        } else {
            inputValue = '';
        }




        return (
            <div className='inputPageContainer'>
                <div className='inputNavContainer'>
                    <Link to='/auth'>Auth</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
                <div className='randomContainer'>
                    <div className='photosContainer'>
                        {photos}
                    </div>
                    <i className="fas fa-random fa-2x" onClick={this.handleRandomize}></i>
                </div>
                <div className='inputContainer'>
                    <input className='input' placeholder='Type Here!' value={inputValue} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                    {this.state.userInput.length>=3 ? <div><button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button></div> : <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                </div>
            </div>
        )
    }
}

export default Input;