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

        if(out.length >= 35) {
            out = out.substring(0, 32).concat('...');
        }

        return out;
    };

    renderAvatar = (avatar) => {
        if(avatar.length >= 4 && avatar.substring(avatar.length - 4) === 'gifv') {
            return (
                <video preload="auto" autoPlay="autoplay" muted loop="loop" width={45} height={45}>
                    <source src={`//${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`//${avatar}`} alt="avatar" width={45} height={45}/>
    };

    renderLastPost = (post) => {
        if(post.id === undefined) {
            return (
                <div className="forum-list-chip forum-list-item-last-post-container">
                    <div className="lastpost-nopost">-  -  -  -</div>
                </div>
            );
        }

        return (
            <div>
                <div className="forum-list-chip forum-list-item-avatar-container">
                    {this.renderAvatar(post.user.avatar)}
                </div>

                <div className="forum-list-chip forum-list-last-post-metadata-block">
                    <div className="lastpost-thread-link">
                        <Link to={`/topic/${post.thread_id}`}>{this.renderTitleLink(post.title)}</Link>
                    </div>
                    <div className="lastpost-by">{`${this.renderMoment(post.timestamp)} by ${post.user.username}`}</div>
                </div>
            </div>
        )
    };

    renderSubCategories = (subcategories, parentId) => {
        return subcategories.map( subcategory => {
            return (
                <li key={`${parentId}.${subcategory.id}`}>
                    <div className="forum-list-item-wrapper">

                        <div className="forum-list-chip forum-list-item-icon-wrapper">
                            <i className="fa fa-comments-o fa-2x category-subcategory-icon" aria-hidden="true">&nbsp;</i>
                        </div>

                        <div className="forum-list-chip forum-list-item-metadata-block">
                            <div className="forum-list-item-metadata-title">
                                <Link to={`/forum/${subcategory.id}`} className="category-subcategory-title">{subcategory.title}</Link>
                            </div>
                            <div className="forum-list-item-metadata-description forum-list-item-secondary-text">
                                {subcategory.description}
                            </div>
                        </div>

                        <div className="forum-list-chip forum-list-item-tp forum-list-item-secondary-text">
                            {`${subcategory.thread_count} ${subcategory.thread_count === 1 ? 'thread' : 'threads'}`}
                        </div>

                        {this.renderLastPost(subcategory.post)}

                    </div>
                </li>
            );
        });
    };

    render() {
        return (
            <div className="category-wrapper">
                <div className="category-header-wrapper">
                    <Link to={`/category/${this.props.category.id}`} className="category-name">{this.props.category.title}</Link>
                    <p className="category-description">{this.props.category.description}</p>
                </div>

                <div className="forum-list-wrapper">
                    <ul>
                        {this.renderSubCategories(this.props.category.subcategories, this.props.category.id)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ForumCategory;