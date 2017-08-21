<template>
    <div>
        <titlebar title="新闻公告" hasTouchSearch="true" @touchSearch="touchSearch"></titlebar>
        <touch @scrollBack="scrollBack">
            <carousel style="margin: 0 auto" width="375px" height="250px" :imgs="imgs"></carousel>
            <news-item :news="news" v-for="news in newsDatas" key="news.ccode"></news-item>
        </touch>
    </div>
</template>

<script>
    import Titlebar from '../../components/titlebar.vue'
    import Touch from '../../components/touch.vue'
    import Carousel from '../../components/carousel.vue'
    import NewsItem from './components/newsItem.vue'
    import axios from 'axios'

    export default {
        name: 'news',
        components: {
            Titlebar,
            Touch,
            Carousel,
            NewsItem
        },
        data () {
            return {
                imgs: [
                    {
                        src: require('../../assets/test/timg.jpg'),
                        text: 'img1',
                        href: '/news/detail/1'
                    },
                    {
                        src: require('../../assets/test/timg2.jpg'),
                        text: 'img2',
                        href: '/news/detail/2'
                    },
                    {
                        src: require('../../assets/test/timg3.jpg'),
                        text: 'img3',
                        href: '/news/detail/3'
                    },
                    {
                        src: require('../../assets/test/timg4.jpg'),
                        text: 'img4',
                        href: '/news/detail/4'
                    },
                    {
                        src: require('../../assets/test/timg5.jpg'),
                        text: 'img5',
                        href: '/news/detail/5'
                    }
                ],
                newsDatas: [
                    {
                        ccode: '001',
                        readflag: 0,
                        cname: 'name',
                        chkdt: '2017-01-02'
                    },
                    {
                        ccode: '002',
                        readflag: 0,
                        cname: 'name2',
                        chkdt: '2017-08-20'
                    }
                ]
            }
        },
        mounted () {
            axios({
                method: 'get',
                url: 'http://218.108.53.116:8081/rest/api/oa/InformList/Get?_dc=1502939263481&optype=all&imgcount=4&pageindex=0&start=0&pagesize=20'
            }).then((res) => {
                if(res.statusText === 'OK' && !res.data.errmsg) {
                    this.newsDatas = res.data.Content;
                }
            }).catch(function(res){
                console.info('get data fail');
            })
        },
        methods: {
            touchSearch (e) {
                this.$router.push('/news/search');
            },
            scrollBack () {
                console.info('touch scroll');
            }
        }
    }
</script>

<style scoped>
</style>