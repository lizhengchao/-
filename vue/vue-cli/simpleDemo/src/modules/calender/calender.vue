<template>
    <div>
        <titlebar title="日历" :hasTouchBack="true" :hasTouchSearch="false"></titlebar>
        <div class="top-bar">
            <span class="current-date">{{currentDate}}</span>
            <div class="year-day">
                <div class="yd">{{year}}</div>
                <div class="yd">{{apartDay}}</div>
            </div>
            <img class="top-img" src="../../assets/more.jpg">
            <img class="top-img" src="../../assets/calender/add.jpg">
        </div>
        <div class="week-number-container">
            <div class="week-number" v-for="weekNumber in weekNumbers">{{weekNumber}}</div>
        </div>
        <div class="bottom-border"></div>
        <div class="container" :style="{'max-height': containerHeight + 'px'}">
            <div class="calender-container">
                <!--<transition name="opacity">-->
                    <div class="calender-item" :style="{width: itemWidth+'px'}" v-for="(data, index) in datas"
                         :class="{today: index == toadyIndex, onTap: index == tapIndex}" @click="itemClick(index)">
                        <div class="calender-number">{{data.day}}</div>
                        <div class="calender-cnumber">{{data.cDay}}</div>
                        <div class="special-label" v-show="data.isSpecial"></div>
                    </div>
                <!--</transition>-->
            </div>
            <div class="detail-container">
                <span>黄历</span>
                <div class="inner-detail-container">
                    <div class="month-day">七月初四</div>
                    <div class="gossip1">丁[鸡]年</div>
                    <div class="gossip-container">
                        <img src="../../assets/calender/good.jpg" width="17px" height="17px">
                        <span>出行 嫁娶 赴任 沐浴</span>
                        <img src="../../assets/calender/bad.jpg" width="17px" height="17px">
                        <span>开市 开仓 动土 安床</span>
                    </div>
                </div>
            </div>
            <div class="detail-container">
                <span>黄历</span>
                <div class="inner-detail-container">
                    <div class="month-day">七月初四</div>
                    <div class="gossip1">丁[鸡]年</div>
                    <div class="gossip-container">
                        <img src="../../assets/calender/good.jpg" width="17px" height="17px">
                        <span>出行 嫁娶 赴任 沐浴</span>
                        <img src="../../assets/calender/bad.jpg" width="17px" height="17px">
                        <span>开市 开仓 动土 安床</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Titlebar from '../../components/titlebar.vue'
    import Date from '../../extends/DateExtends'
    import Number from '../../extends/NumberExtends'

    export default {
        name: 'calender',
        components: {
            Titlebar
        },
        data () {
            return {
                currentDate: new Date().format('M月d日'),
                year: new Date().getFullYear(),
                apartDay: '11天前',
                weekNumbers: ['一', '二', '三','四','五','六','日'],
                containerHeight: 0,
                itemWidth: 0,
                datas: [],
                toadyIndex: 10,
                tapIndex: null
            }
        },
        created () {
            this.containerHeight = window.innerHeight - 142;
            this.itemWidth = ((window.innerWidth - 20)/7).toFixed(1) - 0.1;
            for(var i=0; i<30; i++){
                this.datas.push({
                    day: i,
                    cDay: i.NumberToChinese(),
                    isSpecial: i%3 == 0
                });
            }
        },
        methods: {
            itemClick (index) {
                this.tapIndex = index;
            }
        },
        watch: {
            tapIndex (newValue, oldValue) {

            }
        }
    }
</script>

<style scoped>
    .container {
        overflow: scroll;
    }

    .top-bar {
        height: 25px;
        padding: 18px 20px;
        vertical-align: top;
    }

    .current-date {
        padding-left: 5px;
        padding-right: 5px;
        font-size: 23px;
        line-height: 25px;
        font-weight: bold;
        float: left;
    }

    .year-day {
        width: 100px;
        font-size: 11.5px;
        height: 25px;
        font-weight: bold;
        float: left;
    }

    .yd {
        height: 50%;
    }

    .top-img {
        width: 25px;
        height: 25px;
        float: right;
        margin-left: 10px;
    }

    .week-number-container {
        height: 20px;
        display: flex;
        padding: 0px 10px;
    }

    .week-number {
        flex-grow: 1;
        color: #dedede;
        line-height: 20px;
        text-align: center;
    }

    .bottom-border {
        margin: 10px 10px;
        border-bottom: 1px solid #dedede;
    }

    .calender-container {
        padding: 0px 10px;
        display: flex;
        flex-wrap: wrap;
    }

    .calender-item {
        height: 60px;
        text-align: center;
        margin: 0px 3px 17px 3px;
    }

    .calender-item.onTap {
        background-color: #ededed;
    }

    .calender-number {
        font-size: 20px;
        font-weight: bold;
    }

    .today .calender-number {
        color: red;
    }

    .calender-cnumber {
        color: #dedede;
        font-size: 14px;
    }
    
    .today .calender-cnumber {
        color: red;
    }

    .special-label {
        height: 5px;
        width: 10px;
        margin: 2px auto;
        border-radius: 5px;
        background-color: #dedede;
    }

    .detail-container {
        background-color: #f2f2f2;
        padding: 10px;
    }

    .inner-detail-container {
        background-color: white;
        margin-top: 5px;
        padding: 7px 13px;
        box-shadow:0px 0px .7px #ddd
    }

    .month-day {
        font-size: 22px;
        font-weight: bold;
    }

    .gossip1 {
        margin-top: 7px;
        color: #dedede
    }

    .gossip-container {
        margin-top: 14px;
    }
</style>