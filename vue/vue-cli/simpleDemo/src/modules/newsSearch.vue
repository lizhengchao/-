<template>
    <div>
        <titlebar title="查找新闻公告"></titlebar>
        <div class="resultContianer"></div>
    </div>
</template>

<script>
    import titlebar from '../components/titlebar.vue'

    export default {
        name: 'newsSearch',
        components: {
            titlebar
        }
    }
</script>

<style scoped>
    .resultContianer {
        height: 500px;
        background-color: #eee;
    }
</style>