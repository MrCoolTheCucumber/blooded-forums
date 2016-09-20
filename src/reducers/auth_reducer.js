import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR
} from '../actions/types';
import { INITIAL_STATE } from './initial_state';

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                error: '',
                authenticated: true,
                username: action.payload.username,
                id: action.payload.id,
                group: action.payload.group
            };
        case UNAUTH_USER:
            return { ...state, authenticated: false, username: null};
        case AUTH_ERROR:
            return { ...state, error: action.payload};
        case CLEAR_AUTH_ERROR:
            return { ...state, error: '' };
        default:
            return state;
    }
}