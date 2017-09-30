/**
 * Created by lzc on 2017/9/29.
 */
import * as ActionType from './ActionTypes'

export const increment = (counterCaption) =>{
    return {
        type: ActionType.INCREMENT,
        counterCaption
    }
}

export const decrement = (counterCaption) => {
    return {
        type: ActionType.DECREMENT,
        counterCaption
    }
}