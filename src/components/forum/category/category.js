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
        if(!this.props.categories) {
            this.props.getForumSections();
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
    return { categories: state.forum.categories };
}

export default connect(mapStateToProps, actions)(Category);