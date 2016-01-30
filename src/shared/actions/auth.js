import { CALL_API, getJSON } from 'redux-api-middleware';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function login(username, password, redirectAfterLogin) {
    return {
        [CALL_API]: {
            endpoint: '/api/login',
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            types: [LOGIN_REQUEST, {
                type: LOGIN_SUCCESS,
                payload: { username: username, redirectAfterLogin: redirectAfterLogin }
            }, LOGIN_FAILURE],
            credentials: 'include'
        }
    }
}