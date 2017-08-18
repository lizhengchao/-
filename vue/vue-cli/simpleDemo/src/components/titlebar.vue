<template>
<div class="titlebar">
    <div class="back-btn" @click="touchBack"></div>
    <div class="title-text">{{title}}</div>
    <div class="search-btn" @click="touchSearch" v-show="hasTouchSearch"></div>
</div>
</template>

<script>
export default {
    name: 'titlebar',
    props: ['title', 'hasTouchSearch'],
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
        height: 30px;
        padding: 10px;
        text-align: center;
        z-index: 2;
        background-color: white;
    }

    .back-btn {
        height: 21px;
        width: 21px;
        float: left;
        background: url('../assets/back.png');
        background-size: cover;
    }

    .title-text {
        width: 300px;
        float: left;
    }

    .search-btn {
        height: 21px;
        width: 21px;
        float: right;
        background: url('../assets/search.png');
        background-size: cover;
    }
</style>