import React from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';
import './home.css';
import axios from 'axios';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            userInput: [],
            inputWord: ''
        }
    }

    handleDelete = () => {
        let {userInput, inputWord} = this.state;
        let newInput = inputWord.slice(0, inputWord.length-1)
        this.setState({userInput: userInput.pop(), inputWord: newInput})
    }

    handleInputChange = val => {
        if (!val) {this.setState({userInput: [], inputWord: ''}); return;}
        if (val.length<this.state.inputWord.length) this.handleDelete();
        if (!val.match(/[a-z]/i)) return;
        if (val.length>10) { this.setState({error: "10 Letter Limit"}); return; }
        let userInput = val.split('').reduce((acc, letter) => {
            return [...acc, {letter: letter.toUpperCase(), count: 1}]
        }, [])
        this.setState({userInput: userInput, inputWord: val})
    }

    addToCart = () => { axios.post(`/cart/${this.state.userInput}`).then(() => {this.setState({userInput: ''})}) }

    render() {
        const {userInput, inputWord} = this.state;
        let price = (30 + (inputWord.length-3)*5) - 0.01;
        let photos = userInput.length>=3 ? 
        userInput.map((obj, index) => {
            return (
                <InputPhoto count={obj.count} letter={obj.letter} key={`${obj.letter}${obj.count}${index}`}/>
            )
        }) : null
        return (
            <div className='inputPageContainer'>    
                <div className={'photosContainer'}>
                    {photos}
                </div>
                <div className='inputContainer'>
                    <input className='input' placeholder='Type Here!' value={inputWord} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                    {userInput.length>=3 ? 
                    <div className='inputPriceContainer'>
                        <h3 className='inputPrice'>Price: ${price}</h3>
                        <button onClick={this.addToCart} className='addToCartButton'>Add To Cart</button>
                    </div> 
                    : 
                    <div className='inputMinLength'><h6 >Word Must be At Least 3 Letters</h6></div>}
                </div>
            </div>
        )
    }
}