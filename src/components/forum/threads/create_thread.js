import React, { Component } from 'react';
import Quill from 'quill';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class CreateThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quill: null
        }
    }

    componentDidMount() {
        this.state.quill = new Quill('#editor', {
            theme: 'snow'
        });
    }

    renderQuill = () => {
        return (
            <div id="editor">
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br/></p>
            </div>
        )
    };

    handleCreateThread = () => {
        console.log('button clicked!');

        const content = this.state.quill.getText();
        const title = document.getElementById("title-input").value;

        this.props.createThread(title, this.props.params.id, content);
    };

    render() {
        return (
            <div>
                <link href="https://cdn.quilljs.com/1.0.3/quill.snow.css" rel="stylesheet"/>
                <div className="form-div">
                    <fieldset className="form-group">
                        <label >Title:</label>
                        <input id="title-input" type="text" className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        {this.renderQuill()}
                    </fieldset>
                    <button onClick={this.handleCreateThread} className="form-button">Create</button>
                </div>
            </div>

        )
    }

}

export default connect(null, actions)(CreateThread);