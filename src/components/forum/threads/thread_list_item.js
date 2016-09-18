import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class ThreadListItem extends Component {

    renderMoment = (timestamp) => {
        var date = '';
        date = date
            .concat(timestamp.substring(0, 10))
            .concat(timestamp.substring(11,19));

        return moment(date, "YYYY-MM-DDHH:mm:ss").calendar();
    };

    renderAvatar = (avatar) => {
        if(avatar.length >= 4 && avatar.substring(avatar.length - 4) === 'gifv') {
            return (
                <video preload="auto" muted autoPlay="autoplay" loop="loop" width={45} height={45}>
                    <source src={`//${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`//${avatar}`} alt="avatar" width={45} height={45}/>
    };

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
                        <div className="category-subcategory-description">
                            <span style={{ color: 'black'}}>by&nbsp;</span> {thread.user_thread.username},&nbsp;{this.renderMoment(thread.timestamp)}
                        </div>
                    </div>
                </th>
                <th className="category-subcategory-metadata category-subcategory-tp">Posts: {thread.post_count}</th>

                <th className="category-subcategory-metadata category-subcategory-lastpost">

                    <div className="lastpost-img-container">
                        {this.renderAvatar(thread.user_post.avatar)}
                    </div>

                    <div className="lastpost-meta-data-container">
                        <div className="lastpost-thread-link">{thread.user_post.username}</div>
                        <div className="lastpost-by">{`${this.renderMoment(thread.posts_timestamp)}`}</div>
                    </div>
                </th>
            </tr>
        );
    }

}

export default ThreadListItem;