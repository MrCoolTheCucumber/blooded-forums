import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ReactQuill from 'react-quill';
import Helmet from "react-helmet";

class CreateThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            async: 'ready'
        }
    }

    componentDidMount() {
        document.getElementById('ql-editor-1').focus();
    }

    handleCreatePost = () => {
        if(this.state.async === 'ready') {
            this.setState({ async: 'waiting'});
            const html = document.querySelector(".ql-editor").innerHTML;
            this.props.createPost(this.props.params.id, html, (responseCode) => {
                switch (responseCode) {
                    case 1:
                        this.setState({ async: 'ready' });
                        break;
                }
            });
        }
    };

    render() {
        return (
            <div className="flex">
                <div className="posting-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Create a post</div>
                    </div>
                    <div className="posting-input-wrapper">
                        <ReactQuill theme="snow" value={''} />
                        <button onClick={this.handleCreatePost} className="form-button">Create</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null, actions)(CreateThread);