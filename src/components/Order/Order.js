import React from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';

function Order (props) {
    let array = props.pictureIDs;

    let photos = array.map(photo => {
        return <InputPhoto count={photo.count} letter={photo.letter}/>
    })

    return (
        <div className='photosContainer'>
            {photos}
        </div>
    )
}

export default Order;