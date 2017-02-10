import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Quill from 'quill';

class EditThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quill: null
        }
    }

    componentWillUnmount() {
        this.props.clearEditPostHtml();
    }

    componentDidMount() {
        let fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
        let Font = Quill.import('formats/font');
        Font.whitelist = fonts;
        Quill.register(Font, true);

        let fullEditor = new Quill('#full-container', {
            bounds: '#full-container .editor',
            modules: {
                'toolbar': [
                    [{ 'font': fonts }, { 'size': [] }],
                    [ 'bold', 'italic', 'underline', 'strike' ],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'script': 'super' }, { 'script': 'sub' }],
                    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
                    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
                    [ 'direction', { 'align': [] }],
                    [ 'link', 'image', 'video' ],
                    [ 'clean' ]
                ],
            },
            theme: 'snow'
        });


        document.querySelector('.ql-editor').innerHTML = this.props.editPost.content;

        setTimeout(function () {
            fullEditor.focus();
        }, 200);
    }

    handleEditPost = () => {
        const html = document.querySelector(".ql-editor").innerHTML;

        this.props.sendEditedPost(this.props.params.id, this.props.editPost.postId, html);
    };

    render() {
        return (
            <div className="flex">
                <div className="posting-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Edit your post</div>
                    </div>
                    <div className="posting-input-wrapper">
                        <div id="full-container">

                        </div>
                        <button onClick={this.handleEditPost} className="form-button">Submit changes</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        editPost: state.forum.editPost
    };
}

export default connect(mapStateToProps, actions)(EditThread);