import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import renderUsername from '../../../helpers/username_renderer';

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
            <li>
                <div className="forum-list-item-wrapper">

                    <div className="forum-list-chip forum-list-item-icon-wrapper">
                        <i className="fa fa-comment-o fa-2x category-subcategory-icon" aria-hidden="true">&nbsp;</i>
                    </div>

                    <div className="forum-list-chip forum-list-item-metadata-block">
                        <div className="forum-list-item-metadata-title">
                            <Link to={`/topic/${thread.id}`} className="category-subcategory-title">{thread.title}</Link>
                        </div>
                        <div className="forum-list-item-metadata-description forum-list-item-secondary-text">
                            <span style={{ color: 'black'}}>by&nbsp;</span> {renderUsername(thread.user_thread)},&nbsp;{this.renderMoment(thread.timestamp)}
                        </div>
                    </div>

                    <div className="forum-list-chip forum-list-item-tp forum-list-item-secondary-text">
                        {`Posts: ${thread.post_count}`}
                    </div>

                    <div>
                        <div className="forum-list-chip forum-list-item-avatar-container">
                            {this.renderAvatar(thread.user_post.avatar)}
                        </div>

                        <div className="forum-list-chip forum-list-last-post-metadata-block">
                            <div className="lastpost-thread-link">
                                <Link to={`/profile/${thread.user_post.id}`}>{renderUsername(thread.user_post)}</Link>
                            </div>
                            <div className="lastpost-by">{`${this.renderMoment(thread.posts_timestamp)}`}</div>
                        </div>
                    </div>

                </div>
            </li>
        );
    }

}

export default ThreadListItem;