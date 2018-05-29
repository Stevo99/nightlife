import React, { Component } from 'react';
import { render } from 'react-dom';

import './styles/style.scss';

import Homepage from './pages/home.js';

class App extends Component {

    render () {
        return (
            <div>
                <Homepage />
            </div>
        );
    }
}
    

render(
    <App />,
    document.getElementById('root')
);