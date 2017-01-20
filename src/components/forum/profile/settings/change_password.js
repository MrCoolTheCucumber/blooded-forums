import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../../actions';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentState: 'nothing'
        }
    }

    handleFormSubmit = ({ password }) => {
        this.setState({ currentState: 'sending' });
        this.props.changeUserPassword(password, () => {
            this.setState({ currentState: 'done' });
        })
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
                return <div style={{ color: 'green' }}>Password changed.</div>

        }
    };

    render() {
        const { handleSubmit, fields: { password, passwordConfirm } } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-wrapper">
                    <div className="form-input-wrapper">
                        <fieldset className="form-group">
                            <label>Password:</label>
                            <input type="password" {...password} className="form-control"/>
                            {password.touched && password.error && <div className="error">{password.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Confirm Password:</label>
                            <input type="password" {...passwordConfirm} className="form-control"/>
                            {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                        </fieldset>
                        {this.renderButton()}
                    </div>
                </div>
            </form>
        );
    }

}

function validate(formProps) {
    const errors = {};

    if(!formProps.password) {
        errors.password = 'Please enter a password.';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Password does not match.'
    }

    return errors;
}

export default reduxForm({
    form: 'changePassword',
    fields: ['password', 'passwordConfirm'],
    validate
}, null, actions)(ChangePassword);

