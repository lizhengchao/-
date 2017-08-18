/**
 * Created by lzc on 2017/8/16.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import PageTransition from '../modules/PageTransition.vue'
import News from '../modules/news.vue'
import NewsDetail from '../modules/newsDetail.vue'
import NewsSearch from '../modules/newsSearch.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/news',
        component: PageTransition,
        children: [
            {
                path: 'list',
                component: News
            },
            {
                path: 'detail/:id',
                component: NewsDetail
            },
            {
                path: 'search',
                component: NewsSearch
            }
        ]
    }
]

VueRouter.prototype.goBack = function() {
    this.isBack = true;
    this.go(-1);
}

const router = new VueRouter({
    routes: routes
})


export default router