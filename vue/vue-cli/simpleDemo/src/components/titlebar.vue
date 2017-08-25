<template>
<div class="titlebar">
    <div class="back-btn" @click="touchBack" v-show="hasTouchBack"></div>
    <div class="title-text">{{title}}</div>
    <div class="search-btn" @click="touchSearch" v-show="hasTouchSearch"></div>
</div>
</template>

<script>
export default {
    name: 'titlebar',
    props: ['title', 'hasTouchBack', 'hasTouchSearch'],
    methods: {
        touchBack: function() {
            this.$router.goBack();
        },
        touchSearch: function(e) {
            this.$emit('touchSearch', e);
        }
    }
}
</script>

<style scoped>
    .titlebar {
        height: 21px;
        padding: 10px;
        text-align: center;
        z-index: 2;
        background-color: white;
        position: relative;
    }

    .back-btn {
        position: absolute;
        top:10px;
        left: 10px;
        height: 21px;
        width: 21px;
        background: url('../assets/back.png');
        background-size: cover;
    }

    .title-text {
        text-align: center;
    }

    .search-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 21px;
        width: 21px;
        background: url('../assets/search.png');
        background-size: cover;
    }
</style>