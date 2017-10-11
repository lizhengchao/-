/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import Block from './Block'
import PropTypes from 'prop-types'

class Container extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div>this is container
                <Block/>
            </div>
        )
    }
}

Container.contextTypes = {
    store: PropTypes.object
}

export default Container;