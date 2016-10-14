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
    SET_BREADCRUMBS,
    MOVE_NANOBAR,
    CHANGE_NANOBAR,
    GET_USER_DATA,
    SET_EDIT_POST_DATA
} from './types';
import { ROOT_URL } from '../global_constants';

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

export function signinUser({ username, password, redirectUri }, callback, onError) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/auth`, { username, password })
            .then( response => {
                dispatch({
                    type: AUTH_USER,
                    payload: {
                        username: response.data.username,
                        id: response.data.id,
                        group: response.data.group
                    }
                });

                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('group', response.data.group);

                callback();

                if(redirectUri === '/signout' || redirectUri === '/signup') {
                    browserHistory.push('/');
                } else {
                    browserHistory.push(redirectUri);
                }
            })
            .catch( error => {
                onError();
                dispatch(authError(error.response.data.description));
            });
    }
}

export function signupUser({ username, password, firstName, lastName, email }) {
    return function(dispatch) {
        axios.put(`${ROOT_URL}/forums/users`,
            {
                username,
                password_hash: password,
                f_name: firstName,
                l_name: lastName,
                email
            })
            .then( response => {
                localStorage.setItem('username', response.data.username);

                axios.post(`${ROOT_URL}/auth`, { username, password })
                    .then( response2 => {
                        dispatch({
                            type: AUTH_USER,
                            payload: {
                                username: response2.data.username,
                                id: response2.data.id,
                                group: response2.data.group
                            }
                        });

                        localStorage.setItem('token', response2.data.access_token);
                        localStorage.setItem('username', response2.data.username);
                        localStorage.setItem('id', response2.data.id);
                        localStorage.setItem('group', response2.data.group);

                        browserHistory.push('/');
                    })
                    .catch( error => {
                        dispatch(authError(error.response.data.description));
                    });


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

export function signoutUser(callback) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setTimeout(function() {
        callback();
        browserHistory.push('/');
    }, 1000);

    return { type: UNAUTH_USER };
}

export function clearAuthError() {
    return { type: CLEAR_AUTH_ERROR };
}

export function getForumSections(callback, updateBreadcrumbs, id) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/categories`)
            .then( response => {
                dispatch({ type: GET_FORUM_SECTIONS, payload: response.data });
                callback();

                if(updateBreadcrumbs) {
                    const categories = response.data;
                    for(var i = 0; i < categories.length; ++i) {
                        if(categories[i].id == id) {
                            dispatch({
                                type: SET_BREADCRUMBS,
                                payload: {
                                    category: {
                                        title: categories[i].title,
                                        id: categories[i].id
                                    }
                                }
                            });
                        }
                    }
                }
            })
            .catch( error => {
                console.log(error)
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

                const subcategory = response.data;
                const breadcrumbsObject = {
                    category: {
                        title: subcategory.category.title,
                        id: subcategory.category.id
                    },
                    subcategory: {
                        title: subcategory.title,
                        id: subcategory.id
                    }
                };

                dispatch({
                    type: SET_BREADCRUMBS,
                    payload: breadcrumbsObject
                });
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
                });

                const topic = response.data[0];
                const breadcrumbsObject = {
                    category: {
                        title: topic.category.title,
                        id: topic.category.id
                    },
                    subcategory: {
                        title: topic.subcategory.title,
                        id: topic.subcategory.id
                    },
                    thread: {
                        title: topic.title,
                        id: topic.id
                    }
                };

                dispatch({
                    type: SET_BREADCRUMBS,
                    payload: breadcrumbsObject
                });
            })
            .catch( error => {
                //TODO
            });
    }
}

export function createThread(title, subCategoryId, content, callback) {
    return function(dispatch) {
        axios.put(`${ROOT_URL}/forums/subcategories/${subCategoryId}`,
            {
                title,
                content
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            })
            .then( response => {
                callback(0);
                browserHistory.push(`/topic/${response.data.id}`);
            })
            .catch( error => {
                callback(1)
            });
    }
}

export function createPost(threadId, content, callback) {
    return function(dispatch) {
        axios.put(`${ROOT_URL}/forums/threads/${threadId}`,
            {
                content: content
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            })
            .then( response => {
                callback(0);
                browserHistory.push(`/topic/${threadId}`);
            })
            .catch( error => {
                callback(1);
            });
    }
}

export function setBreadcrumbs(breadcrumbsObject) {
    return function(dispatch) {
        dispatch({
            type: SET_BREADCRUMBS,
            payload: breadcrumbsObject
        });
    }
}

export function getUserData(userId, updateBreadcrumbs) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/forums/users/${userId}`)
            .then( response => {
                dispatch({
                    type: GET_USER_DATA,
                    payload: response.data[0]
                });

                if(updateBreadcrumbs !== undefined && updateBreadcrumbs && response.data.length != 0) {
                    const breadcrumbsObject = {
                        profile: response.data[0]
                    };

                    dispatch({
                        type: SET_BREADCRUMBS,
                        payload: breadcrumbsObject
                    });
                }
            })
            .catch( error => {
                //todo
            })
    }
}

export function changeUserPassword(password, callback) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/forums/users`,
            {
                password_hash: password
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        ).then( response => {
            if(callback) {
                callback();
            }
        }).catch( error => {
            //TODO
        });

    }
}

export function changeUserAvatar(avatarUri, callback) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/forums/users`,
            {
                avatar: avatarUri
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        ).then( response => {
            if(callback) {
                callback(0);
            }
        }).catch( error => {
            if(callback) {
                callback(1);
            }
        });
    }
}

export function setThreadLocked(isLocked, threadId, subcatId) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/forums/threads/${threadId}`,
            {
                locked: isLocked
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        ).then( response => {
            browserHistory.push(`/forum/${subcatId}`);
        }).catch( error => {
            //TODO
        });
    }
}

export function setThreadSticky(isSticky, threadId, subcatId) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/forums/threads/${threadId}`,
            {
                sticky: isSticky
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        ).then( response => {
            browserHistory.push(`/forum/${subcatId}`);
        }).catch( error => {
            //TODO
        });
    }
}

export function setEditPostHtml(content, threadId, postId) {
    return function(dispatch) {
        dispatch({
            type: SET_EDIT_POST_DATA,
            payload: {
                content,
                threadId,
                postId
            }
        });
    }
}

export function clearEditPostHtml() {
    return function(dispatch) {
        dispatch({
            type: SET_EDIT_POST_DATA,
            payload: null
        });
    }
}

export function sendEditedPost(threadId, postId, content) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/forums/threads/${threadId}/${postId}`,
            {
                content: content
            },
            {
                headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
            }
        ).then( response => {
            browserHistory.push(`/topic/${threadId}`);
        }).catch( error => {
           //TODO
        });
    }
}