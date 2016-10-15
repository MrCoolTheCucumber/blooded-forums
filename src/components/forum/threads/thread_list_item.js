import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import renderUsername from '../../../helpers/username_renderer';
import slugTitle from '../../../helpers/title_sluger';

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
                <video preload="auto" muted autoPlay="autoplay" loop="loop" style={{ maxHeight: 45, maxWidth: 45, width: 'auto', height: 'auto' }}>
                    <source src={`//${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`//${avatar}`} alt="avatar" style={{ maxHeight: 45, maxWidth: 45, width: 'auto', height: 'auto' }}/>
    };

    renderIcon = (thread) => {
        switch (thread.locked) {
            case false:
                return <i className="fa fa-comment-o fa-2x category-subcategory-icon" aria-hidden="true">&nbsp;</i>;
            case true:
                return <i className="fa fa-ban fa-2x category-subcategory-icon" aria-hidden="true">&nbsp;</i>
        }
    };

    renderStickyBadge = (isSticky) => {
        if(isSticky) {
            return (
                <span>
                    <span className="pinned-badge">PINNED</span>&nbsp;
                </span>
            );
        }

        return null
    };

    render() {
        const thread = this.props.thread;
        if(!thread) {
            return null;
        }

        return (
            <li>
                <div className="forum-list-item-wrapper">

                    <div className="forum-list-chip forum-list-item-icon-wrapper">
                        {this.renderIcon(thread)}
                    </div>

                    <div className="forum-list-chip forum-list-item-metadata-block">
                        <div className="forum-list-item-metadata-title">
                            <Link to={`/topic/${thread.id}-${slugTitle(thread.title)}`} className="category-subcategory-title">
                                {this.renderStickyBadge(thread.sticky)}
                                {thread.title}
                            </Link>
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
                                {renderUsername(thread.user_post)}
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