import {round} from "./utils";

var getData = (callback) => {

    requestData();

    function requestData () {

        // var startTime = new Date().getTime();
        //模仿从网络获取数据，时间随机 1-4s之间
        // setInterval(() => {
        //     var finishTime = new Date();
        //     var dataList = getRandomDataList();
        //     callback && callback(dataList);
        //
        // }, (1000 + Math.random()*3000));

        //每秒尝试获取一次数据
        setInterval(() => {
            var sTime = new Date().getTime();
            getSpeed(function(speed) {
                var eTime = new Date().getTime(),
                    useTime = round((eTime - sTime)/1000, 2) + 1,
                    distance = round(useTime * speed, 2),
                    sumDistance = getSumDistance(distance);

                callback && callback(sumDistance, useTime);
            })

        }, 1000);
    }

    var sumDistance = 0;
    function getSumDistance (curDistance) {

        var curDistance = curDistance + Math.round(Math.random()*curDistance/10);
        sumDistance += curDistance;
        return sumDistance;
    }

    function getSpeed(callback) {
        $.get({
            url: 'http://localhost:3001/getSpeed',
            success: function(res) {
                callback && callback(res);
            }
        })
    }
}

var mapDataToDistance = (data) => {
    return data;
}

export {
    getData,
    mapDataToDistance
};