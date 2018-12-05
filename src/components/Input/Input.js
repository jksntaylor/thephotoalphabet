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
            magnified: 0,
            randomFade: false
        }
    }

    

    handleInputChange(value) {
        this.setState({magnified: 0});
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
        setTimeout(() => {
            this.setState({
                userInput: this.state.userInput.map(obj => {
                    return { ...obj, count: Math.floor(Math.random() * 3)+1 }
                })
            });    
        }, 221);
        this.setState({randomFade: true}, () => {setTimeout(() => {
            this.setState({randomFade: false})
        }, 1100)})
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
        if (this.state.magnified===0) {
            this.setState({magnified: 1})
        } else if (this.state.magnified===1) {
            this.setState({magnified: 2}, () => {
                setTimeout(() => {
                    this.setState({magnified: 0})
                }, 1010);
            })
        } else {
            this.setState({magnified: 1})
        }
    }

    render() {
        if (this.state.randomFade) {
            var fade = 'fadeActive'
        } else {
            fade = ''
        }

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

         
        let base= <div className='inputPageContainer'>
                        <div className='inputNavContainer'>
                            <Link to='/auth'><i className="fas fa-user fa-2x"></i></Link>
                            <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                        </div>
                        <div className='randomContainer'>
                            <div className={'photosContainer ' + fade}>
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

        let magnifiedEnter = <div className='inputPageContainer'>
                            <div className='inputNavContainer navMagnifiedEnter'>
                                <Link to='/auth'><i className="fas fa-user fa-2x"></i></Link>
                                <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                            </div>
                            <div className='randomContainer randomMagnifiedEnter'>
                                <div className='photosContainer containerMagnifiedEnter'>
                                    {photos}
                                </div>
                                <i className="fas fa-random fa-2x faMagnifiedEnter" onClick={this.handleRandomize}></i>
                                <i class="fas fa-search fa-2x faMagnifiedToggleEnter" onClick={this.toggleMagnified}></i>
                            </div>
                            <div className='inputContainer inputMagnifiedEnter'>
                                <input className='input' placeholder='Type Here!' value={inputValue} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                                {this.state.userInput.length>=3 ? <div><button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button></div> : <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                            </div>
                        </div>;

        let magnifiedExit = <div className='inputPageContainer'>
                            <div className='inputNavContainer navMagnifiedExit'>
                            <Link to='/auth'><i className="fas fa-user fa-2x"></i></Link>
                            <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                        </div>
                        <div className='randomContainer randomMagnifiedExit'>
                            <div className='photosContainer containerMagnifiedExit'>
                                {photos}
                            </div>
                            <i className="fas fa-random fa-2x faMagnifiedExit" onClick={this.handleRandomize}></i>
                            <i class="fas fa-search fa-2x faMagnifiedToggleExit" onClick={this.toggleMagnified}></i>
                        </div>
                        <div className='inputContainer inputMagnifiedExit'>
                            <input className='input' placeholder='Type Here!' value={inputValue} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                            {this.state.userInput.length>=3 ? <div><button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button></div> : <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                        </div>
                    </div>;

        if (this.state.magnified===0) {
            var input = base
        } else if (this.state.magnified===1) {
            input = magnifiedEnter
        } else {
            input = magnifiedExit
        }



        return (
            <div>
               {input}
            </div> 
        )
    }
}

export default Input;