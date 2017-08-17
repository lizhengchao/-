<template>
    <div>
        <titlebar title="新闻公告" hasTouchSearch="true" @touchSearch="touchSearch"></titlebar>
        <carousel style="margin: 50px auto 0px auto" width="375px" height="250px" :imgs="imgs"></carousel>
        <div class="news-list" v-for="news in newsDatas">
            <router-link :to="'/news/detail/' + news.ccode">
                <div class="li-container">
                    <li v-show="news.readflag == '0'"></li>
                </div>
                <div>{{news.cname}}</div>
                <div class="news-time">{{transformDate(news.chkdt)}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Titlebar from '../components/titlebar.vue'
    import Carousel from '../components/carousel.vue'
    import axios from 'axios'

    export default {
        name: 'news',
        components: {
            Titlebar,
            Carousel
        },
        data () {
            return {
                imgs: [
                    {
                        src: require('../assets/test/timg.jpg'),
                        text: 'img1',
                        href: '/news/detail/1'
                    },
                    {
                        src: require('../assets/test/timg2.jpg'),
                        text: 'img2',
                        href: '/news/detail/2'
                    },
                    {
                        src: require('../assets/test/timg3.jpg'),
                        text: 'img3',
                        href: '/news/detail/3'
                    },
                    {
                        src: require('../assets/test/timg4.jpg'),
                        text: 'img4',
                        href: '/news/detail/4'
                    },
                    {
                        src: require('../assets/test/timg5.jpg'),
                        text: 'img5',
                        href: '/news/detail/5'
                    }
                ],
                newsDatas: []
            }
        },
        mounted () {
            var me = this;
            axios({
                method: 'get',
                url: 'http://218.108.53.116:8081/rest/api/oa/InformList/Get?_dc=1502939263481&optype=all&imgcount=4&pageindex=0&start=0&pagesize=20'
            }).then((res) => {
                if(res.statusText === 'OK') {
                    me.newsDatas = res.data.Content;
                }
            }).catch(function(res){
                console.info('get data fail');
            })
        },
        methods: {
            touchSearch (e) {

            },
            transformDate (date) {
                var date = new Date(date),
                        curDate = new Date();
                if(date.getFullYear() == curDate.getFullYear() &&
                date.getMonth() == date.getMonth()){
                    switch (curDate.getDate() - date.getDate()){
                        case 0:
                            return '【今天 ' + date.getHours() + ':' + date.getMinutes() + '】';
                        case 1:
                            return '【昨天 ' + date.getHours() + ':' + date.getMinutes() + '】';
                        case 2:
                            return '【前天 ' + date.getHours() + ':' + date.getMinutes() + '】';
                        default:
                            return '【' + (date.getMonth() + 1) + '月' + date.getDate() + '日】'
                    }
                } {
                    return '【' + (date.getMonth() + 1) + '月' + date.getDate() + '日】'
                }

            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }

    .news-list {
        padding: 13px 11px;
    }

    .li-container {
        width:21px;
        height:40px;
        float: left;
    }

    li {
        list-style-type: disc;
        color: red;
        font-size: 21px;
        float: left;
    }

    .news-time {
        color: #AAA9A9;
    }
</style>