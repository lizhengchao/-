/**
 * Created by lzc on 2017/3/6.
 */
(function(window, document){
    var a = new Vec3();
    debugger;
    /**
     * 设置canvas背景色
     * @param id
     */
    var initCanvas = function(id){
        var canvas = document.getElementById(id);
        var ctx2d = canvas.getContext('2d');    //得到2d对象
        ctx2d.fillStyle = '#999';
        ctx2d.fillRect(0, 0, 150, 75);
    }

    /**
     * 使用canvas划线
     * @param id
     */
    var lineCanvas = function(id){
        var canvas = document.getElementById(id);
        var ctx2d = canvas.getContext('2d');
        ctx2d.moveTo(0,0);
        ctx2d.lineTo(100, 100);
        ctx2d.stroke();     //绘制具体的线
    }

    /**
     * 使用canvas画圆
     * @param id
     */
    var roundCanvas = function(id){
        var canvas = document.getElementById(id);
        var ctx2d = canvas.getContext('2d');
        ctx2d.beginPath();
        ctx2d.arc(100,100,40, 0, 2*Math.PI);
        ctx2d.stroke();
    }

    //initCanvas('canvas1');
    //lineCanvas('canvas1');
    roundCanvas('canvas1');
})(window, document);