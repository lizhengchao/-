/**
 * Created by lzc on 2017/10/9.
 */
import {Component} from 'react'
import PropTypes from 'prop-types'

class Provider extends Component {
    render () {
        return this.props.children;
    }
    
    getChildContext () {
        return {
            store: this.props.store
        }
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
}

export default Provider;