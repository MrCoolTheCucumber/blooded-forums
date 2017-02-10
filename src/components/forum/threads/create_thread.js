import React, { Component } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

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
            const title = document.getElementById("title-input").focus();
        }, 200);
    }

    parseId = (id) => {
        return /^\d+/.exec(id);
    };

    handleCreateThread = () => {
        if(this.state.async === 'ready') {
            this.setState({ async: 'waiting'});
            const html = document.querySelector(".ql-editor").innerHTML;
            const title = document.getElementById("title-input").value;

            this.props.createThread(title, this.parseId(this.props.params.id), html, (responseCode) => {
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
                        <div className="category-name">Create a Thread</div>
                    </div>

                    <div className="posting-input-wrapper">
                        <fieldset className="title-group">
                            <label >Title:</label>
                            <input id="title-input" type="text" className="form-control"/>
                        </fieldset>

                        <div id="full-container">

                        </div>
                        <button onClick={this.handleCreateThread} className="form-button">Create</button>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect(null, actions)(CreateThread);