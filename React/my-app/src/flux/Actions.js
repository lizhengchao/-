/**
 * Created by lzc on 2017/9/28.
 */
import * as ActionTypes from './ActionType'
import AppDispatcher from './AppDispatcher'

export const increment = (counterCaption) => {
    AppDispatcher.dispatch({
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    })
}

export const decrement = (counterCaption) => {
    AppDispatcher.dispatch({
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    })
}