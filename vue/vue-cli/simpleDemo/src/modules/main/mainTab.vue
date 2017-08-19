<template>
    <div>
        <router-view></router-view>
        <div class="tab-bar">
            <div class="tab-item" v-for="(tab, index) in tabs" @click="onIndex = index">
                <router-link :to="tab.href">
                    <img class="tab-icon" :src="onIndex == index ? tab.iconOn : tab.icon" >
                    <p class="tab-text" :class="{'color-on': onIndex == index ? true : false}">{{tab.text}}</p>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'mainTab',
        data () {
            return {
                tabs: [
                    {
                        text: '消息',
                        icon:  require('../../assets/main/message.png'),
                        iconOn: require('../../assets/main/message-on.png'),
                        href: '/'
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
                        href: '/'
                    },
                    {
                        text: '设置',
                        icon:  require('../../assets/main/setting.png'),
                        iconOn: require('../../assets/main/setting-on.png'),
                        href: '/'
                    }
                ],
                onIndex: 0
            }
        }
    }
</script>

<style scoped>
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