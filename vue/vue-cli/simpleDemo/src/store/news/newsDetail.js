/**
 * Created by lzc on 2017/8/21.
 */

const newsDetail = {
    namespaced: true,
    state: {
        code: '',
        title: ''
    },
    mutations: {
        setCode (state, newCode) {
            state.code = newCode;
        },
        setTitle (state, newTitle) { /* this.$store.commit('news/newsDetail/setTitle', '123')方式调用 */
            state.title = newTitle
        }
    }
}

export default newsDetail;