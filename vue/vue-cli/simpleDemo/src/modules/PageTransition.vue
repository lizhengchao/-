<template>
    <transition :name="transitionName">
        <router-view class="children-view"></router-view>
    </transition>
</template>

<script>
 export default {
     name: 'PageTransition',
     data () {
         return {
             transitionName: ''
         }
     },
     beforeRouteUpdate (to, from, next) {
         let isBack = this.$router.isBack;

         if(isBack){
             switch (from.path) {
                 case '/news/search':
                     this.transitionName = 'slide-bottom';
                     break;
                 default:
                     this.transitionName = 'slide-left'
             }
             this.$router.isBack = false;
         }
         else {
             switch (to.path) {
                 case '/news/search':
                     this.transitionName = 'slide-top';
                     break;
                 default:
                     this.transitionName = 'slide-right'
             }
         }
         next();
     }
 }
</script>

<style scoped>
    .children-view {
        position: absolute;
        top:0px;
        left: 0px;
        right: 0px;
    }

    .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
        transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .slide-right-enter{
        transform: translateX(375px);
    }
    .slide-right-enter-to {
        transform: translateX(0px);
    }

    .slide-right-leave{
        transform: translateX(0px);
    }
    .slide-right-leave-to {
        transform: translateX(-375px);
    }

    .slide-left-enter{
        transform: translateX(-375px);
    }
    .slide-left-enter-to {
        transform: translateX(0px);
    }

    .slide-left-leave{
        transform: translateX(0px);
    }
    .slide-left-leave-to {
        transform: translateX(375px);
    }
</style>

<style scoped>
    .slide-top-enter-active, .slide-top-leave-active, .slide-bottom-enter-active, .slide-bottom-leave-active {
        transition: all .4s cubic-bezier(.55,0,.1,1);
    }
    .slide-top-enter, .slide-bottom-leave-to{
        transform: translateY(100px);
    }
    .slide-top-enter-to, .slide-top-leave, .slide-top-leave-to, .slide-bottom-enter,
    .slide-bottom-enter-to, .slide-bottom-leave{
        transform: translateY(0px);
    }
</style>