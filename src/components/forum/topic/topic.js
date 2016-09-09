import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';

class Topic extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //always? get post data first, check query first
        const page = this.getPage(this.props);
        this.props.getPosts(this.props.params.id, page);

        //always? get the thread data?
        this.props.getThreadData(this.props.params.id);
    }

    renderPosts = () => {

    };

    getPage = (props) => {
        if(props.location.query.page) {
            return props.location.query.page;
        } else {
            return 1;
        }
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