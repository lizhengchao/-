/**
 * Created by lzc on 2017/3/16.
 */
debugger;

function isArray (array) {
    if(typeof array === 'undefined'){ return;}

    if(array instanceof  Array){ return true;}
    else {return false;}
}

function isArray2 (array){
    if(typeof array === 'undefined'){ return;}

    if(array.constructor === 'Array'){ return true; }
    else { return false;}
}

(function(){
    var test_datas = []
})()