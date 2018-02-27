/**
 * Created by lzc on 2017/10/9.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'

class CounterContainer extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            counterName: 'count1',
            sumCount: this.getOwnState()
        };
    }

    componentDidMount () {
        var unsub = this.context.store.subscribe(() => {
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
        return (
        <Counter sumCount={this.state.sumCount}/>
        )
    }
}

CounterContainer.contextTypes = {
    store: PropTypes.object
}

export default CounterContainer;