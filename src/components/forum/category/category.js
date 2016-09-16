import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ForumCategory from '../forum_category';
import _404 from '../../404';

class Category extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getForumSections(() => {});
        this.props.setBreadcrumbs({ ...this.props.breadcrumbs, subcategory: null, thread: null});
    }

    componentWillUpdate(nextProps) {
        if(nextProps.categories != null) {
            for(var i = 0; i < nextProps.categories.length; ++i) {
                if(nextProps.categories[i].id == this.props.params.id) {
                    if((this.props.breadcrumbs == null)
                        || (this.props.breadcrumbs != null && this.props.breadcrumbs.category == null)
                        || (this.props.breadcrumbs != null && this.props.breadcrumbs.category.id != this.props.params.id))
                    {
                        nextProps.setBreadcrumbs({
                            category: {
                                title: nextProps.categories[i].title,
                                id: nextProps.categories[i].id
                            }
                        });
                    }


                }
            }
        }
    }

    renderCategory = (id) => {
        for(var i = 0; i < this.props.categories.length; ++i) {
            if(this.props.categories[i].id == id) {
                return <ForumCategory category={this.props.categories[i]}/>
            }
        }
        //TODO
        return <_404/>
    };

    render() {
        if (this.props.categories) {
            return (
                <div>
                    {this.renderCategory(this.props.params.id)}
                </div>
            );
        }


        return <div>Loading...</div>
    }
}

function mapStateToProps(state) {
    return {
        categories: state.forum.categories,
        breadcrumbs: state.breadcrumbs.breadcrumbs
    };
}

export default connect(mapStateToProps, actions)(Category);