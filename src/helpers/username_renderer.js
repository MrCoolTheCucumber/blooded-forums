import React from 'react';
import { Link } from 'react-router';

export const gmStyle = {
    textDecoration: 'none',
    background: 'url(../assets/pip.gif)',
    color: '#ff3333',
    fontWeight: 'bold',
    textShadow: '0 0 .9em #ff9595'
};

export const userStyle = {
    color: 'lightcoral'
};

export const devStyle = {
    fontWeight: 'bold',
    color: '#22cc66',
    textShadow: '0 0 .7em #99ffbb'
};

export const officerStyle = {
    textDecoration: 'none',
    color: '#ffcc00',
    fontWeight: 'bold',
    textShadow: '0 0 .9em #ff9595'
};

function renderUsername(user) {

    let style = null;

    switch (user.group) {
       	case 'gm':
            style = gmStyle;
            break;
        case 'dev':
            style = devStyle;
            break;
        case 'officer':
            style = officerStyle;
            break;
		default:
            style = userStyle;
            break;
    }

    return (
        <Link className="username" to={`/profile/${user.id}`}>
                        <span style={style}>
                            {user.username}
                        </span>
        </Link>
    );
}

export default renderUsername;
