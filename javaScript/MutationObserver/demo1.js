/**
 * Created by lzc on 2017/9/27.
 */
(() => { //使用MutaionObserver监听document.body
    var MutationObserver = window.MutationObserver || window.WebkitMutaionObserver || window.MozMuationObserver;
    if(!MutationObserver) {
        alert("当前浏览器不支持MutationObserver");
    }

    var moCallback = (records) => {
        console.info("mo callback");
        records.map((record)=> {
                console.info('mo record callback');
        })
    },
        option = {
            childList: true,
            subtree: true,
            attributes: true
        };

    var mo = new MutationObserver (moCallback);

    mo.observe(document.body, option);
})();

(()=> { //使用事件监听document.body,会立即执行
    document.body.addEventListener('DOMSubtreeModified', (e)=> {
        console.info('DOMSubtreeModified')})
})();

(() => { //点击事件
    var btn = document.getElementById('tapbtn'),
        addAtr = document.getElementById('addAtr'),
        appDiv = document.getElementById('app');
    btn.addEventListener('click', ()=> {
        for(var i=0; i<10; i++){
            var p = document.createElement('p');
            p.innerHTML = i;
            appDiv.appendChild(p);
            console.info('add node');
        }
    })
    addAtr.addEventListener('click', ()=> {
        appDiv.setAttribute('class', 'red');
    })
})()