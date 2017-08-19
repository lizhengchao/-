<template>
    <div>
        <titlebar title="新闻公告" hasTouchSearch="true" @touchSearch="touchSearch"></titlebar>
        <carousel style="margin: 0 auto" width="375px" height="250px" :imgs="imgs"></carousel>
        <news-item :news="news" v-for="news in newsDatas" key="news.ccode"></news-item>
    </div>
</template>

<script>
    import Titlebar from '../../components/titlebar.vue'
    import Carousel from '../../components/carousel.vue'
    import NewsItem from './components/newsItem.vue'
    import axios from 'axios'

    export default {
        name: 'news',
        components: {
            Titlebar,
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
                newsDatas: []
            }
        },
        mounted () {
            axios({
                method: 'get',
                url: 'http://218.108.53.116:8081/rest/api/oa/InformList/Get?_dc=1502939263481&optype=all&imgcount=4&pageindex=0&start=0&pagesize=20'
            }).then((res) => {
                if(res.statusText === 'OK') {
                    this.newsDatas = res.data.Content;
                }
            }).catch(function(res){
                console.info('get data fail');
            })
        },
        methods: {
            touchSearch (e) {
                this.$router.push('/news/search');
            }
        }
    }
</script>

<style scoped>
</style>