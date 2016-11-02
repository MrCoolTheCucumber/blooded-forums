import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import * as actions from '../../../../actions';
import { connect } from 'react-redux';

class ChangeSignature extends Component {

    componentWillMount() {

    }

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
                </div>
            </div>
        );
    }

}

export default connect(null, actions)(ChangeSignature);