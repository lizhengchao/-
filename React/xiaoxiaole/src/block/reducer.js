/**
 * Created by lzc on 2017/10/11.
 */
import * as ActionTypes from './actionTypes'
import * as BaseConfig from '../baseConfig'

export default (state, action) => {
    const {type, rowNumber, lineNumber, newStatus, newBlockStatus, needClearBlocks, blockAction} = action;
    switch (type) {
        case ActionTypes.UPDATEBLOCKSTATUS:
            let newState = state; //由于做深拷贝会有较大的性能影响，并且此处直接更改state也不会引起什么问题
            newState.blockStatus[rowNumber][lineNumber] = newStatus;
            newState.type = ActionTypes.UPDATEBLOCKSTATUS;
            return newState;
        case ActionTypes.FULLUPDATEBLOCKSTATUS:
            if(newBlockStatus.constructor === Array &&
                newBlockStatus.length === BaseConfig.ROW_COUNT) {
                for(let blockStatus of newBlockStatus) {
                    if(blockStatus.constructor !== Array ||
                        blockStatus.length !== BaseConfig.LINE_COUNT) {
                        console.error('full update block status fail, passing an error newBlockStatus');
                        return state;
                    }
                }
                state.blockStatus = newBlockStatus;
                state.type = ActionTypes.FULLUPDATEBLOCKSTATUS;
                return state;
            }
            console.error('full update block status fail, passing an error newBlockStatus');
            return state;
        case ActionTypes.ADDNEEDCLEARBLOCKS:
            if(needClearBlocks.constructor == Array) {
                state.needClearBlocks = needClearBlocks;
            }
            state.type = ActionTypes.ADDNEEDCLEARBLOCKS;
            return state;
        case ActionTypes.ADDBLOCKACTION:
            if(blockAction.constructor == Array) {
                state.blockAction = blockAction;
            }
            state.type = ActionTypes.ADDBLOCKACTION;
            return state;
        default:
            return state;
    }
}