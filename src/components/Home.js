import React from 'react';
import Photo from './Photo';
import axios from 'axios';
import {connect} from 'react-redux';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Modal from 'react-modal';
import Admin from './Admin';
import User from './User';
import Login from './Login';
import Cart from './Cart';
import '../styling/main.scss';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            config: [],
            inputWord: '',
            price: 0,
            isPaneOpen: false,
            isPaneOpenLeft: false,
            cartSize: 0
        }
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
        this.getCart();
    }

    clearState = () => {
         this.setState({config: [],
                        inputWord: '',
                        price: 0,
                        isPaneOpen: false,
                        isPaneOpenLeft: false})
    }

    handleDelete = () => {
        let {config, inputWord} = this.state;
        this.setState({config: config.pop(), inputWord: inputWord.slice(0, inputWord.length-1)})
    }

    validate = val => {
        let a = val.split('');
        let r = true;
        a.forEach(l => {
            if (!l.match(/[a-z]/gi)) {
                r = false;
            }
        })
        return r;
    }

    handleInputChange = val => {
        if (val.length<this.state.inputWord.length) this.handleDelete();
        if (!this.validate(val)) return;
        if (!val) { this.clearState(); return; }
        if (val.length>10) { this.setState({error: "10 Letter Limit"}); return; }
        let config = val.split('').reduce((acc, letter) => {
            return [...acc, `${letter.toUpperCase()}1`]
        }, []);
        let price = (30 + (this.state.inputWord.length-3)*5) - 0.01;
        this.setState({config: config, inputWord: val, price: price})
    }

    updateInput = (index, val) => {
        let temp = this.state.config;
        temp[index] = val;
        this.setState({config: temp})
    }

    addToCart = () => { 
        const {config, price} = this.state
        axios.post(`/cart/${config}`, {price: price}).then(() => {
            this.clearState();
            this.getCart();
        }) 
    }

    getCart = () => {
        axios.get('/cart').then(res => {
            this.setState({cartSize: res.data.length})
        })
    }

    render() {
        const {config, inputWord, price, isPaneOpen, isPaneOpenLeft, cartSize} = this.state;
        const blank = [1,2,3]
        let photos = config.length>=3 ? 
        config.map((letter, index) => {
            return (
                <Photo letter={letter} index={index} key={index} update={this.updateInput}/>
            )
        }) : blank.map(e => { return <Photo letter='blank' key={e}/>})
        let pWidth = config.length * 70;
        let iWidth = config.length >=3 ? 300 : 150;
        return (
            <div ref={ref => this.el = ref} className='home'>
                <header>
                    <i className='fas fa-user-alt' onClick={() => {this.setState({isPaneOpenLeft: true})}}/>
                    <div>
                        <h1>The Photo Alphabet</h1>
                        <h2>Custom Letter Photography Prints</h2>
                    </div>
                    <i className='fas fa-shopping-cart' onClick={() => {this.setState({isPaneOpen: true})}}><h6>{cartSize > 0 ? cartSize : null}</h6></i>
                </header>
                <SlidingPane title="Cart" isOpen={ isPaneOpen } width='300px' onRequestClose={() => {this.setState({ isPaneOpen: false })}}>
                    <Cart updateCart={this.getCart}/>
                </SlidingPane>
                <SlidingPane isOpen={ isPaneOpenLeft } from='left' width='300px' onRequestClose={() => this.setState({ isPaneOpenLeft: false })}>
                    {this.props.isAdmin ? <Admin/> : this.props.isLoggedIn ? <User/> : <Login/>}
                </SlidingPane>
                <div className='photos' style={{width: `${pWidth}px`}}>
                    {photos}
                </div>
                <div className='input' style={{width: iWidth}}>
                    <input placeholder='Type Here!' value={inputWord} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                    {config.length>=3 ? 
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

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps)(Home)