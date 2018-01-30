import {getData} from './refreshData';
import {doByOrder, frameRenderModelMove, frameRefreshDistance, redPacketAppear} from './utils';


var container = $('.container');
var bgsContainer = $('.backgrounds-container'),
    bg1 = $('.background1'),
    text = $('.text'),
    distance = $('#distance'),
    startBtn = $('.startBtn');
initPlane();

startBtn[0].addEventListener('click', function() {
    startBtn.css('opacity', '0');
    refreshData();
    playRadio();
    initTime();
});


function initPlane() {
    $(container).height(window.innerHeight);

    //先让background1显示，一帧后再消失，否则当屏幕刚移动到background1时会有一下卡顿
    bg1.addClass('appear')
    setTimeout(function() {
        bg1.removeClass('appear');
    }, 1000/16);
}

function refreshData() {

    var newRenderContainerMove = doByOrder(renderContainerMove),
        newRenderDistanceUpdate = doByOrder(renderDistanceUpdate), //背景移动和数字更新分开单独渲染
        lastMoveY = 0, //上一次的移动距离
        lastMoveY2 = 0;

    getData(function(data, time) {
        appendBackground(data);
        addDistanceText(data);

        newRenderContainerMove(time, data, function(bgsContainer, trueNextMoveY) {
            lastMoveY = trueNextMoveY;
        })

        //红包出现的逻辑内嵌在数字变化流程
        newRenderDistanceUpdate(time, data, function(distance, trueNextCount) {
            lastMoveY2 = trueNextCount;
        })
    });

    function renderContainerMove(time, data, callback) {
        frameRenderModelMove(time,lastMoveY, data, bgsContainer, callback);


    }

    function renderDistanceUpdate(time, data, callback) {
        frameRefreshDistance(time, lastMoveY2, data, distance, callback);
    }

    var needAddY = 5765; //临界距离
    /**
     * 根据当前Y轴增加背景
     * @param curMoveY
     */
    function appendBackground(curMoveY) {
        if(needAddY - curMoveY <= 700) {
            bgsContainer.prepend(bg1.clone());
            needAddY += 4302;
        }
    }

    var textHasAppear = false;
    /**
     * 增加文字
     * @param curMoveY
     */
    function addDistanceText(curMoveY) {
        if(!textHasAppear && curMoveY >= 732) {
            text.css('display', 'block');
            textHasAppear = true;
        }

    }
};

function playRadio() {
    var startAudio = $('#startAudio');
    startAudio[0].play();

    var runAudio = $('#runAudio');
    runAudio[0].play();
}

var time = 30;
function initTime() {
    var timeDom = $('.time');
    var updateTime = setInterval(function() {
        timeDom.text(time);
        if(time === 0 ) {
            clearInterval(updateTime);
            return;
        }
        time --;
    }, 1000);
}