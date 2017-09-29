/**
 * Created by lzc on 2017/9/28.
 */
import * as ActionTypes from '../ActionType'
import AppDispatcher from '../AppDispatcher.js';
import {EventEmitter} from 'events';
import CounterStore from './CounterStore'

const CHANGE_EVENT = 'changed';

function computeSummary (counterValues) {
    let summaryValue = 0;
    for(let i in counterValues) {
        summaryValue += counterValues[i];
    }
    return summaryValue;
}

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    getSummaryValue () {
        return computeSummary(CounterStore.getCounterValues())
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

SummaryStore.dispatchToken = AppDispatcher.register((action) => {
    if ((action.type === ActionTypes.INCREMENT) ||
        (action.type === ActionTypes.DECREMENT)) {
        AppDispatcher.waitFor([CounterStore.dispatchToken]); //告诉Dispatch直到数组内的dispatchToken执行完毕再来执行当前aciton
        SummaryStore.emitChange();
    }
})

export default SummaryStore;