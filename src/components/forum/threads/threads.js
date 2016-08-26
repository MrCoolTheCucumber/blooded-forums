import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';
import ThreadListItem from './thread_list_item';

class Threads extends Component {

    componentWillMount() {
        //always? get subcategory threads, check query first
        if(this.props.location.query.page) {
            this.props.getSubCategoryThreads(this.props.params.id, this.props.location.query.page);
        } else {
            this.props.getSubCategoryThreads(this.props.params.id, 1);
        }

        //if there is no overall category data, make a call to get a specific subcategory data
        if(!this.props.categories) {
            this.props.getSubCategoryData(this.props.params.id);
        }
    }

    renderThreads = () => {
        const threads = this.props.threads;

        var page;
        if(this.props.location.query.page) {
            page = this.props.location.query.page;
        } else {
            page = 1
        }

        const key = `p_${this.props.params.id}_${page}`;

        if (threads != null) {
            if (threads[key] != null) {
                return threads[key].map(thread => {
                    return (
                        <ThreadListItem key={thread.id} thread={thread}/>
                    );
                });
            }
        }

        //TODO
        return <tr><th>loading</th></tr>
    };

    render() {
        var subcategory;
        if(this.props.categories) {
            var found = false;
            for(var i = 0; i < this.props.categories.length; ++i) {
                for(var j = 0; j < this.props.categories[i].subcategories.length; ++j) {
                    if(this.props.categories[i].subcategories[j].id == this.props.params.id) {
                        subcategory = this.props.categories[i].subcategories[j];
                        found = true;
                        break;
                    }
                }
                if(found) {
                    break;
                }
            }
        } else {
            subcategory = this.props.subcategory;
        }

        if ((this.props.categories != null || this.props.subcategory != null)) {
            return (
                <div className="category-wrapper">
                    <Link to={`/forum/${subcategory.id}`} className="category-name">{subcategory.title}</Link>
                    <p className="category-description">{subcategory.description}</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Topic</th>
                            <th>v/p</th>
                            <th>Last Post</th>
                        </tr>
                        {this.renderThreads()}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div>Loading...</div>
        );
    }

}

function mapStateToProps(state) {
    return {
        categories: state.forum.categories,
        subcategory: state.forum.subcategory,
        threads: state.forum.threads
    };
}

export default connect(mapStateToProps, actions)(Threads);