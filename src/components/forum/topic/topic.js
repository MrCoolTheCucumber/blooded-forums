import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';
import PageButtons from '../page_buttons';
import moment from 'moment';

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

        const key = `t_${this.props.params.id}`;
        if(nextProps.topics != null && nextProps.topics[key] != null) {
            const topic = nextProps.topics[key];
            this.props.setBreadcrumbs({
                category: {
                    title: topic.category.title,
                    id: topic.category.id
                },
                subcategory: {
                    title: topic.subcategory.title,
                    id: topic.subcategory.id
                },
                thread: {
                    title: topic.title,
                    id: topic.id
                }
            });
        }
    }

    renderMoment = (timestamp) => {
        var date = '';
        date = date
            .concat(timestamp.substring(0, 10))
            .concat(timestamp.substring(11,19));

        return moment(date, "YYYY-MM-DDHH:mm:ss").calendar();
    };

    createMarkup = (dirtyContent) => {
        return {
            __html: dirtyContent
        };
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
                                    <div className="post-username">{post.user.username}</div>
                                    <div className="post-avater-container">
                                        <img crossOrigin="Anonymous" src={`//${post.user.avatar}`} alt="avatar" width={150} height={150}/>
                                    </div>
                                    Posts: {post.user.post_count}
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

    renderCreatePostButton = () => {
        if(this.props.authenticated) {
            return (
                <Link to={`/topic/${this.props.params.id}/create`} className="page-button button-create-thread">Create post</Link>
            );
        } else {
            return null;
        }
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
                        {this.renderCreatePostButton()}
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
        topics: state.forum.topics
    };
}

export default connect(mapStateToProps, actions)(Topic);