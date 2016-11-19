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
                <li key={0} className="nav-right">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>,
                <li key={1} className="nav-dropdown nav-right">
                    <a href="/" className="nav-dropbtn">{this.props.user.username}</a>
                    <div className="nav-dropdown-content">
                        <Link className="drop-item" to={`/profile/${this.props.user.id}`} >Profile</Link>
                        <Link className="drop-item" to="/settings" >Settings</Link>
                    </div>
                </li>
            ];
        } else {
            return [
                <li key={0} className="nav-right">
                    <a className="nav-link" onClick={this.onSignInClick}>Sign in</a>
                </li>,
                <li key={1} className="nav-right">
                    <Link to="/signup" className="nav-link">Create an account</Link>
                </li>
            ];
        }
    };

    render() {
        return (
            <nav>
                <ul>
                    <li className="nav-left">
                        <Link to="/">Blooded</Link>
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