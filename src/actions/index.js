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
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.access_token);
                browserHistory.push('/');
            })
            .catch( response => {
                //TODO better/correct error messages
                dispatch(authError('There was an error!'));
            });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then( response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.access_token);
                browserHistory.push('/');
            })
            .catch( response => {
                //TODO better/correct error messages
                dispatch(authError('There was an error!'))
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
    return { type: UNAUTH_USER };
}

export function clearAuthError() {
    return { type: CLEAR_AUTH_ERROR };
}