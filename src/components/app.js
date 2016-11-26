import React, { Component } from 'react';
import Header from './header';
import Footer from './footer'
import Breadcrumbs from './breadcrumbs';
import Nanobar from './nanobar';

require('../../style/main.scss');

class App extends Component {

    render() {
        return (
            <div id="app">
                <Nanobar/>
                <Header path={this.props.location.pathname}/>
                <div id="wrapper">
                    <Breadcrumbs/>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
