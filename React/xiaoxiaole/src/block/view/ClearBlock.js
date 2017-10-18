/**
 * Created by lzc on 2017/10/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {fullUpdateBlokStatus, addNeedClearBlocks, addBlockAction} from '../actions'
import * as ActionType from '../actionTypes'

/*
* 监听store变化，按照规则清除块
* */
class ClearBlock extends Component {
    constructor (props, context) {
        super(props, context);

        this.getNeedClearBlocks = this.getNeedClearBlocks.bind(this);
        this.getBlockStatusByBlockAction = this.getBlockStatusByBlockAction.bind(this);
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            console.info('in clearBlock, store subscribe, action type:' + this.getStateType());
            if(this.context.store.getState().type == ActionType.FULLUPDATEBLOCKSTATUS) {
                let {needClearBlocks, hasClearBlock} = this.getNeedClearBlocks(JSON.parse(JSON.stringify(this.context.store.getState().blockStatus)));
                if(hasClearBlock) {
                    setTimeout(()=>{this.context.store.dispatch(addNeedClearBlocks(needClearBlocks))},10);
                }
            }
            if(this.context.store.getState().type == ActionType.ADDNEEDCLEARBLOCKS) {
                let blockAction = this.getResultBlocks(this.context.store.getState().needClearBlocks);
                setTimeout(()=> {this.context.store.dispatch(addBlockAction(blockAction));}, 10);
                setTimeout(()=> {this.context.store.dispatch(fullUpdateBlokStatus(this.getBlockStatusByBlockAction(blockAction)));}, 4000);
            }
        })
    }

    getStateType () {
        return this.context.store.getState().type;
    }

    /*所有需要消除块的数据中加入needClear参数*/
    getNeedClearBlocks (blockArr) {
        let baseConfig = this.context.baseConfig,
            sameNumber = 1,
            needClearBlocks = blockArr,
            hasClearBlock = false;
        //得到横向可消除的块
        for(let row = 0; row<baseConfig.ROW_COUNT; row++) {
            for (let line = 0; line < baseConfig.LINE_COUNT - baseConfig.CLEAR_NUMBER + 1; line++) {
                sameNumber = 1;
                for (let j = 1; j < baseConfig.LINE_COUNT - line; j++) {
                    if (blockArr[row][line] == blockArr[row][line+j]) {
                        sameNumber ++;
                    } else {
                        break;
                    }
                }
                if(sameNumber >= baseConfig.CLEAR_NUMBER) {
                    hasClearBlock = true;
                    for (let l = 0; l < sameNumber; l++) {
                        needClearBlocks[row][line + l] = {needClear: true, status: needClearBlocks[row][line + l]};
                    }
                }
            }
        }
        //得到竖向可消除的块
        for(let row = 0; row<baseConfig.ROW_COUNT - baseConfig.CLEAR_NUMBER + 1; row++) {
            for (let line = 0; line < baseConfig.LINE_COUNT; line++) {
                sameNumber = 1;
                for (let j = 1; j < baseConfig.ROW_COUNT - row; j++) {
                    if (blockArr[row][line] == blockArr[row+j][line]) {
                        sameNumber ++;
                    } else {
                        break;
                    }
                }
                if(sameNumber >= baseConfig.CLEAR_NUMBER) {
                    hasClearBlock = true;
                    for (let l = 0; l < sameNumber; l++) {
                        needClearBlocks[row+l][line] = {needClear: true, status: needClearBlocks[row+l][line]};
                    }
                }
            }
        }
        //数组内所有内容全部变为对象
        for(let row = 0; row<baseConfig.ROW_COUNT; row++) {
            for (let line = 0; line < baseConfig.LINE_COUNT; line++) {
                if(typeof needClearBlocks[row][line] !== 'object'){
                    needClearBlocks[row][line] = {
                        needClear: false,
                        status: needClearBlocks[row][line]
                    }
                }
            }
        }
        return {needClearBlocks, hasClearBlock};
    }

    /*得到消除块后的blockArr*/
    getResultBlocks (needClearBlocks) {
        let baseConfig = this.context.baseConfig,
            tmpBlocks = JSON.parse(JSON.stringify(needClearBlocks)),
            clearCount = 0,
            curClearCount;

        for(let line=0; line< baseConfig.LINE_COUNT; line++){
            clearCount = 0;
            for(let row=baseConfig.ROW_COUNT-1; row>=0; row--){
                //记录当前块需要向下移动的块数
                tmpBlocks[row][line].downCount = clearCount;
                if(tmpBlocks[row][line].needClear) {
                    clearCount ++;
                }

                //记录下接下来的颜色
                curClearCount = 0;
                for(let i= row; i>=0 ; i--){
                    if(tmpBlocks[i][line].needClear){
                        continue;
                    }
                    if(curClearCount === tmpBlocks[row][line].downCount) {
                        tmpBlocks[row][line].newStatus = tmpBlocks[i][line].status;
                        break;
                    } else {
                        curClearCount ++;
                    }
                }
                if(typeof tmpBlocks[row][line].newStatus === 'undefined') {
                    tmpBlocks[row][line].newStatus = baseConfig.getRandomType();
                }
            }
        }

        return tmpBlocks;
    }


    getBlockStatusByBlockAction (blockAction) {
        let baseConfig = this.context.baseConfig,
            blockStatus = [],
            blockStatusRow = [];
        for(let row=0; row<baseConfig.ROW_COUNT; row++) {
            for(let line=0; line<baseConfig.LINE_COUNT; line++) {
                blockStatusRow.push(blockAction[row][line].newStatus);
            }
            blockStatus.push(blockStatusRow);
            blockStatusRow = [];
        }
        return blockStatus;
    }

    render () {
        return this.props.children;
    }
}

ClearBlock.contextTypes = {
    store: PropTypes.object,
    baseConfig: PropTypes.object
}

export default ClearBlock