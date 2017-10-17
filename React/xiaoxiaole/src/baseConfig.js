/**
 * Created by lzc on 2017/10/10.
 */
//定义游戏的基本属性
export const LINE_COUNT = 8;
export const ROW_COUNT = 8;

//方块的类型
export const BLOCK_TYPES = { 
    BLUE: 'blue',
    RED: 'red',
    ORANGE: 'orange',
    GREEN: 'green',
    BLACK: 'black'
};

export const BLOCK_RADIUS = '12.5'; //方块的半径
export const BLOCK_SPACE = '10'; //方块的间距

//获取随机的方块类型
export function getRandomType () {
    let typeCount = 0,
        typeArr = [];
    for(let i in BLOCK_TYPES){
        if(BLOCK_TYPES.hasOwnProperty(i)){
            typeCount ++;
            typeArr.push(i);
        }
    }

    let randomTypeNumber = Math.floor(Math.random()*typeCount);
    return BLOCK_TYPES[typeArr[randomTypeNumber]];
}

export const CLEAR_NUMBER = 3; //一排有多少个时会做消除