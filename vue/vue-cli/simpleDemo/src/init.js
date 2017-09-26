/**
 * Created by lzc on 2017/9/15.
 */
var createTransformStyle = () =>{
    var slideStyleDom = document.createElement('style'),
        bodyWidth = document.body.clientWidth;
    slideStyleDom.innerText = `
    .slide-right-enter, .slide-left-leave-to 
    { 
        transform: translateX(${bodyWidth}px); 
    }
    .slide-right-leave-to, .slide-left-enter 
    { 
        transform: translateX(-${bodyWidth}px);
    };`
    document.head.appendChild(slideStyleDom);
    require('./globalcss/transformStyle.css');

}

export {
    createTransformStyle
}