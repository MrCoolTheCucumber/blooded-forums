import React, { Component } from 'react';
import { Link } from 'react-router';
import ThreadListItem from './thread_list_item';

class ThreadList extends Component {

    renderThreads = () => {
        const key = `p_${this.props.id}_${this.props.page}`;

        if (this.props.threads) {
            if (this.props.threads[key]) {
                return this.props.threads[key].map(thread => {
                    return (
                        <ThreadListItem key={thread.id} thread={thread}/>
                    );
                });
            }
        }

        return <tr><th> </th></tr>
    };

    render() {
        const subcategory = this.props.subcategory;

        return (
            <div className="category-wrapper">
                <div className="category-header-wrapper">
                    <Link to={`/forum/${subcategory.id}`} className="category-name">{subcategory.title}</Link>
                    <p className="category-description">{subcategory.description}</p>
                </div>

                <div className="forum-list-wrapper">
                    <ul>
                        {this.renderThreads()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ThreadList;