import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import InputPhoto from '../InputPhoto/InputPhoto';
import './input.css';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: [],
            pictureIDs: [],
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
        console.log(this.state.userInput);
        this.setState({
            userInput: this.state.userInput.map(obj => {
                return { ...obj, count: Math.floor(Math.random() * 3)+1 }
            })
        })
    }

    render() {
        let photos = this.state.userInput.map((obj, index) => {
            return (
                  <InputPhoto count={obj.count} letter={obj.letter} key={`${obj.letter}${obj.count}${index}`}/>
            )
        })


        return (
            <div>
                <Link to='/auth'>Auth</Link>
                <Link to='/cart'>Cart</Link>
                <div className='photosContainer'>
                    {photos}
                </div>
                <i className="fas fa-random fa-2x" onClick={this.handleRandomize}></i>
                <div className='inputContainer'>
                    <input className='input' placeholder='Make Your Own!' value={this.state.userInput.reduce((acc, obj) => acc + obj.letter, '')} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                </div>
                {this.state.userInput.length>=3 ? <div><button>Add To Cart</button></div> : <div><h6>Word Must be At Least 3 Letters</h6></div>}
            </div>
        )
    }
}

export default Input;