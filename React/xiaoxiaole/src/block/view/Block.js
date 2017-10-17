/**
 * Created by lzc on 2017/10/11.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Block.css'

class Block extends Component {
    constructor (props, context) {
        super(props, context);

        this.dealAnimations = this.dealAnimations.bind(this);
        this.getColorByStatus = this.getColorByStatus.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);

        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        this.animationQueue = []; //当前块的动画队列
        this.isStop = false; //记录动画阻塞状态

        this.state = {
            color: this.getColorByStatus(props.status),
            transform: '',
            transition: '',
            opacity: ''
        }
    }

    componentWillReceiveProps (nextProps) {
        if(!nextProps.newAnimation){
            return;
        } else if(nextProps.newAnimation.constructor === Array){
            //如果是数组则说明是多个动画
            nextProps.newAnimation.forEach((newAnimation) => {
                this.animationQueue.push(newAnimation);
            })
        } else {
            this.animationQueue.push(nextProps.newAnimation);
        }

        if(!this.isStop){
            this.dealAnimations();
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.newAnimation &&!this.isStop){
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate (nextProps, nextState) {
    }

    render () {
        console.info('render block');
        return (
            <div className="block" style={{'backgroundColor': this.state.color, transform: this.state.transform,
            transition: this.state.transition, opacity: this.state.opacity}}
                 onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}></div>
        )
    }

    dealAnimations () {
        let  dealColor = (animation) => {
                this.setState({
                    color: animation.color
                });
                this.dealAnimations();
            },
        /*animation.moveType: 移动的方向
         * animation.moveNumber: 移动几格*/
            dealMove = (animation) => {
                if(typeof animation.moveNumber == 'undefined'){animation.moveNumber = 1}
                let moveLength = animation.moveNumber * (parseInt(this.context.baseConfig.BLOCK_RADIUS*2)+
                    parseInt(this.context.baseConfig.BLOCK_SPACE));
                switch (animation.moveType){
                    case 'left':
                        this.setState({
                            transition: 'transform 0.5s',
                            transform: 'translate(-'+moveLength+'px, 0px)'
                        });
                        break;
                    case 'right':
                        this.setState({
                            transition: 'transform 0.5s',
                            transform: 'translate('+moveLength+'px, 0px)'
                        });
                        break;
                    case 'up':
                        this.setState({
                            transition: 'transform 0.5s',
                            transform: 'translate(0px, -'+moveLength+'px)'
                        });
                        break;
                    case 'down':
                        this.setState({
                            transition: 'transform 0.5s',
                            transform: 'translate(0px, '+moveLength+'px)'
                        });
                        break;
                    default:
                        this.setState({
                            transition: 'transform 0s',
                            transform: ''
                        });
                }
                setTimeout(()=> {
                    this.isStop = true;
                }, 0);
                setTimeout(() => {
                    this.isStop = false;
                    this.setState({
                        transition: 'transform 0s',
                        transform: ''
                    });
                    this.dealAnimations();
                }, 500);
            },
            dealDisappear = () => {
                this.setState({
                    opacity: '0',
                    transition: 'opacity 2s'
                });
                setTimeout(()=>{
                    this.isStop = true;
                },0);
                setTimeout(() => {
                    this.isStop = false;
                    this.setState({
                        opacity: '1',
                        transition: 'opacity 0s'
                    });
                    this.dealAnimations();
                }, 2000);
            },
            curAnimation = this.animationQueue.shift();
        if(curAnimation) {
            switch (curAnimation.type) {
                case 'setColor': //更新颜色
                    dealColor(curAnimation);
                    break;
                case 'move':
                    dealMove(curAnimation);
                    break;
                case 'disappear':
                    dealDisappear();
                    break;
                default:
            }
        }
    };

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
        //告诉外部组件滑动的方向和自己所属的位置
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
        this.props.touch({
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
    touch: PropTypes.func,
    // newAnimation: PropTypes.object  //接下来要完成的新动画
};

Block.contextTypes = {
    baseConfig: PropTypes.object
}

export default Block;