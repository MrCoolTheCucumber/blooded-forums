import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Breadcrumbs extends Component {

    //For now just stay at home
    render() {
        return (
            <div id="crumbs">
                <ul>
                    <li>Home</li>
                </ul>
            </div>
        );
    }
}

export default connect(null, null)(Breadcrumbs);