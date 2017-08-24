/**
 * Created by lzc on 2017/6/12.
 */
const s = new Set();
[2,3,4,5].forEach(x => s.add(x));

for(let i of s){
    console.info(i);
}

function* demo(){
    let a = 1;
    yield a;
    yield a++;
    return a++; //直接结束
    yield a++;
}

for (let i=0; i< 10; i++){
    let i = 'abc';
    console.info(i);
}

var temp = '123';
{
    temp = 'abc';
}
console.info(temp);
