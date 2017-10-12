/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {updateBlockStatus} from '../actions'
import Block from './Block'
import './Container.css'

class Container extends Component {
    constructor (props, context) {
        super(props, context);

        this.getOwnState = this.getOwnState.bind(this);
        this.blockMove = this.blockMove.bind(this);

        this.state = {
            blockStatus: this.getOwnState(),
            moveBlocks: [   //需要加入动画的特殊块
                /*{
                    row: 0,
                    line: 0,
                    moveAnimation: ''
                }*/
            ]
        }
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            this.setState({blockStatus: this.getOwnState()});
        })
    }

    getOwnState () {
        return this.context.store.getState().blockStatus;
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
            this.setState({
                moveBlocks: moveBlocks
            });

            var colorA = this.getOwnState()[rowA][lineA],
                colorB = this.getOwnState()[rowB][lineB];

            this.context.store.dispatch(updateBlockStatus(rowA, lineA, colorB));
            this.context.store.dispatch(updateBlockStatus(rowB, lineB, colorA));
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
                let moveBlocks = this.state.moveBlocks;
                for(let moveBlock of moveBlocks) {
                    if(moveBlock.row == row && moveBlock.line == line){ //如果是特殊块则需要增加动画属性
                        return (
                            <Block key={line}  status={status} animation={moveBlock.moveAnimation}
                                       row={parseInt(row, 10)} line={parseInt(line, 10)} move={this.blockMove}/>
                        )
                    }
                }
                return (
                    <Block key={line}  status={status} row={parseInt(row, 10)} line={parseInt(line, 10)} move={this.blockMove}/>
                )
            }

        for(let row in blockStatus) {
            rowBlock = [];
            for(let line in blockStatus[row]){
                rowBlock.push(getBlocks(row, line, blockStatus[row][line]));
            }
            rowBlock = (<div key={row} className="row">{rowBlock}</div>);
            blocks.push(rowBlock);
        }

        return (
            <div>
                {blocks}
            </div>
        )
    }
}

Container.contextTypes = {
    store: PropTypes.object
}

export default Container;