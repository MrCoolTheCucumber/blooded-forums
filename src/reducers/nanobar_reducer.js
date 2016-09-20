import {
    MOVE_NANOBAR,
    CHANGE_NANOBAR
} from '../actions/types';
import { INITIAL_STATE } from './initial_state';

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case MOVE_NANOBAR:
            return {...state, go: action.payload};
        case CHANGE_NANOBAR:
            return {...state, hexColor: action.payload.hexColor};
        default:
            return state;
    }
}