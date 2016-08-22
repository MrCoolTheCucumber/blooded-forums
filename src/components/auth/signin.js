import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

    componentWillUnmount() {
        this.props.clearAuthError();
    }

    handleFormSubmit = ({ username, password }) => {
        this.props.signinUser({ username, password });
    };

    renderAlert = () => {
      if (this.props.errorMessage) {
          return (
            <div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
            </div>
          );
      }
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
                    <input {...password} type="password" className="form-control"/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);