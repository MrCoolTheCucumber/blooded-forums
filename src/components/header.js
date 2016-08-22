import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks = () => {
        if (this.props.authenticated) {
            return (
                <li className="nav-iten">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>
            );
        } else {
            return [
                <li key={0} className="nav-item">
                    <Link to="/signin" className="nav-link">Sign in</Link>
                </li>,
                <li key={1} className="nav-item">
                    <Link to="/signup" className="nav-link">Sign up</Link>
                </li>
            ];
        }
    };

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Forums</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);