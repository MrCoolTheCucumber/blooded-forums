import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import * as actions from '../../../../actions';
import { connect } from 'react-redux';

class ChangeSignature extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentState: 'nothing'
        }
    }

    renderButton = () => {
        switch (this.state.currentState) {
            case 'nothing':
                return <button onClick={this.handleChangeSignature} className="form-button">Update</button>;
            case 'sending':
                return (
                    <div style={{ width: '20', height: '20'}} className="loader"/>
                );
            case 'done':
                return <div style={{ color: 'green' }}>Signature changed.</div>

        }
    };

    componentWillMount() {
        this.props.getUserData(this.props.user.id);

        console.log(this.props.userData);
    }

    handleChangeSignature = () => {
        const html = tinymce.get('test').getContent();
        this.setState({ currentState: 'sending' });
        this.props.changeUserSignature(html, () => {
            this.setState({ currentState: 'done' });
        });
    };

    render() {

        if(this.props.userData === undefined) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="form-div">
                    <fieldset className="form-group">
                        <TinyMCE id="test"
                                 content={this.props.userData.signature}
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
                    {this.renderButton()}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        userData: state.forum.user,
        user: state.auth
    };
}

export default connect(mapStateToProps, actions)(ChangeSignature);