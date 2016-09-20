import React from 'react';
import { Link } from 'react-router';

export const gmStyle = {
    textDecoration: 'none',
    background: 'url(http://i.imgur.com/uKdG1mv.gif)',
    color: '#ff3333',
    fontWeight: 'bold',
    textShadow: '0 0 .9em #ff9595'
};

export const userStyle = {
    color: 'lightcoral'
};

export const devStyle = {
    fontWeight: 'bold',
    color: 'darkgreen',
    textShadow: '0 0 .7em lightgreen'
};

function renderUsername(user) {
    switch (user.type) {
        case 'user':
            return (
                <Link className="username" to={`/profile/${user.id}`}>
                        <span style={userStyle}>
                            {user.username}
                        </span>
                </Link>
            );
        case 'gm':
            return (
                <Link className="username" to={`/profile/${user.id}`}>
                        <span style={gmStyle}>
                            {user.username}
                        </span>
                </Link>
            );
        case 'dev':
            return (
                <Link className="username" to={`/profile/${user.id}`}>
                        <span style={devStyle}>
                            {user.username}
                        </span>
                </Link>
            );
    }
}

export default renderUsername;
