import React, {Component} from 'react';
import axios from 'axios';

class InputPhoto extends Component {
    constructor(props) {
        super(props);
        this.state={
            letter: props.letter,
            letterCount: +props.count,
            url: ''
        }
        this.getPhoto = this.getPhoto.bind(this);
    }

    componentDidMount() {
        this.getPhoto();
    }

    handleUpButton = () => {
        if (this.state.letterCount===4) {
            this.setState({letterCount: 1}, this.getPhoto)
        } else {
            this.setState({letterCount: this.state.letterCount+1}, this.getPhoto)
        }
    }

    handleDownButton = () => {
        if (this.state.letterCount===1) {
            this.setState({letterCount: 4}, this.getPhoto)
        } else {
            this.setState({letterCount: this.state.letterCount-1}, this.getPhoto)
        }
    }

    getPhoto() {
        let {letter, letterCount} = this.state;
        axios.get(`/api/photos/${letter}/${letterCount}`).then(response => {
            this.setState({url: response.data[0].photourl})
            }
        )
    }

    render() {
        return (
            <div className='photo-container'>
                {/* <button onClick={this.handleUpButton}>^</button> */}
                <i onClick={this.handleUpButton} className="fas fa-angle-up"></i>
                <img src={this.state.url} alt=''/>
                <i  onClick={this.handleDownButton} className="fas fa-angle-down"></i>
                {/* <button onClick={this.handleDownButton}>v</button> */}
            </div>
        )
    }
}

export default InputPhoto;