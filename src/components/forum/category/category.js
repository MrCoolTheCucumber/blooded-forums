import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ForumCategory from '../forum_category';
import _404 from '../../404';

class Category extends Component {

    constructor(props) {
        super(props);
    }

    getId = () => {
        return /^\d+/.exec(this.props.params.id);
    };

    componentWillMount() {
        this.props.setBreadcrumbs({ ...this.props.breadcrumbs, subcategory: null, thread: null });

        this.props.getForumSections(() => {}, true, this.getId());
    }

    renderCategory = (id) => {
        for(var i = 0; i < this.props.categories.length; ++i) {
            if(this.props.categories[i].id == id) {
                return <ForumCategory category={this.props.categories[i]}/>
            }
        }
        //TODO
        return <_404/>
    };

    render() {
        if (this.props.categories) {
            return (
                <div>
                    {this.renderCategory(this.getId())}
                </div>
            );
        }


        return <div>Loading...</div>
    }
}

function mapStateToProps(state) {
    return {
        categories: state.forum.categories,
        breadcrumbs: state.breadcrumbs.breadcrumbs
    };
}

export default connect(mapStateToProps, actions)(Category);