import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR
} from './types';

const ROOT_URL = 'http://api.bloodedguild.me';

export function signinUser({ username, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/auth`, { username, password })
            .then( response => {
                dispatch({
                    type: AUTH_USER,
                    payload: username
                });

                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('username', response.data.username);

                browserHistory.push('/');
            })
            .catch( error => {
                dispatch(authError(error.response.data.description));
            });
    }
}

export function signupUser({ username, password, firstName, lastName, email }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { username, password, firstName, lastName, email })
            .then( response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.access_token);
                browserHistory.push('/');
            })
            .catch( error => {
                dispatch(authError(error.response.data.description));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return { type: UNAUTH_USER };
}

export function clearAuthError() {
    return { type: CLEAR_AUTH_ERROR };
}