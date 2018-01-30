import {appearMoveYList, redPacketExsitTime} from './const';

function round(v,e){
    var t=1;
    for(;e>0;t*=10,e--);
    for(;e<0;t/=10,e++);
    return Math.round(v*t)/t;
}

/**
 * 将action包装为只有在上一次执行完毕后才能执行下一次，
 * @param action 需要执行的方法，最后一个参数必须为执行完毕的回调函数
 */
function doByOrder (action) {
    if(typeof action !== 'function') {
        return null;
    }

    var isRunning = false,
        unDoActionQueue = [];

    function run () {
        if(isRunning) {
            unDoActionQueue.push(arguments);
            console.info('unDoActionQueue lenght:' + unDoActionQueue.length + ' method:' + action.name);
        } else {
            var slice = Array.prototype.slice,
                argLength = arguments.length,
                otherArg =slice.call(arguments, 0, argLength-1),
                lastCallbackArg = slice.call(arguments, argLength-1, argLength)[0];

            isRunning = true;

            action(...otherArg, function () {
                isRunning = false;

                //执行真正的callback
                lastCallbackArg(...arguments);

                //执行完毕后开始执行queue中下一个任务
                if(unDoActionQueue.length >0) {
                    run(...unDoActionQueue.shift());
                }
            })
        }
    }

    return run;
}

/**
 * 一帧一帧渲染动画
 * @param time 时间/s
 * @param preMoveY 上一次的Y轴/px
 * @param nextMoveY 下一次的Y轴/px
 * @param modelDom 需要移动的飞机dom
 * @param finishCallback 渲染完成后的回调
 */
function frameRenderModelMove(time, preMoveY, nextMoveY, modelDom, finishCallback) {
    var renderCount = round(time*60), //在time时间内渲染的次数
        oneFrameMoveY = round((nextMoveY - preMoveY)/renderCount*1000, 0), //接下来每一帧会移动的距离，小数点后三位，并变为整数，因为小数在计算机中计算会有偏差
        trueNextMoveY = preMoveY*1000 + renderCount*oneFrameMoveY, //由于每一帧移动的距离是取最后三位算出来的，所以最后一帧的真实距离会有偏差
        curMoveY = preMoveY*1000;

    function move () {
        curMoveY = curMoveY + oneFrameMoveY;
        $(modelDom).css('transform', "translateY("+(curMoveY/1000)+"px)");
        if(curMoveY == trueNextMoveY) {
            finishCallback && finishCallback(modelDom, round(trueNextMoveY/1000, 0));
            return;
        } else { //未渲染到指定位置则继续在下一帧渲染
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

var nextRedPacketIndex = 0;
var nextRedPacketY = appearMoveYList[nextRedPacketIndex].moveY;
var lastRender = false; //一个红包的最后一次渲染
var numberZeroKeep = false;
function frameRefreshDistance(time, preMoveY, nextMoveY, distanceDom, finishCallback) {

    var preDistanceToPacket = nextRedPacketY - preMoveY, //本次刷新开始时距离红包的Y轴距离
        nextDistanceToPacket = nextRedPacketY - nextMoveY;//本次刷新结束时距离红包的Y轴距离

    //马上到达红包的距离：出现红包
    if(nextMoveY >= nextRedPacketY) {
        redPacketAppear(nextRedPacketIndex);
        nextDistanceToPacket = 0;
        lastRender = true;
        nextRedPacketIndex ++;
        nextRedPacketY = appearMoveYList[nextRedPacketIndex].moveY;
    }

    var renderCount = round(time*60), //在time时间内渲染的次数
        oneFrameAdd = round((nextDistanceToPacket - preDistanceToPacket)/renderCount*100, 0),
        trueNextCount = preDistanceToPacket*100 + renderCount*oneFrameAdd,
        curCount = preDistanceToPacket*100;

    function move () {
        curCount += oneFrameAdd;
        distanceDom.text(curCount);
        if(numberZeroKeep) {
            distanceDom.text(0);
        }
        if(curCount == trueNextCount) {
            if(lastRender) {//最后一次渲染时直接将text置为0
                distanceDom.text(0);
                lastRender = false;
                numberZeroKeep = true;
                setTimeout(()=>{numberZeroKeep = false}, 1000) //一秒内保持数字为0
            }
            finishCallback && finishCallback(distanceDom, nextRedPacketY - round(trueNextCount/100, 0));
        } else { //未渲染到指定位置则继续在下一帧渲染
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

//红包出现逻辑
function redPacketAppear(curRedPacketIndex) {
    var redPacket = $('#redPacket'),
        curPacketUrl = appearMoveYList[curRedPacketIndex].imgSrc;

    if(!curPacketUrl) { return;}

    redPacket.css('background-image', 'url("'+ curPacketUrl +'")');

    if(curRedPacketIndex < appearMoveYList.length -2) {
        redPacket.removeClass();
        redPacket.addClass('state1');

        new Promise(function(resolve, reject) {
            setTimeout(function() {
                redPacket.removeClass();
                redPacket.addClass('state2');
                resolve();
            }, 660);
        }).then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(function() {
                    redPacket.removeClass();
                    redPacket.addClass('state3');
                    resolve();
                }, 660);
            })
        }).then(function(){
            setTimeout(function() {
                redPacket.removeClass();
                redPacket.addClass('state0');
            }, 660);
        })
    } else if(curRedPacketIndex == appearMoveYList.length -2) {
        //最后一个做特殊的动画处理
        var redPacket2 = redPacket.clone();
        var container= $('.container');
        container.append(redPacket2);
        redPacket.removeClass();
        redPacket.addClass('state5');
        redPacket2.removeClass();
        redPacket2.addClass('state6');
        setTimeout(function() {
            redPacket.removeClass();
            redPacket.addClass('state4');
            redPacket2.removeClass();
            redPacket2.addClass('state4');
            setTimeout(function(){
                redPacket2.css('display', 'none');
                redPacket.removeClass();
                redPacket.addClass('state7');
            }, 500)
        }, 2000);
    }
}

export {
    round,
    doByOrder,
    frameRenderModelMove,
    frameRefreshDistance,
    redPacketAppear
}