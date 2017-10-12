/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Block.css'

class Block extends Component {
    constructor (props, context) {
        super(props, context);

        this.getColorByStatus = this.getColorByStatus.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);

        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        this.transform = 'translate(0px, 0px)';
        this.transition= 'transform 0.5s';

        this.state = {
            color: this.getColorByStatus(props.status),
            animation: ''
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({animation: nextProps.animation});
        if(this.getColorByStatus(nextProps.status) !== this.state.color) {
            setTimeout(() => { //等待动画完成后再更新颜色
                this.setState({
                    color: this.getColorByStatus(nextProps.status,),
                    animation: ''
                });
            }, 500);
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if(this.getColorByStatus(nextProps.status) === this.state.color){
            return false;
        } else {
            return true;
        }
    }

    componentWillUpdate (nextProps, nextState) {
        switch (nextState.animation){
            case 'left':
                this.transition = 'transform 0.5s';
                this.transform = 'translate(-35px, 0px)';
                break;
            case 'right':
                this.transition = 'transform 0.5s';
                this.transform = 'translate(35px, 0px)';
                break;
            case 'up':
                this.transition = 'transform 0.5s';
                this.transform = 'translate(0px, -35px)';
                break;
            case 'down':
                this.transition = 'transform 0.5s';
                this.transform = 'translate(0px, 35px)';
                break;
            default:
                this.transition = 'transform 0s';
                this.transform = '';
        }
    }

    render () {
        console.info('render block');
        return (
            <div className="block" style={{'backgroundColor': this.state.color, transform: this.transform, transition: this.transition}}
                 onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}></div>
        )
    }

    getColorByStatus (status) {
        return status;
    }

    touchStart (e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    touchMove (e) {
        this.touchEndX = e.touches[0].clientX;
        this.touchEndY = e.touches[0].clientY;
    }

    touchEnd (e) {
        //返回滑动的方向和所在位置
        let touchMoveX = this.touchEndX - this.touchStartX,
            touchMoveY = this.touchEndY - this.touchStartY,
            moveType = '';
        if (Math.abs(touchMoveX) > Math.abs(touchMoveY)){
            if (touchMoveX > 0) {
                moveType = 'right';    
            } else {
                moveType = 'left';  
            }
        } else if (Math.abs(touchMoveX) < Math.abs(touchMoveY)) {
            if (touchMoveY > 0) {
                moveType = 'down';
            } else {
                moveType = 'up';
            }
        }
        this.props.move({
            row: this.props.row, 
            line: this.props.line, 
            moveType: moveType
        });
    }
}

Block.propTypes = {
    status: PropTypes.string,
    line: PropTypes.number,
    row: PropTypes.number,
    move: PropTypes.func,
    animation: PropTypes.string //如果有该参数则说明需要做动画
}

export default Block;