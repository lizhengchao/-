/**
 * Created by lzc on 2017/9/27.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UpdateCounter from './UpdateCounter'
// import Store from '../Store'

class Container extends  Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            counterName: 'count1',
            sumCount: this.getOwnState()
        };
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            this.setState({sumCount: this.getOwnState()})
        })
    }

    componentWillUnmount () {
        this.context.store.unsubscribe(() => {})
    }

    getOwnState () {
        var state = this.context.store.getState(),
            sumCounter = 0;
        for (var i in state){
            sumCounter += state[i];
        }
        return sumCounter;
    }

    render () {
        console.info('container render');
        return (
            <div>
                <UpdateCounter counterCaption={'First'}/>
                <UpdateCounter counterCaption={'Second'}/>
                <UpdateCounter counterCaption={'Third'}/>
                <div>三个计数器之和： {this.state.sumCount}</div>
            </div>
        )
    }
}

Container.contextTypes = {
    store: PropTypes.object
}

export default Container