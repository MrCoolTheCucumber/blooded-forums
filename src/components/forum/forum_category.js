import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class ForumCategory extends Component {

    renderMoment = (timestamp) => {
        var date = '';
        date = date
            .concat(timestamp.substring(0, 10))
            .concat(timestamp.substring(11,19));

        return moment(date, "YYYY-MM-DDHH:mm:ss").calendar();
    };

    renderTitleLink = (title) => {
        var out = title;

        if(title.length >= 35) {
            title = title.substring(0, 32).concat('...');
        }

        return out;
    };

    renderLastPost = (post) => {
        if(post.id === undefined) {
            return (
                <th className="category-subcategory-metadata category-subcategory-lastpost">
                    <div className="lastpost-nopost">
                        -  -  -  -
                    </div>
                </th>
            );
        }

        return (
            <th className="category-subcategory-metadata category-subcategory-lastpost">

                <div className="lastpost-img-container">
                    <img crossOrigin="Anonymous" src={`//${post.user.avatar}`} alt="avatar" width={45} height={45}/>
                </div>

                <div className="lastpost-meta-data-container">
                    <div className="lastpost-thread-link">
                        <Link to={`/topic/${post.thread_id}`}>{this.renderTitleLink(post.title)}</Link>
                    </div>
                    <div className="lastpost-by">{`${this.renderMoment(post.timestamp)} by ${post.user.username}`}</div>
                </div>
            </th>
        )
    };

    renderSubCategories = (subcategories, parentId) => {
        return subcategories.map( subcategory => {
            return (
                <tr key={parentId + '.' + subcategory.id}>
                    <th className="category-subcategory-metadata">
                        <i className="fa fa-comments-o fa-2x category-subcategory-icon" aria-hidden="true"> </i>
                        <div className="category-subcategory-td-block">
                            <Link to={`/forum/${subcategory.id}`} className="category-subcategory-title">{subcategory.title}</Link>
                            <div className="category-subcategory-description">{subcategory.description}</div>
                        </div>
                    </th>
                    <th className="category-subcategory-metadata category-subcategory-tp">Threads: {subcategory.thread_count}</th>
                    {this.renderLastPost(subcategory.post)}
                </tr>
            );
        });
    };


    render() {
        return (
            <div className="category-wrapper">
                <Link to={`/category/${this.props.category.id}`} className="category-name">{this.props.category.title}</Link>
                <p className="category-description">{this.props.category.description}</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Forums</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                    {this.renderSubCategories(this.props.category.subcategories, this.props.category.id)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ForumCategory;