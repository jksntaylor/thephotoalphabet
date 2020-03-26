 import React from 'react';

function Photo (props) {

    let handleUp = () => {
        let arr = props.letter.split('');
        if (arr[1]===4||arr[1]==='4') arr[1]=1;
        else arr[1]++
        props.update(props.index, arr.join(''));
    }

    let handleDown = () => {
        let arr = props.letter.split('');
        if (arr[1]===1||arr[1]==='1') arr[1]=4;
        else arr[1]--
        props.update(props.index, arr.join(''));
    }

    return props.letter === 'blank' ? 
    <div className='letter blank'/>
    :
    <div className='letter'>
        <i onClick={handleUp} className="fas fa-angle-up"></i>
        <img src={require(`../assets/letters/${props.letter}.jpg`)} alt={props.letter}/>
        <i  onClick={handleDown} className="fas fa-angle-down"></i>
    </div>
}

export default Photo;