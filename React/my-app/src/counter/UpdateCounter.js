/**
 * Created by lzc on 2017/9/28.
 */
import React, {Component, PropTypes} from 'react'
import CounterStore from '../flux/store/CounterStore'
import * as Action from '../flux/Actions'

class UpdateCounter extends  Component {
    constructor (props) {
        super(props);
        
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);

        this.state = {count: CounterStore.getCounterValues()[props.counterCaption]};
    }

    componentDidMount () {
        CounterStore.addChangeListener(() => {
            this.setState({count: CounterStore.getCounterValues()[this.props.counterCaption]})
        })
    }

    componentWillUnmount () {
        CounterStore.removeChnageListener(()=> {})
    }

    incrementCounter () {
        // this.setState({count: ++this.state.count});
        // this.props.onUpdate(this.state.count-1, this.state.count);
        Action.increment(this.props.counterCaption);
    }
    
    decrementCounter () {
        // this.setState({count: --this.state.count});
        // this.props.onUpdate(this.state.count+1, this.state.count);
        Action.decrement(this.props.counterCaption);
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