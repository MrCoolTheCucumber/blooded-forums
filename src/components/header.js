import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class Header extends Component {

    onSignInClick = () => {
        browserHistory.push(`/signin?redirectUri=${this.props.path}`);
    };

    renderLinks = () => {
        if (this.props.authenticated) {

            return [
                <li key={0} className="nav-iten nav-right">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>,
                <li key={1} className="nav-iten nav-right">
                    <Link to="/profile" className="nav-link">{this.props.username}</Link>
                </li>
            ];
        } else {
            return [
                <li key={0} className="nav-item nav-right">
                    <a className="nav-link" onClick={this.onSignInClick}>Sign in</a>
                </li>,
                <li key={1} className="nav-item nav-right">
                    <Link to="/signup" className="nav-link">Create an account</Link>
                </li>
            ];
        }
    };

    render() {
        return (
            <nav className="navbar">
                <ul className="nav navbar-nav">
                    <li className="nav-item nav-left">
                        <Link to="/" className="nav-link">Blooded</Link>
                    </li>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.username
    };
}

export default connect(mapStateToProps)(Header);