import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
    handleFormSubmit = ({ username, password }) => {
      console.log(username, password);
    };

    render() {
        const { handleSubmit, fields: { username, password} } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label>Username:</label>
                    <input {...username} className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password} className="form-control"/>
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
})(Signin);