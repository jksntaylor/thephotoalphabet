import React, {Component} from 'react';
import axios from 'axios';

class InputPhoto extends Component {
    constructor(props) {
        super(props);
        this.state={
            letter: props.letter,
            letterCount: 1,
            url: ''
        }
    }

    handleUpButton = () => {
        if (this.state.letterCount===10) {
            this.setState({letterCount: 1})
        } else {
            this.setState({letterCount: this.state.letterCount+1})
        }
    }

    handleDownButton = () => {
        if (this.state.letterCount===1) {
            this.setState({letterCount: 10})
        } else {
            this.setState({letterCount: this.state.letterCount-1})
        }
    }

    getPhoto() {
        let {letter, letterCount} = this.state;
        axios.get(`/photos/${letter}${letterCount}`)
    }

    render() {
        return (
            <div>
                <button onClick={this.handleUpButton}>^</button>
                <h1>{this.state.letter}{this.state.letterCount}</h1>
                <button onClick={this.handleDownButton}>v</button>
            </div>
        )
    }
}

export default InputPhoto;