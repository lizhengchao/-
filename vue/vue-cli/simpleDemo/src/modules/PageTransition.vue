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
             this.transitionName = 'close-page';
         } else {
             this.transitionName = 'open-page'
         }
         this.$router.isBack = false;
         next();
     }
 }
</script>

<style scoped>
    .children-view {
        position: absolute;
        top:0px
    }

    .open-page-enter-active {
        transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .open-page-enter{
        transform: translateX(375px);
    }
    .open-page-enter-to {
        transform: translateX(0px);
    }

    .open-page-leave-active {
        transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .open-page-leave{
        transform: translateX(0px);
    }
    .open-page-leave-to {
        transform: translateX(-375px);
    }
    

    .close-page-enter-active {
        transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .close-page-enter{
        transform: translateX(-375px);
    }
    .close-page-enter-to {
        transform: translateX(0px);
    }

    .close-page-leave-active {
        transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .close-page-leave{
        transform: translateX(0px);
    }
    .close-page-leave-to {
        transform: translateX(375px);
    }
</style>