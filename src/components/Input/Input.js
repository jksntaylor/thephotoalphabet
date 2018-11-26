import React, {Component} from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            pictureIDs: [],
        }
    }

    

    handleInputChange(value) {
        if (this.state.userInput.length<10) {
        this.setState({userInput: value})
        } else if(value.length<11) {
            this.setState({userInput: value})
        } else {
            alert('10 Letter Limit')
        }
    }

    // handleClick() {

    // }

    render() {
        let inputArray = this.state.userInput.toUpperCase().split('');
        let photos = inputArray.map(letter => {
            return (
                <div>
                  <InputPhoto letter={letter}/>
                </div>
            )
        })


        return (
            <div>
                {photos}
                <div>Make Your Own</div>
                <input placeholder='Make Your Own!' value={this.state.userInput} onChange={e => this.handleInputChange(e.target.value)}/>
            </div>
        )
    }
}

export default Input;

//input with have children components for each letter in input (map through the input string and render a component for each)