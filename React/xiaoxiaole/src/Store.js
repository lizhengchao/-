/**
 * Created by lzc on 2017/10/10.
 */
import {createStore} from 'redux'
import * as baseConfig from './baseConfig'
import BlockReducer from './block/reducer'

const initData = {
    blockStatus: [],
    needClearBlocks: [], //记录需要清除的块
    BlockAction: [], //记录块清除后各个块接下的动作
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