import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Provider from './Provider'
import Container from './redux/counter/Container'
import registerServiceWorker from './registerServiceWorker';
import Store from './redux/Store'

ReactDOM.render(
    <Provider store={Store}>
        <Container />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
