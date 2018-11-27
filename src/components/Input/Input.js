import React, {Component} from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';
import Menu from '../Menu/Menu';
import './input.css';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            pictureIDs: [],
        }
    }

    

    handleInputChange(value) {
        if (value.length<=10) {
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
                  <InputPhoto letter={letter}/>
            )
        })


        return (
            <div>
                <Menu/>
                <div className='photosContainer'>
                    {photos}
                </div>
                    <i className="fas fa-random fa-2x"></i>
                <div className='inputContainer'>
                    <input className='input' placeholder='Make Your Own!' value={this.state.userInput} onChange={e => this.handleInputChange(e.target.value)} type="text" />
                </div>
            </div>
        )
    }
}

export default Input;