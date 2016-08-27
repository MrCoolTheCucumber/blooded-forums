import React, { Component } from 'react';
import Header from './header';
import Footer from './footer'
import Breadcrumbs from './breadcrumbs';
import Nanobar from './nanobar';

class App extends Component {

    render() {
        return (
            <div id="app">
                <Nanobar/>
                <Header />
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
