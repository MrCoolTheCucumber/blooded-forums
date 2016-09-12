import React, { Component } from 'react';
import { Link } from 'react-router';

class ThreadListItem extends Component {

    render() {
        const thread = this.props.thread;
        if(!thread) {
            return <tr><th>No data??</th></tr>
        }

        return (
            <tr>
                <th className="category-subcategory-metadata">
                    <i className="fa fa-comment-o fa-2x category-subcategory-icon" aria-hidden="true"> </i>
                    <div className="category-subcategory-td-block">
                        <Link to={`/topic/${thread.id}`} className="category-subcategory-title">{thread.title}</Link>
                        <div className="category-subcategory-description"><span style={{ color: 'black'}}>by</span> {thread.username}</div>
                    </div>
                </th>
                <th className="category-subcategory-metadata">Posts: {thread.post_count}</th>
                <th className="category-subcategory-metadata">TODO</th>
            </tr>
        );
    }

}

export default ThreadListItem;