/**
 * Created by lzc on 2017/10/10.
 */
import /*React,*/ {Component} from 'react'
import PropTypes from 'prop-types'

class Provider extends Component {

    render () {
        return this.props.children;
    }

    getChildContext () {
        return {
            store: this.props.store,
            baseConfig: this.props.baseConfig
        }
    }
}

Provider.childContextTypes = {
    store: PropTypes.object,
    baseConfig: PropTypes.object
}

export default Provider;