<template>
    <div>
        <titlebar title="新闻公告" hasTouchSearch="true" @touchSearch="touchSearch"></titlebar>
        <pulldown @scrollBack="scrollBack">
            <carousel style="margin: 0 auto" width="100%" height="250px" :imgs="imgs" @clickImg="clickImg"></carousel>
            <news-item :news="news" v-for="news in newsDatas" key="news.ccode" @click="clickItem"></news-item>
        </pulldown>
    </div>
</template>

<script>
    import Titlebar from 'components/titlebar.vue'
    import Pulldown from 'components/pulldown.vue'
    import Carousel from 'components/carousel.vue'
    import NewsItem from './components/newsItem.vue'
    import axios from 'axios'

    export default {
        name: 'news',
        components: {
            Titlebar,
            Pulldown,
            Carousel,
            NewsItem
        },
        data () {
            return {
                imgs: [
                    {
                        src: require('../../assets/test/timg.jpg'),
                        text: 'img1',
                        ccode: '00000000000000000001'
                    },
                    {
                        src: require('../../assets/test/timg2.jpg'),
                        text: 'img2',
                        ccode: '00000000000000000002'
                    },
                    {
                        src: require('../../assets/test/timg3.jpg'),
                        text: 'img3',
                        ccode: '00000000000000000003'
                    },
                    {
                        src: require('../../assets/test/timg4.jpg'),
                        text: 'img4',
                        ccode: '00000000000000000004'
                    },
                    {
                        src: require('../../assets/test/timg5.jpg'),
                        text: 'img5',
                        ccode: '00000000000000000005'
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
            },
            clickImg (curImg) {
                this.enterDetailPage(curImg.text, curImg.ccode);
            },
            clickItem (news) {
                this.enterDetailPage('', news.ccode);
            },
            enterDetailPage (title, code) {
                this.$store.commit('news/detail/setTitle', title);
                this.$store.commit('news/detail/setCode', code);
                this.$router.push('/news/detail');
            }
        }
    }
</script>

<style scoped>
</style>