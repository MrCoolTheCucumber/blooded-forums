import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NanoConsts } from '../../nanobar_consts';

class Signout extends Component {

    componentWillMount() {
        this.props.changeNanobar(NanoConsts.defaultColor);
        this.props.moveNanobar(30);
        this.props.signoutUser(() => {
            this.props.changeNanobar(NanoConsts.successColor);
            this.props.moveNanobar(100);
        });
    }



    render() {
        return (
            <div>Signing out, redirecting once complete</div>
        );
    }
}

export default connect(null, actions)(Signout);