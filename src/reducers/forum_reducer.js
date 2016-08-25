import {
    GET_FORUM_SECTIONS
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FORUM_SECTIONS:
            return { ...state, categories: action.payload };
        default:
            return state;
    }
}