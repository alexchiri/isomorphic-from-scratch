import { INCREMENT } from '../actions/counter';
import {Map} from 'immutable'

const initialState = {
    count: 0
};

export default function reducer(state = initialState, action = {}) {
    console.log("in the reducer");

    switch (action.type) {
        case INCREMENT:
            console.log("called increment");

            const { count } = state;
            return {
                count: count + 1
            };
        default:
            return state;
    }
}