import {round} from "./utils";

var inerval;

var getData = (callback) => {

    requestData();

    function requestData () {

        var sTime = new Date().getTime();
        //每秒尝试获取一次数据
        inerval = setInterval(() => {
            getSpeed(function(speed) {
                var eTime = new Date().getTime(),
                    useTime = round((eTime - sTime)/1000, 2),
                    distance = round(useTime * speed, 0),
                    sumDistance = getSumDistance(distance);
                sTime = eTime;

                callback && callback(sumDistance, useTime);
            })

        }, 1000);
    }

    var sumDistance = 0;
    function getSumDistance (curDistance) {

        // var curDistance = curDistance + Math.round(Math.random()*curDistance/10);
        sumDistance += curDistance;
        return sumDistance;
    }

    function getSpeed(callback) {
        $.get({
            url: 'http://www.netcall.cc:3001/getSpeed',
            cache:false,
            success: function(res) {
                callback && callback(res);
            }
        })
    }
}

function clearGetData () {
    if(inerval) {
        clearInterval(inerval);
    }
}

function setSpeed(speed, callback) {
    $.get({
        url: 'http://www.netcall.cc:3001/setSpeed?speed=' + speed,
        cache:false,
        success: function(res) {
            callback && callback(res);
        }
    })
}

export {
    getData,
    clearGetData,
    setSpeed
};