import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Breadcrumbs extends Component {

    render() {
        return (
            <div id="crumbs">
                <ul>
                    <li><Link to="/" className="crumbs-link">Home</Link></li>
                </ul>
            </div>
        );
    }
}

export default connect(null, null)(Breadcrumbs);