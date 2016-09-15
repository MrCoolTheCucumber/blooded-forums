import React, { Component } from 'react';
import TinyMCE from 'react-tinymce'
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
        const html = tinymce.get('test').getContent();

        this.props.createPost(this.props.params.id, html);
    };

    render() {
        return (
            <div>
                <div className="form-div">
                    <fieldset className="form-group">
                        <TinyMCE id="test"
                            content=""
                            config={{
                                height: 350,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                                    'insertdatetime media nonbreaking save table contextmenu directionality',
                                    'emoticons template paste textcolor colorpicker textpattern imagetools'
                                ],
                                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                                toolbar2: 'print preview media | forecolor backcolor emoticons'
                            }}
                            onChange={console.log('change!')}
                        />
                    </fieldset>
                    <button onClick={this.handleCreateThread} className="form-button">Create</button>
                </div>
            </div>

        )
    }

}

export default connect(null, actions)(CreateThread);