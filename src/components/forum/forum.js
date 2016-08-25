import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ForumCategory from './forum_category';

class Forum extends Component {

    renderSubCategories = (subcategories, parentId) => {
        return subcategories.map( subcategory => {
            return (
                <tr key={parentId + '.' + subcategory.id}>
                    <th className="category-subcategory-metadata">
                        <i className="fa fa-comments-o fa-2x category-subcategory-icon" aria-hidden="true"> </i>
                        <div className="category-subcategory-td-block">
                            <div className="category-subcategory-title">{subcategory.title}</div>
                            <div className="category-subcategory-description">{subcategory.description}</div>
                        </div>
                    </th>
                    <th className="category-subcategory-metadata">TODO</th>
                    <th className="category-subcategory-metadata">TODO</th>
                </tr>
            );
        });
    };

    renderCategories = () => {
        return this.props.categories.map( category => {
            return (
                <ForumCategory key={category.id} category={category}/>
            );
        });
    };

    render() {
        const categories = this.props.categories;

        if (categories) {
            return (
                <div id="categories-wrapper">
                    {this.renderCategories()}
                </div>
            );
        }

        return (
            <div>Loading!</div>
        );
    }
}

function mapStateToProps(state) {
    return { categories: state.forum.categories };
}

export default connect(mapStateToProps, actions)(Forum);