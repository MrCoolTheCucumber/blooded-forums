import {
    SET_BREADCRUMBS
} from '../actions/types';
import { INITIAL_STATE } from './initial_state';

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return { ...state, breadcrumbs: action.payload };
        default:
            return state;
    }
}
