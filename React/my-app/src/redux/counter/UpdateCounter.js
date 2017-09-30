/**
 * Created by lzc on 2017/9/28.
 */
import React, {Component, PropTypes} from 'react'
import Store from '../Store';
import * as Action from '../Action';

class UpdateCounter extends  Component {
    constructor (props) {
        super(props);
        
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);

        this.state = {count: this.getOwnState()};
    }

    getOwnState () {
        return Store.getState()[this.props.counterCaption]
    }

    componentDidMount () {
        Store.subscribe(() => {
            this.setState({count: this.getOwnState()});
        })
    }

    componentWillUnmount () {
        Store.unsubscribe(() => {});
    }

    incrementCounter () {
        Store.dispatch(Action.increment(this.props.counterCaption))
    }
    
    decrementCounter () {
        Store.dispatch(Action.decrement(this.props.counterCaption))
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

export default UpdateCounter