/**
 * Created by lzc on 2017/8/16.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import MainTab from '../modules/main/mainTab.vue'
import PageTransition from '../modules/news/PageTransition.vue'
import News from '../modules/news/news.vue'
import NewsDetail from '../modules/news/newsDetail.vue'
import NewsSearch from '../modules/news/newsSearch.vue'
import Msglist from '../modules/message/msglist.vue'
import Contact from '../modules/contact/contact.vue'
import Setting from '../modules/setting/setting.vue'
import Calender from '../modules/calender/calender.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainTab,
        children: [
            {
                path: '/news',
                component: PageTransition,
                children: [
                    {
                        path: 'list',
                        component: News
                    },
                    {
                        path: 'detail',
                        component: NewsDetail
                    },
                    {
                        path: 'search',
                        component: NewsSearch
                    }
                ]
            },
            {
                path: '/message',
                component: Msglist
            },
            {
                path: '/contact',
                component: Contact,
            },
            {
                path: '/setting',
                component: Setting
            },
            {
                path: '/calender',
                component: Calender
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