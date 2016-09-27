import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class CreateThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quill: null
        }
    }

    handleCreateThread = () => {
        const html = tinymce.get('test').getContent();
        const title = document.getElementById("title-input").value;

        this.props.createThread(title, this.props.params.id, html);
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
                        <TinyMCE id="test"
                                 content=""
                                 config={{
                                     height: 350,
                                     plugins: [
                                         'advlist autolink lists link image charmap preview hr anchor pagebreak',
                                         'searchreplace wordcount visualblocks visualchars code fullscreen',
                                         'insertdatetime media nonbreaking save table contextmenu directionality',
                                         'emoticons template paste textcolor colorpicker textpattern imagetools'
                                     ],
                                     toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                                     toolbar2: 'preview media | forecolor backcolor emoticons'
                                 }}
                        />
                    </fieldset>
                    <button onClick={this.handleCreateThread} className="form-button">Create</button>
                </div>
            </div>

        )
    }

}

export default connect(null, actions)(CreateThread);