const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    user: {}
};

const LOGGED_IN = 'LOGGED_IN';
const IS_ADMIN = 'IS_ADMIN';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
           return {...state, isLoggedIn: true, user: action.payload};
        case IS_ADMIN:
            return {...state, isAdmin: true};
        case ADD_TO_CART:
            return {...state, cart: [...state.cart, action.payload]};
        case REMOVE_FROM_CART:
            let index = state.cart.findIndex(item => +item.id === +action.payload);
            let copy = state.cart.slice();
            copy.splice(index, 1);
            return {...state, cart: copy};
        default:
            return state;
    }
}

export function loggedIn (user) {
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function isAdmin () {
    return {
        type: IS_ADMIN
    }
}

export function addToCart (item) {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}