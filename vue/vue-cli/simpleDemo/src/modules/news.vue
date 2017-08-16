<template>
    <div>
        <titlebar title="新闻公告" @touchSearch="touchSearch"></titlebar>
        <carousel style="margin-top: 50px" width="250px" height="150px" :imgs="imgs"></carousel>
    </div>
</template>

<script>
    import Titlebar from '../components/titlebar.vue'
    import Carousel from '../components/carousel.vue'

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
                        src: require('../assets/test/timg.jpg')
                    },
                    {
                        src: require('../assets/test/timg2.jpg')
                    },
                    {
                        src: require('../assets/test/timg3.jpg')
                    },
                    {
                        src: require('../assets/test/timg4.jpg')
                    },
                    {
                        src: require('../assets/test/timg5.jpg')
                    }
                ]
            }
        },
        methods: {
            touchSearch (e) {

            }
        }
    }
</script>

<style>
    body {
        margin: 0px;
    }

</style>