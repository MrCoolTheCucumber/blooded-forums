import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Forum extends Component {

    componentWillMount() {
        this.props.getForumSections();
    }

    renderSubCategories = (subcategories, parentId) => {
        return subcategories.map( subcategory => {
            return (
                <tr key={parentId + '.' + subcategory.id}>
                    <th className="category-subcategory-metadata">
                        <i class="fa fa-comments-o fa-2x category-subcategory-icon" aria-hidden="true"> </i>
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
                <div key={category.id} className="category-wrapper">
                    <h1 className="category-name">{category.title}</h1>
                    <p className="category-description">{category.description}</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>Forum</th>
                                <th>t/p</th>
                                <th>Last Post</th>
                            </tr>
                            {this.renderSubCategories(category.subcategories, category.id)}
                        </tbody>
                    </table>
                </div>
            );
        });
    };

    render() {
        const categories = this.props.categories;

        if (categories) {
            console.log(this.renderCategories());
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