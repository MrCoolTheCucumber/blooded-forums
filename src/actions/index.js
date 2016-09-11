import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    GET_FORUM_SECTIONS,
    GET_THREADS,
    GET_THREAD_DATA,
    GET_SUBCATEGORY_DATA,
    GET_POSTS,
    MOVE_NANOBAR,
    CHANGE_NANOBAR
} from './types';
const ROOT_URL = 'http://api.bloodedguild.me';

export function moveNanobar(number) {
    return function(dispatch) {
        dispatch({
            type: MOVE_NANOBAR,
            payload: number
        });
    }
}

export function changeNanobar(hexColor) {
    return function(dispatch) {
        dispatch({
            type: CHANGE_NANOBAR,
            payload: {
                hexColor
            }
        });
    }
}

export function signinUser({ username, password, redirectUri }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/auth`, { username, password })
            .then( response => {
                dispatch({
                    type: AUTH_USER,
                    payload: response.data.username
                });

                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('username', response.data.username);

                if(redirectUri == '/signout') {
                    browserHistory.push('/');
                } else {
                    browserHistory.push(redirectUri);
                }
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

export function getForumSections(callback) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/categories`)
            .then( response => {
                dispatch({ type: GET_FORUM_SECTIONS, payload: response.data });
                callback();
            })
            .catch( error => {
                onError();
                //TODO
            });
    }
}

export function getSubCategoryThreads(subCategoryId, page) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/subcategories/${subCategoryId}/${(page*20)-19}-${page*20}`)
            .then( response => {
                dispatch({
                    type: GET_THREADS,
                    payload: {
                        page: page,
                        subcategoryId: subCategoryId,
                        data: response.data
                    }
                });
            })
            .catch( error => {
                //TODO
            });
    }
}

export function getSubCategoryData(subCategoryId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/subcategories/${subCategoryId}`)
            .then( response => {
                dispatch({ type: GET_SUBCATEGORY_DATA, payload: response.data });
            })
            .catch( error => {
                //TODO
            });
    }
}

export function getPosts(threadId, page) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/threads/${threadId}/${(page*20)-19}-${page*20}`)
            .then( response => {
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        page: page,
                        threadId: threadId,
                        data: response.data
                    }
                })
            })
            .catch( error => {
                //TODO
            });
    }
}

export function getThreadData(threadId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/threads/${threadId}`)
            .then( response => {
                dispatch({
                    type: GET_THREAD_DATA,
                    payload: {
                        threadId: threadId,
                        data: response.data
                    }
                })
            })
            .catch( error => {
                //TODO
            });
    }
}

export function createThread() {
    return function(dispatch) {
        console.log('creating thread!');
        axios.put(`${ROOT_URL}/forums/subcategories/1`,
            {
                title: 'yoloswag'
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`},
            })
            .then( response => {
                console.log(response);
            })
            .catch( error => {
               //TODO
            });
    }
}