import React, {Component} from 'react';

class InputPhoto extends Component {
    constructor() {
        super();
        this.state={
            letter: 'A',
            letterCount: 1,
            url: ''
        }
    }

    handleUpButton = () => {
        console.log('hello');
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

    render() {
        return (
            <div>
                <button onClick={this.handleUpButton}>^</button>
                <h1>{this.state.letterCount}</h1>
                <button onClick={this.handleDownButton}>v</button>
            </div>
        )
    }
}

export default InputPhoto;