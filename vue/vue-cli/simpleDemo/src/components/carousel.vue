<template>
    <div class="outer-container" :style="{width: cWidth}" @touchstart="outerTouchstart" @touchend="outerTouchend">
        <div class="img-container" :style="{width: sumWidth, transform: 'translateX('+translateX+'px)'}">
            <div class="img-box" :style="{width: imgBoxWidth, height: cHeight}" v-for="img in imgs">
                <router-link :to="img.href"><img :src="img.src"></router-link>
            </div>
        </div>
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
    </div>
</template>

<script>
export default {
    name: 'carousel',
    props: ['width', 'height', 'imgs'],
    data () {
        return {
            curIndex: 0,
            startX: 0,
            startY: 0,
        }
    },
    computed: {
        cWidth () {
            return this.width ? this.width : '375px'
        },
        imgBoxWidth () {
            return this.width.replace('px', '') - 20 + 'px';
        },
        sumWidth () {
            var itemCount = this.imgs.length;
            return this.width.replace('px', '') * itemCount + 'px';
        },
        cHeight() {
            return this.height ? this.height : '300px'
        },
        translateX () {
            var width = this.width.replace('px', '');

            return -this.curIndex*(width-10);
        }
    },
    methods: {
        outerTouchstart (event) {
            this.startX = event.changedTouches[0].clientX;
            this.startY= event.changedTouches[0].clientY;
        },
        outerTouchend (event) {
            var endX = event.changedTouches[0].clientX;
            var endY = event.changedTouches[0].clientY;
            if(Math.abs(endX-this.startX) > Math.abs(endY-this.startY)){
                if(endX-this.startX>10){
                    this.curIndex --;
                }
                if(endX-this.startX < -10){
                    this.curIndex ++;
                }

            }
        }
    },
    watch: {
        curIndex: function(val, oldVal){
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
        width: 100%;
        background-color: #eee;
        overflow: hidden;
        position: relative;
    }

    .img-container {
        margin: 10px 5px;
        transition: transform 0.5s cubic-bezier(0, 0.55, 1, 1)
    }

    .img-box {
        float: left;
        margin: 0px 5px
    }

    .img-box img {
        width: 100%;
        height: 100%;
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