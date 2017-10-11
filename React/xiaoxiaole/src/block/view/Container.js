/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import './Container.css'

class Container extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            blockStatus: this.context.store.getState().blockStatus
        }
    }

    render () {
        const blockStatus = Object.assign({}, this.state.blockStatus);
        var blocks = [],
            rowBlock;

        for(let row in blockStatus) {
            rowBlock = [];
            for(let line in blockStatus[row]){
                rowBlock.push(<Block key={row*100+line}  status={blockStatus[row][line]}/>)
            }
            rowBlock = (<div class="row">{rowBlock}</div>);
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