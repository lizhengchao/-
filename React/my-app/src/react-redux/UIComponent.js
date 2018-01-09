import React, {Component} from 'react';
import PropTypes from 'prop-types'

class UIComponent extends Component {
    render () {
        var {value, addClick} = this.props;
        return (
            <div>
                <div>当前值:{value}</div>
                <button onClick={addClick}>加一</button>
            </div>
        )
    }
}

UIComponent.contextTypes = {
    store: PropTypes.object
}

export default UIComponent