/**
 * Created by lzc on 2017/7/28.
 */
(function (){
    var curIndex = 0, //记录当前是图片位置
        imgLength = 510, imgNumber = 5,
        innerContainer = $('.inner-container'),
        roundButtonContainer = $('.round-button-container'),
        roundBtns = roundButtonContainer.find('li'),
        leftButton = $('.left-button'),
        rightButton = $('.right-button'),
        updateImg = function(index){
            var updateRoundBtnStatus = function(index) {
                for(var i in roundBtns){
                    if(i == index){
                        roundBtns[i].className = 'tap';
                    } else {
                        roundBtns[i].className = '';
                    }
                }
            }

            innerContainer.css('transform', 'translateX('+ (-imgLength*index) +'px)');
            innerContainer.css('transition', 'transform 0.5s');
            updateRoundBtnStatus(index)
            curIndex = index;
        },
        interval,
        //重新绑定定时刷新事件
        bindInterval = function(){
            if(interval){
                clearInterval(interval);
                interval = setInterval(function(){
                    updateImg((curIndex+1)%imgNumber);
                }, 3000);
            } else {
                interval = setInterval(function(){
                    updateImg((curIndex+1)%imgNumber);
                }, 3000);
            }
        };

    for(var i in roundBtns){
        roundBtns[i].index = i;
    }

    bindInterval();

    roundButtonContainer.bind('click', function(e){
        var target = e.target;
        if(target.nodeName.toLocaleUpperCase() == 'LI'){
            if(target.index){
                updateImg(parseInt(target.index));
            }
        } else {
            target = $(target).parents('li');
            if(target.length > 0 && target[0].index){
                updateImg(parseInt(target[0].index));
            }
        }
        bindInterval(); //防止点击后马上调到下一个
    });

    leftButton.bind('click', function(){
        if(curIndex == 0){
            updateImg(imgNumber-1);
        } else {
            updateImg(curIndex-1);
        }
        bindInterval(); //防止点击后马上调到下一个
    })

    rightButton.bind('click', function(){
        updateImg((curIndex+1)%imgNumber);
        bindInterval(); //防止点击后马上调到下一个
    })
})()