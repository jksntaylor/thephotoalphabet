import React from 'react';
import InputPhoto from '../InputPhoto/InputPhoto';

function Order (props) {
    let array = props.pictureIDs;
    let i=0;
    let photos = array.map(photo => {
        i--
        return <InputPhoto key={i} count={photo.count} letter={photo.letter}/>
    })

    return (
        <div className='photosContainer'>
            {photos}
        </div>
    )
}

export default Order;