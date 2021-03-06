/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {fullUpdateBlokStatus} from '../actions'
import Block from './Block'
import ClearBlock from './ClearBlock'
import './Container.css'
import * as ActionType from '../actionTypes'

class Container extends Component {
    constructor (props, context) {
        super(props, context);

        this.getOwnState = this.getOwnState.bind(this);
        this.blockMove = this.blockMove.bind(this);
        this.moveBlocks = [];   //需要移动的块
        this.needClearBlocks = []; //需要消除的块
        this.blockAction = []; //需要移动动作的块

        this.state = {
            blockStatus: this.getOwnState()
        }
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            console.info('in container, store subscribe, action type:' + this.getStateType());
            if(this.getStateType() == ActionType.FULLUPDATEBLOCKSTATUS){
                this.setState({blockStatus: this.getOwnState()});
            } else if (this.getStateType() == ActionType.ADDNEEDCLEARBLOCKS) {
                let needClearBlocks= this.getNeedClearBlocks();
                if(needClearBlocks.length > 0){
                    this.needClearBlocks = needClearBlocks;
                    this.setState({});
                }
            } else if (this.getStateType() == ActionType.ADDBLOCKACTION) {
                let blockAction = this.getBlockAction();
                if(blockAction.length > 0) {
                    this.blockAction = blockAction;
                    this.setState({});
                }
            }
        })
    }

    getOwnState () {
        return this.context.store.getState().blockStatus;
    }
    
    getStateType() {
        return this.context.store.getState().type;
    }

    getNeedClearBlocks () {
        return this.context.store.getState().needClearBlocks;
    }

    getBlockAction () {
        return this.context.store.getState().blockAction;
    }
    
    blockMove ({row, line, moveType}) {
        var swapBlock = (rowA, lineA, moveA, rowB, lineB, moveB) => {
            var moveBlocks = [];
            moveBlocks.push({
                row: rowA,
                line: lineA,
                moveAnimation: moveA
            },{
                row: rowB,
                line: lineB,
                moveAnimation: moveB
            });
            this.moveBlocks = moveBlocks;

            var blockArr = this.getOwnState(),
                colorA = this.getOwnState()[rowA][lineA],
                colorB = this.getOwnState()[rowB][lineB];

            blockArr[rowA][lineA] = colorB;
            blockArr[rowB][lineB] = colorA;

            this.context.store.dispatch(fullUpdateBlokStatus(blockArr));
        }

        switch (moveType) {
            case 'left':
                swapBlock(row, line, 'left', row, line-1, 'right');
                break;
            case 'right':
                swapBlock(row, line, 'right', row, line+1, 'left');
                break;
            case  'up':
                swapBlock(row, line, 'up', row-1, line, 'down');
                break;
            case 'down':
                swapBlock(row, line, 'down', row+1, line, 'up');
                break;
            default:
        }
    }


    render () {
        console.info('render container');
        const blockStatus = this.state.blockStatus;
        var blocks = [],
            rowBlock,
            getBlocks = (row, line, status) => {
                let moveBlocks = this.moveBlocks,
                    needClearBlocks = this.needClearBlocks,
                    blockAction = this.blockAction,
                    newAnimation = [],
                    canTouch = true;
                if(moveBlocks.length > 0) {
                    canTouch = false;
                    for(let moveBlock of moveBlocks) {
                        if(moveBlock.row == row && moveBlock.line == line){ //如果是特殊块则需要增加动画属性
                            newAnimation.push({type: 'move', moveType: moveBlock.moveAnimation}, {type: 'setColor', color: status});
                            break;
                        }
                    }
                    if(newAnimation.length === 0) {
                        newAnimation.push({type: 'timeout', time: 500});
                    }
                }


                if(needClearBlocks.length > 0) {
                    canTouch = false;
                    if(needClearBlocks[row][line].needClear) {
                        newAnimation.push({type: 'disappear'});
                    } else {
                        newAnimation.push({type: 'timeout', time: 2000});
                    }
                }

                if(blockAction.length > 0) {
                    canTouch = false;
                    if(blockAction[row][line].downCount > 0 && !blockAction[row][line].needClear){
                        newAnimation.push({type: 'move', moveType: 'down', moveNumber: blockAction[row][line].downCount},
                            {type: 'setColor', color: blockAction[row][line].newStatus});
                    } else if(blockAction[row][line].needClear){
                        newAnimation.push({type: 'setColor', color: 'white'}, {type: 'timeout', time: 500}, {type: 'setColor', color: blockAction[row][line].newStatus});
                    } else {
                        newAnimation.push({type: 'timeout', time: 500});
                    }
                }

                return (
                    <Block key={line} newAnimation={newAnimation} status={status} row={parseInt(row, 10)} line={parseInt(line, 10)} touch={this.blockMove} canTouch={canTouch}/>
                )
            };

        for(let row in blockStatus) {
            if(blockStatus.hasOwnProperty(row)){
                rowBlock = [];
                for(let line in blockStatus[row]){
                    if(blockStatus[row].hasOwnProperty(line)) {
                        rowBlock.push(getBlocks(row, line, blockStatus[row][line]));
                    }
                }
                rowBlock = (<div key={row} className="row">{rowBlock}</div>);
                blocks.push(rowBlock);
            }
        }

        return (
            <div>
                <ClearBlock>
                    {blocks}
                </ClearBlock>
            </div>
        )
    }

    componentDidUpdate () {
        if(this.moveBlocks.length > 0){
            this.moveBlocks = [];
        }
        if(this.needClearBlocks.length > 0) {
            this.needClearBlocks = [];
        }
        if(this.blockAction.length > 0) {
            this.blockAction = [];
        }
    }
}

Container.contextTypes = {
    store: PropTypes.object
}

export default Container;