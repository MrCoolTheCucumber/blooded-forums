import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Breadcrumbs extends Component {

    renderCategory = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.category != null) {
            const category = this.props.breadcrumbs.category;

            return (
                <li>
                    <Link className="crumbs-link" to={`/category/${category.id}`}>{category.title}</Link>
                </li>

            );
        }
    };

    renderSubCategory = () => {
        if(this.props.breadcrumbs != null && this.props.breadcrumbs.subcategory != null) {
            const subcategory = this.props.breadcrumbs.subcategory;

            return (
                <li>
                    <Link className="crumbs-link" to={`/forum/${subcategory.id}`}>{subcategory.title}</Link>
                </li>
            );
        }
    };

    render() {
        return (
            <div id="crumbs">
                <ul>
                    <li>
                        <Link to="/" className="crumbs-link">Home</Link>
                    </li>
                    {this.renderCategory()}
                    {this.renderSubCategory()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { breadcrumbs: state.breadcrumbs.breadcrumbs };
}

export default connect(mapStateToProps, null)(Breadcrumbs);