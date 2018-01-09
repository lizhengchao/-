import {createStore} from 'redux';
import reducer from './Reducer';

var initState = {
    count: 0
}

var Store = createStore(reducer, initState);

export default Store;
