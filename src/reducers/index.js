import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import forumReducer from './forum_reducer';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    forum: forumReducer
});

export default rootReducer;
