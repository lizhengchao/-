/**
 * Created by lzc on 2017/10/10.
 */
import React, {Component} from 'react'
import Store from './Store'
import {updateBlockStatus} from './block/actions'
import {BLOCK_TYPES} from './baseConfig'

class Provider extends Component {
    constructor (props) {
        super(props);
        
        this.updateState = this.updateState.bind(this);
        
        this.state = {
            store: Store
        }
    }

    updateState () {
        this.state.store.dispatch(updateBlockStatus(0,0, BLOCK_TYPES.BLACK));
    }

    render () {
        return (
            <div>
                <button onClick={this.updateState}>update state</button>
            </div>
        )
    }
}

export default Provider;