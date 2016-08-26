import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';
import ThreadList from './thread_list';

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

    getSubCategory = () => {
        if(this.props.categories) {
            for(var i = 0; i < this.props.categories.length; ++i) {
                for(var j = 0; j < this.props.categories[i].subcategories.length; ++j) {
                    if(this.props.categories[i].subcategories[j].id == this.props.params.id) {
                        return this.props.categories[i].subcategories[j];
                    }
                }
            }
        } else {
            return this.props.subcategory;
        }
    };

    getPage = () => {
        if(this.props.location.query.page) {
            return this.props.location.query.page;
        } else {
            return 1;
        }
    };

    render() {
        const subcategory = this.getSubCategory();
        const page = this.getPage();

        if (this.props.categories != null || this.props.subcategory != null) {
            return (
                <ThreadList subcategory={subcategory} threads={this.props.threads} id={this.props.params.id} page={page}/>
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