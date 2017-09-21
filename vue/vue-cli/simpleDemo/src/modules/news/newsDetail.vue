<template>
    <div>
        <titlebar title="新闻公告" :hasTouchBack="true" :hasTouchSearch="false"></titlebar>
        <div class="title">
            {{title}}
        </div>
        <div class="desc"><pre>{{detailInfo.typename + '  ' + detailInfo.fillname + '  ' +  this.$route.params.id}}
        </pre></div>
    </div>

</template>

<script>
    import Titlebar from 'components/titlebar.vue'
    import axios from 'axios'

    export default {
        name: 'newsDetail',
        components: {
            Titlebar
        },
        data () {
            return {
                detailInfo: {},
                title: ''
            }
        },
        mounted () {
            var code = this.$store.state.news.detail.code;
            this.title = this.$store.state.news.detail.title;

            axios({
                method: 'get',
                url: 'http://218.108.53.116:8081/rest/API/OA/InformDetail/Get?ccode=' + code
            }).then((resp) => {
                if(resp.statusText == 'OK'){
                    this.detailInfo = resp.data;
                }
            }).catch((resp) => {

            })
        }
    }
</script>

<style scoped>
    .title {
        padding: 15px 12px 5px !important;
    }

    .desc {
        color: rgb(170, 169, 169);
        padding: 15px 12px 5px !important;
        font-size: 13px;
    }
</style>