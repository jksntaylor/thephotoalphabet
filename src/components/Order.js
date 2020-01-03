import React from 'react';
import Photo from './Photo';

function Order (props) {
    let arr = props.config.split(',');
    let photos = arr.map((letter, i) => {
        return <Photo key={i} letter={letter}/>
    })

    return (
        <div className='photos'>
            {photos}
        </div>
    )
}

export default Order;