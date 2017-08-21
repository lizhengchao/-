<template>
    <div>
        <slider @slideX="slideX">
            <transition :name="transitionName">
                <router-view class="main-view"></router-view>
            </transition>
        </slider>
        <div class="tab-bar">
            <div class="tab-item" v-for="(tab, index) in tabs" @click="onIndex = index">
                <img class="tab-icon" :src="onIndex == index ? tab.iconOn : tab.icon" >
                <p class="tab-text" :class="{'color-on': onIndex == index ? true : false}">{{tab.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from '../../components/slider.vue'

    export default {
        name: 'mainTab',
        components: {
            Slider
        },
        data () {
            return {
                tabs: [
                    {
                        text: '消息',
                        icon:  require('../../assets/main/message.png'),
                        iconOn: require('../../assets/main/message-on.png'),
                        href: '/message'
                    },
                    {
                        text: '新闻公告',
                        icon:  require('../../assets/main/work.png'),
                        iconOn: require('../../assets/main/work-on.png'),
                        href: '/news/list'
                    },
                    {
                        text: '通讯录',
                        icon:  require('../../assets/main/contact.png'),
                        iconOn: require('../../assets/main/contact-on.png'),
                        href: '/contact'
                    },
                    {
                        text: '设置',
                        icon:  require('../../assets/main/setting.png'),
                        iconOn: require('../../assets/main/setting-on.png'),
                        href: '/setting'
                    }
                ],
                onIndex: 0,
                transitionName: ''
            }
        },
        watch: {
            onIndex (newValue, oldValue) {
                var tabLength = this.tabs.length;
                if(newValue > oldValue) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
                if(newValue >= tabLength){
                    this.onIndex = newValue%tabLength;
                }
                else if(newValue < 0) {
                    this.onIndex = tabLength - 1;
                }
                this.$router.push(this.tabs[this.onIndex].href);
            }
        },
        methods: {
            slideX (moveX) {
                if(moveX < 0){
                    this.onIndex ++;
                } else if(moveX > 0){
                    this.onIndex --;
                }
            }
        }
    }
</script>

<style scoped>
    .main-view {
        margin-bottom: 50px;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
    }

    .tab-bar {
        position: fixed;
        bottom: 0px;
        left:0px;
        right: 0px;
        height: 50px;
        display: flex;
        background-color: white;
    }

    .tab-item {
        flex-grow: 1;
        height: 100%;
    }

    .tab-text {
        margin-top: 5%;
        text-align: center;
        font-size: 12px;
        color: #999999;
    }

    .tab-icon {
        display: block;
        margin: 5% auto;
        width: 20px;
        height: 20px;
    }

    .color-on {
        color: #f39800;
    }
</style>