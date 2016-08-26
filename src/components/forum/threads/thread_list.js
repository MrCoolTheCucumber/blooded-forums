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

        //TODO
        return <tr><th>loading</th></tr>
    };

    render() {
        const subcategory = this.props.subcategory;

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
}

export default ThreadList;