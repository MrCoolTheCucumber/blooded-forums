import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import Header from './header';
import Breadcrumbs from './breadcrumbs';

class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Breadcrumbs/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(App);
