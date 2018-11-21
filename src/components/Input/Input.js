import React, {Component} from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            pictures: [],
        }
    }

    handleInputChange(value) {
        this.setState({userInput: value})
    }

    // handleClick() {

    // }

    render() {
        return (
            <div>
                <InputPhoto/>
                <div>Make Your Own</div>
                <input placeholder='Make Your Own!' value={this.state.userInput} onChange={e => this.handleInputChange(e.target.value)}/>
            </div>
        )
    }
}

export default Input;

//input with have children components for each letter in input (map through the input string and render a component for each)