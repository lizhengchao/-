/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import './Block.css'

class Block extends Component {
    constructor (props, context) {
        super(props, context);

        this.getColorByStatus = this.getColorByStatus.bind(this);
        
        this.state = {
            color: this.getColorByStatus(props.status)
        }
    }
    
    getColorByStatus (status) {
        return status;
    }

    componentWillReceiveProps (nextProps) {
        this.setState({color: this.getColorByStatus(nextProps.status)});
    }

    render () {
        return (
            <div className="block" style={{'backgroundColor': this.state.color}}></div>
        )
    }
}

export default Block;