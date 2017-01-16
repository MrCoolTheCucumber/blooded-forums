import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from './global_constants';

import App from './components/app';
import requireAuth from './components/auth/require_authentication';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Forum from './components/forum/forum'
import Category from './components/forum/category/category';
import Threads from './components/forum/threads/threads';
import CreateThread from './components/forum/threads/create_thread';
import EditPost from './components/forum/topic/edit_post';
import Topic from './components/forum/topic/topic';
import CreatePost from './components/forum/topic/create_post';
import Profile from './components/forum/profile/profile';
import Settings from './components/forum/profile/settings';
import _404 from './components/404';
import reducers from './reducers';
import { AUTH_USER, UNAUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const username = localStorage.getItem('username');

if(localStorage.getItem('token') && username) {

    axios.get(`${ROOT_URL}/auth/refresh`,
        {
            headers: { Authorization: `JWT ${localStorage.getItem('token')}`}
        })
        .then( response => {
            localStorage.setItem('token', response.data.access_token);
            store.dispatch({
                type: AUTH_USER,
                payload: {
                    username: response.data.username,
                    group: response.data.group,
                    id: response.data.id,
                    privilege: response.data.privilege
                }
            });
        })
        .catch( error => {
            store.dispatch({
                type: UNAUTH_USER,
                payload: {}
            });
        });


}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={App} >

                <IndexRoute component={Forum}/>

                <Route path="signin" component={Signin}/>
                <Route path="signout" component={Signout}/>
                <Route path="signup" component={Signup}/>

                <Route path="category/:id" component={Category}/>

                <Route path="forum/:id" component={Threads}/>
                <Route path="forum/:id/create" component={requireAuth(CreateThread)}/>

                <Route path="topic/:id" component={Topic}/>
                <Route path="topic/:id/create" component={requireAuth(CreatePost)}/>
                <Route path="topic/:id/edit" component={requireAuth(EditPost)}/>

                <Route path="profile/:id" component={Profile}/>
                <Route path="settings" component={requireAuth(Settings)}/>

                <Route path="*" components={_404}/>
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container'));
