import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';

class Topic extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    renderPosts = () => {

    };

    render() {
        return (
            <div>
                <div className="category-wrapper">
                    <Link to={`/topic/${this.props.params.id}`} className="category-name">{"test123"}</Link>
                    <p className="category-description">TODO, put date here? creation user?</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Topic</th>
                            <th>v/p</th>
                            <th>Last Post</th>
                        </tr>
                        {this.renderPosts()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Topic);