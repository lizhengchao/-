/**
 * Created by lzc on 2017/9/15.
 */
function flattern (arr){
    var resultArr = [],
        isArray = function(arg) {
            if(arg.constructor === Array) {
                return true;
            } else {
                return false;
            }
        },
        resolveArr = function (arr, resultArr) {
            for(var item of arr) {
                if(!isArray(item)) {
                    resultArr.push(item);
                } else {
                    resolveArr(item, resultArr);
                }
            }
        }
    if(!isArray(arr)){
        throw Error("arg0 is not a array");
    }

    resolveArr(arr, resultArr);

    return resultArr;
}