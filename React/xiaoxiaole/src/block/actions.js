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