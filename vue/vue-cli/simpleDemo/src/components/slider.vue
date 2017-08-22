<template>
    <div @touchstart="touchstart" @touchend="touchend">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'slider',
        data () {
            return {
                startX: 0,
                startY: 0
            }
        },
        methods: {
            touchstart (e) {
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
            },
            touchend (e) {
                var moveX = e.changedTouches[0].clientX - this.startX,
                        moveY = e.changedTouches[0].clientY - this.startY;
                if(Math.abs(moveX) > Math.abs(moveY)){
                    if(moveX > 20 || moveX < -20){
                        this.$emit('slideX', moveX, e);
                    }
                } else if(Math.abs(moveY) > Math.abs(moveX)){
                    if(moveY > 20 || moveY < -20){
                        this.$emit('slideY', moveY, e);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>