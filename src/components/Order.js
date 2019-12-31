import React from 'react';
import Photo from './Photo';

function Order (props) {
    let array = props.pictureIDs;
    console.log(array[0])
    let i=0;
    // let photos = array.map(photo => {
    //     i--
    //     return <Photo key={i} count={photo.count} letter={photo.letter}/>
    // })

    return (
        <div className='photosContainer'>
            {/* {photos} */}
        </div>
    )
}

export default Order;