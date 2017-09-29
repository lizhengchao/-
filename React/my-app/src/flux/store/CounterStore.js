/**
 * Created by lzc on 2017/9/28.
 */
import AppDispatcher from '../AppDispatcher.js';
import * as ActionTypes from '../ActionType.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changed';

const counterValues = {
    First: 0,
    Second: 1,
    Third: 2
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCounterValues: function () {
        return counterValues;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChnageListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
})

CounterStore.dispatchToken = AppDispatcher.register((action) => {
    if(action.type === ActionTypes.INCREMENT){
        counterValues[action.counterCaption] ++;
        CounterStore.emitChange();
    } else if(action.type === ActionTypes.DECREMENT){
        counterValues[action.counterCaption] --;
        CounterStore.emitChange();
    }
})

export default CounterStore