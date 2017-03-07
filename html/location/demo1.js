/**
 * Created by lzc on 2017/3/7.
 */
if(navigator && navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(coords){
        var latitude = coords.latitude,
            longitude = coords.longitude;
    }, errorCatch);
}

function errorCatch(error) {
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            x.innerHTML="用户拒绝对获取地理位置的请求。"
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="位置信息是不可用的。"
            break;
        case error.TIMEOUT:
            x.innerHTML="请求用户地理位置超时。"
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="未知错误。"
            break;
    }
}