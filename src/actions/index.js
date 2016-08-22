import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://api.bloodedguild.me';

export function signinUser({ username, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { username, password })
            .then( response => {

                dispatch({ type: AUTH_USER });

                localStorage.setItem('token', response.data.token);

                browserHistory.push('/');
            })
            .catch( () => {
                //TODO better/correct error messages
                dispatch(authError('There was an error!'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}