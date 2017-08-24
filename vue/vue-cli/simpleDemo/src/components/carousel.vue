<!--利用vue的transition实现左右滑动-->
<template>
    <slider  class="outer-container" :style="{width: cWidth, height: cHeight}" @slideX="slideX">
        <transition-group class="img-container" tag="div" :name="transitionName">
            <!--transition-group的直接子元素必须有key,transition-group会存在，并替换为一个元素，默认为span，可通过tag设置-->
            <img v-for="(img, index) in imgs" :key="img.src" v-show="index == curIndex" class="img" :src="img.src" @click="imgClick(img)">
        </transition-group>
        <div class="text-container">
            {{imgs[curIndex].text}}
        </div>
        <div class="round-button-container">
            <ul>
                <li id="round-1" :class="index == curIndex ? 'tap' : ''" v-for="(img, index) in imgs">
                    <div class="round-img" @click="curIndex = index"></div>
                </li>
            </ul>
        </div>
        <!--左右按钮-->
        <div class="left-button" @click="curIndex --"></div>
        <div class="right-button" @click="curIndex ++"></div>
    </slider>
</template>

<script>
    import Slider from './slider.vue'

    export default {
        name: 'carousel',
        props: ['width', 'height', 'imgs'],
        components: {
            Slider
        },
        data () {
            return {
                curIndex: 0,
                transitionName: '',
                interval: {} //定时刷新事件
            }
        },
        computed: {
            cWidth () {
                return this.width ? this.width : '375px'
            },
            cHeight() {
                return this.height ? this.height : '300px'
            }
        },
        created () {
            this.interval = setInterval(() => {
                this.curIndex ++;
            }, 3000);
        },
        methods: {
            slideX (moveX, event) {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.curIndex ++;
                }, 3000);
                if(moveX < 0){
                    event.stopPropagation();
                    this.curIndex ++;
                } else if(moveX > 0) {
                    event.stopPropagation();
                    this.curIndex --;
                }
            },
            imgClick (curImg) {
                this.$emit('clickImg', curImg);
            }
        },
        watch: {
            curIndex: function(val, oldVal){
                if(val > oldVal){
                    this.transitionName = 'slide-right';
                } else if(val < oldVal) {
                    this.transitionName = 'slide-left';
                }
                if(val <= -1){
                    this.curIndex = this.imgs.length - 1;
                }
                if(val >= this.imgs.length) {
                    this.curIndex = 0;
                }
            }
        }
    }
</script>

<style scoped>
    .outer-container {
        background-color: #eee;
        position: relative;
    }

    .img-container {
        margin: 10px 5px;
        height: 100%;
        position: relative;
    }

    .img {
        width: 100%;
        height: 100%;
        position: absolute;
        top:0px;
        left:0px;
    }

    .text-container {
        position: absolute;
        bottom: 5%;
        left: 5%;
        color: white
    }

    .round-button-container {
        position: absolute;
        right: 5%;
        bottom: 5%;
    }
    ul {
        padding: 0px;
    }

    li {
        list-style-type:none;
        float: left;
    }

    .round-img {
        width: 20px;
        height: 20px;
        margin: 5px 5px;
        background-color: red;
        border-radius: 100px;
    }

    .tap .round-img {
        background-color: black
    }

    .left-button {
        width:  20px;
        height: 20px;
        background: url(../assets/test/icon.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(-90deg);
        position: absolute;
        left: 5%;
        top: 45%;
    }

    .right-button {
        width:  20px;
        height: 20px;
        background: url(../assets/test/icon.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(90deg);
        position: absolute;
        right: 5%;
        top: 45%;
    }
</style>