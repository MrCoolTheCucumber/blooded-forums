import React, { Component } from 'react';
import Header from './header';
import Footer from './footer'
import Breadcrumbs from './breadcrumbs';

class App extends Component {

    render() {
        return (
            <div>
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
