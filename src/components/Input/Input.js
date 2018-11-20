import React, {Component} from 'react';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            pictures: [],
        }
    }

    render() {
        return (
            <div>Input</div>
        )
    }
}

export default Input;

//input with have children components for each letter in input (map through the input string and render a component for each)