/**
 * Created by lzc on 2017/9/28.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as Action from '../Action';

class UpdateCounter extends  Component {
    constructor (props, context) {
        super(props, context);
        
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);

        this.state = {count: this.getOwnState()};
    }

    getOwnState () {
        return this.context.store.getState()[this.props.counterCaption]
    }

    componentDidMount () {
        this.context.store.subscribe(() => {
            this.setState({count: this.getOwnState()});
        })
    }

    componentWillUnmount () {
        this.context.store.unsubscribe(() => {});
    }

    incrementCounter () {
        this.context.store.dispatch(Action.increment(this.props.counterCaption))
    }
    
    decrementCounter () {
        this.context.store.dispatch(Action.decrement(this.props.counterCaption))
    }
    
    render () {
        console.info('enter render updateCounter');
        return (
            <div>
                <button onClick={this.decrementCounter}>减一</button>
                <span style={{margin: '0px 10px'}}>{this.state.count}</span>
                <button onClick={this.incrementCounter}>加一</button>
            </div>
        )
    }
}

UpdateCounter.propsType = {
    // onUpdate: PropTypes.func
    counterCaption: PropTypes.string.required
}

UpdateCounter.contextTypes = {
    store: PropTypes.object
}

export default UpdateCounter