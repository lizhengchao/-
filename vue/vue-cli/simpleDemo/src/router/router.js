/**
 * Created by lzc on 2017/8/16.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../modules/news.vue'
import NewsDetail from '../modules/newsDetail.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/news/list', component: News
    },
    {
        path: '/news/detail/:id', component: NewsDetail
    }
]

const router = new VueRouter({
    routes: routes
})

export default router