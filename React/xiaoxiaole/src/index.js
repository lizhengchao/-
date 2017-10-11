import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider>
        <div />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
