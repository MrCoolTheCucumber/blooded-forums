import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Quill from 'quill';

class CreateThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            async: 'ready'
        }
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

        setTimeout(function () {
            fullEditor.focus();
        }, 200);
    }

    handleCreatePost = () => {
        if(this.state.async === 'ready') {
            this.setState({ async: 'waiting'});
            const html = document.querySelector(".ql-editor").innerHTML;
            console.log(html);
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
                        <div id="full-container">

                        </div>
                        <button onClick={this.handleCreatePost} className="form-button">Create</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null, actions)(CreateThread);