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
            magnified: false
        }
    }

    

    handleInputChange(value) {
        function letterChecker(val) {
            if (!val) {
                return true;
            } else if (val.match(/[a-z]/i)){
                return true;
            } else {
                return false;
            }
        }
        if (letterChecker(value[value.length-1])) {
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
        } else {
            return;
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

    toggleMagnified = () => {
        this.setState({
            magnified: !this.state.magnified
        })
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

         
        let normal= <div className='inputPageContainer'>
                        <div className='inputNavContainer'>
                            <Link to='/auth'><i className="fas fa-user fa-2x"></i></Link>
                            <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                        </div>
                        <div className='randomContainer'>
                            <div className='photosContainer'>
                                {photos}
                            </div>
                            <i className="fas fa-random fa-2x" onClick={this.handleRandomize}></i>
                            <i className="fas fa-search fa-2x" onClick={this.toggleMagnified}></i>
                        </div>
                        <div className='inputContainer'>
                            <input className='input' placeholder='Type Here!' value={inputValue} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                            {this.state.userInput.length>=3 ? <div><button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button></div> : <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                        </div>
                    </div>;

        let magnified = <div className='inputPageContainer'>
                            <div className='inputNavContainer navMagnified'>
                                <Link to='/auth'><i className="fas fa-user fa-2x"></i></Link>
                                <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                            </div>
                            <div className='randomContainer randomMagnified'>
                                <div className='photosContainer containerMagnified'>
                                    {photos}
                                </div>
                                <i className="fas fa-random fa-2x faMagnified" onClick={this.handleRandomize}></i>
                                <i class="fas fa-search fa-2x faMagnifiedToggle" onClick={this.toggleMagnified}></i>
                            </div>
                            <div className='inputContainer inputMagnified'>
                                <input className='input' placeholder='Type Here!' value={inputValue} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                                {this.state.userInput.length>=3 ? <div><button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button></div> : <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                            </div>
                        </div>;



        return (
            <div>
                {this.state.magnified ? magnified : normal}
            </div> 
        )
    }
}

export default Input;