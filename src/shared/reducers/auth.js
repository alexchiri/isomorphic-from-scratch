import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/auth';
import {Map, List, fromJS} from 'immutable';

const initialState = Map({
    username: "", loggedIn: false, errorMessage: "", redirectAfterLogin:""
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state;
        case LOGIN_SUCCESS:
            return state.merge(Map({username: action.payload.username, loggedIn: true, errorMessage: "", redirectAfterLogin:action.payload.redirectAfterLogin}));
        case LOGIN_FAILURE:
            return state.merge(Map({username: "", loggedIn: false, errorMessage: "Login failed!!!", redirectAfterLogin:""}));
        default:
            return state;
    }
}