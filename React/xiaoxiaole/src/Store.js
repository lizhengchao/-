/**
 * Created by lzc on 2017/10/10.
 */
import {createStore} from 'redux'
import * as baseConfig from './baseConfig'
import BlockReducer from './block/reducer'

const initData = {
    blockStatus: [],
    needClearBlocks: [],
    type: '' //记录action type
};

//initialize data
(() => {
    for(let i=0; i<baseConfig.LINE_COUNT; i++){
        let line = [];
        for(let j=0; j<baseConfig.ROW_COUNT; j++){
            line.push(baseConfig.getRandomType());
        }
        initData.blockStatus.push(line);
    }
})()
export default createStore(BlockReducer, initData);