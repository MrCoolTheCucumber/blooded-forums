import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import renderUsername from '../../helpers/username_renderer';
import slugTitle from '../../helpers/title_sluger';

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
                <video preload="auto" muted autoPlay="autoplay" loop="loop" style={{ maxHeight: 45, maxWidth: 45, width: 'auto', height: 'auto' }}>
                    <source src={`https://${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`https://${avatar}`} alt="avatar" style={{ maxHeight: 45, maxWidth: 45, width: 'auto', height: 'auto' }}/>
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
                        <Link to={`/topic/${post.thread_id}-${slugTitle(post.title)}`}>{this.renderTitleLink(post.title)}</Link>
                    </div>
                    <div className="lastpost-by">{`${this.renderMoment(post.timestamp)} by `}{renderUsername(post.user)}</div>
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
                                <Link to={`/forum/${subcategory.id}-${slugTitle(subcategory.title)}`} className="category-subcategory-title">{subcategory.title}</Link>
                            </div>
                            <div className="forum-list-item-metadata-description forum-list-item-secondary-text">
                                {subcategory.description}
                            </div>
                        </div>

                        <div className="forum-list-chip forum-list-item-tp forum-list-item-secondary-text">
                            {`Threads: ${subcategory.thread_count}`}
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
                    <Link to={`/category/${this.props.category.id}-${slugTitle(this.props.category.title)}`} className="category-name">{this.props.category.title}</Link>
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