/**
 * Created by lzc on 2017/9/25.
 */
import React, {Component, PropTypes} from 'react'

class ClickCounter extends Component {

    constructor (props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.state = {
            count: 0,
            name: props.name
        };
    }

    onClickButton () {
        this.setState({count: this.state.count + 1}); /*this.setState除了会修改state具体的值还会重新渲染页面*/
    }

    render () {
        console.info('enter click count render');
        const countStyle = {'color': 'blue'};
        return (
            <div>
                <p>this is click count, count name: {this.state.name}</p>
                <button onClick={this.onClickButton}>Click Me</button>
                <div style={countStyle}>
                    Click Count: {this.state.count}
                </div>
            </div>
        )
    }

    componentWillMount () { /*没有参数*/
        console.info('before clickCounter mount render');
    }

    componentDidMount () { /*没有参数*/
        console.info('after clickCounter mount render');
    }

    componentWillReceiveProps(nextProps) { /*在父组件render时会被调用*/
        console.info('clickCount will recive props');
        this.setState({name: nextProps.name});

    }

    shouldComponentUpdate (nextProps, nextState) {
        console.info('enter click count shouldComponenetUpdate')
        return true;
    }

    componentWillUpdate (nextProps, nextState) {
        console.info('enter click count componentWillUpdate');
    }

    componentDidUpdate (nextProps, nextState) {
        console.info('enter click count  componentDidUpdate');
    }

    componentWillUnmount (a,b) {
        debugger;
    }

}

ClickCounter.propTypes = { /*定义props的可接受类型，并且需放到类定义外，否则会抛错*/
    name: PropTypes.string
}

ClickCounter.defaultProps = { /*设置props默认值*/
    name: ''
}

export default ClickCounter