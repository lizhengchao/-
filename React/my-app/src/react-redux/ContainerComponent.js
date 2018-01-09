import React, {Component} from 'react';
import {connect} from 'react-redux';
import UIComponent from './UIComponent';
import * as ActionTypes from './ActionType';

var mapStateToProps = (state) => {
    return {
        value: state ? state.count:0
    }
}

var mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addClick: () => {
            dispatch(ActionTypes.AddCount)
        }
    }
}

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(UIComponent);

export default ContainerComponent;