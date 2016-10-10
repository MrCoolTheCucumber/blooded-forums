import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import * as actions from '../../../actions';
import PageButtons from '../page_buttons';
import moment from 'moment';
import renderUsername, { gmStyle, devStyle } from '../../../helpers/username_renderer';

class Topic extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //always? get post data first, check query first
        const page = this.getPage(this.props);
        this.props.getPosts(this.props.params.id, page);

        //always? get the thread data?
        this.props.getThreadData(this.props.params.id);
    }

    componentWillUpdate(nextProps) {
        if(nextProps.location.query.page !== undefined && nextProps.location.query.page != this.getPage(this.props)) {
            this.props.getPosts(nextProps.params.id, this.getPage(nextProps));
        }
    }

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
                <video preload="auto" autoPlay="autoplay" muted loop="loop" style={{ maxHeight: 150, maxWidth: 150, width: 'auto', height: 'auto' }}>
                    <source src={`//${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`//${avatar}`} alt="avatar" style={{ maxHeight: 150, maxWidth: 150, width: 'auto', height: 'auto' }} />
    };

    createMarkup = (dirtyContent) => {
        return {
            __html: dirtyContent
        };
    };

    renderForumRanks = (user) => {
        switch (user.group) {
            case 'gm':
                return (
                    <div>
                        <div className="rank-banner gm-rank-banner">
                            <img width={16} height={16} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI2Ny41IDI2Ny41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjcuNSAyNjcuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNMjU2Ljk3NSwxMDAuMzRjMC4wNDEsMC43MzYtMC4wMTMsMS40ODUtMC4xOTgsMi4yMjlsLTE2LjUsNjZjLTAuODMyLDMuMzI1LTMuODEyLDUuNjYzLTcuMjM4LDUuNjgxbC05OSwwLjUgIGMtMC4wMTMsMC0wLjAyNSwwLTAuMDM4LDBIMzVjLTMuNDQ0LDAtNi40NDUtMi4zNDYtNy4yNzctNS42ODhsLTE2LjUtNjYuMjVjLTAuMTktMC43NjQtMC4yNDUtMS41MzQtMC4xOTctMi4yODkgIEM0LjY0Myw5OC41MTIsMCw5Mi41MzksMCw4NS41YzAtOC42ODUsNy4wNjUtMTUuNzUsMTUuNzUtMTUuNzVTMzEuNSw3Ni44MTUsMzEuNSw4NS41YzAsNC44OTEtMi4yNDEsOS4yNjctNS43NSwxMi4xNTggIGwyMC42NTgsMjAuODE0YzUuMjIxLDUuMjYxLDEyLjQ2Niw4LjI3NywxOS44NzgsOC4yNzdjOC43NjQsMCwxNy4xMi00LjE2MiwyMi4zODItMTEuMTM1bDMzLjk1LTQ0Ljk4NCAgQzExOS43NjYsNjcuNzgsMTE4LDYzLjg0MiwxMTgsNTkuNWMwLTguNjg1LDcuMDY1LTE1Ljc1LDE1Ljc1LTE1Ljc1czE1Ljc1LDcuMDY1LDE1Ljc1LDE1Ljc1YzAsNC4yMTItMS42NzIsOC4wMzUtNC4zNzUsMTAuODY0ICBjMC4wMDksMC4wMTIsMC4wMiwwLjAyMiwwLjAyOSwwLjAzNWwzMy43MDQsNDUuMTA4YzUuMjYsNy4wNCwxMy42NDYsMTEuMjQzLDIyLjQzNSwxMS4yNDNjNy40OCwwLDE0LjUxNC0yLjkxMywxOS44MDMtOC4yMDMgIGwyMC43ODgtMjAuNzg4QzIzOC4zMDEsOTQuODY5LDIzNiw5MC40NTEsMjM2LDg1LjVjMC04LjY4NSw3LjA2NS0xNS43NSwxNS43NS0xNS43NXMxNS43NSw3LjA2NSwxNS43NSwxNS43NSAgQzI2Ny41LDkyLjM1MSwyNjMuMDk1LDk4LjE3OCwyNTYuOTc1LDEwMC4zNHogTTIzOC42NjcsMTk4LjI1YzAtNC4xNDItMy4zNTgtNy41LTcuNS03LjVoLTE5NGMtNC4xNDIsMC03LjUsMy4zNTgtNy41LDcuNXYxOCAgYzAsNC4xNDIsMy4zNTgsNy41LDcuNSw3LjVoMTk0YzQuMTQyLDAsNy41LTMuMzU4LDcuNS03LjVWMTk4LjI1eiIgZmlsbD0iI2ZmMzMzMyIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                            <span style={{ ...gmStyle, verticalAlign: 'middle' }}>&nbsp;Guild Master</span>
                        </div>
                        <div className="rank-banner forum-dev-banner">
                            <img width={16} height={16} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwMy40NzcgMzAzLjQ3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAzLjQ3NyAzMDMuNDc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik0yOTguNjA0LDY0LjIwOWwtNDkuOTc4LDQ5Ljk3OUwyMDQuOTA3LDk4LjU3TDE4OS4yOSw1NC44NTJsNDkuOTc5LTQ5Ljk3OWMtMzIuNzkxLTEwLjk3LTcwLjQxOC0zLjQyLTk2LjUyOSwyMi42OTIgIGMtMjUuNjI5LDI1LjYyOS0zMy4zNzMsNjIuMzQ5LTIzLjI4MSw5NC43MDRjLTEuMzU5LDEuMDctMi42NzYsMi4yMjItMy45MywzLjQ3NkwxMi44ODQsMjI4LjM4OSAgYy0xNy4xNzgsMTcuMTc3LTE3LjE3OCw0NS4wMjcsMCw2Mi4yMDVjMTcuMTc4LDE3LjE3OCw0NS4wMjksMTcuMTc4LDYyLjIwNywwbDEwMi42NDUtMTAyLjY0NWMxLjI1NC0xLjI1NCwyLjQwNC0yLjU3LDMuNDc1LTMuOTI5ICBjMzIuMzU1LDEwLjA5Miw2OS4wNzQsMi4zNDcsOTQuNzAzLTIzLjI4MkMzMDIuMDI0LDEzNC42MjYsMzA5LjU3NSw5Ny4wMDEsMjk4LjYwNCw2NC4yMDl6IiBmaWxsPSIjMDBjYzY2Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                            <span style={{ ...devStyle, verticalAlign: 'middle' }}>&nbsp;Developer</span>
                        </div>
                    </div>
                );
            case 'dev':
                return (
                    <div className="rank-banner forum-dev-banner">
                        <img width={16} height={16} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwMy40NzcgMzAzLjQ3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAzLjQ3NyAzMDMuNDc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik0yOTguNjA0LDY0LjIwOWwtNDkuOTc4LDQ5Ljk3OUwyMDQuOTA3LDk4LjU3TDE4OS4yOSw1NC44NTJsNDkuOTc5LTQ5Ljk3OWMtMzIuNzkxLTEwLjk3LTcwLjQxOC0zLjQyLTk2LjUyOSwyMi42OTIgIGMtMjUuNjI5LDI1LjYyOS0zMy4zNzMsNjIuMzQ5LTIzLjI4MSw5NC43MDRjLTEuMzU5LDEuMDctMi42NzYsMi4yMjItMy45MywzLjQ3NkwxMi44ODQsMjI4LjM4OSAgYy0xNy4xNzgsMTcuMTc3LTE3LjE3OCw0NS4wMjcsMCw2Mi4yMDVjMTcuMTc4LDE3LjE3OCw0NS4wMjksMTcuMTc4LDYyLjIwNywwbDEwMi42NDUtMTAyLjY0NWMxLjI1NC0xLjI1NCwyLjQwNC0yLjU3LDMuNDc1LTMuOTI5ICBjMzIuMzU1LDEwLjA5Miw2OS4wNzQsMi4zNDcsOTQuNzAzLTIzLjI4MkMzMDIuMDI0LDEzNC42MjYsMzA5LjU3NSw5Ny4wMDEsMjk4LjYwNCw2NC4yMDl6IiBmaWxsPSIjMDBjYzY2Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                        <span style={{ ...devStyle, verticalAlign: 'middle' }}>&nbsp;Developer</span>
                    </div>
                );
            default:
                return null;
        }
    };

    renderEditPostButton = (post, postNum) => {
        if(this.props.user.authenticated && this.props.user.id == post.user.id) {

            var onEditPostButtonClicked = () => {
                this.props.setEditPostHtml(post.content, this.props.params.id, postNum);
                browserHistory.push(`/topic/${this.props.params.id}/edit`);
            };

            return <button className="page-button post-edit-button" onClick={onEditPostButtonClicked}>Edit</button>;
        }

        return null;
    };

    renderLastEdited = (post) => {
        if(post.timestamp !== post.edited_timestamp) {
            return <span className="last-edited-at">Last edited at {this.renderMoment(post.edited_timestamp)}</span>;
        }

        return null;
    };

    renderPosts = () => {
        const page = this.getPage(this.props);
        const key = `p_${this.props.params.id}_${page}`;

        if(this.props.posts != null && this.props.posts[key] != null) {
            var postCount = ((page - 1) * 20);
            return this.props.posts[key].map(post => {
                return (
                    <tr key={post.id}>
                        <td>
                            <div className="post-container">
                                <div className="post-user-side">
                                    <div className="post-username">{renderUsername(post.user)}</div>
                                    <div className="post-avatar-container">
                                        {this.renderAvatar(post.user.avatar)}
                                    </div>
                                    Posts: {post.user.post_count}
                                    {this.renderForumRanks(post.user)}
                                </div>

                                <div className="post-content-side">
                                    <div className="post-content-header">
                                        <div className="post-content-header-item post-content-date">
                                            {this.renderMoment(post.timestamp)}
                                        </div>
                                        <div className="post-content-header-item post-content-id">
                                            #{++postCount}
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        <div dangerouslySetInnerHTML={this.createMarkup(post.content)}/>
                                    </div>

                                    <div className="post-content-footer">
                                        {this.renderLastEdited(post)}
                                        {this.renderEditPostButton(post, postCount)}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        return <tr> </tr>
    };

    getPage = (props) => {
        if(props.location.query.page) {
            return props.location.query.page;
        } else {
            return 1;
        }
    };

    handleCreateThreadOnClick = () => {
        browserHistory.push(`/topic/${this.props.params.id}/create`);
    };

    renderCreatePostButton = (isLocked) => {
        if(this.props.authenticated && !isLocked) {
            return (
                <button onClick={this.handleCreateThreadOnClick} className="page-button button-create-thread">Create post</button>
            );
        } else if(this.props.authenticated && isLocked) {
            return (
                <button className="page-button page-button-active button-create-thread" disabled>Thread locked</button>
            );
        } else {
            return null;
        }
    };

    renderLockUnlockThreadButton = (isLocked, threadId, subcatId) => {
        if(this.props.authenticated && (this.props.user.group === 'gm' || this.props.user.group === 'dev')) {

            var handleLockUnlockThreadButton = () => {this.props.setThreadLocked(!isLocked, threadId, subcatId);};

            return (
                <button className="page-button button-create-thread lock-button" onClick={handleLockUnlockThreadButton}>
                    {isLocked ? 'Unlock thread' : 'Lock thread'}
                </button>
            );
        }

        return <div></div>;
    };

    renderStickyUnstickyThreadButton = (isSticky, threadId, subcatId) => {
        if(this.props.authenticated && (this.props.user.group === 'gm' || this.props.user.group === 'dev')) {

            var handleLockUnlockThreadButton = () => {this.props.setThreadSticky(!isSticky, threadId, subcatId);};

            return (
                <button className="page-button button-create-thread lock-button" onClick={handleLockUnlockThreadButton}>
                    {isSticky ? 'Remove sticky': 'Sticky thread' }
                </button>
            );
        }

        return <div></div>;
    };

    render() {
        const key = `t_${this.props.params.id}`;
        const page = this.getPage(this.props);

        if(this.props.topics != null && this.props.topics[key] != null) {

            const topic = this.props.topics[key];
            return (
                <div>
                    <div className="category-wrapper">
                        <Link to={`/topic/${this.props.params.id}`} className="category-name">{topic.title}</Link>
                        <p className="category-description">by {topic.user.username}, {this.renderMoment(topic.timestamp)}</p>

                        <div className="posts-table-wrapper">
                            <table>
                                <tbody>
                                <tr><th> </th></tr>
                                {this.renderPosts()}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="page-list-wrapper">
                        <button className="page-button page-button-page" disabled>Pages:</button>
                        <PageButtons totalThreads={topic.post_count} currentPage={page} pathName={this.props.location.pathname}/>
                        {this.renderCreatePostButton(topic.locked)}
                        {this.renderLockUnlockThreadButton(topic.locked, this.props.params.id, topic.subcategory.id)}
                        {this.renderStickyUnstickyThreadButton(topic.sticky, this.props.params.id, topic.subcategory.id)}
                    </div>
                </div>
            );
        }

        return (
            <div>
                Loading...
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        posts: state.forum.posts,
        topics: state.forum.topics,
        user: state.auth,
    };
}

export default connect(mapStateToProps, actions)(Topic);