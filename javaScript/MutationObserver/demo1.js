/**
 * Created by lzc on 2017/9/27.
 */
(() => {
    var MutationObserver = window.MutationObserver || window.WebkitMutaionObserver || window.MozMuationObserver;
    if(!MutationObserver) {
        alert("当前浏览器不支持MutationObserver");
    }

    var moCallback = (records) => {
        console.info("mo callback");
        records.map((record)=> {
                debugger
        })
    },
        option = {
            childList: true,
            subtree: true,
            attributes: true
        };

    var mo = new MutationObserver (moCallback);

    mo.observe(document.body, option);

    var btn = document.getElementById('tapbtn'),
        addAtr = document.getElementById('addAtr'),
        appDiv = document.getElementById('app');
    btn.addEventListener('click', ()=> {
        for(var i=0; i<10; i++){
            var p = document.createElement('p');
            p.innerHTML = i;
            appDiv.appendChild(p);
        }
    })
    addAtr.addEventListener('click', ()=> {
        appDiv.setAttribute('class', "red");
    })
})()