import {getData, clearGetData, setSpeed} from './refreshData';
import {doByOrder, frameRenderModelMove, setAppearMoveYList, frameRefreshDistance, reset, round} from './utils';


var container = $('.container');
var bgsContainer = $('.backgrounds-container'),
    bg0 = $('.background0'),
    bg1 = $('.background1'),
    bg2 = $('.background2'),
    text = $('.text'),
    distance = $('#distance'),
    topGameBtn = $('.topGameBtn'),
    fire = $('.fire');
initView();

setSpeed(1);

topGameBtn[0].addEventListener('click', function() {
    topGameBtn.css('animation', 'myRotate .5s linear infinite');
    setTimeout(() => {
        topGameBtn.css('opacity', '0');
        $(fire[0]).css('animation', 'fire .5s linear infinite');
        $(fire[1]).css('animation', 'fire .5s linear infinite');
        refreshData();
        setTimeout(()=>{
            topGameBtn.css('display', 'none')
        }, 1000)
    }, 2000);
    // setAppearMoveYList([
    //     {
    //         moveY: 2000,
    //         imgSrc: 'source/288.png',
    //         redPacketNumber: 288
    //     },
    //     {
    //         moveY: 4000,
    //         imgSrc: 'source/888.png',
    //         redPacketNumber: 888
    //     },
    //     {
    //         moveY: 6000,
    //         imgSrc: 'source/1188.png',
    //         redPacketNumber: 1188
    //     },
    //     {
    //         moveY: 8000,
    //         imgSrc: 'source/1688.png',
    //         redPacketNumber: 1688
    //     },
    //     {
    //         moveY: 10000,
    //         imgSrc: 'source/1888.png',
    //         redPacketNumber: 1888
    //     },
    //     {
    //         moveY: 12000,
    //         imgSrc: 'source/2018.png',
    //         redPacketNumber: 2018
    //     },
    //     {
    //         moveY: 0
    //     }
    // ]);

    setAppearMoveYList(getRandomAppearMoveYList());
    playRadio();
});

function initView() {
    $(container).height(window.innerHeight);

    (function() {
        //设置背景的宽高
        var bg0Scale = round(2000/1543, 2),
            bg1Scale = round(2000/1769, 2),
            bg2Scale = round(2000/829, 2),
            bg0W, bg0H, bg1W, bg1H, bg2W, bg2H;
        bg0H = window.innerHeight;
        bg0W = parseInt(bg0H*bg0Scale);
        bg1W = bg0W;
        bg1H = parseInt(bg1W/bg1Scale);
        bg2W = bg0W;
        bg2H = parseInt(bg2W/bg2Scale);

        $(bg0).height(bg0H);
        $(bg0).width(bg0W);
        $(bg1).height(bg1H);
        $(bg1).width(bg1W);
        $(bg2).height(bg2H);

        //设置按钮位置
        // var btnWidth = $(topGameBtn).width();
    })();

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
        console.info('data: ' + data + ' time: ' + time);
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
        frameRenderModelMove(time,lastMoveY, data, [bgsContainer, bg2], callback);


    }

    function renderDistanceUpdate(time, data, callback) {
        frameRefreshDistance(time, lastMoveY2, data, distance, callback);
    }

    var bg1Height = $(bg1).height();
    var needAddY = $(bgsContainer).height(); //临界距离
    /**
     * 根据当前Y轴增加背景
     * @param curMoveY
     */
    function appendBackground(curMoveY) {
        console.info('needAddY:' + needAddY);
        if(needAddY - curMoveY <= 700) {

            bgsContainer.prepend(bg1.clone());
            needAddY += bg1Height;
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
    // var startAudio = $('#startAudio');
    // startAudio[0].play();

    var runAudio = $('#runAudio');
    var musics = ['run', 'run1', 'run2', 'run3'];
    var random = parseInt(Math.random()*4);
    runAudio[0].src = 'source/' + musics[random] + '.mp3';
    // runAudio[0].src = 'source/run.mp3';
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

function getRandomAppearMoveYList() {
    var randomFinalRedPacketList = [108, 128, 168, 188, 208, 228, 268, 288];

    var finalRedPacket = randomFinalRedPacketList[parseInt(Math.random()*randomFinalRedPacketList.length)],
        redPacketCount = 4,
        moveYList = [],
        space = finalRedPacket/redPacketCount,
        randomNumber;
    for(var i=0; i<redPacketCount; i++) {
        if(i < redPacketCount -1) {
            randomNumber = parseInt(space*i + Math.random() * space)
        } else {
            randomNumber = finalRedPacket;
        }
        moveYList.push({
            moveY: (i+1)*2000,
            imgSrc: 'source/randombg.png',
            redPacketNumber: randomNumber
        })
    }
    moveYList.push({
        moveY: 0
    })

    return moveYList;
}