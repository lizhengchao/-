<template>
    <div class="news-item" @click="itemClick">
        <div class="li-container">
            <li v-show="news.readflag == '0'"></li>
        </div>
        <div>{{news.cname}}</div>
        <div class="news-time">{{transformDate(news.chkdt)}}</div>
    </div>
</template>

<script>
    export default {
        name: 'newsItem',
        props: ['news'],
        methods: {
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
            },
            itemClick () {
                this.$emit('click', this.news);
            }
        }
    }
</script>

<style scoped>
    .news-item {
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