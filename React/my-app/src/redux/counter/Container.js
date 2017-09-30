/**
 * Created by lzc on 2017/9/27.
 */
import React, {Component} from 'react'
import UpdateCounter from './UpdateCounter'
import Store from '../Store'

class Container extends  Component {
    constructor (props) {
        super(props);

        this.state = {
            counterName: 'count1',
            sumCount: this.getOwnState()
        };
    }

    componentDidMount () {
        Store.subscribe(() => {
            this.setState({sumCount: this.getOwnState()})
        })
    }

    componentWillUnmount () {
        Store.unsubscribe(() => {})
    }

    getOwnState () {
        var state = Store.getState(),
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

export default Container