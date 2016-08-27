import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NanoBar from 'nanobar';

class Nanobar extends Component {

    constructor(props) {
        super(props);
        this.nanobar = new NanoBar({
            id: 'nanobar'
        });
    }

    componentWillMount() {

    }

    componentWillUpdate(nextProps) {
        if(this.props.go != nextProps.go) {
            this.nanobar.go(nextProps.go);
        }
    }

    render() {
        return <style type="text/css">{`.bar{background:#${this.props.hexColor};}`}</style>;
    }
}

function mapStateToProps(state) {
    return {
        go: state.nanobar.go,
        hexColor: state.nanobar.hexColor
    };
}

export default connect(mapStateToProps, actions)(Nanobar);
