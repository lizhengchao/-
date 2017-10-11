import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider';
import Store from './Store'
import Container from './block/view/Container'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <Container/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
