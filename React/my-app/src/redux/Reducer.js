/**
 * Created by lzc on 2017/9/29.
 */
import * as ActionType from './ActionTypes'

export default (state, action) => {
    const {counterCaption} = action;

    switch (action.type) {
        case ActionType.INCREMENT:
            return {...state, [counterCaption]: state[counterCaption] + 1};
        case ActionType.DECREMENT:
            return {...state, [counterCaption]: state[counterCaption] - 1};
        default:
            return state
    }
}