/**
 * Created by lzc on 2017/3/6.
 */
(function(window, document){

    var initCanvas = function(id){
        var canvas = document.getElementById(id);
        var ctx2d = canvas.getContext('2d');
        var ctx3d = canvas.getContext('3d');
        ctx2d.fillStyle = '#999';
        ctx2d.fillRect(0, 0, 150, 75);
    }

    initCanvas('canvas1');
})(window, document);