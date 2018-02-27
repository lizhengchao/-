// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Provider from './Provider'
// // import Container from './redux/counter/Container'
// import CounterContainer from './redux/counter/CounterContainer'
// import registerServiceWorker from './registerServiceWorker';
// import Store from './redux/Store'
//
// ReactDOM.render(
//     <Provider store={Store}>
//         <CounterContainer />
//     </Provider>,
//     document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Provider from './Provider'
import ContainerComponent from './react-redux/ContainerComponent'
import registerServiceWorker from './registerServiceWorker';
import Store from './react-redux/Store'

ReactDOM.render(
    <Provider store={Store}>
        <ContainerComponent />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();