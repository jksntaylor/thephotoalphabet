import React from 'react';
import Photo from './Photo';
import axios from 'axios';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Auth from './Auth';
import Cart from './Cart';
import '../styling/main.scss';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            userInput: [],
            inputWord: '',
            isPaneOpen: false,
            isPaneOpenLeft: false
        }
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    clearState = () => {
         this.setState({userInput: [],
                        inputWord: '',
                        isPaneOpen: false,
                        isPaneOpenLeft: false})
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
        if (val.length>8) { this.setState({error: "8 Letter Limit"}); return; }
        let userInput = val.split('').reduce((acc, letter) => {
            return [...acc, {letter: letter.toUpperCase(), count: 1}]
        }, [])
        this.setState({userInput: userInput, inputWord: val})
    }

    addToCart = () => { 
        let arr = this.state.userInput.map(e => {
            return `${e.letter}${e.count}`
        })
        axios.post(`/cart/${arr}`).then(res => {
            this.setState({inputWord: '', userInput: []});
            console.log(res.data)
        }) 
    }

    render() {
        const {userInput, inputWord, isPaneOpen, isPaneOpenLeft} = this.state;
        const blank = [1,2,3]
        let price = (30 + (inputWord.length-3)*5) - 0.01;
        let photos = userInput.length>=3 ? 
        userInput.map((obj, index) => {
            return (
                <Photo count={obj.count} letter={obj.letter} key={`${obj.letter}${obj.count}${index}`}/>
            )
        }) : blank.map(() => {
            return (
                <Photo letter='blank'/>
            )
        })
        let pWidth = userInput.length * 70;
        let iWidth = userInput.length >=3 ? 300 : 150;
        return (
            <div ref={ref => this.el = ref} className='home'>
                <header>
                    <i className='fas fa-user-alt' onClick={() => {this.setState({isPaneOpenLeft: true})}}/>
                    <div>
                        <h1>The Photo Alphabet</h1>
                        <h2>Custom Letter Photography Prints</h2>
                    </div>
                    <i className='fas fa-shopping-cart' onClick={() => {this.setState({isPaneOpen: true})}}/>
                </header>
                <SlidingPane isOpen={ isPaneOpen } width='25%' onRequestClose={() => {this.setState({ isPaneOpen: false })}}>
                    <Cart/>
                </SlidingPane>
                <SlidingPane isOpen={ isPaneOpenLeft } from='left' width='25%' onRequestClose={() => this.setState({ isPaneOpenLeft: false })}>
                    <Auth/>
                </SlidingPane>
                <div className='photos' style={{width: `${pWidth}px`}}>
                    {photos}
                </div>
                <div className='input' style={{width: iWidth}}>
                    <input placeholder='Type Here!' value={inputWord} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                    {userInput.length>=3 ? 
                    <div className='add'>
                        <h4>${price}</h4>
                        <i onClick={this.clearState} className='fas fa-times'></i>
                        <i onClick={this.addToCart}className='fas fa-cart-plus'></i>
                    </div> 
                    : 
                    <div className='add'><h5>*3 Letter Minimum</h5></div>}
                </div>
                <footer><h4>*custom framing available upon request</h4></footer>
            </div>
        )
    }
}