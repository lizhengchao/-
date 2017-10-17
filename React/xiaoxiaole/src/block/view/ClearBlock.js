/**
 * Created by lzc on 2017/10/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {fullUpdateBlokStatus, addNeedClearBlocks} from '../actions'
import * as ActionType from '../actionTypes'

/*
* 监听store变化，按照规则清除块
* */
class ClearBlock extends Component {
    constructor (props, context) {
        super(props, context);

        this.getNeedClearBlocks = this.getNeedClearBlocks.bind(this);
        this.fullUpdateBlockAction = this.fullUpdateBlockAction.bind(this);
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            if(this.context.store.getState().type == ActionType.FULLUPDATEBLOCKSTATUS) {
                let needClearBlocks = this.getNeedClearBlocks(JSON.parse(JSON.stringify(this.context.store.getState().blockStatus)));
                this.context.store.dispatch(addNeedClearBlocks(needClearBlocks));
            }
        })
    }

    /*所有需要消除块的数据中加入needClear参数*/
    getNeedClearBlocks (blockArr) {
        let baseConfig = this.context.baseConfig,
            sameNumber = 1,
            needClearBlocks = blockArr;
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
                    for (let l = 0; l < sameNumber; l++) {
                        needClearBlocks[row+l][line] = {needClear: true, status: needClearBlocks[row+l][line]};
                    }
                }
            }
        }
        return needClearBlocks;
    }

    /*得到消除块后的blockArr*/
    clearBlocks (blockArr, needClearBlocks) {
        let baseConfig = this.context.baseConfig;

    }

    fullUpdateBlockAction (blockStatus) {
        this.context.store.dispatch(fullUpdateBlokStatus(blockStatus));
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