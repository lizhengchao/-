/**
 * Created by lzc on 2017/7/31.
 */
var EventUtil = {
    addHandler: function(element, eventName, eventFunction){
        if(element.addEventListener){ //deal dom2
            element.addEventListener(eventName, eventFunction, false);
        } else if (element.attachEvent){ // deal ie
            element.attachEvent('on'+eventName, eventFunction);
        } else { //deal dom0
            element['on'+eventName] = eventFunction;
        }
    },

    removeHandler: function(element, eventName, eventFunction) {
        if(element.removeEventListener){
            element.removeEventListener(eventName, eventFunction, false);
        } else if (element.detachEvent){
            element.detachEvent('on'+eventName, eventFunction);
        } else {
            element['on'+eventName] = null;
        }
    }
}