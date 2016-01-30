import { CALL_API, getJSON } from 'redux-api-middleware';
export const INCREMENT = "INCREMENT";
export const GET_NAME_REQUEST = "GET_NAME_REQUEST";
export const GET_NAME_SUCCESS = "GET_NAME_SUCCESS";
export const GET_NAME_FAILURE = "GET_NAME_FAILURE";

export function increment() {
    return {
        type: INCREMENT
    };
}

export function getName(username, password, redirectAfterLogin) {
    return {
        [CALL_API]: {
            endpoint: '/api/counter',
            method: 'GET',
            types: [GET_NAME_REQUEST, GET_NAME_SUCCESS, GET_NAME_FAILURE],
            credentials: 'include'
        }
    }
}