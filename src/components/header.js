import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class Header extends Component {

    onSignInClick = () => {
        browserHistory.push(`/signin?redirectUri=${this.props.path}`);
    };

    renderLinks = () => {
        if (this.props.user.authenticated) {
            return [
                <li key={0} className="nav-iten nav-right">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>,
                <li key={1} className="dropdown nav-iten nav-right">
                    <span href="/" className="nav-dropbtn">{this.props.user.username}</span>
                    <div className="dropdown-content">
                        <Link className="drop-item" to={`/profile/${this.props.user.id}`} >Profile</Link>
                        <Link className="drop-item" to="/settings" >Settings</Link>
                    </div>
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
        user: state.auth,
    };
}

export default connect(mapStateToProps)(Header);