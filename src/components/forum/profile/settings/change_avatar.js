import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../../actions';

class ChangeAvatar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentState: 'nothing',
            preview: null
        }
    }

    componentWillMount() {
        this.props.getUserData(this.props.user.id);
    }

    renderAvatar = (avatar) => {
        if(avatar.length >= 4 && avatar.substring(avatar.length - 4) === 'gifv') {
            return (
                <video preload="auto" autoPlay="autoplay" loop="loop" width={150} height={150}>
                    <source src={`//${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`//${avatar}`} alt="avatar" width={150} height={150}/>
    };

    handleFormSubmit = ({ url }) => {
        this.setState({ ...this.state, currentState: 'sending' });
        this.props.changeUserAvatar(url, (status) => {
            if(status == 0) {
                this.setState({ ...this.state, currentState: 'done' });
            }
            if(status == 1) {
                this.setState({ ...this.state, currentState: 'error' });
            }
        })
    };

    handleOnPreview = () => {

        var link = document.getElementById('settings-avatar-input').value;
        if(link.substring(0, 7) === 'http://') {
            link = link.substring(6)
        } else if(link.substring(0, 8) === 'https://') {
            link = link.substring(0, 7);
        }

        this.setState({ ...this.state, preview: link })
    };

    renderCurrentAvatar = () => {

        if(this.state.preview != null) {
            return this.renderAvatar(this.state.preview);
        }

        if(this.props.userData != null && this.props.userData.id == this.props.user.id) {
            return this.renderAvatar(this.props.userData.avatar);
        }

        return <div className="loader" style={{ width: '150', height: '150' }}/>;
    };

    renderPreviewButton = () => {
        if(this.state.currentState !== 'done' && this.state.currentState !== 'sending') {
            return <button type="button" className="form-button" onClick={this.handleOnPreview}>Preview</button>;
        }

        return null;
    };

    renderButton = () => {
        switch (this.state.currentState) {
            case 'nothing':
                return <button action="submit" className="form-button">Update</button>;
            case 'sending':
                return (
                    <div style={{ width: '20', height: '20'}} className="loader"/>
                );
            case 'done':
                return <div style={{ color: 'green' }}>Avatar changed.</div>;
            case 'error':
                return <button action="submit" className="form-button">Update</button>;
        }
    };

    renderSubmitError = () => {
        if(this.state.currentState === 'error') {
            return <div className="error">There was a problem updating the avatar, is it a direct imgur link?</div>;
        }

        return null;
    };

    render() {
        const { handleSubmit, fields: { url } } = this.props;

        return (
            <div className="thin-border">
                <div id="settings-avatar-wrapper">
                    <div id="settings-avatar-preview-wrapper">
                        {this.renderCurrentAvatar()}
                    </div>
                    <div id="settings-avatar-form-wrapper">
                            <form className="no-border" onSubmit={handleSubmit(this.handleFormSubmit)}>
                                <fieldset className="form-group">
                                    <label>Direct image URL:</label>
                                    <input id="settings-avatar-input" type="text" {...url} className="form-control"/>
                                    {url.touched && url.error && <div className="error">{url.error}</div>}
                                </fieldset>
                                {this.renderButton()}
                                {this.renderPreviewButton()}
                                {this.renderSubmitError()}
                            </form>
                            <div id="settings-avatar-info">
                                If you have an avatar you want to use, please upload it to <a href="//imgur.com/">imgur</a> and copy the direct image address.
                            </div>
                    </div>
                </div>
            </div>
        )
    }

}

function validate(formProps) {
    const errors = {};

    if(!formProps.url) {
        errors.url = 'Please enter a url.';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        userData: state.forum.user,
        user: state.auth
    };
}

export default reduxForm({
    form: 'changeAvatar',
    fields: ['url'],
    validate
}, mapStateToProps, actions)(ChangeAvatar);