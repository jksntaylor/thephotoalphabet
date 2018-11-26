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
        this.getPhoto = this.getPhoto.bind(this);
    }

    componentDidMount() {
        this.getPhoto();
    }

    handleUpButton = () => {
        if (this.state.letterCount===4) {
            this.setState({letterCount: 1})
        } else {
            this.setState({letterCount: this.state.letterCount+1})
        }
        this.getPhoto();
    }

    handleDownButton = () => {
        if (this.state.letterCount===1) {
            this.setState({letterCount: 4})
        } else {
            this.setState({letterCount: this.state.letterCount-1})
        }
        this.getPhoto();
    }

    getPhoto() {
        let {letter, letterCount} = this.state;
        axios.get(`/api/photos/${letter}/${letterCount}`).then(response => {
            console.log(response);
            this.setState({url: response.data[0].photourl})
            }
        )
        console.log(this.state.url);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleUpButton}>^</button>
                <img src={this.state.url} alt='' height='90' width='60'/>
                <button onClick={this.handleDownButton}>v</button>
            </div>
        )
    }
}

export default InputPhoto;