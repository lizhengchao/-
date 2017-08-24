<template>
    <div class="outer-container">
        <div class="search-bar-container">
            <div class="search-input-container">
                <img src="../../assets/search2.png" class="search-img">
                <input class="search-input" type="text" v-model="searchText">
            </div>
            <div class="cancel-btn" @click="cancel">取消</div>
        </div>
        <news-item v-for="searchItem in searchData" :news="searchItem" key="searchItem.ccode"></news-item>
        <div class="empty-tip" v-show="searchData.length == 0">没有搜索结果</div>
    </div>
</template>

<script>
    import NewsItem from './components/newsItem.vue'
    import axios from 'axios'

    export default {
        name: 'newsSearch',
        data () {
            return {
                searchText: '',
                searchData: []
            }
        },
        components: {
            NewsItem
        },
        methods: {
            cancel () {
                this.$router.goBack();
            }
        },
        watch: {
            searchText (newValue, oldValue){
                axios({
                    url: 'http://218.108.53.116:8081/rest/api/oa/InformList/Get',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        optype:'all',
                        filterword: this.searchText,
                        pageindex:0,
                        pagesize:15
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((resp) => {
                    if(resp.statusText == 'OK'){
                        this.searchData = resp.data.Content;
                    }
                }).catch((resp) => {
                    console.info('search fail');
                })
            }
        }
    }
</script>

<style scoped>
    .outer-container {
        z-index: 2;
        background-color: white;
    }

    .search-bar-container {
        padding: 10px;
        display: flex;
        height: 30px;
    }

    .search-input-container {
        flex-grow: 1;
        background-color: #eee;
        border-radius: 5px;
        height: 100%;
        display: flex;
    }

    .search-img {
        width: 27px;
        height: 100%;
        display: inline-block;
    }

    .search-input {
        background-color: #eee;
        height: 100%;
        flex-grow: 1;
    }

    .cancel-btn {
        width: 55px;
        line-height: 30px;
        background-color: white;
        text-align: center;
    }

    .empty-tip {
        margin-top: 50px;
        text-align: center;
        min-height: 1000px;
    }
</style>