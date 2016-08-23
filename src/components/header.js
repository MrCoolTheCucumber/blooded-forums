import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

    renderLinks = () => {
        if (this.props.authenticated) {
            return (
                <li className="nav-iten nav-right">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>
            );
        } else {
            return [
                <li key={0} className="nav-item nav-right">
                    <Link to="/signin" className="nav-link">Sign in</Link>
                </li>,
                <li key={1} className="nav-item nav-right">
                    <Link to="/signup" className="nav-link">Sign up</Link>
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
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);