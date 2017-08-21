/**
 * Created by lzc on 2017/8/21.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import newDetail from './news/newsDetail'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        news: {
            namespaced: true,
            modules: {
                newsDetail: newDetail
            }
        }
    }
})

export default store