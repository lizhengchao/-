<template>
    <div>
        <transition :name="transitionName">
            <router-view class="children-view"></router-view>
        </transition>
    </div>
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
</style>
