/**
 * Created by lzc on 2017/9/27.
 */
import React, {Component} from 'react'
import ClickCounter from './ClickCounter'
import UpdateCounter from './UpdateCounter'
import SummaryStore from '../flux/store/SummaryStore'

class Container extends  Component {
    constructor (props) {
        super(props);

        this.counterNameChange = this.counterNameChange.bind(this);
        this.counterOnUpdate = this.counterOnUpdate.bind(this);

        this.state = {
            counterName: 'count1',
            sumCount: SummaryStore.getSummaryValue()
        };
    }

    componentDidMount () {
        SummaryStore.addChangeListener(() => {
            this.setState({sumCount: SummaryStore.getSummaryValue()})
        })
    }

    componentWillUnmount () {
        SummaryStore.removeChnageListener(() => {})
    }

    counterNameChange (e) {
        this.setState({counterName: e.target.value});
    }

    counterOnUpdate (oldValue, newValue) {
        this.setState({sumCount: this.state.sumCount+newValue-oldValue})
    }

    render () {
        console.info('container render');
        return (
            <div>
                <p>this is container</p>
                <button onClick={()=>{this.forceUpdate()}}>点击刷新Container</button>
                <br/>
                <input type="text" placeholder="enter counter name" onChange={this.counterNameChange}/>
                <ClickCounter name={this.state.counterName}/>
                <div style={{height: '100px'}}></div>
                <UpdateCounter counterCaption={'First'}/>
                <UpdateCounter counterCaption={'Second'}/>
                <UpdateCounter counterCaption={'Third'}/>
                <div>三个计数器之和： {this.state.sumCount}</div>
            </div>
        )
    }
}

export default Container