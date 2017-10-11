/**
 * Created by lzc on 2017/10/11.
 */
import * as ActionTypes from './actionTypes'

export default (state, action) => {
    switch (action.type) {
        case ActionTypes.UPDATEBLOCKSTATUS:
            const newState = Object.assign({}, state);
            newState.blockStatus[action.rowNumber][action.lineNumber] = action.newStatus;
            return newState;
        default:
            return state;
    }
}