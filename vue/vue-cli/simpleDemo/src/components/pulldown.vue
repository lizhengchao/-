<template>
    <div class="content-container" @touchstart="isAble? touchStart($event) : ''"
         @touchmove="isAble? touchMove($event) : ''" @touchend="isAble? touchEnd($event) : ''"
         :style="{transform: 'translateY(' + translateY + 'px)', transition: 'all '+transitionTime+'s'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'pulldown',
        data () {
            return {
                startX: 0,
                startY: 0,
                translateY: 0,
                transitionTime: 0,
                isAble: true
            }
        },
        mounted () {
            //只有在页面在最上方时才触发下拉回弹，这种写法只能适配滚动的对象为windows时
            window.addEventListener('scroll', (e) => {
                this.isAble = window.scrollY == 0;
            })
        },
        methods: {
            touchStart (e) {
                this.transitionTime = 0;
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
            },
            touchMove (e) {
                var moveX = e.touches[0].clientX - this.startX,
                        moveY = e.touches[0].clientY - this.startY;
                if(moveY > 0 && Math.abs(moveY) > Math.abs(moveX)) {
                    this.translateY = moveY/3;
                }
            },
            touchEnd (e) {
                this.translateY = 0;
                this.transitionTime = 0.4;
                this.$emit('scrollBack');
            }
        }
    }
</script>

<style scoped>

</style>