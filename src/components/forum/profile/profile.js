import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Profile extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <div>{this.props.user.id}</div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.auth
    };
}

export default connect(mapStateToProps, actions)(Profile);