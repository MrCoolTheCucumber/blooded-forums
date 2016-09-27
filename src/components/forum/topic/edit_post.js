import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

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

    handleCreateThread = () => {
        const html = tinymce.get('test').getContent();

        this.props.sendEditedPost(this.props.params.id, this.props.editPost.postId, html);
    };

    render() {
        return (
            <div>
                <div className="form-div">
                    <fieldset className="form-group">
                        <TinyMCE id="test"
                                 content={this.props.editPost.content}
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

function mapStateToProps(state) {
    return {
        editPost: state.forum.editPost
    };
}

export default connect(mapStateToProps, actions)(EditThread);