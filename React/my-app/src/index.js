import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ClickCount from './counter/ClickCounter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ClickCount />, document.getElementById('root'));
registerServiceWorker();
