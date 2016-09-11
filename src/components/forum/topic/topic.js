import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';
import PageButtons from '../page_buttons';

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

    renderPosts = () => {
        const key = `p_${this.props.params.id}_${this.getPage(this.props)}`;

        if(this.props.posts != null && this.props.posts[key] != null) {

            return this.props.posts[key].map(post => {
                return (
                    <tr key={post.id}>
                        <td>
                            <div className="post-container">
                                <div className="post-user-side">
                                    {post.username}
                                    <div className="post-avater-container">
                                        <img src="https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg" alt="avatar" width={150} height={150}/>
                                    </div>
                                    example metadata: yolo <br/>
                                    Posts: {420}
                                </div>

                                <div className="post-content-side">
                                    <div className="post-content-header">
                                        <div className="post-content-header-item post-content-date">
                                            {post.timestamp}
                                        </div>
                                        <div className="post-content-header-item post-content-id">
                                            #{post.id}
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        {post.content}
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

    render() {
        const key = `t_${this.props.params.id}`;
        const page = this.getPage(this.props);

        if(this.props.topics != null && this.props.topics[key] != null) {

            const topic = this.props.topics[key];

            return (
                <div>
                    <div className="category-wrapper">
                        <Link to={`/topic/${this.props.params.id}`} className="category-name">{topic.title}</Link>
                        <p className="category-description">by USER_ID={topic.user_id}, {topic.timestamp}</p>

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
        posts: state.forum.posts,
        topics: state.forum.topics
    };
}

export default connect(mapStateToProps, actions)(Topic);