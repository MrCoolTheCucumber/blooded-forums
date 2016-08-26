import {
    GET_FORUM_SECTIONS,
    GET_SUBCATEGORY_DATA,
    GET_THREADS
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FORUM_SECTIONS:
            return {...state, categories: action.payload};

        case GET_SUBCATEGORY_DATA:
            return {...state, subcategory: action.payload};

        case GET_THREADS:
            var key = `p_${action.payload.subcategoryId}_${action.payload.page}`;
            var newState = {...state};

            newState.threads = {
                ...state.threads,
                [key]: action.payload.data
            };

            return newState;

        default:
            return state;
    }
}