/**
 * Created by lzc on 2017/10/11.
 */
import * as ActionTypes from './actionTypes'

export const updateBlockStatus = (rowNumber, lineNumber, newStatus)=> {
    return {
        type: ActionTypes.UPDATEBLOCKSTATUS,
        rowNumber,
        lineNumber,
        newStatus
    }
}

export const fullUpdateBlokStatus = (newBlockStatus) => {
    return {
        type: ActionTypes.FULLUPDATEBLOCKSTATUS,
        newBlockStatus
    }
}

export const addNeedClearBlocks = (needClearBlocks) => {
    return {
        type: ActionTypes.ADDNEEDCLEARBLOCKS,
        needClearBlocks
    }
}

export const addBlockAction = (blockAction) => {
    return {
        type: ActionTypes.ADDBLOCKACTION,
        blockAction
    }
}