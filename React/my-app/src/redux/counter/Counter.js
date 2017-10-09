/**
 * Created by lzc on 2017/10/9.
 */
import React, {Component} from 'react'
import UpdateCounter from './UpdateCounter'

class Counter extends Component {
    render () {
        const {sumCount} = this.props;
        return (
            <div>
                <UpdateCounter counterCaption={'First'}/>
                <UpdateCounter counterCaption={'Second'}/>
                <UpdateCounter counterCaption={'Third'}/>
                <div>三个计数器之和： {sumCount}</div>
            </div>
        )
    }
}

export default Counter