/**
 * Created by lzc on 2017/9/29.
 */
import {createStore} from 'redux'
import reducer from './Reducer'

const initValue = {
    First: 1,
    Second: 2,
    Third: 3
}

const store = createStore(reducer, initValue);

export default store;