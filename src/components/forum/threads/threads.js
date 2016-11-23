import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';
import ThreadList from './thread_list';
import PageButtons from '../page_buttons';

class Threads extends Component {

    constructor(props) {
        super(props);
    }

    parseId = (id) => {
        return /^\d+/.exec(id);
    };

    componentWillMount() {
        this.props.setBreadcrumbs({ ...this.props.breadcrumbs, thread: null });

        //always? get subcategory threads, check query first
        const page = this.getPage(this.props);
        this.props.getSubCategoryThreads(this.parseId(this.props.params.id), page);

        //make a call to get a specific subcategory data
        this.props.getSubCategoryData(this.parseId(this.props.params.id));
    }

    componentWillUpdate(nextProps) {
        if(nextProps.location.query.page !== undefined && nextProps.location.query.page != this.getPage(this.props)) {
            this.props.getSubCategoryThreads(this.parseId(nextProps.params.id), this.getPage(nextProps));
        }
    }

    getSubCategory = () => {
        return this.props.subcategory;
    };

    getPage = (props) => {
        if(props.location.query.page) {
            return props.location.query.page;
        } else {
            return 1;
        }
    };

    renderCreateThreadButton = () => {
        if(this.props.authenticated) {
            return (
                <Link to={`/forum/${this.props.params.id}/create`} className="page-button button-create-thread">Create thread</Link>
            );
        } else {
            return null;
        }
    };

    render() {
        const subcategory = this.getSubCategory();
        const page = this.getPage(this.props);

        if (this.props.subcategory != null) {
            return (
                <div>
                    <ThreadList subcategory={subcategory} threads={this.props.threads} id={this.parseId(this.props.params.id)} page={page}/>
                    <div className="page-list-wrapper">
                        <div className="page-button-pages">Pages:</div>
                        <PageButtons totalThreads={subcategory.thread_count} currentPage={page} pathName={this.props.location.pathname}/>
                        {this.renderCreateThreadButton()}
                    </div>
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
        authenticated: state.auth.authenticated,
        categories: state.forum.categories,
        subcategory: state.forum.subcategory,
        threads: state.forum.threads,
        breadcrumbs: state.breadcrumbs.breadcrumbs
    };
}

export default connect(mapStateToProps, actions)(Threads);