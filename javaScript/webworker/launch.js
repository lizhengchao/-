/**
 * Created by lzc on 2017/9/27.
 */
for(var i=0; i<10; i++){
    ((time) => {
        setTimeout(()=> {
            postMessage(time);
            a + 1;
        }
        , time*1000)
    })(i);
}