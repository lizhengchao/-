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
            blockStatus: this.getOwnState()
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
        let swapBlock = (rowA, lineA, rowB, lineB) => {
            var colorA = this.getOwnState()[rowA][lineA],
                colorB = this.getOwnState()[rowB][lineB];

            this.context.store.dispatch(updateBlockStatus(rowA, lineA, colorB));
            this.context.store.dispatch(updateBlockStatus(rowB, lineB, colorA));
        }

        switch (moveType) {
            case 'left':
                swapBlock(row, line, row, line-1);
                break;
            case 'right':
                swapBlock(row, line, row, line+1);
                break;
            case  'up':
                swapBlock(row, line, row-1, line);
                break;
            case 'down':
                swapBlock(row, line, row+1, line);
                break;
        }
    }


    render () {
        console.info('render container');
        const blockStatus = this.state.blockStatus;
        var blocks = [],
            rowBlock;

        for(let row in blockStatus) {
            rowBlock = [];
            for(let line in blockStatus[row]){
                rowBlock.push(<Block key={line}  status={blockStatus[row][line]} 
                                     row={parseInt(row)} line={parseInt(line)} move={this.blockMove}/>)
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