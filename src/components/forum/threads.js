import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Threads extends Component {

    componentWillMount() {
        this.props.getSubCategoryThreads(this.props.params.id, 1);
    }

    renderThreads = () => {

    };

    render() {
        return <div>ayy lmao</div>
    }

}

export default connect(null, actions)(Threads);