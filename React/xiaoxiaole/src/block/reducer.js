/**
 * Created by lzc on 2017/10/11.
 */
import * as ActionTypes from './actionTypes'

export default (state, action) => {
    const {type, rowNumber, lineNumber, newStatus} = action;
    switch (type) {
        case ActionTypes.UPDATEBLOCKSTATUS:
            const newState = Object.assign({}, state);
            newState.blockStatus[rowNumber][lineNumber] = newStatus;
            return newState;
        default:
            return state;
    }
}