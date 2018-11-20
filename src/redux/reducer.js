const initialState = {};

const DEMO = 'DEMO'

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DEMO:
           return state;
        default:
            break;
    }
}