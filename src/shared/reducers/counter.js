import { INCREMENT, GET_NAME_REQUEST, GET_NAME_SUCCESS, GET_NAME_FAILURE } from '../actions/counter';
import {Map, List, fromJS} from 'immutable';

const initialState = Map({
    count: 0, name: ''
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case INCREMENT:
            const count = state.get('count');

            return state.merge(Map({count: count + 1}));
        case GET_NAME_REQUEST:
            return state;
        case GET_NAME_SUCCESS:
            return state.merge(Map({ name: action.payload.name }));
        case GET_NAME_FAILURE:
            return state;
        default:
            return state;
    }
}